const express = require('express');
const sequelize = require('./db');
const { User, Recipe } = require('./models/index');

const app = express();
app.use(express.json());

// Sync database and start server
sequelize.sync({ alter: true }) // Use `alter: true` to update existing tables; `force: true` for development resets
    .then(() => {
        console.log('Database synced!');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.error('Error syncing database:', err));
