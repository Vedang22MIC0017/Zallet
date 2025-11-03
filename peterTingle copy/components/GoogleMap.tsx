'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

// Declare google namespace for TypeScript
declare global {
  interface Window {
    google: any
  }
}

interface GoogleMapProps {
  center: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{
    position: { lat: number; lng: number }
    title: string
    description?: string
    riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }>
  className?: string
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  center, 
  zoom = 12, 
  markers = [], 
  className = '' 
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
          version: 'weekly',
          libraries: ['places']
        })

        const { Map } = await loader.importLibrary('maps')
        
        if (mapRef.current) {
          const mapInstance = new (Map as any)(mapRef.current, {
            center,
            zoom,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#242f3e' }]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
              },
              {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{ color: '#242f3e' }]
              },
              {
                featureType: 'labels.text.fill',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#8ec3b9' }]
              },
              {
                featureType: 'labels.text.stroke',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#1a3646' }]
              }
            ]
          })
          
          setMap(mapInstance)
          setIsLoading(false)
        }
      } catch (err) {
        console.error('Error loading Google Maps:', err)
        setError('Failed to load map')
        setIsLoading(false)
      }
    }

    initMap()
  }, [center, zoom])

  useEffect(() => {
    if (map && markers.length > 0) {
      // Clear existing markers
      const existingMarkers = document.querySelectorAll('.crime-marker')
      existingMarkers.forEach(marker => marker.remove())

      markers.forEach((markerData) => {
        const marker = new (window.google?.maps?.Marker as any)({
          position: markerData.position,
          map,
          title: markerData.title,
          icon: {
            url: getMarkerIcon(markerData.riskLevel || 'LOW'),
            scaledSize: new (window.google?.maps?.Size as any)(32, 32)
          }
        })

        const infoWindow = new (window.google?.maps?.InfoWindow as any)({
          content: `
            <div class="p-2 text-black">
              <h3 class="font-bold text-lg">${markerData.title}</h3>
              ${markerData.description ? `<p class="text-sm mt-1">${markerData.description}</p>` : ''}
              ${markerData.riskLevel ? `<p class="text-sm mt-1 font-semibold text-${getRiskColor(markerData.riskLevel)}">Risk: ${markerData.riskLevel}</p>` : ''}
            </div>
          `
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })
      })
    }
  }, [map, markers])

  const getMarkerIcon = (riskLevel: string) => {
    const colors = {
      'LOW': '#10B981', // green
      'MEDIUM': '#F59E0B', // yellow
      'HIGH': '#EF4444', // red
      'CRITICAL': '#DC2626' // dark red
    }
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${colors[riskLevel as keyof typeof colors] || colors.LOW}" stroke="white" stroke-width="2"/>
        <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">!</text>
      </svg>
    `)}`
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'CRITICAL': return 'red-600'
      case 'HIGH': return 'red-500'
      case 'MEDIUM': return 'yellow-500'
      case 'LOW': return 'green-500'
      default: return 'green-500'
    }
  }

  if (error) {
    return (
      <div className={`bg-gray-800 rounded-lg p-8 text-center ${className}`}>
        <p className="text-red-400">Error loading map: {error}</p>
        <p className="text-gray-400 text-sm mt-2">Please check your Google Maps API key</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
          <span className="ml-3 text-green-400">Loading map...</span>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full rounded-lg" style={{ minHeight: '400px' }} />
    </div>
  )
}

export default GoogleMap
