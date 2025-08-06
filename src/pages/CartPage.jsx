import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CardItem';

const CartPage = () => {
    const { cart, clearCart } = useCart();

    if (cart.totalItems === 0) {
        return (
            <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h2 className="empty-cart-title">Your cart is empty</h2>
                <p className="empty-cart-text">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="shopping-button">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1 className="cart-page-title">Your Shopping Cart</h1>
            <div className="cart-layout">
                <div className="cart-items-section">
                    <div className="cart-items-container">
                        {cart.items.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                        <div className="cart-clear-container">
                            <button onClick={clearCart} className="clear-cart-button">
                                🗑️ Clear Cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="order-summary-section">
                    <div className="order-summary">
                        <h2 className="summary-title">Order Summary</h2>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal ({cart.totalItems} items)</span>
                                <span>${cart.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>FREE</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span className="total-price">${cart.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link to="/checkout" className="checkout-button">
                            Proceed to Checkout
                        </Link>
                        <Link to="/" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;