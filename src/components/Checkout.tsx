import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function Checkout({ onBack, onSuccess }: CheckoutProps) {
  const { cart, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) { // 16 digits + 3 spaces
      setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      setExpiryDate(`${value.slice(0, 2)}/${value.slice(2)}`);
    } else {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      setTimeout(onSuccess, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif text-slate-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-500 mb-8">Thank you for your purchase. You'll be redirected to your dashboard shortly.</p>
          <div className="w-full h-1 bg-gray-100 overflow-hidden">
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 3 }}
              className="w-full h-full bg-green-500"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-slate-800 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-serif text-slate-800 mb-8 flex items-center gap-3">
                <CreditCard className="text-[#c5a070]" />
                Payment Information
              </h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">First Name</label>
                    <input type="text" required className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Last Name</label>
                    <input type="text" required className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required 
                      placeholder="0000 0000 0000 0000" 
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" 
                    />
                    <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Expiry Date</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="MM/YY" 
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">CVV</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="000" 
                      value={cvv}
                      onChange={handleCvvChange}
                      className="w-full border border-gray-200 px-4 py-3 focus:border-[#c5a070] outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#c5a070] text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#b38f5f] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay £${totalPrice.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center justify-center gap-8 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-white p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-serif text-slate-800 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800 line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{item.instructor}</p>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-slate-800 font-medium">£{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-slate-800 font-medium">£0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3">
                  <span className="text-slate-800">Total</span>
                  <span className="text-[#c5a070]">£{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 border border-blue-100 flex gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">Secure Checkout</p>
                <p className="text-xs text-blue-700 leading-relaxed">Your payment information is encrypted and secure. We never store your card details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
