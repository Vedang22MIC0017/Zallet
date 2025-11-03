'use client'

import React, { useEffect, useRef } from 'react'

const MacDots = () => (
  <div className="flex items-center gap-2">
    <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
    <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
  </div>
)

interface GlassWindowProps {
  children: React.ReactNode
  className?: string
  title?: string
  showHeader?: boolean
}

const GlassWindow: React.FC<GlassWindowProps> = ({ 
  children, 
  className = "", 
  title,
  showHeader = true 
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    // Add entrance animation
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    
    const timer = setTimeout(() => {
      el.style.transition = 'all 0.6s ease-out'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`relative w-full max-w-6xl mx-auto rounded-2xl border border-green-400/20 bg-black/30 backdrop-blur-md shadow-[0_8px_32px_rgba(0,255,0,0.1)] overflow-hidden ${
        className
      }`}
    >
      {showHeader && (
        <>
          <div className="flex items-center justify-between h-12 px-4 bg-black/40 border-b border-green-400/20">
            <MacDots />
            {title && (
              <div className="flex-1 text-center">
                <h3 className="text-sm font-medium text-green-400">{title}</h3>
              </div>
            )}
            <div className="w-16 h-2 rounded-full bg-green-400/20" />
          </div>
        </>
      )}
      
      <div ref={contentRef} className="relative p-6 md:p-8">
        {children}
      </div>
    </div>
  )
}

export default GlassWindow
