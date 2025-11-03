#!/usr/bin/env python3
"""
Script to run the ML backend server
"""

import subprocess
import sys
import os
from pathlib import Path

def install_requirements():
    """Install required packages"""
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Requirements installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def run_server():
    """Run the FastAPI server"""
    print("Starting ML backend server...")
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--host", "0.0.0.0", 
            "--port", "8000", 
            "--reload"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except Exception as e:
        print(f"❌ Error running server: {e}")

def main():
    """Main function"""
    print("🚀 PeterTingle ML Backend Setup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("requirements.txt"):
        print("❌ requirements.txt not found. Please run this script from the ml_backend directory.")
        return
    
    # Install requirements
    if not install_requirements():
        return
    
    print("\n🌐 Starting server at http://localhost:8000")
    print("📚 API documentation at http://localhost:8000/docs")
    print("🔍 Health check at http://localhost:8000/health")
    print("\nPress Ctrl+C to stop the server")
    print("=" * 40)
    
    # Run server
    run_server()

if __name__ == "__main__":
    main()
