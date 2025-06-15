'use client'

import { Search, Filter, X, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredItemsLength: number;
}

const popularSearches = ['Pad Thai', 'Curries', 'Noodles', 'Soups', 'Desserts'];

function SearchBar({ searchQuery, setSearchQuery, filteredItemsLength }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    // Ensure the search input loses focus to trigger any blur handlers
    const searchInput = document.querySelector('input[placeholder="Search dishes..."]') as HTMLInputElement;
    if (searchInput) {
      searchInput.blur();
    }
  };

  return (
    <div className="mb-12">
      <div className="relative max-w-2xl mx-auto px-4 sm:px-0">
        {}
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="absolute left-6 sm:left-4 top-1/2 -translate-y-1/2 z-10">
            <Search className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${
              isFocused ? 'text-warmOrange-600' : 'text-charcoal-400'
            }`} />
          </div>
          
          <Input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const searchInput = e.target as HTMLInputElement;
                searchInput.blur();
              }
            }}
            className={`pl-12 sm:pl-12 pr-14 sm:pr-12 py-3 sm:py-4 w-full text-sm sm:text-lg bg-white/30 backdrop-blur-xl border-2 border-white/40 text-charcoal-800 placeholder:text-charcoal-500 rounded-xl sm:rounded-2xl shadow-glass-md transition-all duration-300 focus:bg-white/40 focus:border-warmOrange-400 focus:shadow-glass-hover focus:ring-4 focus:ring-warmOrange-200/50 ${
              isFocused ? 'scale-105' : ''
            }`}
          />
          
          {}
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleClearSearch}
                className="absolute right-3 top-0 bottom-0 flex items-center z-20 p-1.5 sm:p-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 hover:border-warmOrange-300/50 transition-all duration-200 shadow-sm"
              >
                <X className="h-4 w-4 text-charcoal-600 hover:text-warmOrange-600" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        
        {}
        <AnimatePresence>
          {!searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-sm font-medium text-charcoal-600">Popular searches</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term, index) => (
                  <motion.button
                    key={term}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePopularSearch(term)}
                    className="px-4 py-2 text-sm font-medium text-charcoal-600 bg-white/25 backdrop-blur-md rounded-full border border-white/30 hover:bg-warmOrange-100/50 hover:text-warmOrange-700 hover:border-warmOrange-300/50 transition-all duration-300 shadow-glass-sm hover:shadow-glass-md"
                  >
                    {term}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/25 backdrop-blur-md rounded-full border border-white/30 shadow-glass-sm">
                <div className={`w-2 h-2 rounded-full ${
                  filteredItemsLength > 0 ? 'bg-freshMint-500' : 'bg-berryRed-500'
                }`} />
                <span className="text-sm font-medium text-charcoal-700">
                  {filteredItemsLength > 0 
                    ? `Found ${filteredItemsLength} delicious ${filteredItemsLength === 1 ? 'dish' : 'dishes'}`
                    : 'No dishes found - try a different search'
                  }
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SearchBar;
export { SearchBar };
