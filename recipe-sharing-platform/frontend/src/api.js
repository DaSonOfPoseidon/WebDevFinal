import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

/*
Functions for the front end:

Get recipes (On Load)
Get one recipe (On Click)
Add to favorites
Remove from favorites

*/
export default API;