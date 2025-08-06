import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

// Helper function to ensure image URLs are always absolute.
const ensureAbsoluteUrl = (imageUrl) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // This is a safeguard, though the API usually provides full URLs.
  return `https://fakestoreapi.com${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data.map(product => ({
      ...product,
      image: ensureAbsoluteUrl(product.image)
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return {
      ...response.data,
      image: ensureAbsoluteUrl(response.data.image)
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// --- THIS IS THE KEY FIX ---
// This function now correctly processes image URLs for categorized products.
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
    return response.data.map(product => ({
      ...product,
      image: ensureAbsoluteUrl(product.image)
    }));
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};