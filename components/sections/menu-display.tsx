'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { PlusCircle, Star, Clock, ChefHat } from 'lucide-react'
import { ThemedButton } from '@/components/ui/themed-button'
import { motion } from 'framer-motion'

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string; 
  calories?: number; 
}

interface MenuDisplayProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  index?: number;
}

const MenuItemCard = memo(({ item, onAddToCart, index = 0 }: MenuItemCardProps) => {
  return (
    <motion.div 
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/25 backdrop-blur-xl shadow-glass-lg border border-white/40 transition-all duration-300 ease-out hover:shadow-glass-hover hover:scale-[1.01] hover:bg-white/30 h-full"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={400}
          height={300}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          priority={index < 3}
          loading={index < 3 ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        

        
        {}
        {item.category && (
          <motion.div 
            className="absolute bottom-4 left-4 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-warmOrange-500/90 to-deepAmber-600/90 backdrop-blur-md rounded-full border border-white/30 shadow-glass-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChefHat className="inline h-3 w-3 mr-1" />
            {item.category}
          </motion.div>
        )}
        
        {}
        <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium text-white bg-black/40 backdrop-blur-sm rounded-full border border-white/20">
          <Clock className="inline h-3 w-3 mr-1" />
          15-20 min
        </div>
      </div>

      <div className="flex flex-col flex-grow p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-charcoal-800 tracking-tight group-hover:text-warmOrange-700 transition-colors duration-300">{item.name}</h3>
          <p className="text-sm text-charcoal-600 flex-grow line-clamp-2 leading-relaxed">{item.description}</p>
        </div>
        
        {}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <p className="text-2xl font-bold bg-gradient-to-r from-warmOrange-600 to-deepAmber-600 bg-clip-text text-transparent">
              ฿{item.price.toFixed(0)}
            </p>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-sunshineYellow-500 fill-sunshineYellow-500' : 'text-charcoal-300'}`} />
              ))}
              <span className="ml-2 text-xs text-charcoal-500 font-medium">(4.2)</span>
            </div>
          </div>
          
          {}
          <div className="text-right">
            <div className="text-xs text-charcoal-500 mb-1">Calories</div>
            <div className="text-sm font-semibold text-charcoal-700">{item.calories || 350}</div>
          </div>
        </div>
      </div>
      
      {}
      <div className="p-6 pt-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ThemedButton 
            variant="accent" 
            size="default" 
            className="w-full bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 hover:from-warmOrange-600 hover:to-deepAmber-700 text-white font-semibold py-3 rounded-xl shadow-glass-md hover:shadow-glass-hover transition-all duration-300 border-0" 
            onClick={() => onAddToCart(item)}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add to Order
          </ThemedButton>
        </motion.div>
      </div>
    </motion.div>
  );
})

MenuItemCard.displayName = 'MenuItemCard'

export function MenuDisplay({ items, onAddToCart }: MenuDisplayProps) {
  if (!items || items.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-24 text-center bg-white/15 backdrop-blur-lg rounded-3xl shadow-glass-lg border border-white/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Image src="/placeholder.svg?height=120&width=120&query=empty-plate" alt="Empty menu" width={120} height={120} className="opacity-60 mb-8" />
        </motion.div>
        <h3 className="text-3xl font-bold text-charcoal-700 mb-4 font-display">Menu Coming Soon!</h3>
        <p className="text-charcoal-500 max-w-md text-lg leading-relaxed">
          Our chefs are busy crafting new delightful dishes. Please check back shortly for an updated menu.
        </p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 xl:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div key={item.id} variants={itemVariants}>
          <MenuItemCard item={item} onAddToCart={onAddToCart} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
