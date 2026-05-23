export function HeroSection() {
  return (
    <section className="relative pt-[calc(4.5rem+env(safe-area-inset-top,0px))] pb-8 sm:pt-32 sm:pb-12">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in-up mx-auto max-w-4xl">
          <h1 className="mb-4 font-display text-[clamp(1.75rem,6vw,3.5rem)] font-bold leading-[1.15] bg-gradient-to-r from-warmOrange-600 via-deepAmber-600 to-berryRed-600 bg-clip-text text-transparent sm:mb-6 sm:leading-tight lg:text-6xl">
            Authentic Thai Cuisine
          </h1>
          <p className="mb-6 text-base font-light leading-relaxed text-charcoal-600 sm:mb-8 sm:text-lg md:text-xl">
            Experience the vibrant flavors of Thailand with traditional recipes and fresh
            ingredients
          </p>
          <div className="flex justify-center px-2">
            <div className="glass-blur inline-flex max-w-full flex-col items-center gap-2 rounded-2xl border border-white/40 px-3 py-2 sm:flex-row sm:gap-3 sm:rounded-full sm:px-4">
              <div className="flex -space-x-1" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-warmOrange-400 to-deepAmber-500 sm:h-8 sm:w-8"
                  />
                ))}
              </div>
              <span className="text-center text-xs font-medium text-charcoal-700 sm:ml-1 sm:text-sm">
                5000+ Happy Customers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
