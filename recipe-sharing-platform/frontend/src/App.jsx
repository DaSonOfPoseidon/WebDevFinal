import React, { useEffect, useState } from 'react';
import { getRecipes } from './api';
import RecipeList from './components/RecipeList';

const App = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes().then(response => {
            setRecipes(response.data);
        }).catch(error => {
            console.error('Error fetching recipes:', error);
        });
    }, []);

    return (
        <div className="App">
            <h1>Recipe Sharing Platform</h1>
            <RecipeList recipes={recipes} />
        </div>
    );
};

export default App;