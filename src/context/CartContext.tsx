import React, { createContext, useContext, useState, useEffect } from 'react';

interface Course {
  id: number;
  title: string;
  price: string;
  image: string;
  instructor?: string;
  type?: 'course' | 'book';
  format?: 'software' | 'hardware' | 'both';
}

interface CartItem extends Course {
  quantity: number;
  type: 'course' | 'book';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Course) => void;
  removeFromCart: (id: number, format?: string) => void;
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

  const addToCart = (item: Course) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.format === item.format);
      if (existing) return prev;
      return [...prev, { ...item, quantity: 1, type: item.type || 'course' }];
    });
  };

  const removeFromCart = (id: number, format?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.format === format)));
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
