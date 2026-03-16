import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ChevronDown, 
  Dna, 
  Briefcase, 
  Monitor, 
  Code, 
  LineChart, 
  PencilRuler, 
  FlaskConical, 
  MousePointer2 
} from 'lucide-react';

const categories = [
  { name: 'Biology', Icon: Dna },
  { name: 'Business', Icon: Briefcase },
  { name: 'Computing', Icon: Monitor },
  { name: 'Development', Icon: Code },
  { name: 'Economics', Icon: LineChart },
  { name: 'Math', Icon: PencilRuler },
  { name: 'Science', Icon: FlaskConical },
  { name: 'Web Design', Icon: MousePointer2 },
];

interface CourseSearchProps {
  onSearch?: (query: string) => void;
  onCategoryClick?: (category: string) => void;
}

export default function CourseSearch({ onSearch, onCategoryClick }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <section className="w-full bg-white">
      <div className="flex flex-col lg:flex-row">
        {/* Left: Search Form */}
        <div className="w-full lg:w-[30%] bg-[#f9f9f9] p-10 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-serif text-slate-800 mb-6">Find Your Course</h2>
          <div className="w-12 h-0.5 bg-gray-200 mb-8"></div>
          
          <p className="text-gray-500 text-sm mb-8">Fill in the form below to find your course</p>
          
          <div className="flex gap-6 mb-8">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-[#c5a070] bg-[#c5a070] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white"></div>
              </div>
              <span className="text-sm font-medium text-slate-700">By Name</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-gray-300"></div>
              <span className="text-sm font-medium text-slate-400">By ID</span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Course Name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-none px-4 py-4 text-sm italic text-gray-400 focus:ring-1 focus:ring-[#c5a070] outline-none shadow-sm"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" />
            </div>
            
            <div className="relative">
              <select className="w-full bg-white border-none px-4 py-4 text-sm italic text-gray-400 focus:ring-1 focus:ring-[#c5a070] outline-none shadow-sm appearance-none cursor-pointer">
                <option>Select Category</option>
                {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4 pointer-events-none" />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              className="w-full border border-[#c5a070] text-[#c5a070] py-4 text-xs font-bold tracking-[0.2em] uppercase mt-4 hover:bg-[#c5a070] hover:text-white transition-all"
            >
              Search Course
            </motion.button>
          </div>
        </div>

        {/* Right: Category Grid */}
        <div className="w-full lg:w-[70%] grid grid-cols-2 md:grid-cols-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onCategoryClick && onCategoryClick(cat.name)}
              className="aspect-square bg-[#1a1f2c] border-r border-b border-slate-800 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:bg-[#c5a070] transition-colors duration-500"
            >
              <cat.Icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
              <span className="text-white text-sm font-medium tracking-wide">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
