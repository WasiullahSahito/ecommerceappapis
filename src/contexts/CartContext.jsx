import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        newState = {
          ...state,
          items: updatedItems,
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
      break;

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
      break;

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        // If quantity is 0 or less, remove the item
        newState = {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      } else {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
      }
      break;

    case 'SET_CART':
      newState = action.payload;
      break;

    case 'CLEAR_CART':
      newState = {
        items: [],
        totalItems: 0,
        totalPrice: 0
      };
      break;

    default:
      return state;
  }

  // Recalculate totals based on the new state
  const totalItems = newState.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = newState.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return { ...newState, totalItems, totalPrice };
};

const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], totalItems: 0, totalPrice: 0 };
  } catch (e) {
    console.error('Failed to parse cart from localStorage', e);
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const value = {
    cart: state,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' })
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);