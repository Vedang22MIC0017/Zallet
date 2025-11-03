"""
Real Crime Data Generator for All Indian Cities
Generates comprehensive crime data with temporal and spatial patterns
"""

import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta
import json
from typing import List, Dict, Any

class CrimeDataGenerator:
    def __init__(self):
        self.cities = {
            'Delhi': {
                'coordinates': (28.6139, 77.2090),
                'areas': [
                    'Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Saket', 'Dwarka',
                    'Rohini', 'Pitampura', 'Janakpuri', 'Vasant Kunj', 'Greater Kailash',
                    'Malviya Nagar', 'Hauz Khas', 'Rajouri Garden', 'Paschim Vihar',
                    'Uttam Nagar', 'Vikaspuri', 'Noida', 'Gurgaon', 'Faridabad', 'Ghaziabad'
                ]
            },
            'Mumbai': {
                'coordinates': (19.0760, 72.8777),
                'areas': [
                    'Bandra', 'Andheri', 'Powai', 'Malad', 'Borivali', 'Thane',
                    'Navi Mumbai', 'Dadar', 'Parel', 'Worli', 'Juhu', 'Goregaon',
                    'Kandivali', 'Mira Road', 'Vasai', 'Kalyan', 'Dombivli', 'Ulhasnagar'
                ]
            },
            'Chennai': {
                'coordinates': (13.0827, 80.2707),
                'areas': [
                    'T. Nagar', 'Anna Nagar', 'Velachery', 'Adyar', 'Mylapore',
                    'Egmore', 'Nungambakkam', 'Kodambakkam', 'Saidapet', 'Tambaram',
                    'Chromepet', 'Pallavaram', 'St. Thomas Mount', 'Guindy', 'Perungudi'
                ]
            },
            'Bangalore': {
                'coordinates': (12.9716, 77.5946),
                'areas': [
                    'Koramangala', 'Indiranagar', 'Whitefield', 'Electronic City',
                    'Marathahalli', 'HSR Layout', 'BTM Layout', 'Jayanagar',
                    'JP Nagar', 'Banashankari', 'Malleshwaram', 'Rajajinagar',
                    'Vijayanagar', 'Yeshwanthpur', 'Hebbal', 'Yelahanka'
                ]
            },
            'Pune': {
                'coordinates': (18.5204, 73.8567),
                'areas': [
                    'Koregaon Park', 'Baner', 'Aundh', 'Hinjewadi', 'Wakad',
                    'Pimpri', 'Chinchwad', 'Hadapsar', 'Kondhwa', 'Katraj',
                    'Swargate', 'Deccan', 'Shivajinagar', 'Camp', 'Bund Garden'
                ]
            },
            'Hyderabad': {
                'coordinates': (17.3850, 78.4867),
                'areas': [
                    'Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'HITEC City',
                    'Kondapur', 'Madhapur', 'Kukatpally', 'Miyapur', 'Dilshuknagar',
                    'Malakpet', 'Secunderabad', 'Begumpet', 'Somajiguda', 'Abids'
                ]
            },
            'Ahmedabad': {
                'coordinates': (23.0225, 72.5714),
                'areas': [
                    'Bodakdev', 'Satellite', 'Vastrapur', 'Navrangpura', 'C.G. Road',
                    'Maninagar', 'Naroda', 'Bapunagar', 'Isanpur', 'Vatva',
                    'Narol', 'Asarwa', 'Sabarmati', 'Chandkheda', 'Motera'
                ]
            }
        }
        
        self.crime_types = [
            'THEFT', 'ROBBERY', 'BURGLARY', 'ASSAULT', 'FRAUD', 'VANDALISM',
            'DRUG_OFFENSE', 'DOMESTIC_VIOLENCE', 'CYBER_CRIME', 'MOTOR_VEHICLE_THEFT',
            'PUBLIC_DISORDER', 'WEAPON_OFFENSE', 'SEXUAL_OFFENSE', 'KIDNAPPING',
            'EXTORTION', 'FORGERY', 'EMBEZZLEMENT', 'ARSON', 'HOMICIDE', 'IDENTITY_THEFT'
        ]
        
        self.weapons = [
            'Blunt Object', 'Knife', 'Firearm', 'Poison', 'Hands/Feet', 'Vehicle',
            'Rope', 'Chemical', 'Explosive', 'Other', 'Unknown'
        ]
        
        self.victim_genders = ['M', 'F']
        self.crime_domains = ['Violent Crime', 'Property Crime', 'Public Order', 'Other Crime']

    def generate_temporal_features(self, base_date: datetime) -> Dict[str, Any]:
        """Generate temporal features with realistic patterns"""
        hour = base_date.hour
        day_of_week = base_date.weekday()
        month = base_date.month
        
        # Crime patterns by time
        if 22 <= hour or hour <= 6:  # Night time
            time_weight = 1.5
        elif 18 <= hour <= 21:  # Evening
            time_weight = 1.3
        elif 12 <= hour <= 17:  # Afternoon
            time_weight = 0.8
        else:  # Morning
            time_weight = 0.6
            
        # Weekend effect
        if day_of_week >= 5:  # Weekend
            time_weight *= 1.2
            
        # Seasonal patterns
        if month in [11, 12, 1, 2]:  # Winter
            seasonal_weight = 1.1
        elif month in [6, 7, 8, 9]:  # Monsoon
            seasonal_weight = 0.9
        else:
            seasonal_weight = 1.0
            
        return {
            'hour': hour,
            'day_of_week': day_of_week,
            'month': month,
            'time_weight': time_weight,
            'seasonal_weight': seasonal_weight,
            'is_weekend': day_of_week >= 5,
            'is_night': 22 <= hour or hour <= 6
        }

    def generate_spatial_features(self, city: str, area: str) -> Dict[str, Any]:
        """Generate spatial features based on area characteristics"""
        # Area type classification
        commercial_areas = ['Connaught Place', 'T. Nagar', 'Koramangala', 'Banjara Hills', 'Bodakdev']
        residential_areas = ['Dwarka', 'Thane', 'Velachery', 'Whitefield', 'Baner', 'Gachibowli', 'Satellite']
        industrial_areas = ['Noida', 'Navi Mumbai', 'Electronic City', 'Hinjewadi', 'HITEC City', 'Vatva']
        
        if area in commercial_areas:
            area_type = 'Commercial'
            crime_density = 1.3
        elif area in residential_areas:
            area_type = 'Residential'
            crime_density = 0.8
        elif area in industrial_areas:
            area_type = 'Industrial'
            crime_density = 1.1
        else:
            area_type = 'Mixed'
            crime_density = 1.0
            
        # City-specific crime rates
        city_rates = {
            'Delhi': 1.4, 'Mumbai': 1.2, 'Chennai': 0.9, 'Bangalore': 1.0,
            'Pune': 0.8, 'Hyderabad': 0.9, 'Ahmedabad': 0.7
        }
        
        return {
            'area_type': area_type,
            'crime_density': crime_density,
            'city_crime_rate': city_rates.get(city, 1.0),
            'population_density': random.uniform(0.5, 2.0)
        }

    def generate_crime_record(self, city: str, base_date: datetime) -> Dict[str, Any]:
        """Generate a single crime record with realistic patterns"""
        temporal = self.generate_temporal_features(base_date)
        area = random.choice(self.cities[city]['areas'])
        spatial = self.generate_spatial_features(city, area)
        
        # Crime type selection based on patterns
        if temporal['is_night']:
            crime_type_weights = {
                'THEFT': 0.25, 'ROBBERY': 0.20, 'BURGLARY': 0.15, 'ASSAULT': 0.10,
                'DRUG_OFFENSE': 0.08, 'VANDALISM': 0.07, 'MOTOR_VEHICLE_THEFT': 0.10,
                'PUBLIC_DISORDER': 0.05
            }
        else:
            crime_type_weights = {
                'THEFT': 0.20, 'FRAUD': 0.15, 'ASSAULT': 0.12, 'CYBER_CRIME': 0.10,
                'VANDALISM': 0.08, 'DOMESTIC_VIOLENCE': 0.08, 'PUBLIC_DISORDER': 0.12,
                'MOTOR_VEHICLE_THEFT': 0.15
            }
        
        crime_type = np.random.choice(
            list(crime_type_weights.keys()),
            p=list(crime_type_weights.values())
        )
        
        # Victim demographics
        victim_age = random.randint(18, 65)
        victim_gender = random.choice(self.victim_genders)
        
        # Weapon selection based on crime type
        if crime_type in ['ASSAULT', 'ROBBERY']:
            weapon = random.choice(['Knife', 'Blunt Object', 'Hands/Feet', 'Firearm'])
        elif crime_type == 'BURGLARY':
            weapon = random.choice(['Blunt Object', 'Other', 'Unknown'])
        else:
            weapon = random.choice(self.weapons)
        
        # Police deployment based on crime severity
        severity_map = {
            'HOMICIDE': 15, 'KIDNAPPING': 12, 'ROBBERY': 8, 'ASSAULT': 6,
            'BURGLARY': 4, 'THEFT': 3, 'FRAUD': 2, 'VANDALISM': 2
        }
        police_needed = severity_map.get(crime_type, 3)
        
        # Case closure probability
        case_closed = random.random() < 0.7  # 70% closure rate
        closure_date = None
        if case_closed:
            days_to_close = random.randint(1, 365)
            closure_date = base_date + timedelta(days=days_to_close)
        
        # Generate coordinates with some randomness
        base_coords = self.cities[city]['coordinates']
        lat = base_coords[0] + random.uniform(-0.1, 0.1)
        lng = base_coords[1] + random.uniform(-0.1, 0.1)
        
        return {
            'report_number': random.randint(100000, 999999),
            'date_reported': base_date.strftime('%d-%m-%Y %H:%M'),
            'date_of_occurrence': (base_date - timedelta(hours=random.randint(0, 24))).strftime('%d-%m-%Y %H:%M'),
            'time_of_occurrence': base_date.strftime('%d-%m-%Y %H:%M'),
            'city': city,
            'crime_code': random.randint(100, 999),
            'crime_description': crime_type,
            'victim_age': victim_age,
            'victim_gender': victim_gender,
            'weapon_used': weapon,
            'crime_domain': random.choice(self.crime_domains),
            'police_deployed': police_needed,
            'case_closed': 'Yes' if case_closed else 'No',
            'date_case_closed': closure_date.strftime('%d-%m-%Y') if closure_date else '',
            'area': area,
            'latitude': lat,
            'longitude': lng,
            'temporal_features': temporal,
            'spatial_features': spatial
        }

    def generate_dataset(self, start_date: str = '2020-01-01', end_date: str = '2024-01-01', 
                        records_per_day: int = 50) -> pd.DataFrame:
        """Generate comprehensive crime dataset for all cities"""
        start = datetime.strptime(start_date, '%Y-%m-%d')
        end = datetime.strptime(end_date, '%Y-%m-%d')
        
        records = []
        current_date = start
        
        while current_date < end:
            # Generate records for each city
            for city in self.cities.keys():
                # Vary records per day based on city size and day of week
                base_records = records_per_day
                if city in ['Delhi', 'Mumbai']:
                    base_records = int(records_per_day * 1.5)
                elif city in ['Chennai', 'Bangalore']:
                    base_records = int(records_per_day * 1.2)
                
                # Weekend effect
                if current_date.weekday() >= 5:
                    base_records = int(base_records * 0.8)
                
                # Generate records for this city and date
                for _ in range(random.randint(int(base_records * 0.7), int(base_records * 1.3))):
                    record = self.generate_crime_record(city, current_date)
                    records.append(record)
            
            current_date += timedelta(days=1)
            
            # Progress indicator
            if current_date.day == 1:
                print(f"Generated data for {current_date.strftime('%Y-%m')}")
        
        df = pd.DataFrame(records)
        print(f"Generated {len(df)} crime records")
        return df

    def save_dataset(self, df: pd.DataFrame, filename: str = 'comprehensive_crime_data.csv'):
        """Save dataset to CSV"""
        df.to_csv(filename, index=False)
        print(f"Dataset saved to {filename}")
        
        # Save metadata
        metadata = {
            'total_records': len(df),
            'cities': list(self.cities.keys()),
            'date_range': f"{df['date_reported'].min()} to {df['date_reported'].max()}",
            'crime_types': df['crime_description'].value_counts().to_dict(),
            'generated_at': datetime.now().isoformat()
        }
        
        with open('dataset_metadata.json', 'w') as f:
            json.dump(metadata, f, indent=2)
        print("Metadata saved to dataset_metadata.json")

if __name__ == "__main__":
    generator = CrimeDataGenerator()
    
    print("Generating comprehensive crime dataset for all cities...")
    df = generator.generate_dataset(
        start_date='2020-01-01',
        end_date='2024-01-01',
        records_per_day=30  # Adjust based on your needs
    )
    
    generator.save_dataset(df, 'comprehensive_crime_data.csv')
    
    print("\nDataset Summary:")
    print(f"Total records: {len(df)}")
    print(f"Cities: {df['city'].value_counts().to_dict()}")
    print(f"Date range: {df['date_reported'].min()} to {df['date_reported'].max()}")
    print(f"Crime types: {len(df['crime_description'].unique())}")
