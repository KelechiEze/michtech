import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, ShoppingCart, Search, ArrowLeft, Check, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BookItem {
  id: number;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  class: string;
  description: string;
}

const classes = [
  'Creche',
  'Nursery',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
  'JSS 1',
  'JSS 2',
  'JSS 3',
  'SSS 1',
  'SSS 2',
  'SSS 3'
];

// Generate mock books for each class
const generateBooks = (): BookItem[] => {
  const allBooks: BookItem[] = [];
  let id = 1;

  classes.forEach(className => {
    // 8 books per class to show horizontal scroll
    for (let i = 1; i <= 8; i++) {
      allBooks.push({
        id: id++,
        title: `${className} ${i === 1 ? 'Mathematics' : i === 2 ? 'English' : i === 3 ? 'Science' : i === 4 ? 'Social Studies' : i === 5 ? 'Art' : i === 6 ? 'Music' : i === 7 ? 'Physical Education' : 'Computer Science'}`,
        author: `Author ${id}`,
        price: 15 + Math.floor(Math.random() * 20),
        image: `https://picsum.photos/seed/book${id}/400/600`,
        category: i % 2 === 0 ? 'Textbook' : 'Workbook',
        class: className,
        description: `Comprehensive ${className} textbook covering all essential topics for the academic year.`
      });
    }
  });

  return allBooks;
};

const allBooks = generateBooks();

interface BooksPageProps {
  onBack: () => void;
}

export default function BooksPage({ onBack }: BooksPageProps) {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [purchaseFormat, setPurchaseFormat] = useState<'software' | 'hardware' | 'both'>('software');

  const handleAddToCart = (book: BookItem) => {
    let finalPrice = book.price;
    if (purchaseFormat === 'both') {
      finalPrice = book.price * 2;
    }

    addToCart({
      id: book.id,
      title: book.title,
      price: `£${finalPrice.toFixed(2)}`,
      image: book.image,
      type: 'book',
      format: purchaseFormat
    });
    setSelectedBook(null);
  };

  const filteredBooksByClass = (className: string) => {
    return allBooks.filter(book => 
      book.class === className && 
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       book.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-[#c5a070] transition-colors mb-4 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <h1 className="text-4xl font-serif text-slate-800">School Bookstore</h1>
            <p className="text-gray-500 mt-2">Find all required textbooks for every class level.</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c5a070] outline-none w-full sm:w-80 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Horizontal Scroll Sections for each class */}
        <div className="space-y-16">
          {classes.map((className) => {
            const classBooks = filteredBooksByClass(className);
            if (classBooks.length === 0) return null;

            return (
              <div key={className} className="relative group">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-slate-800 flex items-center gap-3">
                    <span className="w-1 h-8 bg-[#c5a070]"></span>
                    {className}
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const container = document.getElementById(`scroll-${className}`);
                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                      }}
                      className="p-2 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-slate-800"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={() => {
                        const container = document.getElementById(`scroll-${className}`);
                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                      }}
                      className="p-2 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-slate-800"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                <div 
                  id={`scroll-${className}`}
                  className="flex overflow-x-auto gap-6 pb-6 custom-scrollbar scroll-smooth no-scrollbar"
                >
                  {classBooks.map((book) => (
                    <motion.div 
                      key={book.id}
                      whileHover={{ y: -10 }}
                      className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100"
                    >
                      <div className="relative h-80 overflow-hidden">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <button 
                            onClick={() => setSelectedBook(book)}
                            className="w-full bg-white text-slate-800 py-3 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-[#c5a070] hover:text-white transition-all"
                          >
                            Quick View
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-sm font-bold text-slate-800 mb-1 line-clamp-1">{book.title}</h3>
                        <p className="text-xs text-gray-400 mb-4">{book.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-[#c5a070]">£{book.price.toFixed(2)}</span>
                          <button 
                            onClick={() => setSelectedBook(book)}
                            className="p-2 bg-gray-50 text-slate-400 rounded-lg hover:bg-[#c5a070] hover:text-white transition-all"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {searchQuery && classes.every(c => filteredBooksByClass(c).length === 0) && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Book size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-serif text-slate-800 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBook(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <div className="w-full md:w-2/5 h-64 md:h-auto">
                <img 
                  src={selectedBook.image} 
                  alt={selectedBook.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-3/5 p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a070] mb-1 block">{selectedBook.class}</span>
                    <h2 className="text-2xl font-serif text-slate-800">{selectedBook.title}</h2>
                  </div>
                  <button onClick={() => setSelectedBook(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-gray-400" />
                  </button>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {selectedBook.description}
                </p>

                <div className="space-y-4 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800">Choose Format</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setPurchaseFormat('software')}
                      className={`p-4 rounded-2xl border-2 transition-all text-left relative ${
                        purchaseFormat === 'software' ? 'border-[#c5a070] bg-[#c5a070]/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {purchaseFormat === 'software' && <Check className="absolute top-2 right-2 text-[#c5a070]" size={16} />}
                      <span className="block font-bold text-slate-800 mb-1">Soft Copy</span>
                      <span className="block text-[10px] text-gray-500">PDF Download</span>
                      <span className="block mt-2 font-bold text-[#c5a070]">£{selectedBook.price.toFixed(2)}</span>
                    </button>
                    <button 
                      onClick={() => setPurchaseFormat('hardware')}
                      className={`p-4 rounded-2xl border-2 transition-all text-left relative ${
                        purchaseFormat === 'hardware' ? 'border-[#c5a070] bg-[#c5a070]/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {purchaseFormat === 'hardware' && <Check className="absolute top-2 right-2 text-[#c5a070]" size={16} />}
                      <span className="block font-bold text-slate-800 mb-1">Hard Copy</span>
                      <span className="block text-[10px] text-gray-500">Physical Book</span>
                      <span className="block mt-2 font-bold text-[#c5a070]">£{selectedBook.price.toFixed(2)}</span>
                    </button>
                    <button 
                      onClick={() => setPurchaseFormat('both')}
                      className={`p-4 rounded-2xl border-2 transition-all text-left relative ${
                        purchaseFormat === 'both' ? 'border-[#c5a070] bg-[#c5a070]/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {purchaseFormat === 'both' && <Check className="absolute top-2 right-2 text-[#c5a070]" size={16} />}
                      <span className="block font-bold text-slate-800 mb-1">Both</span>
                      <span className="block text-[10px] text-gray-500">Soft + Hard</span>
                      <span className="block mt-2 font-bold text-[#c5a070]">£{(selectedBook.price * 2).toFixed(2)}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl mb-8">
                  <Info size={16} className="text-blue-500 flex-shrink-0" />
                  <p className="text-[10px] text-blue-700 leading-tight">
                    {purchaseFormat === 'software' 
                      ? "You'll be able to download the PDF immediately after purchase." 
                      : purchaseFormat === 'hardware'
                      ? "Physical copies will be available for pickup at the school office."
                      : "You get both the physical book and the PDF download."}
                  </p>
                </div>

                <button 
                  onClick={() => handleAddToCart(selectedBook)}
                  className="w-full bg-slate-800 text-white py-4 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-slate-700 transition-all shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
