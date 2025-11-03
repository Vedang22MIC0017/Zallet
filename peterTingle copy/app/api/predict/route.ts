import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { city, num_predictions = 10 } = await request.json()
    
    if (!city) {
      return NextResponse.json(
        { error: 'City parameter is required' },
        { status: 400 }
      )
    }

    // Call the real ML backend
    const mlBackendUrl = process.env.ML_BACKEND_URL || 'http://localhost:8000'
    
    try {
      const response = await fetch(`${mlBackendUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city,
          num_predictions,
          prediction_date: new Date().toISOString().split('T')[0] // Today's date
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        return NextResponse.json({
          city: data.city,
          predictions: data.predictions,
          totalPredictions: data.total_predictions,
          dataPoints: data.data_points,
          generatedAt: data.generated_at,
          modelVersion: data.model_version,
          algorithm: data.algorithm,
          confidenceScore: data.confidence_score
        })
      }
    } catch (mlError) {
      console.warn('ML backend not available, using fallback prediction:', mlError)
    }

    // Fallback to local prediction if ML backend is not available
    return await fallbackPrediction(city, num_predictions)
    
  } catch (error) {
    console.error('Error generating predictions:', error)
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}

async function fallbackPrediction(city: string, num_predictions: number) {
  // Fallback prediction using the existing local predictor
  const { CrimePredictor } = await import('../../../lib/ml-predictor')
  const fs = await import('fs')
  const path = await import('path')
  const Papa = await import('papaparse')
  
  try {
    const csvPath = path.join(process.cwd(), 'crime_dataset_india.csv')
    const csvData = fs.readFileSync(csvPath, 'utf-8')
    
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    })

    const cityData = (parsed.data as any[]).filter(crime => crime.City === city)
    
    if (cityData.length === 0) {
      return NextResponse.json(
        { error: `No data found for city: ${city}` },
        { status: 404 }
      )
    }

    const predictor = new CrimePredictor()
    const predictions = predictor.generatePredictions(cityData, city, num_predictions)

    return NextResponse.json({
      city,
      predictions,
      totalPredictions: predictions.length,
      dataPoints: cityData.length,
      generatedAt: new Date().toISOString(),
      modelVersion: '1.0.0-fallback',
      algorithm: 'Statistical Pattern Recognition (Fallback)',
      confidenceScore: 0.75
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate predictions' },
      { status: 500 }
    )
  }
}