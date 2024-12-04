#!/bin/bash

# Backend setup
mkdir backend
cd backend
mkdir models routes
touch server.js db.js .env
cd ..

# Frontend setup
mkdir frontend
cd frontend
npx create-react-app .
mkdir src/components src/pages
touch src/components/Header.jsx src/components/Footer.jsx
touch src/pages/HomePage.jsx src/pages/RecipePage.jsx
touch src/api.js
cd ..

# Confirm structure
echo "Project structure created successfully!"
