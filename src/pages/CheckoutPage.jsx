import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import OrderSummary from '../components/OrderSummary';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', address: '',
        city: '', state: '', zip: '', country: 'US',
        cardName: '', cardNumber: '', expiryDate: '', cvv: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [submittedEmail, setSubmittedEmail] = useState('');

    useEffect(() => {
        if (cart.totalItems === 0 && !orderSuccess) {
            navigate('/cart');
        }
    }, [cart.totalItems, orderSuccess, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'ZIP code is invalid';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.cardName) newErrors.cardName = 'Name on card is required';
        if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Format must be MM/YY';
        if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setSubmittedEmail(formData.email);
        setTimeout(() => {
            const newOrderId = `ORD-${Date.now()}`;
            setOrderId(newOrderId);
            setOrderSuccess(true);
            setIsSubmitting(false);
            clearCart();
        }, 1500);
    };

    if (orderSuccess) {
        return (
            <div className="order-success">
                <div className="success-icon">🎉</div>
                <h2>Order Placed Successfully!</h2>
                <p>Your order ID is: <strong>{orderId}</strong></p>
                <p>A confirmation has been sent to <strong>{submittedEmail}</strong></p>
                <div className="success-actions">
                    <button onClick={() => navigate('/')} className="shopping-button">
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="checkout-title">Checkout</h1>
            <div className="checkout-layout">
                <div className="checkout-form-section">
                    <form onSubmit={handleSubmit} className="checkout-form" noValidate>
                        <div className="form-section">
                            <h2 className="section-title">Shipping Information</h2>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="firstName">First Name</label><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'error' : ''} required />{errors.firstName && <div className="error-message">{errors.firstName}</div>}</div>
                                <div className="form-group"><label htmlFor="lastName">Last Name</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'error' : ''} required />{errors.lastName && <div className="error-message">{errors.lastName}</div>}</div>
                            </div>
                            <div className="form-group"><label htmlFor="email">Email</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} required />{errors.email && <div className="error-message">{errors.email}</div>}</div>
                            <div className="form-group"><label htmlFor="address">Address</label><input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} required />{errors.address && <div className="error-message">{errors.address}</div>}</div>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="city">City</label><input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''} required />{errors.city && <div className="error-message">{errors.city}</div>}</div>
                                <div className="form-group"><label htmlFor="state">State</label><input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} required />{errors.state && <div className="error-message">{errors.state}</div>}</div>
                            </div>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="zip">ZIP Code</label><input type="text" id="zip" name="zip" value={formData.zip} onChange={handleChange} className={errors.zip ? 'error' : ''} required />{errors.zip && <div className="error-message">{errors.zip}</div>}</div>
                                <div className="form-group"><label htmlFor="country">Country</label><select id="country" name="country" value={formData.country} onChange={handleChange} className={errors.country ? 'error' : ''} required><option value="US">United States</option><option value="CA">Canada</option><option value="UK">United Kingdom</option><option value="PK">Pakistan</option></select>{errors.country && <div className="error-message">{errors.country}</div>}</div>
                            </div>
                        </div>
                        <div className="form-section">
                            <h2 className="section-title">Payment Information</h2>
                            <div className="form-group"><label htmlFor="cardName">Name on Card</label><input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} className={errors.cardName ? 'error' : ''} required />{errors.cardName && <div className="error-message">{errors.cardName}</div>}</div>
                            <div className="form-group"><label htmlFor="cardNumber">Card Number</label><input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className={errors.cardNumber ? 'error' : ''} placeholder="0000 0000 0000 0000" required />{errors.cardNumber && <div className="error-message">{errors.cardNumber}</div>}</div>
                            <div className="form-row">
                                <div className="form-group"><label htmlFor="expiryDate">Expiry Date</label><input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className={errors.expiryDate ? 'error' : ''} placeholder="MM/YY" required />{errors.expiryDate && <div className="error-message">{errors.expiryDate}</div>}</div>
                                <div className="form-group"><label htmlFor="cvv">CVV</label><input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} className={errors.cvv ? 'error' : ''} placeholder="123" required />{errors.cvv && <div className="error-message">{errors.cvv}</div>}</div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <Link to="/cart" className="back-to-cart">← Back to Cart</Link>
                            <button type="submit" className="place-order-button" disabled={isSubmitting}>{isSubmitting ? 'Processing...' : 'Place Order'}</button>
                        </div>
                    </form>
                </div>
                <div className="order-summary-section">
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;