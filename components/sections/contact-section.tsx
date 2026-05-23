import { GlassCard, GlassCardBody } from '@/components/ui/glass-card'

export function ContactSection() {
  return (
    <section id="contact" className="mt-10 py-10 sm:mt-20 sm:py-16">
      <div className="mb-6 text-center sm:mb-12">
        <h2 className="mb-3 font-display text-2xl font-bold bg-gradient-to-r from-charcoal-700 to-charcoal-500 bg-clip-text text-transparent sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
          Visit Us Today
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-charcoal-600 sm:text-base md:text-lg">
          Come experience authentic Thai cuisine in a warm and welcoming atmosphere
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8">
        <GlassCard variant="default">
          <GlassCardBody className="p-6 sm:p-7">
            <h3 className="mb-4 text-xl font-bold text-charcoal-800">Location</h3>
            <div className="space-y-2 text-charcoal-600">
              <p>123 Thai Street</p>
              <p>Bangkok District</p>
              <p>City, State 12345</p>
              <p className="pt-2 font-medium text-warmOrange-600">Easy parking available</p>
            </div>
          </GlassCardBody>
        </GlassCard>
        <GlassCard variant="default">
          <GlassCardBody className="p-6 sm:p-7">
            <h3 className="mb-4 text-xl font-bold text-charcoal-800">Hours</h3>
            <div className="space-y-2 text-charcoal-600">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span>Monday - Thursday</span>
                <span className="font-medium text-charcoal-700 sm:shrink-0">11:00 AM - 9:00 PM</span>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span>Friday - Saturday</span>
                <span className="font-medium text-charcoal-700 sm:shrink-0">11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span>Sunday</span>
                <span className="font-medium text-charcoal-700 sm:shrink-0">12:00 PM - 8:00 PM</span>
              </div>
              <p className="pt-2 font-medium text-warmOrange-600">Closed on major holidays</p>
            </div>
          </GlassCardBody>
        </GlassCard>
        <GlassCard variant="default">
          <GlassCardBody className="p-6 sm:p-7">
            <h3 className="mb-4 text-xl font-bold text-charcoal-800">Contact</h3>
            <div className="space-y-2 text-charcoal-600">
              <p>
                <span className="font-medium text-charcoal-700">Phone:</span> (555) 123-THAI
              </p>
              <p>
                <span className="font-medium text-charcoal-700">Email:</span> hello@thaiorchid.com
              </p>
              <p>
                <span className="font-medium text-charcoal-700">Website:</span> www.thaiorchid.com
              </p>
              <div className="pt-4">
                <p className="mb-2 font-medium text-warmOrange-600">Follow Us:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-warmOrange-100 px-3 py-1 text-sm text-warmOrange-700">
                    Facebook
                  </span>
                  <span className="rounded-full bg-warmOrange-100 px-3 py-1 text-sm text-warmOrange-700">
                    Instagram
                  </span>
                </div>
              </div>
            </div>
          </GlassCardBody>
        </GlassCard>
      </div>
      <div className="mt-8 text-center sm:mt-12">
        <div className="rounded-2xl bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 p-5 text-white sm:p-8">
          <h3 className="mb-4 text-xl font-bold sm:text-2xl">Ready to Order?</h3>
          <p className="mb-6 text-sm sm:text-base">
            Call us for takeout or delivery, or visit us for the full Thai Orchid experience!
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="tel:+15551234824"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-warmOrange-600 shadow-lg transition-all duration-300 hover:bg-warmOrange-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-warmOrange-600 sm:px-6 sm:py-3 sm:text-base"
            >
              Call for Takeout
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
