'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Target, AlertTriangle, CheckCircle, XCircle, Brain, Database } from 'lucide-react'
import GlassWindow from './GlassWindow'

const Analytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy')

  // Mock data for model performance metrics
  const modelMetrics = {
    accuracy: 87.3,
    precision: 84.7,
    recall: 89.2,
    f1Score: 86.9,
    auc: 91.5
  }

  const confusionMatrix = {
    truePositives: 1247,
    falsePositives: 156,
    trueNegatives: 2891,
    falseNegatives: 98
  }

  const featureImportance = [
    { name: 'Time of Day', importance: 0.24, color: 'bg-green-400' },
    { name: 'Day of Week', importance: 0.18, color: 'bg-blue-400' },
    { name: 'Historical Crime Rate', importance: 0.16, color: 'bg-purple-400' },
    { name: 'Location Type', importance: 0.14, color: 'bg-yellow-400' },
    { name: 'Weather Conditions', importance: 0.12, color: 'bg-red-400' },
    { name: 'Population Density', importance: 0.10, color: 'bg-pink-400' },
    { name: 'Economic Factors', importance: 0.06, color: 'bg-indigo-400' }
  ]

  const predictionAccuracy = [
    { city: 'Delhi', accuracy: 89.2, predictions: 1247 },
    { city: 'Mumbai', accuracy: 87.8, predictions: 1156 },
    { city: 'Chennai', accuracy: 85.4, predictions: 892 },
    { city: 'Bangalore', accuracy: 88.1, predictions: 1034 },
    { city: 'Pune', accuracy: 86.7, predictions: 756 },
    { city: 'Hyderabad', accuracy: 84.9, predictions: 623 },
    { city: 'Ahmedabad', accuracy: 87.3, predictions: 445 }
  ]

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-green-400'
    if (value >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getMetricBg = (value: number) => {
    if (value >= 90) return 'bg-green-400/20 border-green-400'
    if (value >= 80) return 'bg-yellow-400/20 border-yellow-400'
    return 'bg-red-400/20 border-red-400'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassWindow title="Model Performance Analytics" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Model Performance Analytics</h2>
          <p className="text-gray-400">
            Comprehensive evaluation of the PeterTingle crime prediction model performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {Object.entries(modelMetrics).map(([metric, value]) => (
            <div key={metric} className="text-center p-6 bg-black/30 rounded-xl border border-green-400/20">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${getMetricBg(value)}`}>
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 capitalize">
                {metric === 'f1Score' ? 'F1 Score' : metric === 'auc' ? 'AUC' : metric}
              </h3>
              <p className={`text-2xl font-bold ${getMetricColor(value)}`}>
                {value}%
              </p>
            </div>
          ))}
        </div>

        {/* Confusion Matrix */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="text-center p-4 bg-green-400/20 rounded-lg border border-green-400">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">True Positives</p>
              <p className="text-green-400 text-2xl font-bold">{confusionMatrix.truePositives}</p>
            </div>
            <div className="text-center p-4 bg-red-400/20 rounded-lg border border-red-400">
              <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <p className="text-white font-semibold">False Positives</p>
              <p className="text-red-400 text-2xl font-bold">{confusionMatrix.falsePositives}</p>
            </div>
            <div className="text-center p-4 bg-blue-400/20 rounded-lg border border-blue-400">
              <CheckCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">True Negatives</p>
              <p className="text-blue-400 text-2xl font-bold">{confusionMatrix.trueNegatives}</p>
            </div>
            <div className="text-center p-4 bg-yellow-400/20 rounded-lg border border-yellow-400">
              <XCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">False Negatives</p>
              <p className="text-yellow-400 text-2xl font-bold">{confusionMatrix.falseNegatives}</p>
            </div>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">Feature Importance</h3>
          <div className="space-y-4">
            {featureImportance.map((feature, index) => (
              <div key={feature.name} className="flex items-center space-x-4">
                <div className="w-32 text-white text-sm font-medium">{feature.name}</div>
                <div className="flex-1 bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${feature.color}`}
                    style={{ width: `${feature.importance * 100}%` }}
                  ></div>
                </div>
                <div className="w-16 text-white text-sm font-bold">
                  {(feature.importance * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City-wise Performance */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">City-wise Prediction Accuracy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predictionAccuracy.map((city) => (
              <div key={city.city} className="p-4 bg-black/30 rounded-lg border border-green-400/20">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-semibold">{city.city}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getMetricBg(city.accuracy)} ${getMetricColor(city.accuracy)}`}>
                    {city.accuracy}%
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Predictions: {city.predictions}</span>
                  <span>Accuracy: {city.accuracy}%</span>
                </div>
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${city.accuracy >= 87 ? 'bg-green-400' : city.accuracy >= 85 ? 'bg-yellow-400' : 'bg-red-400'}`}
                    style={{ width: `${city.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassWindow>

      {/* Model Statistics */}
      <GlassWindow title="Model Statistics" className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-black/30 rounded-xl border border-green-400/20">
            <Database className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Training Data</h3>
            <p className="text-3xl font-bold text-blue-400 mb-2">40,000+</p>
            <p className="text-gray-400 text-sm">Crime records analyzed</p>
          </div>
          
          <div className="text-center p-6 bg-black/30 rounded-xl border border-green-400/20">
            <Brain className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Model Features</h3>
            <p className="text-3xl font-bold text-green-400 mb-2">15+</p>
            <p className="text-gray-400 text-sm">Predictive features used</p>
          </div>
          
          <div className="text-center p-6 bg-black/30 rounded-xl border border-green-400/20">
            <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Prediction Horizon</h3>
            <p className="text-3xl font-bold text-purple-400 mb-2">24h</p>
            <p className="text-gray-400 text-sm">Future prediction window</p>
          </div>
        </div>
      </GlassWindow>
    </div>
  )
}

export default Analytics
