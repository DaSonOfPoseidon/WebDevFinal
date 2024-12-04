import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '../api';
import { Link } from 'react-router-dom';

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const { data } = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        getRecipes();
    }, []);

    return (
        <div>
            <h1>Recipe Sharing Platform</h1>
            <Link to="/new-recipe">Add New Recipe</Link>
            <h2>Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;