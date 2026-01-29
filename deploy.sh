#!/bin/bash

# Install Vercel CLI
npm install -g vercel

# Vercel deployment script
echo "Deploying CryptoTracker Pro to Vercel"

# Build the project
npm run build

# Deploy to Vercel
vercel deploy --prod \
  --name crypto-tracker-pro \
  --confirm \
  --env VITE_BLOCKCHAIN_API_KEY=$VITE_BLOCKCHAIN_API_KEY

# Output deployment URL
echo "Deployment complete!"