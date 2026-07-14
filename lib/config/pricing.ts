/**
 * PRICING CONFIGURATION
 * All prices in Pakistani Rupees (PKR)
 *
 * To update prices:
 * 1. Modify the values in this file
 * 2. Changes will automatically apply across the entire website
 */

export const CURRENCY = {
  symbol: "Rs",
  code: "PKR",
  name: "Pakistani Rupee",
}

// Product Prices (in PKR) - Base prices for 100ml
export const PRODUCT_PRICES = {
  1: 4000, // Midnight Velvet
  2: 3500, // Rose Ethereal
  3: 2500, // Citrus Dawn
  4: 7000, // Oud Luxe
  5: 3800, // Floral Silk
  6: 2000, // Ocean Breeze
}

// Volume multipliers for pricing calculation
export const VOLUME_MULTIPLIERS = {
  "50ml": 0.5,
  "75ml": 0.75,
  "100ml": 1.0,
  "200ml": 1.9,
}

// Shipping & Fees Configuration
export const SHIPPING = {
  freeShippingThreshold: 56000, // Free shipping over Rs 56,000 (was $200)
  standardShippingCost: 4200, // Rs 4,200 standard shipping (was $15)
}

export const FEES = {
  codFee: 200, // Cash on Delivery fee: Rs 200
  taxRate: 0.08, // 8% tax rate
}

// Price Range for Filters (in PKR)
export const PRICE_RANGES = {
  min: 1500, // Minimum price Rs 1,500
  max: 7000, // Maximum price Rs 7,000
  step: 100, // Price slider step
}

// Budget categories for quiz
export const BUDGET_CATEGORIES = {
  budget: {
    label: "Budget-Friendly (Rs 1,500 - Rs 3,500)",
    min: 1500,
    max: 3500,
  },
  midrange: {
    label: "Mid-Range (Rs 3,500 - Rs 5,500)",
    min: 3500,
    max: 5500,
  },
  premium: {
    label: "Premium (Rs 5,500+)",
    min: 5500,
    max: Number.POSITIVE_INFINITY,
  },
}

// Helper function to format price in PKR
export function formatPrice(amount: number): string {
  return `${CURRENCY.symbol} ${amount.toLocaleString("en-PK")}`
}

// Helper function to calculate shipping cost
export function calculateShipping(subtotal: number): number {
  return subtotal >= SHIPPING.freeShippingThreshold ? 0 : SHIPPING.standardShippingCost
}

// Helper function to calculate tax
export function calculateTax(subtotal: number): number {
  return subtotal * FEES.taxRate
}

// Helper function to calculate COD fee
export function calculateCODFee(paymentMethod: string): number {
  return paymentMethod === "cod" ? FEES.codFee : 0
}

// Helper function to calculate total
export function calculateTotal(
  subtotal: number,
  paymentMethod = "card",
): {
  subtotal: number
  shipping: number
  tax: number
  codFee: number
  total: number
} {
  const shipping = calculateShipping(subtotal)
  const tax = calculateTax(subtotal)
  const codFee = calculateCODFee(paymentMethod)
  const total = subtotal + shipping + tax + codFee

  return { subtotal, shipping, tax, codFee, total }
}
