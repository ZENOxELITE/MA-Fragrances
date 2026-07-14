# Collections Management Guide

## Overview
This guide explains how to manage the collections/categories display on The Formula Lab website.

## Collections Component Location
Main collections component: `components/collections-page.tsx`

## How Collections Work

Collections are **automatically generated** from your product data. The system:
1. Reads all products from the product database
2. Groups them by their `category` field (Men, Women, Unisex)
3. Groups them by their `family` field (Oriental, Floral, Fresh, Woody)
4. Allows filtering by price ranges

## Modifying Collection Categories

### Current Categories
The filter categories are defined in `components/collections-page.tsx`:

\`\`\`typescript
const categories = [
  "All",
  "Men",
  "Women", 
  "Unisex"
]
\`\`\`

### Adding a New Category

1. Open `components/collections-page.tsx`
2. Find the `categories` array
3. Add your new category

\`\`\`typescript
const categories = [
  "All",
  "Men",
  "Women", 
  "Unisex",
  "Limited Edition" // New category added
]
\`\`\`

4. Update products in `components/product-details-content.tsx` with the new category:

\`\`\`typescript
{
  id: 7,
  name: "Special Edition",
  category: "Limited Edition", // Use new category
  // ... other fields
}
\`\`\`

## Modifying Fragrance Families

### Current Families
\`\`\`typescript
const families = [
  "All",
  "Oriental",
  "Floral",
  "Fresh",
  "Woody"
]
\`\`\`

### Adding a New Family

1. Open `components/collections-page.tsx`
2. Find the `families` array
3. Add your new family

\`\`\`typescript
const families = [
  "All",
  "Oriental",
  "Floral",
  "Fresh",
  "Woody",
  "Citrus" // New family added
]
\`\`\`

4. Assign products to the new family in the product database

## Customizing Price Ranges

Current price ranges are defined in the filter section:

\`\`\`typescript
// Find this section in the filter UI
<div className="space-y-2">
  <label className="flex items-center gap-2">
    <input type="checkbox" />
    <span>Under $50</span>
  </label>
  // ... more ranges
</div>
\`\`\`

### Modifying Price Ranges

1. Open `components/collections-page.tsx`
2. Find the price filter section
3. Update the price range labels and logic:

\`\`\`typescript
// Change from:
if (priceRange === 'under50' && product.price >= 50) return false;

// To your custom range:
if (priceRange === 'under100' && product.price >= 100) return false;
\`\`\`

## Sorting Options

Current sorting options:
- Price: Low to High
- Price: High to Low
- Highest Rated
- Alphabetical

### Adding Custom Sort

1. Find the sorting logic in `components/collections-page.tsx`
2. Add new case to the sort switch:

\`\`\`typescript
const sortProducts = (products: typeof allProducts) => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    // ... existing cases
    case 'newest': // New sort option
      return sorted.sort((a, b) => b.id - a.id);
    default:
      return sorted;
  }
};
\`\`\`

3. Add UI for the new sort option:

\`\`\`typescript
<option value="newest">Newest First</option>
\`\`\`

## Display Settings

### Products Per Row

Desktop grid is set to 3 columns:
\`\`\`tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
\`\`\`

**To change to 4 columns:**
\`\`\`tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
\`\`\`

**To change to 2 columns:**
\`\`\`tsx
<div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
\`\`\`

### Card Spacing

Current gap is `gap-6` (1.5rem). To modify:

\`\`\`tsx
// Larger spacing
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

// Smaller spacing
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
\`\`\`

## Collection Hero Section

The collections page includes a hero banner at the top.

### Editing Hero Text

1. Open `components/collections-page.tsx`
2. Find the hero section:

\`\`\`tsx
<div className="text-center py-16 border-b border-border">
  <h1 className="font-serif text-4xl md:text-5xl mb-4">
    Our Collection // Edit this
  </h1>
  <p className="text-muted-foreground max-w-2xl mx-auto">
    Discover your signature scent // Edit this
  </p>
</div>
\`\`\`

### Adding Hero Background Image

Replace the plain background with an image:

\`\`\`tsx
<div 
  className="text-center py-16 border-b border-border bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/collections-hero.jpg)' }}
>
  <div className="bg-black/50 py-16"> {/* Add overlay */}
    <h1 className="font-serif text-4xl md:text-5xl mb-4 text-white">
      Our Collection
    </h1>
  </div>
</div>
\`\`\`

## Mobile Responsiveness

### Filter Toggle
On mobile, filters are hidden behind a toggle button. This is controlled by:

\`\`\`typescript
const [showFilters, setShowFilters] = useState(false);
\`\`\`

To show filters by default on mobile:
\`\`\`typescript
const [showFilters, setShowFilters] = useState(true);
\`\`\`

## Tips

1. **Keep It Simple**: Don't add too many categories or families
2. **Consistent Naming**: Use clear, customer-friendly names
3. **Test Filters**: After changes, test all filter combinations
4. **Mobile First**: Always check how changes look on mobile devices

## Troubleshooting

### Products Not Filtering
- Check that product categories match filter options exactly (case-sensitive)
- Verify the filter logic in the `filteredProducts` calculation

### Sort Not Working
- Ensure the sort option value matches the switch case
- Check that products have the required fields (price, rating, name)

### Layout Broken on Mobile
- Test with browser dev tools mobile view
- Verify Tailwind responsive classes (md:, lg:) are correct

---

**Last Updated:** [Current Date]
**Component:** `components/collections-page.tsx`
