'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import MatrixRain from '@/components/MatrixRain'
import CitySelector from '@/components/CitySelector'
import PredictionResults from '@/components/PredictionResults'
import GlassWindow from '@/components/GlassWindow'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Analytics from '@/components/Analytics'
import Settings from '@/components/Settings'
import { Brain, Shield, AlertTriangle, TrendingUp, Users, MapPin } from 'lucide-react'
import {CarouselPlugin} from "@/components/cardAuto";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Services from"@/components/Services";

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


export default function Home() {
  const [selectedCity, setSelectedCity] = useState('')
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Handle navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1)
      setActiveSection(hash || 'home')
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // Initial call

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleCitySelect = async (city: string) => {
    setSelectedCity(city)
    setIsLoading(true)
    setShowResults(false)

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      })

      if (response.ok) {
        const data = await response.json()
        setPredictions(data.predictions)
        setShowResults(true)
      } else {
        console.error('Failed to fetch predictions')
      }
    } catch (error) {
      console.error('Error fetching predictions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <GlassWindow title="Safeguard Your Future With An" className="mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-green-400/20 rounded-2xl">
                      <Brain className="h-12 w-12 text-green-400" />
                    </div>
                    <div className="p-4 bg-blue-400/20 rounded-2xl">
                      <TrendingUp className="h-12 w-12 text-blue-400" />
                    </div>
                    <div className="p-4 bg-purple-400/20 rounded-2xl">
                      <Shield className="h-12 w-12 text-purple-400" />
                    </div>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-green-400">AI-Powered</span>{' '}
                  <span className="text-white">Crime</span>{' '}
                  <span className="text-blue-400">Prediction</span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                  We use advanced machine learning algorithms to analyze historical crime patterns to predict 
                  potential incidents in Indian cities. Get real-time forecasts for the next 24 hours 
                  with detailed risk assessments and prevention strategies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center p-6 bg-green-400/10 rounded-xl border border-green-400/20">
                    <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">40,000+ Records</h3>
                    <p className="text-gray-400 text-sm">Analyzed crime data from major Indian cities</p>
                  </div>
                  <div className="text-center p-6 bg-blue-400/10 rounded-xl border border-blue-400/20">
                    <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">ML Algorithms</h3>
                    <p className="text-gray-400 text-sm">Advanced pattern recognition and statistical analysis</p>
                  </div>
                  <div className="text-center p-6 bg-purple-400/10 rounded-xl border border-purple-400/20">
                    <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Real-time Predictions</h3>
                    <p className="text-gray-400 text-sm">24-hour forecasts with location and risk analysis</p>
                  </div>
                </div>
              </div>
              
            </GlassWindow>
            <CarouselPlugin/>
            <Services/>
            <FAQ/>
            <Contact/>

          </>
        )
        

      case 'predictions':
        return (
          <>
            <GlassWindow title="Select City for Analysis" className="mb-8">
              <CitySelector onCitySelect={handleCitySelect} />
            </GlassWindow>

            {isLoading && (
              <GlassWindow title="Processing Analysis" className="mb-8">
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                  <span className="ml-3 text-white">Analyzing crime patterns...</span>
                </div>
              </GlassWindow>
            )}

            {showResults && predictions.length > 0 && (
              <div className="mb-8">
                <PredictionResults 
                  city={selectedCity}
                  predictions={predictions}
                  isLoading={isLoading}
                />
              </div>
            )}

            {showResults && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowResults(false)
                    setSelectedCity('')
                    setPredictions([])
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-black font-semibold rounded-xl hover:from-green-300 hover:to-blue-400 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  ← Select Different City
                </button>
              </div>
            )}
          </>
        )

      case 'analytics':
        return <Analytics />

      case 'settings':
        return <Settings />

      default:
        return null
    }
  }

  return (
    <main className="min-h-screen relative">
      <MatrixRain />
      <Navbar />
      
      
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-8">
        {renderContent()}
        <br/>
        <Footer />
        
      </div>
    </main>
  )
}