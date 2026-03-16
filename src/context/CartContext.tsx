import React, { createContext, useContext, useState, useEffect } from 'react';

interface Course {
  id: number;
  title: string;
  price: string;
  image: string;
  instructor: string;
}

interface CartItem extends Course {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('michtec-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('michtec-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course: Course) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === course.id);
      if (existing) return prev;
      return [...prev, { ...course, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('£', ''));
    return sum + price;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
