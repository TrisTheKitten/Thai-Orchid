export function HeroSection() {
  return (
    <section className="relative pt-32 pb-12">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in-up mx-auto max-w-4xl px-4">
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight bg-gradient-to-r from-warmOrange-600 via-deepAmber-600 to-berryRed-600 bg-clip-text text-transparent sm:text-5xl md:text-7xl">
            Authentic Thai Cuisine
          </h1>
          <p className="mb-8 text-lg font-light leading-relaxed text-charcoal-600 sm:text-xl md:text-2xl">
            Experience the vibrant flavors of Thailand with traditional recipes and fresh
            ingredients
          </p>
          <div className="inline-flex items-center gap-4">
            <div className="glass-blur inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2">
              <div className="flex -space-x-1" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-warmOrange-400 to-deepAmber-500"
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-charcoal-700">
                5000+ Happy Customers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
