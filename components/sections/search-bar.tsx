'use client'

import { useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredItemsLength: number
  isStale?: boolean
}

const popularSearches = ['Pad Thai', 'Curries', 'Noodles', 'Soups', 'Desserts']

function SearchBar({
  searchQuery,
  setSearchQuery,
  filteredItemsLength,
  isStale = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearSearch = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    inputRef.current?.blur()
  }

  return (
    <div className="mb-12">
      <div className="relative mx-auto max-w-2xl px-4 sm:px-0">
        <div className="relative">
          <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2 sm:left-4">
            <Search
              className={cn(
                'h-4 w-4 transition-colors duration-200 sm:h-5 sm:w-5',
                isFocused ? 'text-warmOrange-600' : 'text-charcoal-400'
              )}
              aria-hidden
            />
          </div>

          <Input
            ref={inputRef}
            type="search"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                inputRef.current?.blur()
              }
            }}
            className={cn(
              'glass-blur w-full rounded-xl border-2 border-white/40 py-3 pl-12 pr-14 text-sm text-charcoal-800 shadow-glass-md transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-charcoal-500 sm:rounded-2xl sm:py-4 sm:pr-12 sm:text-lg',
              isFocused &&
                'border-warmOrange-400 bg-white/50 shadow-glass-hover ring-4 ring-warmOrange-200/50'
            )}
            aria-label="Search menu dishes"
          />

          {searchQuery ? (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-0 bottom-0 z-20 flex items-center rounded-full border border-white/30 bg-white/60 p-1.5 shadow-sm transition-colors duration-200 hover:border-warmOrange-300/50 hover:bg-white/80 sm:p-2"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-charcoal-600" />
            </button>
          ) : null}
        </div>

        {!searchQuery ? (
          <div className="mt-4 animate-fade-in text-center">
            <p className="mb-3 text-sm font-medium text-charcoal-600">Popular searches</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handlePopularSearch(term)}
                  className="glass-blur rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-charcoal-600 shadow-glass-sm transition-colors duration-200 hover:border-warmOrange-300/50 hover:bg-warmOrange-100/50 hover:text-warmOrange-700"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {searchQuery ? (
          <div
            className={cn(
              'mt-4 animate-fade-in text-center transition-opacity duration-200',
              isStale && 'opacity-60'
            )}
          >
            <div className="glass-blur inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 shadow-glass-sm">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  isStale
                    ? 'bg-charcoal-300'
                    : filteredItemsLength > 0
                      ? 'bg-freshMint-500'
                      : 'bg-berryRed-500'
                )}
                aria-hidden
              />
              <span className="text-sm font-medium text-charcoal-700">
                {isStale
                  ? 'Searching…'
                  : filteredItemsLength > 0
                    ? `Found ${filteredItemsLength} delicious ${filteredItemsLength === 1 ? 'dish' : 'dishes'}`
                    : 'No dishes found - try a different search'}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchBar
export { SearchBar }
