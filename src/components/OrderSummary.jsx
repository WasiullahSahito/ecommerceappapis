import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const OrderSummary = () => {
    const { cart } = useCart();
    const taxRate = 0.08; // 8% tax
    const taxAmount = cart.totalPrice * taxRate;
    const totalWithTax = cart.totalPrice + taxAmount;

    return (
        <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="cart-items-preview">
                {cart.items.map(item => (
                    <div key={item.id} className="cart-item-preview">
                        <div className="item-image">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="item-details">
                            <div className="item-title">{item.title}</div>
                            <div className="item-quantity">Qty: {item.quantity}</div>
                            <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="summary-details">
                <div className="summary-row">
                    <span>Subtotal ({cart.totalItems} items)</span>
                    <span>${cart.totalPrice.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                    <span>Shipping</span>
                    <span>FREE</span>
                </div>

                <div className="summary-row">
                    <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                </div>

                <div className="summary-total">
                    <span>Total</span>
                    <span className="total-price">
                        ${totalWithTax.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="continue-shopping">
                <Link to="/">Continue Shopping</Link>
            </div>
        </div>
    );
};

export default OrderSummary;