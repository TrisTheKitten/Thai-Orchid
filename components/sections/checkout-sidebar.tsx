'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Minus, Plus, ArrowRight, CreditCard, QrCode, ShoppingBag, Check, MapPin, Phone, User, Mail, Clock, Star, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MenuItem } from './menu-display';

export interface CartItem extends MenuItem {
  quantity: number;
}

export type CheckoutStep = "cart" | "delivery" | "payment" | "confirmation";
export type PaymentMethod = "card" | "qrcode";

export interface DeliveryFormData {
  name: string;
  address: string;
  phone: string;
  instructions: string;
}

export interface PaymentFormData {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export interface FormErrors {
  delivery: Partial<DeliveryFormData>;
  payment: Partial<PaymentFormData>;
}

interface CheckoutSidebarProps {
  closeSidebar: () => void;
  checkoutStep: CheckoutStep;
  cart: CartItem[];
  totalPrice: number;
  menuItems: MenuItem[]; 
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  nextCheckoutStep: () => void;
  prevCheckoutStep: () => void;
  deliveryForm: DeliveryFormData;
  handleDeliveryFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  paymentForm: PaymentFormData;
  handlePaymentFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: FormErrors;
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
  referenceNumber: string;
  toast: ({ title, description }: { title: string; description: string; }) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CheckoutSidebar: React.FC<CheckoutSidebarProps> = ({
  closeSidebar,
  checkoutStep,
  cart,
  totalPrice,
  menuItems,
  addToCart,
  removeFromCart,
  nextCheckoutStep,
  prevCheckoutStep,
  deliveryForm,
  handleDeliveryFormChange,
  paymentForm,
  handlePaymentFormChange,
  formErrors,
  paymentMethod,
  setPaymentMethod,
  referenceNumber,
  toast,
  setCart,
}) => {
  return (
    <motion.div
      key="sidebar"
      className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg transform flex-col bg-gradient-to-br from-white/95 via-warmOrange-50/90 to-sunshineYellow-50/85 shadow-glass-xl backdrop-blur-2xl transition-transform duration-300 ease-in-out rounded-l-3xl border-l border-white/30"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div 
        className="relative flex items-center justify-between p-6 border-b border-white/30 bg-gradient-to-r from-warmOrange-50/60 to-deepAmber-50/60 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 rounded-full bg-gradient-to-br from-warmOrange-500 to-deepAmber-600 text-white shadow-glass-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {checkoutStep === "cart" && <ShoppingBag className="h-5 w-5" />}
            {checkoutStep === "delivery" && <Truck className="h-5 w-5" />}
            {checkoutStep === "payment" && <CreditCard className="h-5 w-5" />}
            {checkoutStep === "confirmation" && <Check className="h-5 w-5" />}
          </motion.div>
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal-800">
              {checkoutStep === "cart" && "Your Cart"}
              {checkoutStep === "delivery" && "Delivery Details"}
              {checkoutStep === "payment" && "Payment"}
              {checkoutStep === "confirmation" && "Order Confirmed"}
            </h2>
            <p className="text-sm text-charcoal-600">
              {checkoutStep === "cart" && `${cart.length} items selected`}
              {checkoutStep === "delivery" && "Where should we deliver?"}
              {checkoutStep === "payment" && "Choose your payment method"}
              {checkoutStep === "confirmation" && "Thank you for your order!"}
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={closeSidebar} 
          className="h-10 w-10 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 text-charcoal-600 hover:bg-white/70 hover:text-charcoal-800 transition-all duration-300"
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <motion.div
            className="h-full bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 rounded-full"
            initial={{ width: "25%" }}
            animate={{ 
              width: checkoutStep === "cart" ? "25%" : 
                     checkoutStep === "delivery" ? "50%" : 
                     checkoutStep === "payment" ? "75%" : "100%" 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <div className="flex flex-1 flex-col overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {checkoutStep === "cart" && (
            <motion.div
              key="cart-items"
              className="flex flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {cart.length === 0 ? (
                <motion.div 
                  className="flex flex-1 flex-col items-center justify-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="p-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-6"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-charcoal-700 mb-2">Your cart is empty</h3>
                  <p className="text-charcoal-500 mb-6 text-center px-4">Add some delicious items from our menu to get started!</p>
                  <Button
                    onClick={closeSidebar}
                    className="bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 hover:from-warmOrange-600 hover:to-deepAmber-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-glass-sm"
                  >
                    Browse Menu
                  </Button>
                </motion.div>
              ) : (
                <>
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-3">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm p-4 shadow-glass-sm hover:shadow-glass-md border border-white/40 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="relative overflow-hidden rounded-xl">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="h-16 w-16 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-charcoal-800 group-hover:text-warmOrange-700 transition-colors">{item.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-lg font-bold bg-gradient-to-r from-warmOrange-600 to-deepAmber-600 bg-clip-text text-transparent">
                                    ฿{(item.price * item.quantity).toFixed(0)}
                                  </span>
                                  <span className="text-sm text-charcoal-500">@ ฿{item.price.toFixed(0)} each</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3 w-3 fill-sunshineYellow-400 text-sunshineYellow-400" />
                                  <span className="text-xs text-charcoal-600">{item.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full border border-warmOrange-300/50 text-warmOrange-600 hover:bg-warmOrange-100/50 hover:border-warmOrange-400 transition-all duration-300"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-bold text-charcoal-800 bg-white/50 rounded-full py-1">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full border border-warmOrange-300/50 text-warmOrange-600 hover:bg-warmOrange-100/50 hover:border-warmOrange-400 transition-all duration-300"
                                onClick={() => addToCart(menuItems.find((menuItem) => menuItem.id === item.id)!)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>

                  <motion.div 
                    className="mt-auto bg-white/70 backdrop-blur-md rounded-t-2xl p-6 border-t border-white/40 shadow-glass-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-charcoal-600">Subtotal</span>
                        <span className="font-medium">฿{totalPrice.toFixed(0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-charcoal-600">Delivery Fee</span>
                        <span className="font-medium text-freshMint-600">Free</span>
                      </div>
                      <div className="border-t border-white/30 pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-charcoal-700">Total</span>
                          <span className="font-display text-2xl font-bold bg-gradient-to-r from-warmOrange-600 to-deepAmber-600 bg-clip-text text-transparent">
                            ฿{totalPrice.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 hover:from-warmOrange-600 hover:to-deepAmber-700 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-glass-sm hover:shadow-glass-md"
                      onClick={nextCheckoutStep}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Proceed to Checkout 
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
 
          {checkoutStep === "delivery" && (
            <motion.div
              key="delivery"
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <form className="space-y-4 flex-1">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-warmOrange-700">
                    Full Name*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={deliveryForm.name}
                    onChange={handleDeliveryFormChange}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="John Doe"
                  />
                  {formErrors.delivery.name && (
                    <p className="mt-1 text-sm text-berryRed-500">{formErrors.delivery.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-warmOrange-700">
                    Delivery Address*
                  </label>
                  <Input
                    id="address"
                    name="address"
                    value={deliveryForm.address}
                    onChange={handleDeliveryFormChange}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="123 Main St"
                  />
                  {formErrors.delivery.address && (
                    <p className="mt-1 text-sm text-berryRed-500">{formErrors.delivery.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-warmOrange-700">
                    Phone Number*
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={deliveryForm.phone}
                    onChange={handleDeliveryFormChange}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="(555) 123-4567"
                  />
                  {formErrors.delivery.phone && (
                    <p className="mt-1 text-sm text-berryRed-500">{formErrors.delivery.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="instructions" className="block text-sm font-medium text-warmOrange-700">
                    Delivery Instructions (Optional)
                  </label>
                  <Input
                    id="instructions"
                    name="instructions"
                    value={deliveryForm.instructions}
                    onChange={handleDeliveryFormChange}
                    className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                    placeholder="Leave at door, etc."
                  />
                </div>
              </form>

              <div className="mt-auto glass-lg rounded-t-glass p-6 shadow-glass-md">
                <div className="mb-4 flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    className="glass-button border-charcoal-200/50 text-charcoal-700 hover:bg-charcoal-50/50 hover:text-charcoal-800 hover:shadow-glass-hover transition-all duration-300" 
                    onClick={prevCheckoutStep}
                  >
                    Back to Cart
                  </Button>
                  <span className="font-display text-xl font-bold text-warmOrange-600">${totalPrice.toFixed(2)}</span>
                </div>
                <Button 
                  className="glass-button w-full bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 font-medium text-white transition-all duration-300 hover:from-warmOrange-600 hover:to-deepAmber-700 hover:shadow-glass-hover" 
                  onClick={nextCheckoutStep}
                >
                  Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {checkoutStep === "payment" && (
            <motion.div
              key="payment"
              className="flex-1 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex-1">
                <Tabs
                  defaultValue="card"
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                  className="w-full"
                >
                  <TabsList className="glass-sm grid w-full grid-cols-2 bg-white/40 backdrop-blur-sm rounded-glass-sm overflow-hidden shadow-glass-sm border border-warmOrange-100/30">
                    <TabsTrigger 
                      value="card" 
                      className="data-[state=active]:bg-white/70 data-[state=active]:text-warmOrange-600 data-[state=active]:shadow-glass-inner text-charcoal-600 transition-all duration-300"
                    >
                      <CreditCard className="mr-2 h-4 w-4" /> Credit Card
                    </TabsTrigger>
                    <TabsTrigger 
                      value="qrcode" 
                      className="data-[state=active]:bg-white/70 data-[state=active]:text-warmOrange-600 data-[state=active]:shadow-glass-inner text-charcoal-600 transition-all duration-300"
                    >
                      <QrCode className="mr-2 h-4 w-4" /> Thailand QR
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-warmOrange-700">
                        Name on Card*
                      </label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={paymentForm.cardName}
                        onChange={handlePaymentFormChange}
                        className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                        placeholder="John Doe"
                      />
                      {formErrors.payment.cardName && (
                        <p className="mt-1 text-sm text-berryRed-500">{formErrors.payment.cardName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-warmOrange-700">
                        Card Number*
                      </label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentForm.cardNumber}
                        onChange={handlePaymentFormChange}
                        className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                        placeholder="1234 5678 9012 3456"
                      />
                      {formErrors.payment.cardNumber && (
                        <p className="mt-1 text-sm text-berryRed-500">{formErrors.payment.cardNumber}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-warmOrange-700">
                          Expiry Date*
                        </label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={paymentForm.expiry}
                          onChange={handlePaymentFormChange}
                          className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                          placeholder="MM/YY"
                        />
                        {formErrors.payment.expiry && (
                          <p className="mt-1 text-sm text-berryRed-500">{formErrors.payment.expiry}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-warmOrange-700">
                          CVV*
                        </label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={paymentForm.cvv}
                          onChange={handlePaymentFormChange}
                          className="glass-input border-warmOrange-100/30 bg-white/60 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-warmOrange-500/50 focus-visible:ring-offset-0"
                          placeholder="123"
                        />
                        {formErrors.payment.cvv && (
                          <p className="mt-1 text-sm text-berryRed-500">{formErrors.payment.cvv}</p>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="qrcode" className="mt-4">
                    <div className="relative flex flex-col items-center justify-center space-y-4 rounded-glass glass-lg bg-white/60 p-6 backdrop-blur-md shadow-glass-md">
                      <h3 className="text-lg font-medium text-warmOrange-700">Thailand PromptPay QR Code</h3>
                      <div className="rounded-glass glass-sm bg-white/80 p-4 shadow-glass-sm">
                        <Image
                          src="/placeholder.svg?height=200&width=200&query=qr-code"
                          alt="QR Code for payment"
                          width={200}
                          height={200}
                          className="h-48 w-48"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="rounded-glass-sm bg-white/80 px-4 py-2 backdrop-blur-sm shadow-glass-inner">
                           <p className="text-center text-sm font-medium text-warmOrange-700">
                             Scan with your banking app
                           </p>
                         </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-warmOrange-700">Amount: ฿{(totalPrice * 35).toFixed(2)}</p>
                        <p className="text-sm text-warmOrange-700">Reference: {referenceNumber}</p>
                        <p className="mt-2 text-xs text-warmOrange-600">
                          Scan this QR code with any Thai banking app that supports PromptPay
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="mt-auto glass-lg rounded-t-glass p-6 shadow-glass-md">
                <div className="mb-4 flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    className="glass-button border-charcoal-200/50 text-charcoal-700 hover:bg-charcoal-50/50 hover:text-charcoal-800 hover:shadow-glass-hover transition-all duration-300" 
                    onClick={prevCheckoutStep}
                  >
                    Back
                  </Button>
                  <span className="font-display text-xl font-bold text-warmOrange-600">
                    ฿{totalPrice.toFixed(0)}
                  </span>
                </div>
                <Button 
                  className="glass-button w-full bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 font-medium text-white transition-all duration-300 hover:from-warmOrange-600 hover:to-deepAmber-700 hover:shadow-glass-hover" 
                  onClick={nextCheckoutStep}
                >
                  {paymentMethod === "card" ? "Complete Payment" : "I've Paid with QR Code"}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {checkoutStep === "confirmation" && (
            <motion.div
              key="confirmation"
              className="flex flex-1 flex-col items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-full bg-gradient-to-r from-freshMint-300 to-freshMint-400 p-4 shadow-glass-sm">
                <Check strokeWidth={2} className="h-16 w-16 text-freshMint-700" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-warmOrange-700">Order Confirmed!</h3>
              <p className="mt-2 text-warmOrange-600">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>
              <div className="mt-8 rounded-glass glass-lg border border-warmOrange-100/30 bg-white/60 p-6 backdrop-blur-md shadow-glass-md">
                <p className="text-lg font-semibold text-warmOrange-700">Estimated Delivery Time:</p>
                <p className="font-display text-2xl font-bold text-warmOrange-600">30-45 minutes</p>
                {paymentMethod === "qrcode" && (
                  <p className="mt-2 text-sm text-warmOrange-500">Payment Reference: {referenceNumber}</p>
                )}
              </div>
              <Button
                className="mt-8 glass-button bg-gradient-to-r from-warmOrange-500 to-deepAmber-600 font-medium text-white transition-all duration-300 hover:from-warmOrange-600 hover:to-deepAmber-700 hover:shadow-glass-hover"
                onClick={() => {
                  closeSidebar();
                  setCart([]); 
                }}
              >
                Back to Menu
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CheckoutSidebar;
export { CheckoutSidebar };
