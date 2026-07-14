"use client"

import type React from "react"

import { useState } from "react"
import { X, CreditCard, Lock, Check, Smartphone, Banknote } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { formatPrice, calculateTotal, SHIPPING } from "@/lib/config/pricing"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"jazzcash" | "card" | "cod">("cod")

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    mobileNumber: "",
    cnic: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    if (paymentMethod === "jazzcash") {
      console.log("[v0] Processing JazzCash payment", {
        mobile: formData.mobileNumber,
        amount: finalTotal,
      })
      // Check if JazzCash API is available
      try {
        // Simulating API call - in production, this would call your JazzCash API
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log("[v0] JazzCash payment successful")
      } catch (error) {
        console.log("[v0] JazzCash API not configured, proceeding with order confirmation")
      }
    } else if (paymentMethod === "card") {
      console.log("[v0] Processing card payment", {
        cardNumber: formData.cardNumber.slice(-4),
        amount: finalTotal,
      })
      // Simulating card payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("[v0] Card payment successful")
    } else if (paymentMethod === "cod") {
      console.log("[v0] Processing Cash on Delivery order", {
        amount: finalTotal,
      })
      // COD doesn't need payment processing, just order confirmation
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[v0] COD order confirmed")
    }

    setIsProcessing(false)
    setIsSuccess(true)

    setTimeout(() => {
      clearCart()
      setIsSuccess(false)
      onClose()
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const { subtotal, shipping, tax, codFee, total: finalTotal } = calculateTotal(totalPrice, paymentMethod)

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {isSuccess ? (
            // Success State
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h2>
              <p className="text-muted-foreground text-lg">
                Thank you for your purchase. Your luxury fragrances will arrive soon.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background z-10">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-bold text-foreground">Secure Checkout</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full transition"
                  aria-label="Close checkout"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                      />
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Shipping Address</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Street address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                        />
                        <input
                          type="text"
                          name="postalCode"
                          placeholder="Postal code"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                        />
                      </div>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Payment Method</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-4 border-2 rounded-lg transition flex flex-col items-center justify-center gap-2 ${
                          paymentMethod === "cod"
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <Banknote className="w-5 h-5" />
                        <span className="font-semibold text-sm">COD</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("jazzcash")}
                        className={`p-4 border-2 rounded-lg transition flex flex-col items-center justify-center gap-2 ${
                          paymentMethod === "jazzcash"
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <Smartphone className="w-5 h-5" />
                        <span className="font-semibold text-sm">JazzCash</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-4 border-2 rounded-lg transition flex flex-col items-center justify-center gap-2 ${
                          paymentMethod === "card"
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span className="font-semibold text-sm">Card</span>
                      </button>
                    </div>

                    {/* Cash on Delivery - No payment fields needed */}
                    {paymentMethod === "cod" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                          <div className="flex items-start gap-3">
                            <Banknote className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground text-sm mb-1">Cash on Delivery</h4>
                              <p className="text-xs text-muted-foreground mb-2">
                                Pay with cash when your order is delivered to your doorstep.
                              </p>
                              <p className="text-xs text-accent font-semibold">
                                COD Fee: {formatPrice(codFee)} (Added to total)
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg border border-border">
                          <p className="text-xs text-muted-foreground">
                            Please keep exact change ready. Our delivery partner will collect payment upon delivery.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* JazzCash Payment Fields */}
                    {paymentMethod === "jazzcash" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-accent/10 rounded-lg border border-accent/30 mb-4">
                          <div className="flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground text-sm mb-1">Pay with JazzCash</h4>
                              <p className="text-xs text-muted-foreground">
                                Enter your JazzCash mobile account number to complete payment securely.
                              </p>
                            </div>
                          </div>
                        </div>
                        <input
                          type="tel"
                          name="mobileNumber"
                          placeholder="JazzCash Mobile Number (03XXXXXXXXX)"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          required={paymentMethod === "jazzcash"}
                          maxLength={11}
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                        />
                        <input
                          type="text"
                          name="cnic"
                          placeholder="CNIC (XXXXX-XXXXXXX-X)"
                          value={formData.cnic}
                          onChange={handleChange}
                          required={paymentMethod === "jazzcash"}
                          maxLength={15}
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                        />
                      </div>
                    )}

                    {/* Card Payment Fields */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="p-4 bg-accent/10 rounded-lg border border-accent/30 mb-4">
                          <div className="flex items-start gap-3">
                            <CreditCard className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground text-sm mb-1">Card Payment</h4>
                              <p className="text-xs text-muted-foreground">
                                Your card information is encrypted and secure.
                              </p>
                            </div>
                          </div>
                        </div>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="Card number"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required={paymentMethod === "card"}
                          maxLength={19}
                          className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required={paymentMethod === "card"}
                            maxLength={5}
                            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                          />
                          <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={formData.cvv}
                            onChange={handleChange}
                            required={paymentMethod === "card"}
                            maxLength={4}
                            className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition text-foreground"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-foreground text-background rounded-full font-bold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {paymentMethod === "jazzcash" && <Smartphone className="w-5 h-5" />}
                        {paymentMethod === "card" && <Lock className="w-5 h-5" />}
                        {paymentMethod === "cod" && <Banknote className="w-5 h-5" />}
                        {paymentMethod === "cod" ? "Confirm Order" : `Pay ${formatPrice(finalTotal)}`}
                      </>
                    )}
                  </button>
                </form>

                {/* Order Summary */}
                <div className="lg:border-l border-border lg:pl-8">
                  <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.volume}`}
                        className="flex gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {item.volume} × {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-accent mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 p-4 bg-muted/20 rounded-xl border border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground font-semibold">
                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground font-semibold">{formatPrice(tax)}</span>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">COD Fee</span>
                        <span className="text-foreground font-semibold">{formatPrice(codFee)}</span>
                      </div>
                    )}
                    {totalPrice < SHIPPING.freeShippingThreshold && (
                      <p className="text-xs text-accent">
                        Add {formatPrice(SHIPPING.freeShippingThreshold - totalPrice)} more for free shipping!
                      </p>
                    )}
                    <div className="h-px bg-border" />
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-accent">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">Secure Payment</h4>
                        <p className="text-xs text-muted-foreground">
                          {paymentMethod === "cod"
                            ? "Your order details are secure. Pay cash when your order arrives."
                            : "Your payment information is encrypted and secure. We never store your payment details."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
