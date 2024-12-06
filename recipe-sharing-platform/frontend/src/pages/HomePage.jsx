import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '../api';
import './HomePage.css';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetchRecipes(); // Fetch all recipes from the API
        setRecipes(response.data); // Store the recipes in state
        setLoading(false);
      } catch (err) {
        setError('Failed to load recipes.');
        setLoading(false);
      }
    };

    getRecipes();
  }, []);  // This hook runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="homepage">
      <h1>Welcome to the Recipe Book</h1>
      <div className="recipe-list">
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
