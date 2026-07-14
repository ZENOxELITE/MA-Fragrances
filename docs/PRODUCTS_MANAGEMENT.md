# Products Management Guide

## Overview
This guide explains how to add, edit, or delete products on The Formula Lab website.

## Product Data Location
All products are stored in: `components/product-details-content.tsx`

## Product Structure

Each product has the following properties:

\`\`\`typescript
{
  id: number,              // Unique identifier
  name: string,            // Product name
  price: number,           // Price in USD
  volume: string,          // Default volume (e.g., "50ml")
  rating: number,          // Average rating (1-5)
  reviews: number,         // Number of reviews
  description: string,     // Short description
  image: string,           // Path to product image (e.g., "/images/midnight-velvet.jpg")
  family: string,          // Fragrance family (Oriental, Floral, Fresh, Woody)
  concentration: string,   // Type (Eau de Parfum, Eau de Toilette, etc.)
  inStock: boolean,        // Stock status
  bestseller: boolean,     // Bestseller badge
  category: string,        // Category (Men, Women, Unisex)
  notes: {
    top: string[],         // Top notes array
    heart: string[],       // Heart/middle notes array
    base: string[]         // Base notes array
  }
}
\`\`\`

## Adding a New Product

### Step 1: Prepare Product Image
1. Get a high-quality product image (recommended: 800x1200px, JPEG format)
2. Save it to: `public/images/your-product-name.jpg`
3. Use kebab-case for filename (e.g., `vanilla-dream.jpg`)

### Step 2: Add Product to Database
Open `components/product-details-content.tsx` and add your product to the `products` array:

\`\`\`typescript
{
  id: 5, // Use next available ID
  name: "Vanilla Dream",
  price: 89.99,
  volume: "50ml",
  rating: 4.7,
  reviews: 45,
  description: "A warm and comforting vanilla-based fragrance with hints of caramel and musk.",
  image: "/images/vanilla-dream.jpg",
  family: "Oriental",
  concentration: "Eau de Parfum",
  inStock: true,
  bestseller: false,
  category: "Unisex",
  notes: {
    top: ["Bergamot", "Caramel"],
    heart: ["Vanilla", "Jasmine"],
    base: ["Musk", "Sandalwood"]
  }
}
\`\`\`

### Step 3: Verify Product Display
- Visit `/collections` to see your product in the grid
- Visit `/products/5` (or your product ID) to see the detail page
- Check the scent finder quiz results if applicable

## Editing an Existing Product

1. Open `components/product-details-content.tsx`
2. Find the product by ID in the `products` array
3. Update any field you need to change
4. Save the file

**Example: Changing Price**
\`\`\`typescript
// Before
price: 129.99,

// After
price: 99.99,
\`\`\`

**Example: Marking Out of Stock**
\`\`\`typescript
// Before
inStock: true,

// After
inStock: false,
\`\`\`

## Deleting a Product

1. Open `components/product-details-content.tsx`
2. Find the product in the `products` array
3. Remove the entire product object
4. Save the file

**Warning:** Make sure to remove the trailing comma if it's the last item in the array.

## Product Categories

Available categories:
- `Men` - Men's fragrances
- `Women` - Women's fragrances
- `Unisex` - For everyone

## Fragrance Families

Available families:
- `Oriental` - Warm, spicy, exotic scents
- `Floral` - Flower-based fragrances
- `Fresh` - Light, citrusy, aquatic scents
- `Woody` - Earthy, forest-inspired fragrances

## Concentration Types

- `Eau de Parfum` - Strong, 15-20% concentration
- `Eau de Toilette` - Medium, 5-15% concentration
- `Eau de Cologne` - Light, 2-4% concentration
- `Parfum` - Very strong, 20-30% concentration

## Tips

1. **Consistent Naming**: Use descriptive names that customers will recognize
2. **Accurate Pricing**: Keep prices competitive and consistent
3. **Quality Images**: High-resolution images significantly improve sales
4. **Detailed Notes**: Comprehensive fragrance notes help customers decide
5. **Stock Status**: Always keep stock status updated
6. **Bestseller Badge**: Only mark truly popular products as bestsellers

## Troubleshooting

### Product Not Showing
- Check that the product ID is unique
- Verify the image path is correct
- Make sure there are no syntax errors in the JSON structure

### Image Not Loading
- Verify the image file exists in `public/images/`
- Check the file extension matches (`.jpg` vs `.png`)
- Ensure the path starts with `/images/`

### Price Not Updating
- Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check for any JavaScript errors in the console

---

**Last Updated:** [Current Date]
**Component:** `components/product-details-content.tsx`
