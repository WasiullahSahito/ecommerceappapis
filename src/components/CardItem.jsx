import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img
                    src={item.image}
                    alt={item.title}
                    className="item-image"
                />
            </div>

            <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                    {item.title}
                </Link>

                <div className="cart-item-controls">
                    <div className="quantity-control">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="quantity-button"
                            disabled={item.quantity <= 1}
                        >
                            −
                        </button>
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={handleQuantityChange}
                            className="quantity-input"
                        />
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="quantity-button"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="remove-button"
                    >
                        <span className="remove-icon">🗑️</span>
                        Remove
                    </button>
                </div>
            </div>

            <div className="cart-item-price">
                <div className="item-total-price">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>
                {item.quantity > 1 && (
                    <div className="item-unit-price">
                        ${item.price.toFixed(2)} each
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartItem;