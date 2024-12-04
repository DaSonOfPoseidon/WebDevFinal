import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});


//Functions for the front end:

export const fetchRecipes = () => API.get('/recipe');
export const createRecipe = (recipeData) => API.post('/recipe', recipeData);
export const fetchRecipeById = (id) => API.get(`/recipe/${id}`);
export const fetchFavorites = (userId) => API.get(`/favorites/${userId}`)

export default API;