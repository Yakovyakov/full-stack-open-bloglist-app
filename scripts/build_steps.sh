#!/bin/bash

echo "Build script"

# Step 1: Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
  echo "Error: Installing frontend dependencies...failed"
  exit 1
fi
echo "Installing frontend dependencies...OK"
# Step 2: Install backend dependencies
echo "Installing backend dependencies..."

cd ../backend

npm install --production
if [ $? -ne 0 ]; then
  echo "Error: Installing backend dependencies...failed"
  exit 1
fi
echo "Installing backend dependencies...OK"

cd ..
# Step 3: building
echo "Building..."
npm run build
if [ $? -ne 0 ]; then
  echo "Error: Building...failed"
  exit 1
fi
echo "Building...OK"

echo "Build script finish"


