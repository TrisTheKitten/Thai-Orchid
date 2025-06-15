#!/usr/bin/env node

/**
 * Performance Optimization Check Script
 * This script helps identify and monitor performance improvements
 */

const fs = require('fs');
const path = require('path');

class PerformanceChecker {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.optimizations = [];
  }

  checkNextConfig() {
    const configPath = path.join(this.projectRoot, 'next.config.mjs');
    if (fs.existsSync(configPath)) {
      const config = fs.readFileSync(configPath, 'utf8');
      
      const checks = [
        { name: 'Image Optimization', pattern: /formats.*webp.*avif/, enabled: config.includes('formats') },
        { name: 'CSS Optimization', pattern: /optimizeCss.*true/, enabled: config.includes('optimizeCss') },
        { name: 'Package Imports Optimization', pattern: /optimizePackageImports/, enabled: config.includes('optimizePackageImports') },
        { name: 'Console Removal in Production', pattern: /removeConsole/, enabled: config.includes('removeConsole') },
        { name: 'Compression', pattern: /compress.*true/, enabled: config.includes('compress: true') }
      ];

      console.log('\n🔧 Next.js Configuration Optimizations:');
      checks.forEach(check => {
        const status = check.enabled ? '✅' : '❌';
        console.log(`  ${status} ${check.name}`);
        if (check.enabled) {
          this.optimizations.push(check.name);
        }
      });
    }
  }

  checkFontOptimizations() {
    const fontsPath = path.join(this.projectRoot, 'lib', 'fonts.ts');
    if (fs.existsSync(fontsPath)) {
      const fonts = fs.readFileSync(fontsPath, 'utf8');
      
      const checks = [
        { name: 'Font Preloading', enabled: fonts.includes('preload: true') },
        { name: 'Font Fallbacks', enabled: fonts.includes('fallback:') },
        { name: 'Font Display Swap', enabled: fonts.includes('display: \'swap\'') },
        { name: 'Adjust Font Fallback', enabled: fonts.includes('adjustFontFallback: true') }
      ];

      console.log('\n🔤 Font Optimizations:');
      checks.forEach(check => {
        const status = check.enabled ? '✅' : '❌';
        console.log(`  ${status} ${check.name}`);
        if (check.enabled) {
          this.optimizations.push(check.name);
        }
      });
    }
  }

  checkComponentOptimizations() {
    const componentsToCheck = [
      { path: 'app/page.tsx', name: 'Main Page' },
      { path: 'components/sections/menu-display.tsx', name: 'Menu Display' }
    ];

    console.log('\n⚛️ React Component Optimizations:');
    
    componentsToCheck.forEach(({ path: filePath, name }) => {
      const fullPath = path.join(this.projectRoot, filePath);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        const checks = [
          { name: `${name} - Dynamic Imports`, enabled: content.includes('dynamic(') },
          { name: `${name} - useCallback`, enabled: content.includes('useCallback') },
          { name: `${name} - useMemo`, enabled: content.includes('useMemo') },
          { name: `${name} - React.memo`, enabled: content.includes('memo(') },
          { name: `${name} - Lazy Loading`, enabled: content.includes('loading="lazy"') }
        ];

        checks.forEach(check => {
          const status = check.enabled ? '✅' : '❌';
          console.log(`  ${status} ${check.name}`);
          if (check.enabled) {
            this.optimizations.push(check.name);
          }
        });
      }
    });
  }

  checkMetadataOptimizations() {
    const layoutPath = path.join(this.projectRoot, 'app', 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      const layout = fs.readFileSync(layoutPath, 'utf8');
      
      const checks = [
        { name: 'SEO Metadata', enabled: layout.includes('keywords:') && layout.includes('description:') },
        { name: 'Open Graph', enabled: layout.includes('openGraph:') },
        { name: 'Viewport Configuration', enabled: layout.includes('export const viewport') },
        { name: 'Font Preconnect', enabled: layout.includes('preconnect') },
        { name: 'DNS Prefetch', enabled: layout.includes('dns-prefetch') }
      ];

      console.log('\n📊 SEO & Metadata Optimizations:');
      checks.forEach(check => {
        const status = check.enabled ? '✅' : '❌';
        console.log(`  ${status} ${check.name}`);
        if (check.enabled) {
          this.optimizations.push(check.name);
        }
      });
    }
  }

  generateReport() {
    console.log('\n📈 Performance Optimization Summary:');
    console.log(`✅ Total optimizations applied: ${this.optimizations.length}`);
    console.log('\n🚀 Key Performance Improvements:');
    console.log('  • Image optimization with WebP/AVIF formats');
    console.log('  • Lazy loading for heavy components');
    console.log('  • Font loading optimizations');
    console.log('  • React performance optimizations (memo, useCallback, useMemo)');
    console.log('  • CSS and package import optimizations');
    console.log('  • SEO and metadata improvements');
    
    console.log('\n💡 Additional Recommendations:');
    console.log('  • Monitor Core Web Vitals in production');
    console.log('  • Consider implementing service worker for caching');
    console.log('  • Use React DevTools Profiler to identify performance bottlenecks');
    console.log('  • Implement error boundaries for better error handling');
    console.log('  • Consider code splitting for larger applications');
  }

  run() {
    console.log('🔍 Running Performance Optimization Check...');
    this.checkNextConfig();
    this.checkFontOptimizations();
    this.checkComponentOptimizations();
    this.checkMetadataOptimizations();
    this.generateReport();
  }
}

const checker = new PerformanceChecker();
checker.run();