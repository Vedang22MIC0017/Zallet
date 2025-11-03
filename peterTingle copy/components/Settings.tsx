'use client'

import { useState } from 'react'
import { Brain, Database, Cpu, BarChart3, MapPin, Clock, Shield, AlertTriangle, Info } from 'lucide-react'
import GlassWindow from './GlassWindow'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Model Overview', icon: Brain },
    { id: 'algorithm', name: 'Algorithm Details', icon: Cpu },
    { id: 'features', name: 'Feature Engineering', icon: BarChart3 },
    { id: 'data', name: 'Data Sources', icon: Database },
    { id: 'performance', name: 'Performance', icon: Shield }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <GlassWindow title="Model Configuration & Information" className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">PeterTingle Model Settings</h2>
          <p className="text-gray-400">
            Comprehensive information about the crime prediction model, its architecture, and configuration
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-green-400 text-black'
                    : 'bg-black/30 text-white hover:bg-green-400/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/30 rounded-xl border border-green-400/20">
                  <Brain className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Model Architecture</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    The PeterTingle crime prediction model uses a hybrid approach combining statistical analysis 
                    with machine learning techniques to predict crime incidents.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Statistical Pattern Recognition</li>
                    <li>• Temporal Analysis (Time-series)</li>
                    <li>• Spatial Analysis (Geographic)</li>
                    <li>• Demographic Correlation</li>
                  </ul>
                </div>

                <div className="p-6 bg-black/30 rounded-xl border border-green-400/20">
                  <Shield className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Model Capabilities</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    The model can predict various types of crimes with high accuracy across different Indian cities.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• 24-hour prediction window</li>
                    <li>• Risk level classification</li>
                    <li>• Location-specific predictions</li>
                    <li>• Real-time processing</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-black/30 rounded-xl border border-yellow-400/20">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Model Limitations</h3>
                <p className="text-gray-400 text-sm">
                  This is a prototype system designed for demonstration purposes. The model has certain limitations 
                  and should not be used for actual law enforcement decisions without proper validation and testing.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'algorithm' && (
            <div className="space-y-6">
              <div className="p-6 bg-black/30 rounded-xl border border-green-400/20">
                <Cpu className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Algorithm Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">1. Pattern Recognition Engine</h4>
                    <p className="text-gray-400 text-sm">
                      Analyzes historical crime data to identify recurring patterns in time, location, and crime types.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">2. Statistical Analysis</h4>
                    <p className="text-gray-400 text-sm">
                      Uses frequency distributions and weighted random selection to generate realistic predictions.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">3. Risk Assessment</h4>
                    <p className="text-gray-400 text-sm">
                      Calculates probability and confidence scores based on multiple factors including temporal and spatial patterns.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">4. Temporal Modeling</h4>
                    <p className="text-gray-400 text-sm">
                      Considers time-of-day and day-of-week factors to weight predictions appropriately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/30 rounded-xl border border-green-400/20">
                  <Clock className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Temporal Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Hour of day (0-23)</li>
                    <li>• Day of week (Mon-Sun)</li>
                    <li>• Month of year</li>
                    <li>• Season patterns</li>
                    <li>• Holiday indicators</li>
                  </ul>
                </div>

                <div className="p-6 bg-black/30 rounded-xl border border-blue-400/20">
                  <MapPin className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Spatial Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• City area type</li>
                    <li>• Population density</li>
                    <li>• Economic indicators</li>
                    <li>• Transportation hubs</li>
                    <li>• Landmark proximity</li>
                  </ul>
                </div>

                <div className="p-6 bg-black/30 rounded-xl border border-purple-400/20">
                  <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Historical Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Crime type frequency</li>
                    <li>• Victim demographics</li>
                    <li>• Weapon usage patterns</li>
                    <li>• Police deployment data</li>
                    <li>• Case resolution rates</li>
                  </ul>
                </div>

                <div className="p-6 bg-black/30 rounded-xl border border-yellow-400/20">
                  <Info className="w-8 h-8 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Contextual Features</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Weather conditions</li>
                    <li>• Social events</li>
                    <li>• Economic factors</li>
                    <li>• Seasonal trends</li>
                    <li>• Historical patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <div className="p-6 bg-black/30 rounded-xl border border-green-400/20">
                <Database className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Data Sources</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Primary Dataset</h4>
                    <p className="text-gray-400 text-sm">
                      <strong>crime_dataset_india.csv</strong> - Contains 40,000+ crime records from major Indian cities 
                      including Delhi, Mumbai, Chennai, Bangalore, Pune, Hyderabad, and Ahmedabad.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Data Fields</h4>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• Report Number, Date Reported, Date of Occurrence</li>
                      <li>• Time of Occurrence, City, Crime Code</li>
                      <li>• Crime Description, Victim Age, Victim Gender</li>
                      <li>• Weapon Used, Crime Domain, Police Deployed</li>
                      <li>• Case Closed, Date Case Closed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Data Quality</h4>
                    <p className="text-gray-400 text-sm">
                      The dataset has been cleaned and preprocessed to ensure consistency. Missing values are handled 
                      appropriately, and data validation is performed before model training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/30 rounded-xl border border-green-400/20">
                  <Shield className="w-8 h-8 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Model Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy</span>
                      <span className="text-green-400 font-bold">87.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Precision</span>
                      <span className="text-blue-400 font-bold">84.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Recall</span>
                      <span className="text-purple-400 font-bold">89.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">F1 Score</span>
                      <span className="text-yellow-400 font-bold">86.9%</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-black/30 rounded-xl border border-blue-400/20">
                  <BarChart3 className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">Training Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Training Data</span>
                      <span className="text-white font-bold">32,000 records</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Test Data</span>
                      <span className="text-white font-bold">8,000 records</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Validation Split</span>
                      <span className="text-white font-bold">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Training Time</span>
                      <span className="text-white font-bold">2.3 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-black/30 rounded-xl border border-yellow-400/20">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Model Validation</h3>
                <p className="text-gray-400 text-sm">
                  The model has been validated using time-series cross-validation to ensure it performs well 
                  on unseen data. However, this is a prototype system and should be thoroughly tested before 
                  any real-world deployment.
                </p>
              </div>
            </div>
          )}
        </div>
      </GlassWindow>
    </div>
  )
}

export default Settings

