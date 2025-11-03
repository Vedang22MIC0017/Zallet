'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin } from 'lucide-react'

interface City {
  name: string
  crimeCount: number
}

interface CitySelectorProps {
  onCitySelect: (city: string) => void
  isLoading?: boolean
}

const CitySelector = ({ onCitySelect, isLoading }: CitySelectorProps) => {
  const [cities, setCities] = useState<City[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/cities')
      const data = await response.json()
      setCities(data.cities)
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName)
    onCitySelect(cityName)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        <span className="ml-3 text-white">Loading cities...</span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your City</h2>
        <p className="text-gray-400">Select a city to analyze crime patterns and get predictions</p>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      <div className="max-h-60 overflow-y-auto">
        {filteredCities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCitySelect(city.name)}
            disabled={isLoading}
            className={`w-full text-left p-4 rounded-xl mb-3 transition-all duration-200 ${
              selectedCity === city.name
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-black shadow-lg transform scale-105'
                : 'bg-black/30 border border-green-400/30 text-white hover:bg-green-400/20 hover:border-green-400 hover:transform hover:scale-102'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{city.name}</span>
              <span className="text-sm opacity-75">
                {city.crimeCount} incidents
              </span>
            </div>
          </button>
        ))}
      </div>

      {filteredCities.length === 0 && searchTerm && (
        <p className="text-center text-green-600 mt-4">
          No cities found matching "{searchTerm}"
        </p>
      )}
    </div>
  )
}

export default CitySelector
