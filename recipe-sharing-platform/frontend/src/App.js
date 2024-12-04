import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import NewRecipe from './components/NewRecipe';

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
