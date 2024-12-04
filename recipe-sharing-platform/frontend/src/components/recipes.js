import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '../api';

const Recipes = () => {
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
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <p>Bake Time: {recipe.bake_time || 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
