import React from 'react';
import RecipeDetail from './RecipeDetail';

const RecipeList = ({ recipes }) => {
    return (
        <div>
            <h2>Recipes</h2>
            {recipes.map(recipe => (
                <RecipeDetail key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;