import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h3 className="footer-title">
                        <span className="footer-icon">🛒</span>
                        FakeStore
                    </h3>
                    <p className="footer-subtitle">Your one-stop fake shop</p>
                </div>

                <div className="footer-links">
                    <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="footer-link">About</a>
                    <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="footer-link">Contact</a>
                    <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy</a>
                </div>
            </div>

            <div className="footer-copyright">
                <p>© {new Date().getFullYear()} FakeStore. All rights reserved. This is a demo application.</p>
                <p className="footer-api">Data provided by <a href="https://fakestoreapi.com/" target="_blank" rel="noopener noreferrer">FakeStoreAPI</a></p>
            </div>
        </footer>
    );
};

export default Footer;