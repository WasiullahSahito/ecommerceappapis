import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents the link from being triggered
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-card-main-link">
                <div className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                        loading="lazy"
                    />
                </div>
                <div className="product-details">
                    <h3 className="product-title" title={product.title}>
                        {product.title}
                    </h3>
                </div>
            </Link>
            <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                    onClick={handleAddToCart}
                    className="add-to-cart-button"
                >
                    + Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;