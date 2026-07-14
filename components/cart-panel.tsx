"use client"

import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import { useState } from "react"
import { CheckoutModal } from "./checkout-modal"
import { formatPrice } from "@/lib/config/pricing"

export function CartPanel() {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, closeCart } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  if (!isCartOpen) return null

  const handleCheckout = () => {
    closeCart()
    setIsCheckoutOpen(true)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">Shopping Cart</h2>
          </div>
          <button onClick={closeCart} className="p-2 hover:bg-muted rounded-full transition" aria-label="Close cart">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-20 h-20 text-muted mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground">Add some luxury fragrances to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.volume}`}
                  className="bg-muted/30 rounded-xl p-4 border border-border/50 hover:border-accent/50 transition"
                >
                  <div className="flex gap-4">
                    {/* Static Image Preview */}
                    <div className="w-24 h-24 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <p className="text-sm text-accent font-semibold mt-1">{item.volume}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.volume)}
                          className="text-muted-foreground hover:text-destructive transition p-1"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.volume, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-foreground" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.volume, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                        <p className="font-bold text-lg text-accent">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between text-xl font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-accent">{formatPrice(totalPrice)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-foreground text-background rounded-full font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={closeCart}
                className="w-full py-3 text-foreground hover:text-accent transition-colors font-semibold"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}
