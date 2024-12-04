import React, { useState } from 'react';
import { createRecipe } from '../api';

const NewRecipe = () => {
    const [title, setTitle] = useState('');
    const [bakeTime, setBakeTime] = useState('');
    const [authorId, setAuthorId] = useState(1); // Assume logged-in user's ID
    const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createRecipe({
                title,
                bake_time: bakeTime,
                author_id: authorId,
                ingredients,
            });
            alert('Recipe created successfully!');
        } catch (error) {
            console.error('Error creating recipe:', error);
        }
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Recipe</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Bake Time"
                value={bakeTime}
                onChange={(e) => setBakeTime(e.target.value)}
            />
            <h2>Ingredients</h2>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={ingredient.name}
                        onChange={(e) =>
                            handleIngredientChange(index, 'name', e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={ingredient.amount}
                        onChange={(e) =>
                            handleIngredientChange(index, 'amount', e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Unit"
                        value={ingredient.unit}
                        onChange={(e) =>
                            handleIngredientChange(index, 'unit', e.target.value)
                        }
                    />
                </div>
            ))}
            <button type="button" onClick={addIngredient}>
                Add Ingredient
            </button>
            <button type="submit">Create Recipe</button>
        </form>
    );
};

export default NewRecipe;
