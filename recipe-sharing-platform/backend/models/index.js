const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');

// Define relationships
User.hasMany(Recipe, { foreignKey: 'author_id' });
Recipe.belongsTo(User, { foreignKey: 'author_id' });

Recipe.hasMany(Ingredient, { foreignKey: 'recipe_id' });
Ingredient.belongsTo(Recipe, { foreignKey: 'recipe_id' });

module.exports = { User, Recipe, Ingredient };
