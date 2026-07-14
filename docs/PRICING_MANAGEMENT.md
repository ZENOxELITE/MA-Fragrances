# Pricing Management Guide

This guide explains how to update prices, fees, and currency settings for The Formula Lab e-commerce website.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Product Prices](#product-prices)
3. [Shipping & Fees](#shipping--fees)
4. [Currency Settings](#currency-settings)
5. [Price Ranges & Filters](#price-ranges--filters)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

**All pricing is managed in one central file:**
\`\`\`
lib/config/pricing.ts
\`\`\`

**Current Currency:** Pakistani Rupees (PKR)

**Current Exchange Rate Used:** 1 USD ≈ Rs 280

---

## Product Prices

### Current Product Prices

| Product ID | Name | Price (PKR) |
|------------|------|-------------|
| 1 | Midnight Velvet | Rs 51,800 |
| 2 | Rose Ethereal | Rs 46,200 |
| 3 | Citrus Dawn | Rs 43,400 |
| 4 | Oud Luxe | Rs 68,600 |
| 5 | Floral Silk | Rs 49,000 |
| 6 | Ocean Breeze | Rs 40,600 |

### How to Update Product Prices

**Step 1:** Open `lib/config/pricing.ts`

**Step 2:** Find the `PRODUCT_PRICES` object:

\`\`\`typescript
export const PRODUCT_PRICES = {
  1: 51800,  // Midnight Velvet
  2: 46200,  // Rose Ethereal
  3: 43400,  // Citrus Dawn
  4: 68600,  // Oud Luxe
  5: 49000,  // Floral Silk
  6: 40600,  // Ocean Breeze
}
\`\`\`

**Step 3:** Update the price for any product:

\`\`\`typescript
export const PRODUCT_PRICES = {
  1: 55000,  // <-- Changed to Rs 55,000
  2: 46200,
  // ... rest unchanged
}
\`\`\`

**Step 4:** Save the file. Changes apply immediately across:
- Product detail pages
- Collections/catalog page
- Shopping cart
- Checkout
- Quiz recommendations

---

## Shipping & Fees

### Current Settings

| Setting | Value |
|---------|-------|
| Free Shipping Threshold | Rs 56,000 |
| Standard Shipping Cost | Rs 4,200 |
| COD Fee | Rs 1,400 |
| Tax Rate | 8% |

### How to Update Shipping Threshold

**File:** `lib/config/pricing.ts`

\`\`\`typescript
export const SHIPPING = {
  freeShippingThreshold: 56000, // Change this value
  standardShippingCost: 4200,    // Change this value
}
\`\`\`

**Example:** Make free shipping Rs 75,000:

\`\`\`typescript
export const SHIPPING = {
  freeShippingThreshold: 75000, // Updated
  standardShippingCost: 4200,
}
\`\`\`

### How to Update COD Fee

\`\`\`typescript
export const FEES = {
  codFee: 1400,        // Change this value
  taxRate: 0.08,       // Change tax rate (0.08 = 8%)
}
\`\`\`

**Example:** Increase COD fee to Rs 2,000:

\`\`\`typescript
export const FEES = {
  codFee: 2000,        // Updated to Rs 2,000
  taxRate: 0.08,
}
\`\`\`

---

## Currency Settings

### Change Currency Symbol

**File:** `lib/config/pricing.ts`

\`\`\`typescript
export const CURRENCY = {
  symbol: "Rs",        // Display symbol
  code: "PKR",         // Currency code
  name: "Pakistani Rupee",
}
\`\`\`

**Example:** Change to Indian Rupees:

\`\`\`typescript
export const CURRENCY = {
  symbol: "₹",
  code: "INR",
  name: "Indian Rupee",
}
\`\`\`

### Convert All Prices to Different Currency

**Method 1: Use Exchange Rate Multiplier**

1. Find current exchange rate (e.g., 1 PKR = 0.30 INR)
2. Multiply all prices in `PRODUCT_PRICES` by the rate
3. Update `SHIPPING` and `FEES` values similarly

**Method 2: Manual Conversion**

Update each price individually based on your target pricing strategy.

---

## Price Ranges & Filters

### Collection Page Price Filters

The price range slider on the collections page is configured in:

**File:** `lib/config/pricing.ts`

\`\`\`typescript
export const PRICE_RANGES = {
  min: 39200,          // Minimum filter value
  max: 70000,          // Maximum filter value
  step: 1000,          // Slider step size
}
\`\`\`

**To Update:**

\`\`\`typescript
export const PRICE_RANGES = {
  min: 35000,          // New minimum
  max: 80000,          // New maximum
  step: 2000,          // Larger steps
}
\`\`\`

### Quiz Budget Categories

Budget categories for the scent finder quiz:

\`\`\`typescript
export const BUDGET_CATEGORIES = {
  budget: {
    label: "Budget-Friendly (Rs 40,600 - Rs 46,200)",
    min: 40600,
    max: 46200,
  },
  midrange: {
    label: "Mid-Range (Rs 46,200 - Rs 53,200)",
    min: 46200,
    max: 53200,
  },
  premium: {
    label: "Premium (Rs 53,200+)",
    min: 53200,
    max: Infinity,
  },
}
\`\`\`

**To Update:** Change the labels and min/max values for each category.

---

## Helper Functions

The pricing file includes helper functions used throughout the site:

### Format Price
\`\`\`typescript
formatPrice(51800) // Returns: "Rs 51,800"
\`\`\`

### Calculate Shipping
\`\`\`typescript
calculateShipping(60000) // Returns: 0 (free shipping)
calculateShipping(45000) // Returns: 4200
\`\`\`

### Calculate Tax
\`\`\`typescript
calculateTax(50000) // Returns: 4000 (8% of 50000)
\`\`\`

### Calculate Total
\`\`\`typescript
calculateTotal(50000, "cod")
// Returns: {
//   subtotal: 50000,
//   shipping: 4200,
//   tax: 4000,
//   codFee: 1400,
//   total: 59600
// }
\`\`\`

---

## Examples

### Example 1: Seasonal Sale (20% Off)

Apply 20% discount to all products:

\`\`\`typescript
export const PRODUCT_PRICES = {
  1: 41440,  // Was 51800, now 51800 * 0.8
  2: 36960,  // Was 46200, now 46200 * 0.8
  3: 34720,  // Was 43400, now 43400 * 0.8
  4: 54880,  // Was 68600, now 68600 * 0.8
  5: 39200,  // Was 49000, now 49000 * 0.8
  6: 32480,  // Was 40600, now 40600 * 0.8
}
\`\`\`

### Example 2: Free Shipping Promotion

Remove shipping charges temporarily:

\`\`\`typescript
export const SHIPPING = {
  freeShippingThreshold: 0,     // Free for all orders
  standardShippingCost: 0,
}
\`\`\`

### Example 3: Remove COD Fee

\`\`\`typescript
export const FEES = {
  codFee: 0,           // No COD fee
  taxRate: 0.08,
}
\`\`\`

---

## Troubleshooting

### Prices Not Updating

**Problem:** Changed prices in `pricing.ts` but still seeing old prices

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart development server (`npm run dev`)
3. Check if you imported `PRODUCT_PRICES` correctly in component files

### Incorrect Currency Symbol

**Problem:** Showing "$" instead of "Rs"

**Solutions:**
1. Verify `CURRENCY.symbol` in `lib/config/pricing.ts` is set to "Rs"
2. Check component files are using `formatPrice()` function
3. Search for hardcoded "$" symbols: `grep -r "\$" components/`

### Cart Total Calculation Wrong

**Problem:** Checkout total doesn't match expected amount

**Solutions:**
1. Verify `calculateTotal()` function is being used
2. Check tax rate is correct (0.08 = 8%)
3. Confirm COD fee is applied only for COD orders
4. Check shipping threshold calculation

---

## Best Practices

1. **Always use `formatPrice()` function** - Never hardcode currency symbols
2. **Test checkout flow** - After price changes, complete a test order
3. **Update price ranges** - If prices change significantly, update filter ranges
4. **Keep documentation updated** - Add comments when making changes
5. **Backup before major changes** - Save a copy of `pricing.ts` before bulk updates
6. **Test all payment methods** - Ensure COD fee applies correctly

---

## Quick Reference

### Files to Check

- `lib/config/pricing.ts` - Main pricing configuration
- `components/product-details-content.tsx` - Product pages
- `components/collections-page.tsx` - Collections with filters
- `components/cart-panel.tsx` - Shopping cart
- `components/checkout-modal.tsx` - Checkout calculations
- `components/scent-finder-quiz.tsx` - Quiz recommendations

### Common Tasks

| Task | Location | Field to Change |
|------|----------|-----------------|
| Change product price | `pricing.ts` | `PRODUCT_PRICES[id]` |
| Update COD fee | `pricing.ts` | `FEES.codFee` |
| Change shipping cost | `pricing.ts` | `SHIPPING.standardShippingCost` |
| Free shipping threshold | `pricing.ts` | `SHIPPING.freeShippingThreshold` |
| Tax rate | `pricing.ts` | `FEES.taxRate` |
| Currency symbol | `pricing.ts` | `CURRENCY.symbol` |
| Price filter range | `pricing.ts` | `PRICE_RANGES` |

---

## Support

If you encounter issues not covered in this guide:

1. Check the browser console for errors
2. Review the `pricing.ts` file for typos
3. Ensure all imports are correct
4. Test with a fresh browser session
5. Check that values are numbers, not strings

**Remember:** All pricing changes in `lib/config/pricing.ts` automatically apply across the entire website!
