import React, { useState, useEffect } from 'react';
import { fetchRecipeById } from '../api';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams(); // Get the recipe ID from the URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const { data } = await fetchRecipeById(id);
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        getRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>Bake Time: {recipe.bake_time || 'N/A'}</p>
            <h2>Ingredients</h2>
            <ul>
                {recipe.Ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetails;
