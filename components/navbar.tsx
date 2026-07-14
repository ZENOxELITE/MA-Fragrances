"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from "@/hooks/use-cart"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-foreground">MA Fragrances</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-foreground hover:text-accent transition">
            Home
          </a>
          <a href="/collections" className="text-foreground hover:text-accent transition">
            Collections
          </a>
          <a href="#" className="text-foreground hover:text-accent transition">
            About
          </a>
        </div>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center gap-4">
          <button className="relative" onClick={openCart} aria-label="Open shopping cart">
            <ShoppingCart className="w-6 h-6 text-foreground hover:text-accent transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <a href="/" className="block text-foreground hover:text-accent">
              Home
            </a>
            <a href="/collections" className="block text-foreground hover:text-accent">
              Collections
            </a>
            <a href="#" className="block text-foreground hover:text-accent">
              About
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
