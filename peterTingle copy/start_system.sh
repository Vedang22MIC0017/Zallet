#!/bin/bash

# PeterTingle Crime Prediction System Startup Script
# This script starts both the ML backend and frontend

echo "🚀 Starting PeterTingle Crime Prediction System"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to wait for service to be ready
wait_for_service() {
    local url=$1
    local service_name=$2
    local max_attempts=30
    local attempt=1
    
    echo -e "${YELLOW}Waiting for $service_name to be ready...${NC}"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $service_name is ready!${NC}"
            return 0
        fi
        
        echo -e "${YELLOW}Attempt $attempt/$max_attempts - $service_name not ready yet...${NC}"
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo -e "${RED}❌ $service_name failed to start after $max_attempts attempts${NC}"
    return 1
}

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python3 is not installed. Please install Python 3.8+ first.${NC}"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${BLUE}📋 System Requirements Check:${NC}"
echo -e "${GREEN}✅ Python3: $(python3 --version)${NC}"
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
fi

# Check if ML backend directory exists
if [ ! -d "ml_backend" ]; then
    echo -e "${RED}❌ ML backend directory not found${NC}"
    exit 1
fi

# Start ML Backend
echo -e "${BLUE}🤖 Starting ML Backend...${NC}"
cd ml_backend

# Check if port 8000 is available
if check_port 8000; then
    echo -e "${YELLOW}⚠️  Port 8000 is already in use. Trying to use existing ML backend...${NC}"
    if wait_for_service "http://localhost:8000/health" "ML Backend"; then
        echo -e "${GREEN}✅ Using existing ML Backend${NC}"
        cd ..
    else
        echo -e "${RED}❌ ML Backend on port 8000 is not responding${NC}"
        exit 1
    fi
else
    # Start ML backend in background
    echo -e "${YELLOW}🚀 Starting ML Backend server...${NC}"
    python3 simple_backend.py &
    ML_BACKEND_PID=$!
    
    # Wait for ML backend to be ready
    if wait_for_service "http://localhost:8000/health" "ML Backend"; then
        echo -e "${GREEN}✅ ML Backend started successfully (PID: $ML_BACKEND_PID)${NC}"
    else
        echo -e "${RED}❌ Failed to start ML Backend${NC}"
        kill $ML_BACKEND_PID 2>/dev/null
        exit 1
    fi
    
    cd ..
fi

# Start Frontend
echo -e "${BLUE}🌐 Starting Frontend...${NC}"

# Check if port 3000 or 3001 is available
FRONTEND_PORT=3000
if check_port 3000; then
    if check_port 3001; then
        echo -e "${RED}❌ Both ports 3000 and 3001 are in use${NC}"
        exit 1
    else
        FRONTEND_PORT=3001
        echo -e "${YELLOW}⚠️  Port 3000 is in use, using port 3001${NC}"
    fi
fi

# Start frontend in background
echo -e "${YELLOW}🚀 Starting Frontend server...${NC}"
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to be ready
FRONTEND_URL="http://localhost:$FRONTEND_PORT"
if wait_for_service "$FRONTEND_URL" "Frontend"; then
    echo -e "${GREEN}✅ Frontend started successfully (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Failed to start Frontend${NC}"
    kill $FRONTEND_PID 2>/dev/null
    kill $ML_BACKEND_PID 2>/dev/null
    exit 1
fi

# Display system information
echo ""
echo -e "${GREEN}🎉 PeterTingle Crime Prediction System is now running!${NC}"
echo "=============================================="
echo -e "${BLUE}📊 ML Backend API:${NC} http://localhost:8000"
echo -e "${BLUE}📚 API Documentation:${NC} http://localhost:8000/docs"
echo -e "${BLUE}🌐 Frontend Application:${NC} $FRONTEND_URL"
echo -e "${BLUE}🔍 Health Check:${NC} http://localhost:8000/health"
echo ""
echo -e "${YELLOW}💡 Tips:${NC}"
echo "• Use the frontend to select cities and get predictions"
echo "• Check the API docs for direct API access"
echo "• The system uses real ML models for accurate predictions"
echo ""
echo -e "${YELLOW}🛑 To stop the system:${NC}"
echo "• Press Ctrl+C in this terminal"
echo "• Or run: kill $ML_BACKEND_PID $FRONTEND_PID"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down PeterTingle system...${NC}"
    
    if [ ! -z "$ML_BACKEND_PID" ]; then
        echo -e "${YELLOW}Stopping ML Backend (PID: $ML_BACKEND_PID)...${NC}"
        kill $ML_BACKEND_PID 2>/dev/null
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo -e "${YELLOW}Stopping Frontend (PID: $FRONTEND_PID)...${NC}"
        kill $FRONTEND_PID 2>/dev/null
    fi
    
    echo -e "${GREEN}✅ System stopped successfully${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Keep the script running
echo -e "${GREEN}🔄 System is running. Press Ctrl+C to stop.${NC}"
wait

