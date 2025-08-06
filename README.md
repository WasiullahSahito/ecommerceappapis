# 🛒 React FakeStore - A Simple E-commerce Application

A complete e-commerce application built with **React** that demonstrates product browsing, cart management, and checkout functionality using the [FakeStore API](https://fakestoreapi.com/).

---

## 🚀 Features

- 🏠 **Product Catalog**: Browse products by category with images, titles, and prices
- 🔍 **Product Details**: View detailed information about each product
- 🛒 **Shopping Cart**: Add/remove items, adjust quantities, and see cart totals
- 🔄 **Category Filtering**: Filter products by electronics, jewelry, clothing, and more
- 💳 **Checkout Process**: Complete order with shipping and payment information
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop devices
- 🔄 **Persistent Cart**: Cart data saved in `localStorage`
- ⚡ **API Integration**: Uses FakeStoreAPI for product data

---

## 🛠 Technologies Used

- **Frontend**: React
- **State Management**: React Context API
- **Routing**: React Router DOM
- **API Client**: Axios
- **Styling**: Custom CSS (with responsive design)
- **API**: [FakeStoreAPI](https://fakestoreapi.com/)

---

## 🔗 API Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /products` | Get all products |
| `GET /products/:id` | Get single product |
| `GET /products/categories` | Get all categories |
| `GET /products/category/:category` | Get products by category |

---

## 🖼 Features in Detail

### 📦 Product Catalog
- Display products with images, titles, and prices
- Filter products by category (e.g., electronics, jewelry)
- Responsive grid layout for optimal browsing

### 🔍 Product Details
- View full product description
- See product rating and reviews
- Add to cart with quantity selector

### 🛒 Shopping Cart
- Add or remove items
- Adjust quantities
- See subtotal and total cost
- Cart persists across browser sessions

### 💳 Checkout Process
- Input shipping information
- Input mock payment details
- Display full order summary with totals
- Confirmation screen on order placement

---

## 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-fakestore.git
   cd react-fakestore
