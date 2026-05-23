import { GlassCard, GlassCardBody } from '@/components/ui/glass-card'

export function AboutSection() {
  return (
    <section id="about" className="mt-12 py-10 sm:mt-20 sm:py-16">
      <div className="mb-8 text-center sm:mb-12">
        <h2 className="mb-3 font-display text-2xl font-bold bg-gradient-to-r from-charcoal-700 to-charcoal-500 bg-clip-text text-transparent sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
          About Thai Orchid
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-charcoal-600 sm:text-base md:text-lg">
          Bringing authentic Thai flavors to your table since 1995
        </p>
      </div>
      <div className="grid items-start gap-8 sm:gap-12 md:grid-cols-2">
        <div className="min-w-0 space-y-4 sm:space-y-6">
          <h3 className="text-xl font-bold text-charcoal-800 sm:text-2xl">Our Story</h3>
          <p className="leading-relaxed text-charcoal-600">
            Founded by Chef Siriporn in 1995, Thai Orchid began as a small family restaurant with a
            simple mission: to share the authentic flavors of Thailand with our community. Using
            traditional recipes passed down through generations and the freshest ingredients imported
            directly from Thailand, we create dishes that transport you to the bustling streets of
            Bangkok.
          </p>
          <p className="leading-relaxed text-charcoal-600">
            Every dish is prepared with love and attention to detail, honoring the rich culinary
            heritage of Thailand while adapting to local tastes. From our signature Pad Thai to our
            aromatic curries, each meal is a celebration of Thai culture and hospitality.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-4 sm:gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-warmOrange-600 sm:text-2xl">28+</div>
              <div className="text-[11px] leading-tight text-charcoal-600 sm:text-sm">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warmOrange-600 sm:text-2xl">5000+</div>
              <div className="text-[11px] leading-tight text-charcoal-600 sm:text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warmOrange-600 sm:text-2xl">50+</div>
              <div className="text-[11px] leading-tight text-charcoal-600 sm:text-sm">Authentic Dishes</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <GlassCard
            variant="feature"
            className="bg-gradient-to-br from-warmOrange-100/90 to-deepAmber-100/90"
          >
            <GlassCardBody className="p-5 sm:p-8">
              <h4 className="mb-3 text-lg font-bold text-charcoal-800 sm:mb-4 sm:text-xl">What Makes Us Special</h4>
              <ul className="space-y-3 text-charcoal-600">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-warmOrange-600" aria-hidden>
                    •
                  </span>
                  <span>Fresh ingredients imported directly from Thailand</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-warmOrange-600" aria-hidden>
                    •
                  </span>
                  <span>Traditional family recipes passed down for generations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-warmOrange-600" aria-hidden>
                    •
                  </span>
                  <span>Authentic cooking techniques and methods</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-warmOrange-600" aria-hidden>
                    •
                  </span>
                  <span>Warm Thai hospitality and service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-warmOrange-600" aria-hidden>
                    •
                  </span>
                  <span>Customizable spice levels for every palate</span>
                </li>
              </ul>
            </GlassCardBody>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
