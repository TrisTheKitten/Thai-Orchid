'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type React from 'react';

interface NavigationBarProps {
  onCartIconClick: () => void;
  totalItems: number;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onCartIconClick, totalItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '#menu', label: 'Menu', icon: null },
    { href: '#about', label: 'About', icon: Star },
    { href: '#contact', label: 'Contact', icon: Award },
  ];

  return (
    <>
      <motion.nav
        className="fixed left-0 right-0 top-0 z-50 bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-glass-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold">
                <span className="bg-gradient-to-r from-warmOrange-500 via-deepAmber-600 to-berryRed-600 bg-clip-text text-transparent drop-shadow-sm">
                  Thai Orchid
                </span>
              </h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="relative group font-medium text-charcoal-700 transition-all duration-300 hover:text-warmOrange-600"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetId = item.href.replace('#', '');
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </span>
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-warmOrange-400 to-deepAmber-500 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-warmOrange-600 transition-all duration-300 hover:bg-warmOrange-100/50 hover:text-warmOrange-700 hover:shadow-glass-hover hover:border-warmOrange-300/50"
                  onClick={onCartIconClick}
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  {totalItems > 0 && (
                    <motion.span
                      className="absolute -right-0.5 -top-0.5 sm:-right-1 sm:-top-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-gradient-to-br from-berryRed-500 to-berryRed-600 text-xs font-bold text-white shadow-glass-sm border-2 border-white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                  )}
                </Button>
              </motion.div>

              <div className="md:hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-charcoal-700 hover:bg-warmOrange-100/50 hover:text-warmOrange-700 transition-all duration-300 hover:shadow-glass-hover hover:border-warmOrange-300/50"
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  >
                    {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            <motion.div
              className="absolute top-20 left-4 right-4 bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40 shadow-glass-lg p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl text-charcoal-700 hover:bg-warmOrange-100/50 hover:text-warmOrange-700 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMobileMenu();
                      const targetId = item.href.replace('#', '');
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationBar;
export { NavigationBar };
