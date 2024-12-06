const express = require('express');
const { Recipe, Ingredient } = require('../models/index');

const router = express.Router();

// Get all recipes (including ingredients)
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            include: Ingredient, // Include all associated ingredients
        });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single recipe by ID (including ingredients)
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findOne({
            where: { id: req.params.id },
            include: Ingredient, // Include ingredients for this recipe
        });

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ error: error.message });
    }
});

// Create a new recipe (with ingredients)
router.post('/', async (req, res) => {
    const { title, author_id, ingredients } = req.body; // Ingredients can be part of the payload
    try {
        const recipe = await Recipe.create({ title, author_id });

        // If ingredients are provided, create them
        if (ingredients && ingredients.length > 0) {
            const ingredientsData = ingredients.map((ingredient) => ({
                ...ingredient,
                recipe_id: recipe.id, // Link ingredients to the created recipe
            }));
            await Ingredient.bulkCreate(ingredientsData);
        }

        const createdRecipe = await Recipe.findOne({
            where: { id: recipe.id },
            include: Ingredient, // Fetch the recipe with its ingredients
        });

        res.status(201).json(createdRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a recipe (and optionally its ingredients)
router.put('/:id', async (req, res) => {
    const { title, author_id, ingredients } = req.body;
    try {
        const recipe = await Recipe.findByPk(req.params.id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Update the recipe
        await recipe.update({ title, author_id });

        // If ingredients are provided, update them
        if (ingredients && ingredients.length > 0) {
            // Delete existing ingredients for the recipe
            await Ingredient.destroy({ where: { recipe_id: recipe.id } });

            // Add the new ingredients
            const ingredientsData = ingredients.map((ingredient) => ({
                ...ingredient,
                recipe_id: recipe.id,
            }));
            await Ingredient.bulkCreate(ingredientsData);
        }

        const updatedRecipe = await Recipe.findOne({
            where: { id: recipe.id },
            include: Ingredient, // Fetch the updated recipe with its ingredients
        });

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a recipe (and its ingredients)
router.delete('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        // Delete the recipe (cascade delete handles ingredients if properly configured)
        await recipe.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;