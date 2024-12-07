import React from 'react';

const RecipeDetail = ({ recipe }) => {
    return (
        <div>
            <h3>{recipe.title}</h3>
            <p>Author: {recipe.author_id}</p>
            <p>Bake Time: {recipe.bake_time}</p>
            <h4>Ingredients:</h4>
            <ul>
                {recipe.Ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.amount} {ingredient.unit}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetail;