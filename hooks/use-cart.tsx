"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  volume: string
  quantity: number
  image: string // Added image property to replace 3D bottle data
  category: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, volume: string) => void
  updateQuantity: (id: string, volume: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("luxe-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("luxe-cart", JSON.stringify(items))
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((current) => {
      const existingItem = current.find((i) => i.id === item.id && i.volume === item.volume)
      if (existingItem) {
        return current.map((i) =>
          i.id === item.id && i.volume === item.volume ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...current, item]
    })
    setIsCartOpen(true)
  }

  const removeItem = (id: string, volume: string) => {
    setItems((current) => current.filter((item) => !(item.id === id && item.volume === volume)))
  }

  const updateQuantity = (id: string, volume: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, volume)
      return
    }
    setItems((current) =>
      current.map((item) => (item.id === id && item.volume === volume ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
