import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>The South Downs Way: Stories</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Stories</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/characters">Characters</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;