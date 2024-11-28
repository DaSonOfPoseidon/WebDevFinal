const fs = require('fs');
const path = require('path');
const sequelize = require('./db');
const express = require('express');

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = express();
app.use(express.json());

// Dynamically load all route files
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
    const route = require(path.join(routesPath, file));
    const routeName = file.split('.')[0]; // Use filename without extension as route prefix
    app.use(`/api/${routeName}`, route); // Mount the route (e.g., `/api/favorites`)
});

// Default route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }) // Use `alter: true` for dev, avoid in production
    .then(() => {
        console.log('Database synced!');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Error syncing database:', err));