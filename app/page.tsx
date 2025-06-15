'use client'

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Search, Star, Clock, Users } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useToast } from "@/hooks/use-toast"

import { NavigationBar } from "@/components/layout/navigation-bar"
import { SearchBar } from "@/components/sections/search-bar"
import type { MenuItem } from "@/components/sections/menu-display"
import type { CartItem, CheckoutStep, PaymentMethod, DeliveryFormData, PaymentFormData, FormErrors } from "@/components/sections/checkout-sidebar"
import menuData from "../data/menu.json"

const MenuDisplay = dynamic(() => import("@/components/sections/menu-display").then(mod => ({ default: mod.MenuDisplay })), {
  loading: () => <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-warmOrange-600"></div></div>,
  ssr: true
})

const CheckoutSidebar = dynamic(() => import("@/components/sections/checkout-sidebar").then(mod => ({ default: mod.CheckoutSidebar })), {
  loading: () => null,
  ssr: false
})

const menuItems: MenuItem[] = menuData


export default function Home() {
  const { toast } = useToast()
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")

  const handleCartIconClick = useCallback(() => {
    setIsCartOpen(!isCartOpen);
    setCheckoutStep("cart");
  }, [isCartOpen]);

  const totalItemsCalculated = useMemo(() => 
    cart.reduce((acc, item) => acc + item.quantity, 0), [cart]
  );

  const [deliveryForm, setDeliveryForm] = useState<DeliveryFormData>({
    name: "",
    address: "",
    phone: "",
    instructions: "",
  })

  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  })

  const [formErrors, setFormErrors] = useState<{
    delivery: Partial<Record<keyof DeliveryFormData, string>>
    payment: Partial<Record<keyof PaymentFormData, string>>
  }>({
    delivery: {},
    payment: {},
  })

  const filteredItems = useMemo(() => {
    if (searchQuery.trim() === "") {
      return menuItems
    }
    const query = searchQuery.toLowerCase()
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    )
  }, [searchQuery])

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1, description: item.description, image: item.image, category: item.category }]
      }
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    const itemToRemove = menuItems.find((item) => item.id === itemId)

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== itemId)
      }
    })

    if (itemToRemove) {
      toast({
        title: "Removed from cart",
        description: `${itemToRemove.name} has been removed from your cart.`,
        duration: 2000,
      })
    }
  }, [])

  const totalItems = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0), [cart]
  )

  const totalPrice = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]
  )

  const handleDeliveryFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDeliveryForm((prev) => ({ ...prev, [name]: value }))

    if (formErrors.delivery[name as keyof DeliveryFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        delivery: {
          ...prev.delivery,
          [name]: "",
        },
      }))
    }
  }, [formErrors.delivery])

  const handlePaymentFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentForm((prev) => ({ ...prev, [name]: value }))

    if (formErrors.payment[name as keyof PaymentFormData]) {
      setFormErrors((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          [name]: "",
        },
      }))
    }
  }, [formErrors.payment])

  const validateDeliveryForm = () => {
    const errors: Partial<Record<keyof DeliveryFormData, string>> = {}

    if (!deliveryForm.name.trim()) {
      errors.name = "Name is required"
    }

    if (!deliveryForm.address.trim()) {
      errors.address = "Address is required"
    }

    if (!deliveryForm.phone.trim()) {
      errors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(deliveryForm.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid phone number"
    }

    setFormErrors((prev) => ({ ...prev, delivery: errors }))
    return Object.keys(errors).length === 0
  }

  const validatePaymentForm = () => {
    if (paymentMethod === "qrcode") return true

    const errors: Partial<Record<keyof PaymentFormData, string>> = {}

    if (!paymentForm.cardName.trim()) {
      errors.cardName = "Name on card is required"
    }

    if (!paymentForm.cardNumber.trim()) {
      errors.cardNumber = "Card number is required"
    } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\D/g, ""))) {
      errors.cardNumber = "Please enter a valid 16-digit card number"
    }

    if (!paymentForm.expiry.trim()) {
      errors.expiry = "Expiry date is required"
    } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiry)) {
      errors.expiry = "Please use MM/YY format"
    }

    if (!paymentForm.cvv.trim()) {
      errors.cvv = "CVV is required"
    } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      errors.cvv = "Please enter a valid CVV"
    }

    setFormErrors((prev) => ({ ...prev, payment: errors }))
    return Object.keys(errors).length === 0
  }

  const nextCheckoutStep = () => {
    if (checkoutStep === "cart") {
      if (cart.length === 0) {
        toast({
          title: "Cart is empty",
          description: "Please add items to your cart before proceeding to checkout.",
          variant: "destructive",
        })
        return
      }
      setCheckoutStep("delivery")
    } else if (checkoutStep === "delivery") {
      if (validateDeliveryForm()) {
        setCheckoutStep("payment")
      } else {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
      }
    } else if (checkoutStep === "payment") {
      if (validatePaymentForm()) {
        setCheckoutStep("confirmation")
        toast({
          title: "Order placed successfully!",
          description: "Your order has been confirmed.",
        })
      } else {
        toast({
          title: "Missing information",
          description: "Please fill in all required payment fields.",
          variant: "destructive",
        })
      }
    }
  }

  const prevCheckoutStep = () => {
    if (checkoutStep === "delivery") setCheckoutStep("cart")
    else if (checkoutStep === "payment") setCheckoutStep("delivery")
    else if (checkoutStep === "confirmation") setCheckoutStep("payment")
  }

  const referenceNumber = Math.floor(10000000 + Math.random() * 90000000).toString()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-warmWhite via-softCream-100 to-warmOrange-50 text-charcoal-800">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -left-[15%] h-[70%] w-[50%] rounded-full bg-gradient-to-br from-warmOrange-200/25 to-sunshineYellow-300/25 blur-3xl animate-float" />
        <div className="absolute top-[50%] left-[70%] h-[50%] w-[35%] rounded-full bg-gradient-to-br from-berryRed-200/20 to-berryRed-300/20 blur-3xl" style={{animationDelay: '2s'}} />
        <div className="absolute -bottom-[40%] -right-[15%] h-[70%] w-[50%] rounded-full bg-gradient-to-br from-deepAmber-200/25 to-warmOrange-300/25 blur-3xl animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-[20%] left-[20%] h-[30%] w-[25%] rounded-full bg-gradient-to-br from-freshMint-200/15 to-freshMint-300/15 blur-2xl" style={{animationDelay: '3s'}} />
      </div>

      <NavigationBar onCartIconClick={handleCartIconClick} totalItems={totalItemsCalculated} />

      <section className="relative pt-32 pb-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-warmOrange-600 via-deepAmber-600 to-berryRed-600 bg-clip-text text-transparent leading-tight">
              Authentic Thai Cuisine
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-charcoal-600 mb-8 font-light leading-relaxed">
              Experience the vibrant flavors of Thailand with traditional recipes and fresh ingredients
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-warmOrange-400 to-deepAmber-500 border-2 border-white" />
                  ))}
                </div>
                <span className="text-sm font-medium text-charcoal-700 ml-2">5000+ Happy Customers</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            filteredItemsLength={filteredItems.length} 
          />
        </motion.div>

        <motion.div
          id="menu"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-12 px-4"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-charcoal-700 to-charcoal-500 bg-clip-text text-transparent">
              Our Menu
            </h2>
            <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto px-4">
              Each dish is carefully crafted using authentic Thai ingredients and traditional cooking methods
            </p>
          </div>
          <MenuDisplay 
            items={filteredItems} 
            onAddToCart={addToCart} 
          />
        </motion.div>

        <motion.section
          id="about"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-charcoal-700 to-charcoal-500 bg-clip-text text-transparent">
              About Thai Orchid
            </h2>
            <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
              Bringing authentic Thai flavors to your table since 1995
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-charcoal-700">Our Story</h3>
              <p className="text-charcoal-600 leading-relaxed">
                Founded by Chef Siriporn in 1995, Thai Orchid began as a small family restaurant with a simple mission: 
                to share the authentic flavors of Thailand with our community. Using traditional recipes passed down 
                through generations and the freshest ingredients imported directly from Thailand, we create dishes that 
                transport you to the bustling streets of Bangkok.
              </p>
              <p className="text-charcoal-600 leading-relaxed">
                Every dish is prepared with love and attention to detail, honoring the rich culinary heritage of Thailand 
                while adapting to local tastes. From our signature Pad Thai to our aromatic curries, each meal is a 
                celebration of Thai culture and hospitality.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-warmOrange-600">28+</div>
                  <div className="text-sm text-charcoal-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warmOrange-600">5000+</div>
                  <div className="text-sm text-charcoal-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warmOrange-600">50+</div>
                  <div className="text-sm text-charcoal-600">Authentic Dishes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-warmOrange-100 to-deepAmber-100 rounded-2xl p-8 shadow-glass-lg">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-charcoal-700">What Makes Us Special</h4>
                  <ul className="space-y-3 text-charcoal-600">
                    <li className="flex items-start gap-3">
                      <span className="text-warmOrange-600 font-bold">•</span>
                      <span>Fresh ingredients imported directly from Thailand</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warmOrange-600 font-bold">•</span>
                      <span>Traditional family recipes passed down for generations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warmOrange-600 font-bold">•</span>
                      <span>Authentic cooking techniques and methods</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warmOrange-600 font-bold">•</span>
                      <span>Warm Thai hospitality and service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-warmOrange-600 font-bold">•</span>
                      <span>Customizable spice levels for every palate</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 sm:mt-20 py-12 sm:py-16 px-4"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-charcoal-700 to-charcoal-500 bg-clip-text text-transparent">
              Visit Us Today
            </h2>
            <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto px-4">
              Come experience authentic Thai cuisine in a warm and welcoming atmosphere
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-glass-lg">
              <h3 className="text-xl font-bold text-charcoal-700 mb-4">Location</h3>
              <div className="space-y-2 text-charcoal-600">
                <p>123 Thai Street</p>
                <p>Bangkok District</p>
                <p>City, State 12345</p>
                <p className="pt-2 text-warmOrange-600 font-medium">Easy parking available</p>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-glass-lg">
              <h3 className="text-xl font-bold text-charcoal-700 mb-4">Hours</h3>
              <div className="space-y-2 text-charcoal-600">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span>11:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Saturday</span>
                  <span>11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>12:00 PM - 8:00 PM</span>
                </div>
                <p className="pt-2 text-warmOrange-600 font-medium">Closed on major holidays</p>
              </div>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-glass-lg">
              <h3 className="text-xl font-bold text-charcoal-700 mb-4">Contact</h3>
              <div className="space-y-2 text-charcoal-600">
                <p><span className="font-medium">Phone:</span> (555) 123-THAI</p>
                <p><span className="font-medium">Email:</span> hello@thaiorchid.com</p>
                <p><span className="font-medium">Website:</span> www.thaiorchid.com</p>
                <div className="pt-4">
                  <p className="text-warmOrange-600 font-medium mb-2">Follow Us:</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-warmOrange-100 text-warmOrange-700 rounded-full text-sm">Facebook</span>
                    <span className="px-3 py-1 bg-warmOrange-100 text-warmOrange-700 rounded-full text-sm">Instagram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <div className="bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Order?</h3>
              <p className="mb-6 text-sm sm:text-base">Call us for takeout or delivery, or visit us for the full Thai Orchid experience!</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  onClick={() => window.open('tel:+15551234824', '_self')}
                  className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-warmOrange-600 rounded-lg font-medium hover:bg-warmOrange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  📞 Call for Takeout
                </button>

              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <CheckoutSidebar
            closeSidebar={() => setIsCartOpen(false)}
            checkoutStep={checkoutStep}
            cart={cart}
            totalPrice={totalPrice}
            menuItems={menuItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            nextCheckoutStep={nextCheckoutStep}
            prevCheckoutStep={prevCheckoutStep}
            deliveryForm={deliveryForm}
            handleDeliveryFormChange={handleDeliveryFormChange}
            paymentForm={paymentForm}
            handlePaymentFormChange={handlePaymentFormChange}
            formErrors={formErrors}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            referenceNumber={referenceNumber}
            toast={toast}
            setCart={setCart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
