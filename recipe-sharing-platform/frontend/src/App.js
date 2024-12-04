import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from './components/recipes';
import RecipeDetails from './components/recipeDetails';
import NewRecipe from './components/newRecipe';
//import UserProfile from './components/UserProfile';
//            <Route path="/profile" element={<UserProfile />} />

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/new-recipe" element={<NewRecipe />} />

        </Routes>
    </Router>
);

export default App;
