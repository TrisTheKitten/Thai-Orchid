# 🌺 Thai Orchid - Authentic Thai Cuisine

A modern, responsive Thai restaurant web application built with Next.js 14, featuring an elegant menu display, shopping cart functionality, and seamless checkout experience.

![Thai Orchid](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## ✨ Features

### 🍜 Menu & Ordering
- **Interactive Menu Display** - Browse authentic Thai dishes with beautiful imagery
- **Smart Search** - Find your favorite dishes quickly with real-time search
- **Shopping Cart** - Add items, adjust quantities, and manage your order
- **Category Filtering** - Explore dishes by categories (Noodles, Soups, Curries, etc.)
- **Nutritional Information** - View calories and detailed descriptions

### 🎨 User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Glass Morphism UI** - Modern design with backdrop blur effects
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Skeleton loaders and dynamic imports for better performance

### 🛒 Checkout Process
- **Multi-step Checkout** - Streamlined ordering process
- **Multiple Payment Methods** - Support for cards and digital wallets
- **Delivery Information** - Complete address and contact details
- **Order Summary** - Clear breakdown of items and pricing

### 🎯 Technical Features
- **TypeScript** - Full type safety throughout the application
- **Server-Side Rendering** - SEO optimized with Next.js 14
- **Image Optimization** - WebP/AVIF support with Next.js Image component
- **Performance Optimized** - Code splitting and lazy loading
- **Accessibility** - ARIA labels and semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd food-menu
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
food-menu/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx          # Home page component
│   ├── loading.tsx       # Global loading UI
│   └── not-found.tsx     # 404 page
├── components/
│   ├── layout/
│   │   └── navigation-bar.tsx    # Main navigation component
│   ├── sections/
│   │   ├── menu-display.tsx      # Menu items grid
│   │   ├── search-bar.tsx        # Search functionality
│   │   └── checkout-sidebar.tsx  # Shopping cart & checkout
│   ├── ui/                # Reusable UI components (shadcn/ui)
│   └── theme-provider.tsx # Theme context provider
├── data/
│   └── menu.json         # Menu items data
├── hooks/                # Custom React hooks
├── lib/
│   ├── fonts.ts         # Font configurations
│   └── utils.ts         # Utility functions
├── public/              # Static assets (images)
└── styles/              # Additional stylesheets
```

## 🛠️ Built With

### Core Technologies
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Class Variance Authority](https://cva.style/)** - Component variants

## 🎨 Design System

### Color Palette
- **Warm Orange** - Primary brand color
- **Deep Amber** - Secondary accent
- **Berry Red** - Call-to-action elements
- **Glass Morphism** - Backdrop blur effects with transparency

### Typography
- **Inter** - Primary sans-serif font
- **Playfair Display** - Elegant serif for headings
- **Roboto Mono** - Monospace for code elements

### Components
- Consistent spacing using Tailwind's spacing scale
- Rounded corners with varying radii
- Smooth transitions and hover effects
- Responsive breakpoints for all screen sizes

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Enhanced layout for medium screens
- **Desktop Experience** - Full-featured desktop interface
- **Touch Friendly** - Appropriate touch targets and gestures

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configurations:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Customization

1. **Menu Items** - Edit `data/menu.json` to update menu content
2. **Styling** - Modify `tailwind.config.ts` for design system changes
3. **Fonts** - Update `lib/fonts.ts` to change typography
4. **Colors** - Adjust CSS variables in `app/globals.css`

## 📈 Performance

- **Lighthouse Score** - Optimized for Core Web Vitals
- **Image Optimization** - WebP/AVIF formats with proper sizing
- **Code Splitting** - Dynamic imports for better loading
- **Caching** - Optimized caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thai cuisine inspiration and authentic recipes
- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Unsplash](https://unsplash.com/) for beautiful food photography
- The Next.js team for the amazing framework

---

**Made with ❤️ for Thai food lovers everywhere**

*Experience the authentic taste of Thailand, delivered to your doorstep.*
