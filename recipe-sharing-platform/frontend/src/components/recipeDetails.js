import React, { useState, useEffect } from 'react';
import { fetchRecipeById } from '../api';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (err) {
                console.error('Error fetching recipe:', err);
                setError('Failed to load recipe. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <p>Loading recipe...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p><strong>Bake Time:</strong> {recipe.bake_time || 'N/A'}</p>
            <h2>Ingredients</h2>
            <ul>
                {recipe.Ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.amount} {ingredient.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default RecipeDetails;
