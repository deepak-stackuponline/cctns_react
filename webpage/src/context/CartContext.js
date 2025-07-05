import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(count);
  };

  const addToCart = (book) => {
    // Ensure book has an ID for cart management
    const bookWithId = {
      ...book,
      id: book.id || book.isbn || `book_${Date.now()}` // Fallback ID generation
    };

    // Check if book already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === bookWithId.id);
    
    let updatedCart;
    if (existingItemIndex > -1) {
      // If item exists, increase quantity
      updatedCart = cartItems.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      // If new item, add with quantity 1
      updatedCart = [...cartItems, { ...bookWithId, quantity: 1 }];
    }
    
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
    toast.success(`"${book.title}" added to cart!`);
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cartItems.filter(item => item.id !== bookId);
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
    toast.info("Item removed from cart");
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === bookId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    updateCartCount(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.rentPrice || 10;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
