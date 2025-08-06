import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cart } = useCart();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* FIX: Brand logo now links to homepage */}
                <Link to="/" className="navbar-brand">
                    <span className="navbar-icon">🛒</span>
                    FakeStore
                </Link>

                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/cart" className="navbar-link cart-link">
                        Cart
                        {cart.totalItems > 0 && (
                            <span className="cart-badge">
                                {cart.totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                <div className="mobile-nav">
                    <button
                        onClick={() => navigate('/cart')}
                        className="mobile-cart-button"
                    >
                        <span className="cart-icon">🛒</span>
                        {cart.totalItems > 0 && (
                            <span className="mobile-cart-badge">
                                {cart.totalItems}
                            </span>
                        )}
                    </button>
                    <button onClick={toggleMenu} className="menu-button">
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="mobile-menu-link" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link to="/cart" className="mobile-menu-link" onClick={toggleMenu}>
                        Cart
                        {cart.totalItems > 0 && (
                            <span className="mobile-menu-badge">
                                {cart.totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;