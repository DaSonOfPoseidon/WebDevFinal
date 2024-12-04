const express = require('express');
const { Ingredient } = require('../models/index');

const router = express.Router();

// Get all ingredients (optional: include recipe info)
router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single ingredient by ID
router.get('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }

        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    const { name, quantity } = req.body;
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }

        await ingredient.update({ name, quantity });
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);

        if (!ingredient) {
            return res.status(404).json({ error: 'Ingredient not found' });
        }

        await ingredient.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;