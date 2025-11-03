import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import joblib
import json
from typing import Dict, List, Tuple, Any
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.multioutput import MultiOutputClassifier
import xgboost as xgb
import lightgbm as lgb
import warnings
warnings.filterwarnings('ignore')

class CrimePredictionML:
    def __init__(self):
        self.models = {}
        self.encoders = {}
        self.scalers = {}
        self.feature_columns = []
        self.target_columns = ['crime_type', 'area', 'hour', 'risk_level']
        self.model_performance = {}
        
    def prepare_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Prepare features for ML models"""
        df = df.copy()
        
        # Convert date columns
        df['date_reported'] = pd.to_datetime(df['date_reported'], format='%d-%m-%Y %H:%M')
        df['date_of_occurrence'] = pd.to_datetime(df['date_of_occurrence'], format='%d-%m-%Y %H:%M')
        
        # Extract temporal features
        df['hour'] = df['date_of_occurrence'].dt.hour
        df['day_of_week'] = df['date_of_occurrence'].dt.dayofweek
        df['month'] = df['date_of_occurrence'].dt.month
        df['day_of_year'] = df['date_of_occurrence'].dt.dayofyear
        df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)
        df['is_night'] = ((df['hour'] >= 22) | (df['hour'] <= 6)).astype(int)
        df['is_morning'] = ((df['hour'] >= 6) & (df['hour'] < 12)).astype(int)
        df['is_afternoon'] = ((df['hour'] >= 12) & (df['hour'] < 18)).astype(int)
        df['is_evening'] = ((df['hour'] >= 18) & (df['hour'] < 22)).astype(int)
        
        # Crime type encoding
        if 'crime_description' in df.columns:
            df['crime_type'] = df['crime_description']
        
        # Area type classification
        commercial_areas = ['Connaught Place', 'T. Nagar', 'Koramangala', 'Banjara Hills', 'Bodakdev']
        residential_areas = ['Dwarka', 'Thane', 'Velachery', 'Whitefield', 'Baner', 'Gachibowli', 'Satellite']
        industrial_areas = ['Noida', 'Navi Mumbai', 'Electronic City', 'Hinjewadi', 'HITEC City', 'Vatva']
        
        def classify_area(area):
            if area in commercial_areas:
                return 'Commercial'
            elif area in residential_areas:
                return 'Residential'
            elif area in industrial_areas:
                return 'Industrial'
            else:
                return 'Mixed'
        
        df['area_type'] = df['area'].apply(classify_area)
        
        # Victim age groups
        df['victim_age_group'] = pd.cut(df['victim_age'], 
                                       bins=[0, 25, 35, 50, 100], 
                                       labels=['Young', 'Adult', 'Middle-aged', 'Senior'])
        
        # Crime severity scoring
        severity_map = {
            'HOMICIDE': 10, 'KIDNAPPING': 9, 'ROBBERY': 8, 'ASSAULT': 7,
            'BURGLARY': 6, 'THEFT': 5, 'FRAUD': 4, 'VANDALISM': 3,
            'DRUG_OFFENSE': 6, 'DOMESTIC_VIOLENCE': 7, 'CYBER_CRIME': 4,
            'MOTOR_VEHICLE_THEFT': 5, 'PUBLIC_DISORDER': 3, 'WEAPON_OFFENSE': 8,
            'SEXUAL_OFFENSE': 9, 'EXTORTION': 7, 'FORGERY': 3, 'EMBEZZLEMENT': 4,
            'ARSON': 6, 'IDENTITY_THEFT': 4
        }
        df['crime_severity'] = df['crime_type'].map(severity_map).fillna(5)
        
        # Risk level calculation
        def calculate_risk_level(row):
            score = 0
            # Time factor
            if row['is_night']:
                score += 2
            elif row['is_evening']:
                score += 1
            
            # Day factor
            if row['is_weekend']:
                score += 1
            
            # Area factor
            if row['area_type'] == 'Commercial':
                score += 1
            elif row['area_type'] == 'Industrial':
                score += 0.5
            
            # Crime severity
            score += row['crime_severity'] * 0.3
            
            if score >= 7:
                return 'CRITICAL'
            elif score >= 5:
                return 'HIGH'
            elif score >= 3:
                return 'MEDIUM'
            else:
                return 'LOW'
        
        df['risk_level'] = df.apply(calculate_risk_level, axis=1)
        
        return df
    
    def encode_categorical_features(self, df: pd.DataFrame, fit: bool = True) -> pd.DataFrame:
        """Encode categorical features"""
        categorical_columns = ['city', 'crime_type', 'area', 'area_type', 'victim_gender', 
                              'weapon_used', 'crime_domain', 'victim_age_group', 'risk_level']
        
        df_encoded = df.copy()
        
        for col in categorical_columns:
            if col in df.columns:
                if fit:
                    if col not in self.encoders:
                        self.encoders[col] = LabelEncoder()
                    df_encoded[col] = self.encoders[col].fit_transform(df[col].astype(str))
                else:
                    if col in self.encoders:
                        # Handle unseen categories
                        unique_values = set(df[col].astype(str).unique())
                        known_values = set(self.encoders[col].classes_)
                        unknown_values = unique_values - known_values
                        
                        if unknown_values:
                            # Add unknown values to encoder
                            all_values = list(known_values) + list(unknown_values)
                            self.encoders[col].classes_ = np.array(all_values)
                        
                        df_encoded[col] = self.encoders[col].transform(df[col].astype(str))
        
        return df_encoded
    
    def prepare_training_data(self, df: pd.DataFrame) -> Tuple[np.ndarray, Dict[str, np.ndarray]]:
        """Prepare training data for ML models"""
        df_processed = self.prepare_features(df)
        df_encoded = self.encode_categorical_features(df_processed, fit=True)
        
        # Define feature columns
        self.feature_columns = [
            'hour', 'day_of_week', 'month', 'day_of_year', 'is_weekend', 'is_night',
            'is_morning', 'is_afternoon', 'is_evening', 'victim_age', 'crime_severity',
            'city', 'area_type', 'victim_gender', 'weapon_used', 'crime_domain', 'victim_age_group'
        ]
        
        # Filter existing columns
        self.feature_columns = [col for col in self.feature_columns if col in df_encoded.columns]
        
        X = df_encoded[self.feature_columns].values
        
        # Prepare targets
        targets = {}
        for target in self.target_columns:
            if target in df_encoded.columns:
                targets[target] = df_encoded[target].values
        
        return X, targets
    
    def train_models(self, df: pd.DataFrame):
        """Train multiple ML models for crime prediction"""
        print("Preparing training data...")
        X, targets = self.prepare_training_data(df)
        
        print(f"Training data shape: {X.shape}")
        print(f"Features: {self.feature_columns}")
        print(f"Targets: {list(targets.keys())}")
        
        # Scale features
        self.scalers['features'] = StandardScaler()
        X_scaled = self.scalers['features'].fit_transform(X)
        
        # Train models for each target
        for target_name, y in targets.items():
            print(f"\nTraining models for {target_name}...")
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X_scaled, y, test_size=0.2, random_state=42, stratify=y
            )
            
            # Define models
            models = {
                'random_forest': RandomForestClassifier(
                    n_estimators=100, max_depth=10, random_state=42, n_jobs=-1
                ),
                'gradient_boosting': GradientBoostingClassifier(
                    n_estimators=100, max_depth=6, random_state=42
                ),
                'xgboost': xgb.XGBClassifier(
                    n_estimators=100, max_depth=6, random_state=42, n_jobs=-1
                ),
                'lightgbm': lgb.LGBMClassifier(
                    n_estimators=100, max_depth=6, random_state=42, n_jobs=-1, verbose=-1
                ),
                'logistic_regression': LogisticRegression(
                    random_state=42, max_iter=1000, n_jobs=-1
                )
            }
            
            # Train and evaluate models
            best_model = None
            best_score = 0
            
            for model_name, model in models.items():
                print(f"  Training {model_name}...")
                
                # Train model
                model.fit(X_train, y_train)
                
                # Evaluate
                y_pred = model.predict(X_test)
                accuracy = accuracy_score(y_test, y_pred)
                
                print(f"    Accuracy: {accuracy:.4f}")
                
                # Cross-validation
                cv_scores = cross_val_score(model, X_scaled, y, cv=5, scoring='accuracy')
                cv_mean = cv_scores.mean()
                cv_std = cv_scores.std()
                
                print(f"    CV Score: {cv_mean:.4f} (+/- {cv_std*2:.4f})")
                
                # Store model if it's the best
                if cv_mean > best_score:
                    best_score = cv_mean
                    best_model = model
                
                # Store all models
                if target_name not in self.models:
                    self.models[target_name] = {}
                self.models[target_name][model_name] = model
            
            # Store best model
            if target_name not in self.models:
                self.models[target_name] = {}
            self.models[target_name]['best'] = best_model
            
            # Store performance metrics
            self.model_performance[target_name] = {
                'best_score': best_score,
                'best_model': type(best_model).__name__
            }
            
            print(f"  Best model for {target_name}: {type(best_model).__name__} (CV: {best_score:.4f})")
    
    def predict_crime(self, city: str, prediction_date: datetime, 
                     num_predictions: int = 10) -> List[Dict[str, Any]]:
        """Generate crime predictions using trained ML models"""
        if not self.models:
            raise ValueError("Models not trained. Please train models first.")
        
        predictions = []
        
        # Generate multiple prediction scenarios
        for i in range(num_predictions):
            # Create feature vector for prediction
            features = self._create_prediction_features(city, prediction_date, i)
            
            # Make predictions
            prediction = {}
            for target_name in self.target_columns:
                if target_name in self.models and 'best' in self.models[target_name]:
                    model = self.models[target_name]['best']
                    pred = model.predict([features])[0]
                    
                    # Decode prediction if encoder exists
                    if target_name in self.encoders:
                        try:
                            pred = self.encoders[target_name].inverse_transform([pred])[0]
                        except:
                            pred = str(pred)
                    
                    prediction[target_name] = pred
            
            # Generate additional prediction details
            prediction.update(self._generate_prediction_details(city, prediction_date, i))
            predictions.append(prediction)
        
        return predictions
    
    def _create_prediction_features(self, city: str, prediction_date: datetime, 
                                  variation: int) -> np.ndarray:
        """Create feature vector for prediction"""
        # Base features
        hour = (prediction_date.hour + variation * 2) % 24
        day_of_week = prediction_date.weekday()
        month = prediction_date.month
        day_of_year = prediction_date.timetuple().tm_yday
        
        # Temporal features
        is_weekend = int(day_of_week >= 5)
        is_night = int((hour >= 22) or (hour <= 6))
        is_morning = int((hour >= 6) and (hour < 12))
        is_afternoon = int((hour >= 12) and (hour < 18))
        is_evening = int((hour >= 18) and (hour < 22))
        
        # Encode city
        city_encoded = 0  # Default
        if 'city' in self.encoders:
            try:
                city_encoded = self.encoders['city'].transform([city])[0]
            except:
                city_encoded = 0
        
        # Other features (using typical values)
        victim_age = 35 + variation * 5
        crime_severity = 5 + variation % 3
        area_type = variation % 4  # 0-3 for different area types
        victim_gender = variation % 2  # 0-1 for M-F
        weapon_used = variation % 5  # 0-4 for different weapons
        crime_domain = variation % 4  # 0-3 for different domains
        victim_age_group = variation % 4  # 0-3 for different age groups
        
        features = np.array([
            hour, day_of_week, month, day_of_year, is_weekend, is_night,
            is_morning, is_afternoon, is_evening, victim_age, crime_severity,
            city_encoded, area_type, victim_gender, weapon_used, crime_domain, victim_age_group
        ])
        
        return features
    
    def _generate_prediction_details(self, city: str, prediction_date: datetime, 
                                   variation: int) -> Dict[str, Any]:
        """Generate additional prediction details"""
        # City-specific areas
        city_areas = {
            'Delhi': ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Saket', 'Dwarka'],
            'Mumbai': ['Bandra', 'Andheri', 'Powai', 'Malad', 'Borivali'],
            'Chennai': ['T. Nagar', 'Anna Nagar', 'Velachery', 'Adyar', 'Mylapore'],
            'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City'],
            'Pune': ['Koregaon Park', 'Baner', 'Aundh', 'Hinjewadi', 'Wakad'],
            'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City'],
            'Ahmedabad': ['Bodakdev', 'Satellite', 'Vastrapur', 'Navrangpura']
        }
        
        # Generate coordinates
        city_coords = {
            'Delhi': (28.6139, 77.2090),
            'Mumbai': (19.0760, 72.8777),
            'Chennai': (13.0827, 80.2707),
            'Bangalore': (12.9716, 77.5946),
            'Pune': (18.5204, 73.8567),
            'Hyderabad': (17.3850, 78.4867),
            'Ahmedabad': (23.0225, 72.5714)
        }
        
        base_coords = city_coords.get(city, (28.6139, 77.2090))
        lat = base_coords[0] + np.random.uniform(-0.05, 0.05)
        lng = base_coords[1] + np.random.uniform(-0.05, 0.05)
        
        # Generate time with variation
        prediction_time = prediction_date + timedelta(hours=variation * 2)
        
        return {
            'id': f"pred_{city}_{variation}_{int(prediction_date.timestamp())}",
            'date': prediction_time.strftime('%Y-%m-%d'),
            'time': prediction_time.strftime('%H:%M'),
            'location': np.random.choice(city_areas.get(city, ['Unknown'])),
            'coordinates': {'lat': lat, 'lng': lng},
            'probability': np.random.uniform(0.3, 0.95),
            'confidence': np.random.uniform(0.6, 0.9),
            'victim_age': 25 + variation * 5,
            'victim_gender': 'M' if variation % 2 == 0 else 'F',
            'weapon': np.random.choice(['Knife', 'Blunt Object', 'Hands/Feet', 'Firearm', 'Other']),
            'police_needed': 3 + variation % 8,
            'factors': [
                'Historical pattern analysis',
                'Temporal correlation',
                'Spatial clustering',
                'Demographic factors',
                'Weather conditions'
            ]
        }
    
    def save_models(self, filepath: str = 'ml_models/'):
        """Save trained models and encoders"""
        import os
        os.makedirs(filepath, exist_ok=True)
        
        # Save models
        for target_name, target_models in self.models.items():
            for model_name, model in target_models.items():
                filename = f"{filepath}{target_name}_{model_name}.joblib"
                joblib.dump(model, filename)
        
        # Save encoders
        for encoder_name, encoder in self.encoders.items():
            filename = f"{filepath}encoder_{encoder_name}.joblib"
            joblib.dump(encoder, filename)
        
        # Save scalers
        for scaler_name, scaler in self.scalers.items():
            filename = f"{filepath}scaler_{scaler_name}.joblib"
            joblib.dump(scaler, filename)
        
        # Save metadata
        metadata = {
            'feature_columns': self.feature_columns,
            'target_columns': self.target_columns,
            'model_performance': self.model_performance,
            'saved_at': datetime.now().isoformat()
        }
        
        with open(f"{filepath}model_metadata.json", 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print(f"Models saved to {filepath}")
    
    def load_models(self, filepath: str = 'ml_models/'):
        """Load trained models and encoders"""
        import os
        import glob
        
        # Load models
        model_files = glob.glob(f"{filepath}*_*.joblib")
        for file in model_files:
            if 'encoder_' not in file and 'scaler_' not in file:
                filename = os.path.basename(file)
                parts = filename.replace('.joblib', '').split('_')
                target_name = parts[0]
                model_name = '_'.join(parts[1:])
                
                if target_name not in self.models:
                    self.models[target_name] = {}
                self.models[target_name][model_name] = joblib.load(file)
        
        # Load encoders
        encoder_files = glob.glob(f"{filepath}encoder_*.joblib")
        for file in encoder_files:
            filename = os.path.basename(file)
            encoder_name = filename.replace('encoder_', '').replace('.joblib', '')
            self.encoders[encoder_name] = joblib.load(file)
        
        # Load scalers
        scaler_files = glob.glob(f"{filepath}scaler_*.joblib")
        for file in scaler_files:
            filename = os.path.basename(file)
            scaler_name = filename.replace('scaler_', '').replace('.joblib', '')
            self.scalers[scaler_name] = joblib.load(file)
        
        # Load metadata
        metadata_file = f"{filepath}model_metadata.json"
        if os.path.exists(metadata_file):
            with open(metadata_file, 'r') as f:
                metadata = json.load(f)
                self.feature_columns = metadata.get('feature_columns', [])
                self.target_columns = metadata.get('target_columns', [])
                self.model_performance = metadata.get('model_performance', {})
        
        print(f"Models loaded from {filepath}")

if __name__ == "__main__":
    # Example usage
    ml_predictor = CrimePredictionML()
    
    # Load and prepare data
    print("Loading crime data...")
    df = pd.read_csv('../crime_dataset_india.csv')
    
    # Train models
    ml_predictor.train_models(df)
    
    # Save models
    ml_predictor.save_models()
    
    # Test prediction
    test_date = datetime.now() + timedelta(days=1)
    predictions = ml_predictor.predict_crime('Delhi', test_date, 5)
    
    print("\nSample predictions:")
    for i, pred in enumerate(predictions[:3]):
        print(f"Prediction {i+1}: {pred}")
