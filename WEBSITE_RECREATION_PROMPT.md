# The Formula Lab - Luxury Fragrance E-Commerce Website Recreation Prompt

Use this complete prompt to recreate The Formula Lab website with all features, functionality, and design specifications.

---

## Project Overview

Build a luxury fragrance e-commerce website called **"The Formula Lab"** using Next.js 14.x, React 18.x, and TypeScript. The website should be a premium, mobile-responsive online store for selling fragrances with advanced features including product catalog, filtering, quiz functionality, shopping cart, and payment integration.

---

## Technology Stack

- **Framework**: Next.js 14.2.18 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v3 with shadcn/ui components
- **Icons**: Lucide React
- **Fonts**: 
  - Playfair Display (headings)
  - Montserrat (body text)
- **Image Optimization**: Next.js Image component
- **State Management**: React Context API (for cart)
- **Storage**: localStorage (for cart persistence)

---

## Color Palette (HSL Format)

### Light Mode:
\`\`\`css
--background: 0 0% 100%;          /* Pure white */
--foreground: 0 0% 3.9%;          /* Almost black text */
--card: 0 0% 100%;                /* White cards */
--card-foreground: 0 0% 3.9%;     /* Dark text on cards */
--popover: 0 0% 100%;             /* White popovers */
--popover-foreground: 0 0% 3.9%;  /* Dark text in popovers */
--primary: 0 0% 9%;               /* Very dark gray/black */
--primary-foreground: 0 0% 98%;   /* Off-white text */
--secondary: 0 0% 96.1%;          /* Light gray */
--secondary-foreground: 0 0% 9%;  /* Dark text */
--muted: 0 0% 96.1%;              /* Muted gray */
--muted-foreground: 0 0% 45.1%;   /* Medium gray text */
--accent: 0 0% 96.1%;             /* Accent gray */
--accent-foreground: 0 0% 9%;     /* Dark accent text */
--destructive: 0 84.2% 60.2%;     /* Red for errors */
--destructive-foreground: 0 0% 98%; /* White text on red */
--border: 0 0% 89.8%;             /* Light border */
--input: 0 0% 89.8%;              /* Input border */
--ring: 0 0% 3.9%;                /* Focus ring */
--radius: 0.5rem;                 /* Border radius */
\`\`\`

### Dark Mode:
\`\`\`css
--background: 0 0% 3.9%;          /* Very dark background */
--foreground: 0 0% 98%;           /* Off-white text */
--card: 0 0% 3.9%;                /* Dark cards */
--card-foreground: 0 0% 98%;      /* Light text on cards */
--popover: 0 0% 3.9%;             /* Dark popovers */
--popover-foreground: 0 0% 98%;   /* Light text in popovers */
--primary: 0 0% 98%;              /* Off-white primary */
--primary-foreground: 0 0% 9%;    /* Dark text */
--secondary: 0 0% 14.9%;          /* Medium dark gray */
--secondary-foreground: 0 0% 98%; /* Light text */
--muted: 0 0% 14.9%;              /* Muted dark gray */
--muted-foreground: 0 0% 63.9%;   /* Medium light gray text */
--accent: 0 0% 14.9%;             /* Accent dark gray */
--accent-foreground: 0 0% 98%;    /* Light accent text */
--destructive: 0 62.8% 30.6%;     /* Dark red */
--destructive-foreground: 0 0% 98%; /* White text on red */
--border: 0 0% 14.9%;             /* Dark border */
--input: 0 0% 14.9%;              /* Input border */
--ring: 0 0% 83.1%;               /* Focus ring */
\`\`\`

---

## Design Guidelines

- **Aesthetic**: Luxury, minimalist, premium
- **Typography**: 
  - Headings: Playfair Display (serif, elegant)
  - Body: Montserrat (sans-serif, clean)
- **Layout**: Mobile-first, responsive design
- **Spacing**: Ample white space for premium feel
- **Animations**: Subtle hover effects, smooth transitions
- **Images**: High-quality product images with Next.js Image optimization

---

## Complete Feature List

### 1. Navigation & Layout

**Navigation Bar (Sticky):**
- Brand logo: "The Formula Lab" (left side)
- Navigation links:
  - Home
  - Collections (dropdown with categories)
  - Quiz
  - About
  - Contact
- Right side actions:
  - Search icon (optional)
  - Wishlist icon with counter
  - Cart icon with item count badge
- Mobile: Hamburger menu with slide-in drawer

**Footer:**
- Brand section with description
- Quick Links: Home, Collections, Quiz, About, Contact
- Customer Service: Shipping Info, Returns, FAQ, Privacy Policy
- Contact information: Email, Phone, Address
- Social media icons: Instagram, Facebook, Twitter
- Newsletter signup
- Copyright notice

### 2. Home Page (/)

**Hero Section:**
- Gradient background (no 3D animations)
- Brand name: "The Formula Lab"
- Tagline: "Discover Your Signature Scent"
- Subtitle describing the brand
- Two CTA buttons:
  - "Explore Collections" → /collections
  - "Find Your Scent" → /quiz
- Clean, elegant layout with centered text

**Product Showcase Section:**
- Heading: "Featured Fragrances"
- Featured product display with image
- Product name, price, description
- Fragrance notes (top, heart, base)
- "View Details" button
- Gallery grid of 3-4 additional products with images
- Each product card shows: image, name, family, price
- "Shop All" button linking to collections

**Fragrance Notes Education Section:**
- Heading: "Understanding Fragrance"
- Interactive pyramid visualization showing:
  - Top Notes (5-15 minutes)
  - Heart Notes (2-4 hours)
  - Base Notes (4+ hours)
- Each tier shows example notes
- Evolution timeline with visual representation
- Fragrance families section (Floral, Oriental, Woody, Fresh, Citrus, Spicy)
- Concentration levels guide (Parfum, EDP, EDT, Cologne)

**Collections Preview Section:**
- Heading: "Explore Our Collections"
- Grid of collection cards:
  - Signature Collection
  - Seasonal Scents
  - Limited Edition
  - Unisex Fragrances
  - Oriental Essence
  - Fresh & Aquatic
- Each card shows collection name and product count
- Click to view collection details

### 3. Collections Page (/collections)

**Filters & Sorting (Sidebar + Mobile Panel):**
- Search bar at top
- Collections filter (checkboxes):
  - All
  - Signature Collection
  - Seasonal Scents
  - Limited Edition
  - Unisex Fragrances
  - Oriental Essence
  - Fresh & Aquatic
- Fragrance Family filter (checkboxes):
  - Floral
  - Oriental
  - Woody
  - Fresh
  - Citrus
  - Spicy
- Price Range filter:
  - Slider with min/max values
  - Display: $0 - $500
- Sort by dropdown:
  - Popularity
  - Price: Low to High
  - Price: High to Low
  - Rating
  - Name: A-Z
- Mobile: Show filters in slide-in panel with "Filters" button

**Product Grid:**
- Responsive grid (1 col mobile, 2-3 cols tablet, 3-4 cols desktop)
- Each product card shows:
  - Product image (optimized with Next.js Image)
  - Bestseller or Out of Stock badge
  - Product name
  - Fragrance family tag
  - Star rating (out of 5)
  - Price
  - Wishlist heart icon (toggleable)
  - "View Details" button → /products/[id]
- Hover effects on cards
- Show product count: "Showing X of Y products"

**Collections Detail Pages (/collections/[id]):**
- Collection name and description
- All products in that collection
- Same filtering and sorting options
- CTA to take the quiz

### 4. Product Detail Page (/products/[id])

**Product Information:**
- Large product image (responsive)
- Image gallery (if multiple images)
- Product name
- Fragrance family tag
- Star rating with review count
- Price
- Short description
- Wishlist button (heart icon)
- Share button

**Purchase Options:**
- Volume/Size selector (30ml, 50ml, 100ml)
- Each size shows price
- Quantity selector (- 1 +)
- Stock status indicator
- "Add to Cart" button (large, prominent)
- "Buy Now" button (optional)

**Product Details Tabs:**
- Description: Full product story
- Fragrance Notes:
  - Top notes with icons
  - Heart notes with icons
  - Base notes with icons
  - Each with timing information
- Details:
  - Brand
  - Type
  - Gender
  - Longevity
  - Sillage
  - Season recommendation

**Benefits Section:**
- Free delivery on orders over $150
- 100% authentic products
- Easy 30-day returns

**Customer Reviews:**
- Overall rating distribution (5-star breakdown)
- Sort reviews: Most Recent, Highest Rating, Lowest Rating
- Each review shows:
  - Reviewer name
  - Rating stars
  - Verified purchase badge
  - Date
  - Review title
  - Review text
  - Helpful votes counter

### 5. Scent Finder Quiz (/quiz)

**Quiz Flow:**
- Welcome screen with description
- "Start Quiz" button
- Progress bar showing current question

**Questions (5 total):**

1. **Gender Preference:**
   - For Him
   - For Her
   - Unisex

2. **Fragrance Family:**
   - Floral (Rose, Jasmine, Lily)
   - Oriental (Amber, Vanilla, Spices)
   - Woody (Sandalwood, Cedar, Oud)
   - Fresh (Citrus, Aquatic, Green)
   - Citrus (Bergamot, Lemon, Orange)
   - Spicy (Cinnamon, Pepper, Cardamom)

3. **Longevity Preference:**
   - Long-lasting (8+ hours)
   - Moderate (4-6 hours)
   - Light & Fresh (2-4 hours)

4. **When will you wear it?**
   - Daily wear
   - Special occasions
   - Night out
   - Office/Professional
   - Casual outings

5. **Price Range:**
   - Under $100
   - $100 - $200
   - $200 - $300
   - $300+

**Quiz Navigation:**
- "Previous" and "Next" buttons
- Next disabled until answer selected
- "Submit" button on last question

**Results Page:**
- "Your Perfect Match" heading
- Top recommended product with:
  - Large product image
  - Product name
  - Why this matches (personalized text based on answers)
  - Fragrance notes
  - Price
  - "View Details" button
  - "Add to Cart" button
- Additional recommendations (2-3 products)
- "Retake Quiz" button
- Information about free samples, expert advice, 30-day guarantee

### 6. Shopping Cart System

**Cart Context (Global State):**
- Manages cart items with localStorage persistence
- Functions:
  - addToCart(product, quantity, size)
  - removeFromCart(itemId)
  - updateQuantity(itemId, quantity)
  - clearCart()
  - getCartTotal()
  - getCartCount()

**Cart Panel (Slide-in from right):**
- Overlay background
- Cart header: "Shopping Cart" with close button
- Cart items list:
  - Product image
  - Product name and size
  - Price per unit
  - Quantity controls (- qty +)
  - Remove button (X)
  - Subtotal per item
- Empty cart message when no items
- Cart summary:
  - Subtotal
  - Shipping: Free over $150, otherwise $10
  - Tax (estimated)
  - Total
- "View Cart" button (optional full cart page)
- "Checkout" button → Opens checkout modal

### 7. Checkout & Payment

**Checkout Modal:**
- Multi-step or single-page checkout
- Close button (X)

**Step 1: Customer Information**
- Full Name (required)
- Email (required)
- Phone (required)
- Shipping Address:
  - Address Line 1 (required)
  - Address Line 2 (optional)
  - City (required)
  - State/Province (required)
  - Postal Code (required)
  - Country (required)

**Step 2: Payment Method Selection**
- Three options (radio buttons):
  1. **JazzCash Mobile Account**
  2. **Card Payment**
  3. **Cash on Delivery (COD)** - Add $5 COD fee

**Payment Option: JazzCash**
- JazzCash logo/icon
- Input fields:
  - Mobile Account Number (11 digits, required)
  - CNIC Number (13 digits without dashes, required)
  - Format hints under inputs
- Info text: "You will receive a payment request on your JazzCash app"
- "Pay with JazzCash" button
- Handles missing API keys gracefully with error message

**Payment Option: Card**
- Card number input (with formatting)
- Expiry date (MM/YY)
- CVV (3-4 digits)
- Cardholder name
- "Pay Now" button

**Payment Option: COD**
- Info text: "Pay $5 fee + order total in cash upon delivery"
- Confirmation checkbox: "I agree to pay cash on delivery"
- "Place Order" button

**Order Summary (Right Side):**
- Items in cart with images
- Subtotal
- Shipping cost
- COD fee (if applicable)
- Tax
- Total amount
- Promo code input (optional)

**Error Handling:**
- Validate all required fields
- Show inline error messages
- Handle payment gateway errors gracefully
- Success message after order placement

### 8. Additional Pages

**Collections Detail (/collections/[id]):**
- Collection hero section
- Collection description
- All products in collection
- Same grid layout as main collections page

**About Page (optional):**
- Brand story
- Mission and values
- Why choose us

**Contact Page (optional):**
- Contact form
- Email, phone, address
- Social media links

---

## Product Database Structure

Create at least 6 products with this structure:

\`\`\`typescript
interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // Path to product image
  family: string; // Floral, Oriental, Woody, Fresh, Citrus, Spicy
  collection: string; // Signature Collection, Seasonal Scents, etc.
  rating: number; // 1-5
  reviews: number; // Count of reviews
  description: string;
  inStock: boolean;
  bestseller: boolean;
  details: {
    brand: string; // "The Formula Lab"
    type: string; // Eau de Parfum, Eau de Toilette
    gender: string; // Men, Women, Unisex
    longevity: string; // 6-8 hours, 8-10 hours
    sillage: string; // Moderate, Strong, Light
    season: string; // All seasons, Spring/Summer, Fall/Winter
    volume: string[]; // ["30ml", "50ml", "100ml"]
  };
  notes: {
    top: string[]; // e.g., ["Bergamot", "Lemon", "Pink Pepper"]
    heart: string[]; // e.g., ["Jasmine", "Rose", "Lily"]
    base: string[]; // e.g., ["Sandalwood", "Vanilla", "Musk"]
  };
  benefits: string[];
}
\`\`\`

**Example Products:**
1. **Midnight Velvet** - Oriental, $150, Bestseller
2. **Rose Ethereal** - Floral, $120
3. **Citrus Dawn** - Fresh/Citrus, $95
4. **Oud Luxe** - Woody/Oriental, $200, Limited Edition
5. **Floral Silk** - Floral, $135
6. **Ocean Breeze** - Fresh/Aquatic, $110

---

## File Structure

\`\`\`
app/
  layout.tsx                    # Root layout with CartProvider, fonts
  page.tsx                      # Home page
  globals.css                   # Tailwind + custom styles
  collections/
    page.tsx                    # Collections listing page
    [id]/
      page.tsx                  # Single collection detail page
  products/
    [id]/
      page.tsx                  # Product detail page
  quiz/
    page.tsx                    # Scent finder quiz

components/
  navbar.tsx                    # Navigation bar
  footer.tsx                    # Footer
  hero.tsx                      # Home hero section
  product-showcase.tsx          # Featured products section
  fragrance-notes.tsx           # Educational fragrance notes section
  collections.tsx               # Collections preview grid
  collections-page.tsx          # Full collections page with filters
  product-details-content.tsx   # Product detail page content
  scent-finder-quiz.tsx         # Quiz component
  cart-panel.tsx                # Sliding cart panel
  checkout-modal.tsx            # Checkout modal with payment options
  ui/                           # shadcn/ui components
    button.tsx
    card.tsx
    input.tsx
    badge.tsx
    dialog.tsx
    select.tsx
    slider.tsx
    tabs.tsx
    accordion.tsx
    ... (all necessary shadcn components)

hooks/
  use-cart.tsx                  # Cart context and hooks

public/
  images/
    midnight-velvet.jpg         # Product images
    rose-ethereal.jpg
    citrus-dawn.jpg
    oud-luxe.jpg
    floral-silk.jpg
    ocean-breeze.jpg
\`\`\`

---

## Key Implementation Notes

1. **Mobile First**: All components must be fully responsive with proper breakpoints
2. **Performance**: Use Next.js Image component for all images with proper sizing
3. **No 3D Animations**: Do NOT use Three.js or any 3D rendering libraries
4. **Static Images Only**: All products display as static images, not animated 3D models
5. **localStorage**: Cart persists across sessions using localStorage
6. **Error Handling**: Handle missing products, empty cart, API failures gracefully
7. **Accessibility**: Proper ARIA labels, keyboard navigation, screen reader support
8. **SEO**: Proper metadata, Open Graph tags, structured data
9. **Loading States**: Show loading indicators during data fetches
10. **Smooth Animations**: Use Tailwind transitions and transforms for hover effects

---

## JazzCash Payment Integration

**Important**: The checkout should work even without JazzCash API credentials. Use placeholder/demo mode if API keys are missing.

**Environment Variables Needed:**
\`\`\`
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_SALT=your_salt_key
JAZZCASH_RETURN_URL=your_return_url
\`\`\`

**Backend API Route** (Next.js API route at `app/api/jazzcash/route.ts`):
- Generates secure hash using HMAC-SHA256
- Creates JazzCash payment request
- Returns transaction reference and payment URL
- Handles callback/response from JazzCash

**Frontend Integration:**
- Validate mobile number (11 digits) and CNIC (13 digits)
- Show loading state during payment processing
- Handle success/failure responses
- Display appropriate messages to user

See JAZZCASH_INTEGRATION_GUIDE.md for detailed implementation steps.

---

## Styling Requirements

1. **Fonts**: Load Playfair Display and Montserrat from Google Fonts
2. **Color System**: Use exact HSL values provided above
3. **Spacing**: Consistent padding/margin using Tailwind scale
4. **Shadows**: Subtle shadows for cards and elevated elements
5. **Borders**: 1px borders with border-border color
6. **Radius**: 0.5rem (medium) for most elements
7. **Transitions**: 200-300ms duration for hover effects
8. **Focus States**: Visible focus rings for accessibility

---

## Additional Features

1. **Wishlist**: Heart icon toggle on products (local storage)
2. **Search**: Optional search bar in navigation (filter products)
3. **Dark Mode**: Full dark mode support with toggle (optional)
4. **Loading States**: Skeletons or spinners during data loading
5. **Toast Notifications**: Success/error messages for actions
6. **Product Comparison**: Compare multiple fragrances (optional)
7. **Recently Viewed**: Track recently viewed products (optional)

---

## Testing Requirements

1. Test all pages on mobile, tablet, and desktop
2. Test cart functionality (add, remove, update quantities)
3. Test checkout flow with all three payment methods
4. Test quiz logic and recommendations
5. Test filtering and sorting on collections page
6. Test product detail page with different products
7. Test navigation and routing
8. Test form validation and error handling

---

## Deliverables

1. Fully functional Next.js 14.x application
2. React 18.x compatible code
3. All pages and features listed above
4. Responsive design working on all screen sizes
5. Product images in /public/images directory
6. Documentation for:
   - Product management (PRODUCTS_MANAGEMENT.md)
   - Collections management (COLLECTIONS_MANAGEMENT.md)
   - Hero section customization (HERO_SECTION_MANAGEMENT.md)
   - Navigation & footer (NAVIGATION_FOOTER_MANAGEMENT.md)
   - Quiz customization (QUIZ_MANAGEMENT.md)
   - Site settings (SITE_SETTINGS.md)
   - JazzCash integration (JAZZCASH_INTEGRATION_GUIDE.md)
   - Image replacement (IMAGE_REPLACEMENT_GUIDE.md)
   - React 18/Next.js 14 compatibility (REACT_18_NEXTJS_14_COMPATIBILITY.md)

---

## Final Notes

- The brand name is **"The Formula Lab"** - use this everywhere
- Maintain luxury aesthetic with minimalist design
- Prioritize page load speed - no heavy animations
- Ensure all links work and navigation is intuitive
- Make it easy for non-technical users to update content
- Follow Next.js and React best practices
- Use TypeScript for type safety
- Write clean, well-documented code

---

**THIS PROMPT CONTAINS ALL SPECIFICATIONS TO RECREATE THE EXACT WEBSITE WITH IDENTICAL FUNCTIONALITY, DESIGN, AND COLOR SCHEME.**
