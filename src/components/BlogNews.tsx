/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Folder } from 'lucide-react';
import { Post } from '../types';

export const posts: Post[] = [
  {
    id: 1,
    title: 'Fun Ways to Learn Math at Home',
    author: 'Miss Sarah',
    date: 'Mar 10, 2026',
    comments: 5,
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Discover how everyday objects like apples and toys can help your child understand addition and subtraction in a fun way!',
  },
  {
    id: 2,
    title: 'The Magic of Reading Stories',
    author: 'Mrs. Emily',
    date: 'Mar 12, 2026',
    comments: 8,
    category: 'Literacy',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2074&auto=format&fit=crop',
    excerpt: 'Reading together is the best way to spark imagination. Learn about our top 10 favorite storybooks for primary school kids.',
  },
  {
    id: 3,
    title: 'Science Experiments in the Kitchen',
    author: 'Mr. James',
    date: 'Mar 15, 2026',
    comments: 12,
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?q=80&w=2070&auto=format&fit=crop',
    excerpt: 'Turn your kitchen into a lab! Try these safe and easy experiments that will make your child say "Wow!"',
  },
];

interface BlogNewsProps {
  onReadMore: (post: Post) => void;
}

export default function BlogNews({ onReadMore }: BlogNewsProps) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-slate-800 mb-4">
            Blog <span className="text-[#c5a070]">News</span>
          </h2>
          <div className="flex justify-center items-center gap-1 mb-6">
            <div className="w-12 h-0.5 bg-slate-800"></div>
            <div className="w-12 h-0.5 bg-[#c5a070]"></div>
          </div>
          <p className="text-gray-500 text-sm italic">
            We bring you all the useful information of the University's Community
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Image & Author Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 py-3 px-4 flex items-center gap-3">
                  <div className="relative -mt-10">
                    <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/150?u=${post.id}`} alt={post.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <span className="text-white text-xs font-medium">
                    Posted by: <span className="text-gray-300">{post.author}</span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                {/* Meta */}
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-300 mb-6">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={10} />
                    <span>{post.comments} Comment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Folder size={10} />
                    <span>{post.category}</span>
                  </div>
                </div>

                <h3 
                  onClick={() => onReadMore(post)}
                  className="text-xl font-serif text-slate-800 mb-6 leading-snug hover:text-[#c5a070] transition-colors cursor-pointer"
                >
                  {post.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <button 
                    onClick={() => onReadMore(post)}
                    className="border border-[#c5a070] text-[#c5a070] px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#c5a070] hover:text-white transition-all"
                  >
                    Read Article
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
