import React, { useState, useEffect } from 'react';
import { fetchRecipeById } from '../api';
import './RecipePage.css';

const RecipePage = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetchRecipeById(recipeId); // Fetch the recipe data from the API
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load recipe.');
        setLoading(false);
      }
    };

    getRecipe();

  }, [recipeId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if fail
  }

  return (
    <div className="recipe-page">
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps:</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipePage;
