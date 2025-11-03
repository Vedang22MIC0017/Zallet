'use client'

import { Brain, Shield, Mail, Github, Twitter, Linkedin } from 'lucide-react'
import GlassWindow from './GlassWindow'

const Footer = () => {
  return (
    <GlassWindow>
    <footer className="bg-black/90 backdrop-blur-md border-t border-green-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-400/20 rounded-lg">
                <Brain className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">PeterTingle</span>
                <span className="text-sm text-gray-400">Crime Prediction System</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md mb-6">
              Advanced AI-powered crime prediction system using machine learning algorithms 
              to analyze historical patterns and provide real-time forecasts for Indian cities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#predictions" className="text-gray-400 hover:text-white transition-colors text-sm">Predictions</a></li>
              <li><a href="#analytics" className="text-gray-400 hover:text-white transition-colors text-sm">Analytics</a></li>
              <li><a href="#settings" className="text-gray-400 hover:text-white transition-colors text-sm">Settings</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">support@petertingle.com</li>
              <li className="text-gray-400 text-sm">+91 6263387913</li>
              <li className="text-gray-400 text-sm">Vellore, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-400/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
              <Shield className="w-4 h-4" />
              <span>© 2024 PeterTingle Designed by 0017.</span>
              
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </GlassWindow>
  )
}

export default Footer

