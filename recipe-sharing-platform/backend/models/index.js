const User = require('./user');
const Recipe = require('./recipe');
const Ingredient = require('./ingredient');
const Favorite = require('./favorite');

// Define relationships
User.hasMany(Recipe, { foreignKey: 'author_id' });
Recipe.belongsTo(User, { foreignKey: 'author_id' });

Recipe.hasMany(Ingredient, { foreignKey: 'recipe_id' });
Ingredient.belongsTo(Recipe, { foreignKey: 'recipe_id' });

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'user_id', onDelete: 'CASCADE' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'recipe_id', onDelete: 'CASCADE' });

module.exports = { User, Recipe, Ingredient, Favorite };