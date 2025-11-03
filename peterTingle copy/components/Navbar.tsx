'use client'

import { useState, useEffect } from 'react'
import { Brain, Shield, Menu, X, Home, BarChart3, Settings, User } from 'lucide-react'
import Image from 'next/image'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'Predictions', href: '#predictions', icon: BarChart3 },
    { name: 'Analytics', href: '#analytics', icon: BarChart3 },
    { name: 'Settings', href: '#settings', icon: Settings },
  ]

  const handleNavClick = (href: string) => {
    window.location.hash = href
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-green-400/20' 
        : 'bg-black/70 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-400/20 rounded-lg">
              <Brain className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">PeterTingle</span>
              <span className="text-xs text-gray-400">Crime Prediction System</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center space-x-2 text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="w-5 h-5" />
              <span className="text-sm">Admin</span>
            </div>
            <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-400" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-green-400 focus:outline-none focus:text-green-400"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-md border-t border-green-400/20">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center space-x-2 text-white hover:text-green-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-left"
                  >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              )
            })}
            <div className="pt-4 border-t border-green-400/20">
              <div className="flex items-center space-x-2 px-3 py-2 text-white">
                <User className="w-5 h-5" />
                <span>Admin User</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
