import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import {
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory
} from '../api/fakeStoreApi';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(['all', ...data]);
            } catch (err) {
                setError('Failed to load categories');
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = selectedCategory === 'all'
                    ? await fetchProducts()
                    : await fetchProductsByCategory(selectedCategory);
                setProducts(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, [selectedCategory]);

    return (
        <div className="home-page">
            <div className="page-header">
                <h1 className="page-title">Our Products</h1>
                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {error ? (
                <div className="error-message">
                    <strong>Error: </strong> {error}
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Try again
                    </button>
                </div>
            ) : loading ? (
                <Loader />
            ) : products.length === 0 ? (
                <div className="empty-products">
                    <h3 className="empty-title">No products found</h3>
                    <p>Try selecting a different category or refreshing the page.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;