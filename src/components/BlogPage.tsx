import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, MessageSquare, Folder, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Post } from '../types';

interface BlogPageProps {
  post: Post;
  onBack: () => void;
}

export default function BlogPage({ post, onBack }: BlogPageProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      {/* Hero Header */}
      <header className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/60 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <motion.button
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onBack}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8 group transition-colors"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold tracking-widest uppercase">Back to News</span>
            </motion.button>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4 text-[#c5a070] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                <span className="bg-[#c5a070] text-white px-3 py-1">{post.category}</span>
                <div className="flex items-center gap-2">
                  <Calendar size={12} />
                  <span>{post.date}</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-4">
                <img 
                  src={`https://i.pravatar.cc/150?u=${post.id}`} 
                  alt={post.author} 
                  className="w-12 h-12 rounded-full border-2 border-[#c5a070]"
                  referrerPolicy="no-referrer"
                />
                <div className="text-white">
                  <p className="text-xs font-bold tracking-widest uppercase">{post.author}</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">Senior Academic Editor</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <article className="lg:w-2/3">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light">
              <p className="text-xl text-slate-800 font-serif italic mb-10 leading-relaxed border-l-4 border-[#c5a070] pl-8">
                {post.excerpt}
              </p>
              
              <p className="mb-8">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <h2 className="text-3xl font-serif text-slate-800 mt-12 mb-6">Academic Excellence and Innovation</h2>
              <p className="mb-8">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>

              <blockquote className="my-12 p-10 bg-gray-50 border-t-2 border-b-2 border-[#c5a070] text-center">
                <p className="text-2xl font-serif text-slate-800 italic mb-4">
                  "Education is the most powerful weapon which you can use to change the world."
                </p>
                <cite className="text-xs font-bold tracking-widest uppercase text-[#c5a070]">— Nelson Mandela</cite>
              </blockquote>

              <p className="mb-8">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>

              <div className="grid grid-cols-2 gap-8 my-12">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
                  alt="Study" 
                  className="rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop" 
                  alt="Collaboration" 
                  className="rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              <p>
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
              </p>
            </div>

            {/* Tags & Share */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-800">Tags:</span>
                <div className="flex gap-2">
                  {['Education', 'Research', 'University'].map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-[#c5a070] cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-800">Share:</span>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                    <button key={i} className="p-2 text-gray-400 hover:text-[#c5a070] transition-colors">
                      <Icon size={18} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-12">
            {/* Search */}
            <div className="bg-gray-50 p-8">
              <h4 className="text-lg font-serif text-slate-800 mb-6">Search News</h4>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type keywords..." 
                  className="w-full bg-white border-none px-4 py-4 text-sm italic focus:ring-1 focus:ring-[#c5a070] outline-none"
                />
              </div>
            </div>

            {/* Recent Posts */}
            <div>
              <h4 className="text-lg font-serif text-slate-800 mb-8">Recent Posts</h4>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                      <img 
                        src={`https://images.unsplash.com/photo-1523050335456-c3844740d089?q=80&w=200&auto=format&fit=crop&sig=${i}`} 
                        alt="Recent" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="text-sm font-serif text-slate-800 leading-snug group-hover:text-[#c5a070] transition-colors mb-2">
                        The future of digital learning in modern universities
                      </h5>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Oct 20, 2017</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-serif text-slate-800 mb-8">Categories</h4>
              <ul className="space-y-4">
                {['Academic', 'Campus Life', 'International', 'Research', 'Sports'].map(cat => (
                  <li key={cat} className="flex justify-between items-center group cursor-pointer">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-[#c5a070] transition-colors">{cat}</span>
                    <span className="text-[10px] font-bold text-gray-300 group-hover:text-[#c5a070] transition-colors">(12)</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Banner */}
            <div className="relative h-80 overflow-hidden bg-[#1a1f2c] p-10 flex flex-col justify-center items-center text-center">
              <div className="absolute inset-0 opacity-20">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500&auto=format&fit=crop" 
                  alt="Banner" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="relative z-10 text-2xl font-serif text-white mb-6">Join Our Academy Today</h4>
              <button className="relative z-10 bg-[#c5a070] text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#b38f5f] transition-colors">
                Apply Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
