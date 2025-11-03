import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'crime_dataset_india.csv')
    const csvData = fs.readFileSync(csvPath, 'utf-8')
    
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    })

    // Count crimes per city
    const cityCounts: { [key: string]: number } = {}
    
    parsed.data.forEach((row: any) => {
      const city = row.City?.trim()
      if (city) {
        cityCounts[city] = (cityCounts[city] || 0) + 1
      }
    })

    // Convert to array and sort by crime count
    const cities = Object.entries(cityCounts)
      .map(([name, crimeCount]) => ({ name, crimeCount }))
      .sort((a, b) => b.crimeCount - a.crimeCount)

    return NextResponse.json({ cities })
  } catch (error) {
    console.error('Error processing cities:', error)
    return NextResponse.json(
      { error: 'Failed to process cities data' },
      { status: 500 }
    )
  }
}
