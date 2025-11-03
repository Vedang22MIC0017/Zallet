# CrimeAI Prediction System

A modern Next.js web application that uses advanced machine learning algorithms to predict crime incidents for Indian cities. Features a stunning Matrix-style animated background, glass window UI, and sophisticated ML-based crime forecasting.

## 🚀 Features

- 🎯 **Smart City Selection**: Choose from Indian cities with comprehensive crime data
- 🤖 **ML-Powered Predictions**: Advanced statistical analysis and pattern recognition
- 📊 **Detailed Risk Analysis**: View probability, confidence, risk levels, and contributing factors
- 🗺️ **Google Maps Integration**: Real-time map display with crime prediction markers
- 📍 **Real City Locations**: Actual coordinates and areas from major Indian cities
- 🎨 **Modern UI**: Glass window design with Matrix rain background
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🔍 **Real-time Analysis**: 24-hour crime forecasts with location intelligence

## 🧠 ML Prediction Source

**File**: `/lib/ml-predictor.ts`

The predictions are generated using a sophisticated machine learning service that analyzes:

### Data Source

- **Primary Dataset**: `crime_dataset_india.csv` (40,000+ crime records)
- **Cities Covered**: Major Indian cities including Delhi, Mumbai, Chennai, Bangalore, etc.
- **Time Range**: Historical crime data with temporal patterns

### ML Algorithm Features

1. **Pattern Recognition**: Analyzes hourly, daily, and seasonal crime patterns
2. **Statistical Analysis**: Uses frequency distributions and weighted random selection
3. **Risk Assessment**: Calculates probability and confidence scores
4. **Temporal Modeling**: Considers time-of-day and day-of-week factors
5. **Demographic Analysis**: Victim age, gender, and weapon usage patterns

### Prediction Components

- **Crime Type**: Based on historical frequency analysis
- **Timing**: Weighted towards high-risk time periods (evening/night)
- **Location**: Real city areas with actual GPS coordinates
- **Coordinates**: Precise lat/lng for Google Maps integration
- **Risk Level**: LOW, MEDIUM, HIGH, CRITICAL classification
- **Confidence Score**: Statistical confidence in the prediction
- **Contributing Factors**: Key elements influencing the prediction

### Real City Data

- **Cities Covered**: Delhi, Mumbai, Chennai, Bangalore, Pune, Hyderabad, Ahmedabad
- **Areas per City**: 10+ real neighborhoods and districts
- **Location Types**: Commercial, Residential, Industrial, Public, Transport, Educational, Healthcare, Entertainment
- **Coordinates**: Accurate GPS coordinates for each area

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom glass window effects
- **ML Processing**: Custom statistical analysis algorithms
- **Data Processing**: Papa Parse for CSV handling
- **Maps**: Google Maps JavaScript API with custom markers
- **UI Components**: Lucide React icons, GSAP animations
- **Background**: Custom Matrix rain animation

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Ensure the crime dataset is in the root directory:**

   - The `crime_dataset_india.csv` file should be in `/Users/vedang/peterTingle/`

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`

## How It Works

1. **Data Processing**: The app reads the India crime dataset CSV file
2. **City Analysis**: Extracts unique cities and their crime statistics
3. **Pattern Recognition**: Analyzes historical crime patterns for each city
4. **Prediction Generation**: Creates realistic predictions based on:
   - Crime types and frequencies
   - Time patterns (hour of day, day of week)
   - Location patterns
   - Victim demographics
   - Weapon usage patterns

## API Endpoints

- `GET /api/cities` - Returns list of cities with crime counts
- `POST /api/predict` - Generates crime predictions for a specific city

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── cities/route.ts      # City data endpoint
│   │   └── predict/route.ts     # Prediction endpoint
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # App layout
│   └── page.tsx                 # Main page
├── components/
│   ├── MatrixRain.tsx           # Animated background
│   ├── CitySelector.tsx         # City selection component
│   └── PredictionResults.tsx    # Results display
├── crime_dataset_india.csv      # Crime dataset
└── package.json
```

## Usage

1. **Select a City**: Use the searchable dropdown to choose an Indian city
2. **View Predictions**: See up to 10 predicted crimes for the next 24 hours
3. **Analyze Details**: Click on any prediction to see detailed information including:
   - Crime type and probability
   - Predicted date and time
   - Location within the city
   - Victim profile (age, gender)
   - Weapon used
   - Police units needed

## Data Insights

The system analyzes patterns from the India crime dataset including:

- **40,000+ crime records** from various Indian cities
- **Crime types**: Homicide, Burglary, Assault, Theft, etc.
- **Temporal patterns**: Time of day, day of week trends
- **Demographics**: Victim age and gender distributions
- **Weapons**: Common weapons used in crimes
- **Police response**: Typical police deployment numbers

## Disclaimer

⚠️ **This is a prototype system for demonstration purposes only.**

- Predictions are based on historical patterns and statistical analysis
- Results should not be used for actual law enforcement decisions
- The system is designed for educational and research purposes
- Real crime prediction systems require much more sophisticated ML models and real-time data

## Future Enhancements

- Real-time data integration
- Machine learning model improvements
- Geographic mapping with coordinates
- Police dispatch integration
- Historical trend analysis
- Crime prevention recommendations

## License

MIT License - Feel free to use this project for educational purposes.
