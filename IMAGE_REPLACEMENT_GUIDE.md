# Product Image Replacement Guide - The Formula Lab

This guide explains how to replace placeholder product images with your actual perfume bottle photographs across The Formula Lab e-commerce website.

---

## 📁 Image File Structure

All product images are stored in the `/public/images/` directory. The website expects the following image files:

\`\`\`
public/
└── images/
    ├── midnight-velvet.jpg
    ├── rose-ethereal.jpg
    ├── citrus-dawn.jpg
    ├── oud-luxe.jpg
    ├── floral-silk.jpg
    └── ocean-breeze.jpg
\`\`\`

---

## 🖼️ Image Requirements

### Recommended Specifications

| Property | Requirement |
|----------|-------------|
| **Format** | JPG, PNG, or WebP |
| **Dimensions** | 800x800px to 2000x2000px (square aspect ratio) |
| **File Size** | Under 500KB per image (optimized) |
| **Background** | Transparent (PNG) or solid white/light color |
| **Quality** | High resolution (300 DPI for print quality) |
| **Orientation** | Portrait or centered square |

### Photography Tips

1. **Lighting**: Use soft, diffused lighting to avoid harsh shadows
2. **Background**: Clean, minimalist background (white, light gray, or transparent)
3. **Angle**: Straight-on or slightly angled (15-30 degrees) for product visibility
4. **Consistency**: Use the same setup for all products to maintain visual consistency
5. **Focus**: Ensure the bottle is sharp and in focus, especially the label and cap details

---

## 📝 Step-by-Step Replacement Process

### Step 1: Prepare Your Images

1. **Take or source high-quality photos** of each perfume bottle
2. **Edit photos** to remove background (if needed) and adjust brightness/contrast
3. **Resize images** to at least 1200x1200px (square)
4. **Optimize file size** using tools like:
   - TinyPNG (https://tinypng.com/)
   - ImageOptim (Mac)
   - Squoosh (https://squoosh.app/)
5. **Rename files** according to the product names listed below

### Step 2: Product Image Mapping

Replace these files with your actual product images:

| Product Name | File Name | Product ID |
|--------------|-----------|------------|
| Midnight Velvet | `midnight-velvet.jpg` | 1 |
| Rose Ethereal | `rose-ethereal.jpg` | 2 |
| Citrus Dawn | `citrus-dawn.jpg` | 3 |
| Oud Luxe | `oud-luxe.jpg` | 4 |
| Floral Silk | `floral-silk.jpg` | 5 |
| Ocean Breeze | `ocean-breeze.jpg` | 6 |

### Step 3: Upload Images

#### Option A: Direct File Upload (Recommended)

1. Navigate to your project's `/public/images/` directory
2. Delete the placeholder images (if any)
3. Upload your prepared product images with the exact file names listed above
4. Verify all files are in place

#### Option B: Using Git

\`\`\`bash
# Navigate to your project directory
cd your-project-folder

# Add images to the public/images directory
cp /path/to/your/images/*.jpg public/images/

# Commit and push changes
git add public/images/
git commit -m "feat: add product images for Formula Lab fragrances"
git push origin main
\`\`\`

#### Option C: Using Vercel Dashboard (if deployed)

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" or "Files" section
3. Upload images to the appropriate directory
4. Redeploy your project if necessary

---

## 🔧 Where Images Are Used

Your product images appear in the following components:

### 1. **Hero Section** (`components/product-showcase.tsx`)
- Large featured product image
- Hover effects and transitions
- Mobile responsive sizing

### 2. **Collections Page** (`components/collections-page.tsx`)
- Grid view of all products
- Filter and search functionality
- Hover zoom effect

### 3. **Product Gallery** (`components/collections.tsx`)
- Category-based product display
- Interactive card layout

### 4. **Product Detail Pages** (`components/product-details-content.tsx`)
- Main product visualization
- Full-screen image display
- Zoom and interaction features

### 5. **Shopping Cart** (`components/cart-panel.tsx`)
- Thumbnail previews in cart items
- Checkout summary display

### 6. **Scent Finder Quiz** (`components/scent-finder-quiz.tsx`)
- Quiz result product showcase
- Recommendation grid

---

## 📊 Adding New Products

If you want to add new products to your catalog:

### Step 1: Add Image File

Upload the new product image to `/public/images/` with a descriptive name:
\`\`\`
public/images/new-product-name.jpg
\`\`\`

### Step 2: Update Product Data

Add the product to the relevant component files. Here are the main locations:

#### **Product Showcase** (`components/product-showcase.tsx`)
\`\`\`typescript
const products = [
  // ... existing products
  {
    id: 7,
    name: "New Product Name",
    category: "Masculine/Feminine/Unisex",
    price: "$XXX",
    notes: "Note1, Note2, Note3",
    description: "Product description",
    concentration: "Eau de Parfum",
    volume: "100ml",
    image: "/images/new-product-name.jpg",
  },
]
\`\`\`

#### **Collections Page** (`components/collections-page.tsx`)
\`\`\`typescript
const allProducts: Product[] = [
  // ... existing products
  {
    id: 7,
    name: "New Product Name",
    category: "masculine", // or "feminine", "unisex"
    family: "Woody", // Fragrance family
    price: 199,
    rating: 4.5,
    image: "/images/new-product-name.jpg",
  },
]
\`\`\`

#### **Product Details** (`components/product-details-content.tsx`)
\`\`\`typescript
const productDatabase = {
  // ... existing products
  "7": {
    name: "New Product Name",
    category: "Masculine",
    price: 199,
    rating: 4.5,
    reviews: 0,
    image: "/images/new-product-name.jpg",
    // ... add all other product details
  },
}
\`\`\`

---

## 🚀 Image Optimization Best Practices

### Before Uploading

1. **Compress images** without losing quality
2. **Remove EXIF data** for privacy and smaller file sizes
3. **Use WebP format** for better compression (if browser support allows)
4. **Create @2x versions** for retina displays (optional)

### Next.js Image Component Features

The website uses Next.js `Image` component which provides:
- **Automatic optimization**: Images are optimized on-demand
- **Lazy loading**: Images load as users scroll
- **Responsive images**: Serves appropriate sizes for different devices
- **WebP conversion**: Automatically converts to WebP when supported

---

## 🎨 Styling Consistency

All product images are displayed with:

- **Padding**: 8-32px inside containers (adjusts based on screen size)
- **Background**: Gradient from accent/5 to secondary/5
- **Border radius**: 16-24px (rounded corners)
- **Hover effects**: Scale up to 110% on hover
- **Object-fit**: `contain` to preserve aspect ratio

These styles ensure your images look professional and consistent across the site.

---

## 📱 Mobile Responsiveness

Images automatically adjust for mobile devices:

- **Small screens** (< 640px): Full width, optimized for mobile bandwidth
- **Tablets** (640px - 1024px): Grid layout with 50% width
- **Desktop** (> 1024px): Grid layout with 33% width

The Next.js Image component handles responsive sizing automatically via the `sizes` prop.

---

## 🛠️ Troubleshooting

### Images Not Showing?

1. **Check file names**: Ensure they match exactly (case-sensitive)
2. **Verify file path**: Files must be in `/public/images/`
3. **Check file format**: Ensure you're using JPG, PNG, or WebP
4. **Clear cache**: Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
5. **Redeploy**: If using Vercel, trigger a new deployment

### Images Look Pixelated?

1. **Increase source resolution**: Use at least 1200x1200px images
2. **Check compression settings**: Don't over-compress
3. **Verify image quality**: Use high-quality original photos

### Images Load Slowly?

1. **Reduce file size**: Aim for under 300KB per image
2. **Use WebP format**: Better compression than JPG/PNG
3. **Enable CDN**: Vercel automatically serves images via CDN
4. **Check optimization**: Next.js Image component should auto-optimize

### Wrong Images Appearing?

1. **Clear browser cache**: Old images might be cached
2. **Check localStorage**: Clear application data in DevTools
3. **Verify file names**: Ensure correct mapping in code

---

## 📞 Support

If you encounter issues or need assistance:

1. Check the browser console for error messages
2. Verify all file paths and names are correct
3. Test in an incognito/private browser window
4. Clear your browser cache and try again

---

## ✅ Final Checklist

Before going live:

- [ ] All 6 product images uploaded to `/public/images/`
- [ ] Images are optimized (under 500KB each)
- [ ] File names match exactly with product mapping
- [ ] Images have consistent style and quality
- [ ] Tested on mobile, tablet, and desktop
- [ ] Images load quickly and display correctly
- [ ] Shopping cart thumbnails work properly
- [ ] Product detail pages show correct images
- [ ] No broken image placeholders visible

---

**Last Updated**: December 2024  
**Website**: The Formula Lab Fragrance E-commerce  
**Framework**: Next.js 16 with App Router
