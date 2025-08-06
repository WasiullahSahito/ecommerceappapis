import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Loader from '../components/Loader';
import { fetchProductById } from '../api/fakeStoreApi';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            });
        }
        setQuantity(1);
    };

    if (loading) return <Loader />;

    if (error || !product) {
        return (
            <div className="product-not-found">
                <h2 className="not-found-title">Product Not Found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
                <button onClick={() => navigate('/')} className="shopping-button">
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Back to products
            </button>

            <div className="product-detail-container">
                <div className="product-image-section">
                    <div className="product-image-wrapper">
                        <img src={product.image} alt={product.title} className="detail-product-image" />
                    </div>
                </div>

                <div className="product-info-section">
                    <h1 className="detail-product-title">{product.title}</h1>

                    {product.rating && (
                        <div className="product-rating">
                            <div className="rating-stars">
                                {'★'.repeat(Math.round(product.rating.rate))}
                                {'☆'.repeat(5 - Math.round(product.rating.rate))}
                            </div>
                            <span className="rating-text">
                                {product.rating.rate} ({product.rating.count} reviews)
                            </span>
                        </div>
                    )}

                    <div className="detail-product-price">${product.price.toFixed(2)}</div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-category">
                        <span className="category-label">Category:</span>
                        <span className="category-value">{product.category}</span>
                    </div>

                    <div className="add-to-cart-section">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="quantity-adjust">−</button>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="quantity-input"
                            />
                            <button onClick={() => setQuantity(quantity + 1)} className="quantity-adjust">+</button>
                        </div>
                        <button onClick={handleAddToCart} className="add-to-cart-large">
                            Add {quantity} to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;