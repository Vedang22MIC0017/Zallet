// ML Prediction Service for Crime Forecasting
// This service implements statistical analysis and pattern recognition for crime prediction

import { getRandomAreaForCity } from './city-locations'

interface CrimeData {
  'Report Number': string
  'Date Reported': string
  'Date of Occurrence': string
  'Time of Occurrence': string
  'City': string
  'Crime Code': string
  'Crime Description': string
  'Victim Age': string
  'Victim Gender': string
  'Weapon Used': string
  'Crime Domain': string
  'Police Deployed': string
  'Case Closed': string
  'Date Case Closed': string
}

interface Prediction {
  id: string
  date: string
  time: string
  crimeType: string
  location: string
  coordinates: { lat: number; lng: number }
  probability: number
  confidence: number
  victimAge: number
  victimGender: string
  weapon: string
  policeNeeded: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  factors: string[]
}

interface CrimePatterns {
  hourlyDistribution: { [hour: string]: number }
  dailyDistribution: { [day: string]: number }
  crimeTypeFrequency: { [type: string]: number }
  weaponFrequency: { [weapon: string]: number }
  ageDistribution: { [ageRange: string]: number }
  genderDistribution: { [gender: string]: number }
  locationFrequency: { [location: string]: number }
}

class CrimePredictor {
  private patterns: CrimePatterns = {
    hourlyDistribution: {},
    dailyDistribution: {},
    crimeTypeFrequency: {},
    weaponFrequency: {},
    ageDistribution: {},
    genderDistribution: {},
    locationFrequency: {}
  }

  // Analyze historical patterns from crime data
  analyzePatterns(cityData: CrimeData[]): CrimePatterns {
    const patterns: CrimePatterns = {
      hourlyDistribution: {},
      dailyDistribution: {},
      crimeTypeFrequency: {},
      weaponFrequency: {},
      ageDistribution: {},
      genderDistribution: {},
      locationFrequency: {}
    }

    cityData.forEach(crime => {
      // Extract hour from time
      const timeStr = crime['Time of Occurrence']
      if (timeStr) {
        const hour = this.extractHour(timeStr)
        patterns.hourlyDistribution[hour] = (patterns.hourlyDistribution[hour] || 0) + 1
      }

      // Extract day of week from date
      const dateStr = crime['Date of Occurrence']
      if (dateStr) {
        const dayOfWeek = this.extractDayOfWeek(dateStr)
        patterns.dailyDistribution[dayOfWeek] = (patterns.dailyDistribution[dayOfWeek] || 0) + 1
      }

      // Crime type frequency
      const crimeType = crime['Crime Description']
      if (crimeType) {
        patterns.crimeTypeFrequency[crimeType] = (patterns.crimeTypeFrequency[crimeType] || 0) + 1
      }

      // Weapon frequency
      const weapon = crime['Weapon Used']
      if (weapon) {
        patterns.weaponFrequency[weapon] = (patterns.weaponFrequency[weapon] || 0) + 1
      }

      // Age distribution
      const age = parseInt(crime['Victim Age']) || 30
      const ageRange = this.getAgeRange(age)
      patterns.ageDistribution[ageRange] = (patterns.ageDistribution[ageRange] || 0) + 1

      // Gender distribution
      const gender = crime['Victim Gender']
      if (gender) {
        patterns.genderDistribution[gender] = (patterns.genderDistribution[gender] || 0) + 1
      }
    })

    this.patterns = patterns
    return patterns
  }

  // Generate predictions using ML-like algorithms
  generatePredictions(cityData: CrimeData[], city: string, numPredictions: number = 8): Prediction[] {
    this.analyzePatterns(cityData)
    
    const predictions: Prediction[] = []
    const now = new Date()
    
    // Generate predictions for next 24 hours
    for (let i = 0; i < numPredictions; i++) {
      const prediction = this.generateSinglePrediction(now, i, city)
      predictions.push(prediction)
    }

    // Sort by probability and confidence
    return predictions.sort((a, b) => {
      const scoreA = a.probability * a.confidence
      const scoreB = b.probability * b.confidence
      return scoreB - scoreA
    })
  }

  private generateSinglePrediction(baseTime: Date, index: number, city: string): Prediction {
    // Generate time within next 24 hours with weighted probability
    const futureTime = new Date(baseTime.getTime() + this.getWeightedTimeOffset())
    
    // Select crime type based on frequency
    const crimeType = this.selectWeightedRandom(this.patterns.crimeTypeFrequency)
    
    // Select weapon based on frequency
    const weapon = this.selectWeightedRandom(this.patterns.weaponFrequency)
    
    // Select victim profile based on distributions
    const ageRange = this.selectWeightedRandom(this.patterns.ageDistribution)
    const gender = this.selectWeightedRandom(this.patterns.genderDistribution)
    
    // Calculate probability based on multiple factors
    const probability = this.calculateProbability(futureTime, crimeType)
    const confidence = this.calculateConfidence(crimeType)
    const riskLevel = this.determineRiskLevel(probability, confidence)
    
    // Generate location based on real city areas
    const areaData = getRandomAreaForCity(city) || { name: 'Unknown Area', coordinates: { lat: 0, lng: 0 }, type: 'residential' }
    const location = areaData.name
    const coordinates = areaData.coordinates
    
    // Calculate police needed based on crime type and historical data
    const policeNeeded = this.calculatePoliceNeeded(crimeType)
    
    // Generate contributing factors
    const factors = this.generateFactors(futureTime, crimeType, location)

    return {
      id: `pred_${index + 1}_${Date.now()}`,
      date: futureTime.toLocaleDateString(),
      time: futureTime.toLocaleTimeString(),
      crimeType,
      location,
      coordinates,
      probability,
      confidence,
      victimAge: this.getRandomAgeFromRange(ageRange),
      victimGender: gender,
      weapon,
      policeNeeded,
      riskLevel,
      factors
    }
  }

  private extractHour(timeStr: string): string {
    try {
      const time = new Date(`2000-01-01 ${timeStr}`)
      return time.getHours().toString()
    } catch {
      return Math.floor(Math.random() * 24).toString()
    }
  }

  private extractDayOfWeek(dateStr: string): string {
    try {
      const date = new Date(dateStr)
      return date.getDay().toString()
    } catch {
      return Math.floor(Math.random() * 7).toString()
    }
  }

  private getAgeRange(age: number): string {
    if (age < 18) return '0-17'
    if (age < 30) return '18-29'
    if (age < 45) return '30-44'
    if (age < 60) return '45-59'
    return '60+'
  }

  private selectWeightedRandom(distribution: { [key: string]: number }): string {
    const items = Object.keys(distribution)
    const weights = Object.values(distribution)
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    
    let random = Math.random() * totalWeight
    for (let i = 0; i < items.length; i++) {
      random -= weights[i]
      if (random <= 0) {
        return items[i]
      }
    }
    return items[items.length - 1]
  }

  private getWeightedTimeOffset(): number {
    // Weighted towards evening/night hours (higher crime probability)
    const hour = new Date().getHours()
    const eveningWeight = hour >= 18 || hour <= 6 ? 0.7 : 0.3
    const randomHours = Math.random() * 24 * 60 * 60 * 1000
    
    return eveningWeight > 0.5 ? randomHours * 0.8 : randomHours
  }

  private calculateProbability(time: Date, crimeType: string): number {
    const hour = time.getHours()
    const dayOfWeek = time.getDay()
    
    // Base probability from crime type frequency
    const typeFreq = this.patterns.crimeTypeFrequency[crimeType] || 1
    const totalCrimes = Object.values(this.patterns.crimeTypeFrequency).reduce((sum, freq) => sum + freq, 0)
    const baseProb = typeFreq / totalCrimes
    
    // Time-based multiplier
    let timeMultiplier = 1
    if (hour >= 18 || hour <= 6) timeMultiplier = 1.5 // Evening/night
    else if (hour >= 12 && hour <= 17) timeMultiplier = 1.2 // Afternoon
    else timeMultiplier = 0.8 // Morning
    
    // Day-based multiplier
    let dayMultiplier = 1
    if (dayOfWeek === 5 || dayOfWeek === 6) dayMultiplier = 1.3 // Weekend
    else if (dayOfWeek === 0) dayMultiplier = 1.1 // Sunday
    
    return Math.min(0.95, baseProb * timeMultiplier * dayMultiplier * 10)
  }

  private calculateConfidence(crimeType: string): number {
    const typeFreq = this.patterns.crimeTypeFrequency[crimeType] || 1
    const totalCrimes = Object.values(this.patterns.crimeTypeFrequency).reduce((sum, freq) => sum + freq, 0)
    const frequency = typeFreq / totalCrimes
    
    // Higher confidence for more frequent crime types
    return Math.min(0.9, 0.3 + frequency * 0.6)
  }

  private determineRiskLevel(probability: number, confidence: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const riskScore = probability * confidence
    if (riskScore >= 0.7) return 'CRITICAL'
    if (riskScore >= 0.5) return 'HIGH'
    if (riskScore >= 0.3) return 'MEDIUM'
    return 'LOW'
  }

  private generateLocation(): string {
    const locations = [
      'Downtown Commercial District',
      'Residential Area - North',
      'Residential Area - South', 
      'Industrial Zone',
      'Market Square',
      'Public Park',
      'Transportation Hub',
      'Educational District',
      'Healthcare District',
      'Entertainment Quarter'
    ]
    return locations[Math.floor(Math.random() * locations.length)]
  }

  private calculatePoliceNeeded(crimeType: string): number {
    const violentCrimes = ['HOMICIDE', 'ASSAULT', 'ROBBERY', 'KIDNAPPING']
    const isViolent = violentCrimes.some(violent => crimeType.includes(violent))
    
    if (isViolent) return Math.floor(Math.random() * 8) + 8 // 8-15 officers
    return Math.floor(Math.random() * 5) + 3 // 3-7 officers
  }

  private generateFactors(time: Date, crimeType: string, location: string): string[] {
    const factors = []
    
    const hour = time.getHours()
    if (hour >= 18 || hour <= 6) factors.push('Night time activity')
    if (hour >= 12 && hour <= 17) factors.push('Daylight hours')
    
    const dayOfWeek = time.getDay()
    if (dayOfWeek === 5 || dayOfWeek === 6) factors.push('Weekend pattern')
    
    if (crimeType.includes('HOMICIDE') || crimeType.includes('ASSAULT')) {
      factors.push('Violent crime pattern')
    }
    
    if (location.includes('Commercial') || location.includes('Market')) {
      factors.push('High-traffic area')
    }
    
    if (location.includes('Residential')) {
      factors.push('Residential vulnerability')
    }
    
    factors.push('Historical pattern match')
    factors.push('Statistical probability')
    
    return factors
  }

  private getRandomAgeFromRange(ageRange: string): number {
    switch (ageRange) {
      case '0-17': return Math.floor(Math.random() * 18)
      case '18-29': return Math.floor(Math.random() * 12) + 18
      case '30-44': return Math.floor(Math.random() * 15) + 30
      case '45-59': return Math.floor(Math.random() * 15) + 45
      case '60+': return Math.floor(Math.random() * 20) + 60
      default: return 30
    }
  }
}

export { CrimePredictor, type Prediction, type CrimePatterns }
