'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Shield, User, Zap, AlertTriangle } from 'lucide-react'
import GlassWindow from './GlassWindow'
import GoogleMap from './GoogleMap'
import { getCityLocation } from '../lib/city-locations'

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

interface PredictionResultsProps {
  city: string
  predictions: Prediction[]
  isLoading?: boolean
}

const PredictionResults = ({ city, predictions, isLoading }: PredictionResultsProps) => {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null)

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL': return 'text-red-400'
      case 'HIGH': return 'text-orange-400'
      case 'MEDIUM': return 'text-yellow-400'
      case 'LOW': return 'text-green-400'
      default: return 'text-green-400'
    }
  }

  const getRiskBg = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL': return 'bg-red-400/20 border-red-400'
      case 'HIGH': return 'bg-orange-400/20 border-orange-400'
      case 'MEDIUM': return 'bg-yellow-400/20 border-yellow-400'
      case 'LOW': return 'bg-green-400/20 border-green-400'
      default: return 'bg-green-400/20 border-green-400'
    }
  }

  if (isLoading) {
    return (
      <GlassWindow title="Processing Analysis" className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span className="ml-3 text-white">Analyzing crime patterns...</span>
        </div>
      </GlassWindow>
    )
  }

  const cityLocation = getCityLocation(city)
  const mapMarkers = predictions.map(pred => ({
    position: pred.coordinates,
    title: pred.crimeType,
    description: `${pred.location} - ${pred.date} ${pred.time}`,
    riskLevel: pred.riskLevel
  }))

  return (
    <GlassWindow title={`Crime Predictions for ${city}`} className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Crime Predictions for {city}
        </h2>
        <p className="text-gray-400">
          Next 24 Hours • {predictions.length} predictions • {cityLocation?.areas.length || 0} areas analyzed
        </p>
      </div>

      {/* Map Section */}
      {cityLocation && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Prediction Map</h3>
          <GoogleMap
            center={cityLocation.coordinates}
            zoom={12}
            markers={mapMarkers}
            className="h-96 w-full"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Predicted Incidents</h3>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {predictions.map((prediction) => (
              <div
                key={prediction.id}
                onClick={() => setSelectedPrediction(prediction)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:glow ${
                  selectedPrediction?.id === prediction.id
                    ? 'glow bg-green-400/30'
                    : 'bg-black/50 border-green-400/50 hover:bg-green-400/10'
                }`}
              >
                <div className="flex justify-between items-start mb-2 h-full">
                  <h4 className="font-semibold text-green-400">{prediction.crimeType}</h4>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getRiskBg(prediction.riskLevel)} ${getRiskColor(prediction.riskLevel)}`}>
                      {prediction.riskLevel}
                    </span>
                    <span className="text-xs text-green-600">
                      {Math.round(prediction.probability * 100)}% prob
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-green-600 mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {prediction.date}
                  <Clock className="h-4 w-4 ml-3 mr-1" />
                  {prediction.time}
                </div>
                
                <div className="flex items-center text-sm text-green-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {prediction.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Prediction Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Prediction Details</h3>
          {selectedPrediction ? (
            <div className="glass rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold text-green-400">{selectedPrediction.crimeType}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRiskBg(selectedPrediction.riskLevel)} ${getRiskColor(selectedPrediction.riskLevel)}`}>
                    {Math.round(selectedPrediction.probability * 100)}% Probability
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <p className="text-sm text-green-600">Date</p>
                      <p className="font-semibold">{selectedPrediction.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <p className="text-sm text-green-600">Time</p>
                      <p className="font-semibold">{selectedPrediction.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <p className="text-sm text-green-600">Location</p>
                      <p className="font-semibold">{selectedPrediction.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-400 mr-2" />
                    <div>
                      <p className="text-sm text-green-600">Police Needed</p>
                      <p className="font-semibold">{selectedPrediction.policeNeeded} units</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-green-400/30 pt-4">
                  <h5 className="font-semibold text-white mb-2">Victim Profile</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-sm text-white">Age: {selectedPrediction.victimAge}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-white">Gender: {selectedPrediction.victimGender}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-green-400/30 pt-4">
                  <h5 className="font-semibold text-white mb-2">Weapon Used</h5>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-red-400 mr-2" />
                    <span className="text-white">{selectedPrediction.weapon}</span>
                  </div>
                </div>

                <div className="border-t border-green-400/30 pt-4">
                  <h5 className="font-semibold text-white mb-2">Prediction Reasoning</h5>
                  <div className="p-3 bg-black/40 rounded-lg border border-green-400/30">
                    <p className="text-gray-300 text-sm">
                      This prediction is based on historical patterns showing that {selectedPrediction.crimeType.toLowerCase()} 
                      incidents are {selectedPrediction.probability > 0.7 ? 'frequently' : selectedPrediction.probability > 0.5 ? 'commonly' : 'occasionally'} 
                      reported in {selectedPrediction.location} during {selectedPrediction.time} on {selectedPrediction.date}. 
                      The model identified similar patterns in the training data where {selectedPrediction.victimGender.toLowerCase()} victims 
                      aged {selectedPrediction.victimAge} were targeted using {selectedPrediction.weapon.toLowerCase()}. 
                      The risk level is classified as {selectedPrediction.riskLevel} based on the combination of temporal, 
                      spatial, and demographic factors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-lg p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <p className="text-green-600">Select a prediction to view details</p>
            </div>
          )}
        </div>
      </div>
    </GlassWindow>
  )
}

export default PredictionResults
