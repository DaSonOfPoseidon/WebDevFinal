import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const getRecipes = () => api.get('/recipes');
export const getRecipeById = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (recipe) => api.post('/recipes', recipe);
export const updateRecipe = (id, recipe) => api.put(`/recipes/${id}`, recipe);
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);