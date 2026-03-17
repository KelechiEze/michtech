import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Download, ArrowRight, ShoppingBag, CreditCard, Calendar } from 'lucide-react';

interface OrderConfirmationProps {
  order: {
    transactionId: string;
    items: any[];
    total: number;
    date: string;
  };
  onBackToHome: () => void;
}

export default function OrderConfirmation({ order, onBackToHome }: OrderConfirmationProps) {
  const hasSoftware = order.items.some(item => item.format === 'software' || item.format === 'both');

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-emerald-600 p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-64 h-64 rounded-full bg-white blur-3xl animate-pulse" />
              <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white blur-3xl animate-pulse" />
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>
            
            <h1 className="text-3xl font-serif mb-2">Payment Successful!</h1>
            <p className="text-emerald-100 opacity-90">Thank you for your purchase. Your order has been confirmed.</p>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Transaction ID</h3>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <CreditCard size={18} className="text-[#c5a070]" />
                    <span className="font-mono font-bold text-slate-800 tracking-wider">{order.transactionId}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">Order Date</h3>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Calendar size={18} className="text-[#c5a070]" />
                    <span className="font-medium text-slate-800">{order.date}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="text-gray-300 line-clamp-1">{item.title}</span>
                        {item.format && (
                          <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                            Format: {item.format}
                          </span>
                        )}
                      </div>
                      <span className="font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Total Paid</span>
                  <span className="text-2xl font-bold text-[#c5a070]">£{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {hasSoftware && (
              <div className="mb-12">
                <h3 className="text-lg font-serif text-slate-800 mb-6 flex items-center gap-2">
                  <Download size={20} className="text-[#c5a070]" />
                  Digital Downloads
                </h3>
                <div className="space-y-4">
                  {order.items.filter(item => item.format === 'software' || item.format === 'both').map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-blue-50 rounded-2xl border border-blue-100 group hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <ShoppingBag size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                          <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">PDF Format • 4.2 MB</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md">
                        Download
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBackToHome}
                className="flex-1 bg-[#1a1f2c] text-white py-5 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-lg"
              >
                Back to Home
                <ArrowRight size={16} />
              </button>
              <button className="flex-1 bg-white border-2 border-gray-100 text-slate-800 py-5 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-all">
                Print Receipt
              </button>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center text-gray-400 text-xs mt-8">
          A copy of this receipt has been sent to your email address. 
          If you have any questions, please contact support.
        </p>
      </div>
    </div>
  );
}
