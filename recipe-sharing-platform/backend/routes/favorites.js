const express = require('express');
const { User, Recipe } = require('../models/index');

const router = express.Router();

// Add a favorite
router.post('/:userId/favorites/:recipeId', async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        const user = await User.findByPk(userId);
        const recipe = await Recipe.findByPk(recipeId);

        if (user && recipe) {
            await user.addRecipe(recipe);
            res.status(200).json({ message: 'Recipe added to favorites!' });
        } else {
            res.status(404).json({ message: 'User or Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove a favorite
router.delete('/:userId/favorites/:recipeId', async (req, res) => {
    try {
        const { userId, recipeId } = req.params;
        const user = await User.findByPk(userId);
        const recipe = await Recipe.findByPk(recipeId);

        if (user && recipe) {
            await user.removeRecipe(recipe);
            res.status(200).json({ message: 'Recipe removed from favorites!' });
        } else {
            res.status(404).json({ message: 'User or Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a user's favorites
router.get('/:userId/favorites', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId, { include: Recipe });

        if (user) {
            res.status(200).json(user.Recipes);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;