import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1>Recipe Sharing Platform</h1> // Better name?
            <nav>
                <Link to="/">Home</Link>
                <Link to="/new-recipe">Add Recipe</Link>
            </nav>
        </header>
    );
};

export default Header;
