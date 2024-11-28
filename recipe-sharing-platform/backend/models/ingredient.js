const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ingredient = sequelize.define('Ingredient', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.STRING,
    },
    unit: {
        type: DataTypes.STRING,
    },
});

module.exports = Ingredient;