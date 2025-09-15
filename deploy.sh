#!/bin/bash

# Build and Deploy Script for Home Project
# This script builds the project and deploys it to production (GitHub Pages)

set -e  # Exit on any error

echo "🚀 Starting build and deployment process..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔨 Building project (predeploy)..."
npm run predeploy

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Deploying to production..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "Your site should be available shortly at your GitHub Pages URL."
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

echo "✨ All done!"
