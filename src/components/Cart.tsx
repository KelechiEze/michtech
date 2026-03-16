import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, onCheckout }: CartProps) {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#c5a070]" />
                <h2 className="text-xl font-serif text-slate-800">Your Cart ({totalItems})</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-gray-200" />
                  </div>
                  <h3 className="text-lg font-serif text-slate-800 mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm mb-8">Looks like you haven't added any courses yet.</p>
                  <button 
                    onClick={onClose}
                    className="bg-[#c5a070] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#b38f5f] transition-all"
                  >
                    Browse Courses
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-sm font-serif text-slate-800 mb-1 line-clamp-2">{item.title}</h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{item.instructor}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-bold text-[#c5a070]">{item.price}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-slate-800">£{totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-slate-800 text-white py-4 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-slate-700 transition-all shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
