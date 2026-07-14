# Navigation & Footer Management Guide

## Overview
This guide covers customizing the navigation menu and footer of The Formula Lab website.

---

## Navigation Bar

### Location
File: `components/navbar.tsx`

### Current Navigation Items

\`\`\`tsx
<Link href="/">Home</Link>
<Link href="/collections">Collections</Link>
<Link href="/quiz">Find Your Scent</Link>
\`\`\`

### Adding Navigation Items

1. Open `components/navbar.tsx`
2. Find the navigation links section
3. Add your new link:

\`\`\`tsx
{/* Desktop Navigation */}
<Link href="/" className="hover:text-primary transition-colors">
  Home
</Link>
<Link href="/collections" className="hover:text-primary transition-colors">
  Collections
</Link>
<Link href="/about" className="hover:text-primary transition-colors">
  About Us {/* New link */}
</Link>
<Link href="/contact" className="hover:text-primary transition-colors">
  Contact {/* New link */}
</Link>
\`\`\`

4. Don't forget to add the same links to the mobile menu:

\`\`\`tsx
{/* Mobile Navigation */}
{isOpen && (
  <div className="md:hidden">
    <Link href="/">Home</Link>
    <Link href="/collections">Collections</Link>
    <Link href="/about">About Us</Link> {/* Add here too */}
    <Link href="/contact">Contact</Link> {/* Add here too */}
  </div>
)}
\`\`\`

### Changing Brand Name

Located at the top of navbar:

\`\`\`tsx
<Link href="/" className="font-serif text-2xl font-bold">
  The Formula Lab {/* Change brand name here */}
</Link>
\`\`\`

### Adding Brand Logo

Replace text with an image:

\`\`\`tsx
<Link href="/" className="flex items-center">
  <Image
    src="/images/logo.png"
    alt="The Formula Lab"
    width={150}
    height={40}
    className="h-10 w-auto"
  />
</Link>
\`\`\`

### Navbar Background

Current: Transparent with blur effect
\`\`\`tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
\`\`\`

**Solid background:**
\`\`\`tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
\`\`\`

**Different color:**
\`\`\`tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white border-b border-white/10">
\`\`\`

### Cart Icon

The cart icon shows the number of items:

\`\`\`tsx
<ShoppingCart className="w-5 h-5" />
{cartItemsCount > 0 && (
  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
    {cartItemsCount}
  </span>
)}
\`\`\`

To change badge color:
\`\`\`tsx
<span className="... bg-red-500 text-white ...">
  {cartItemsCount}
</span>
\`\`\`

---

## Footer

### Location
File: `components/footer.tsx`

### Footer Structure

The footer has 4 columns:
1. Brand Info
2. Quick Links
3. Customer Service
4. Contact Info

### Editing Brand Section

\`\`\`tsx
<div>
  <h3 className="font-serif text-xl font-bold mb-4">
    The Formula Lab {/* Brand name */}
  </h3>
  <p className="text-muted-foreground mb-4">
    Crafting luxury fragrances... {/* Description */}
  </p>
</div>
\`\`\`

### Editing Quick Links

\`\`\`tsx
<div>
  <h4 className="font-semibold mb-4">Quick Links</h4>
  <ul className="space-y-2">
    <li><Link href="/collections">Shop All</Link></li>
    <li><Link href="/quiz">Scent Finder</Link></li>
    <li><Link href="/about">About Us</Link></li>
    <li><Link href="/blog">Blog</Link></li> {/* Add new links */}
  </ul>
</div>
\`\`\`

### Editing Customer Service Links

\`\`\`tsx
<div>
  <h4 className="font-semibold mb-4">Customer Service</h4>
  <ul className="space-y-2">
    <li><Link href="/contact">Contact Us</Link></li>
    <li><Link href="/shipping">Shipping Info</Link></li>
    <li><Link href="/returns">Returns</Link></li>
    <li><Link href="/faq">FAQ</Link></li>
  </ul>
</div>
\`\`\`

### Editing Contact Information

\`\`\`tsx
<div>
  <h4 className="font-semibold mb-4">Contact</h4>
  <ul className="space-y-2 text-muted-foreground">
    <li>Email: info@formulalab.com</li> {/* Your email */}
    <li>Phone: +1 (555) 123-4567</li> {/* Your phone */}
    <li>Address: 123 Fragrance St</li> {/* Your address */}
    <li>City, State 12345</li>
  </ul>
</div>
\`\`\`

### Social Media Icons

Current social icons:

\`\`\`tsx
<div className="flex gap-4">
  <Link href="#" className="hover:text-primary transition-colors">
    <Facebook className="w-5 h-5" />
  </Link>
  <Link href="#" className="hover:text-primary transition-colors">
    <Instagram className="w-5 h-5" />
  </Link>
  <Link href="#" className="hover:text-primary transition-colors">
    <Twitter className="w-5 h-5" />
  </Link>
</div>
\`\`\`

**To add real links:**
\`\`\`tsx
<Link href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
  <Facebook className="w-5 h-5" />
</Link>
\`\`\`

**To add more social icons:**
\`\`\`tsx
import { Youtube, Linkedin } from 'lucide-react';

// In the component:
<Link href="https://youtube.com/yourchannel">
  <Youtube className="w-5 h-5" />
</Link>
<Link href="https://linkedin.com/company/yourcompany">
  <Linkedin className="w-5 h-5" />
</Link>
\`\`\`

### Copyright Text

\`\`\`tsx
<p className="text-sm text-muted-foreground">
  © 2025 The Formula Lab. All rights reserved. {/* Update year/text */}
</p>
\`\`\`

### Legal Links

\`\`\`tsx
<div className="flex gap-6">
  <Link href="/privacy" className="text-sm hover:text-primary">
    Privacy Policy
  </Link>
  <Link href="/terms" className="text-sm hover:text-primary">
    Terms of Service
  </Link>
  <Link href="/cookies" className="text-sm hover:text-primary">
    Cookie Policy
  </Link>
</div>
\`\`\`

### Newsletter Signup (Optional)

Add before the copyright section:

\`\`\`tsx
<div className="border-t border-border pt-8 mb-8">
  <div className="max-w-md mx-auto text-center">
    <h4 className="font-semibold mb-2">Subscribe to Our Newsletter</h4>
    <p className="text-sm text-muted-foreground mb-4">
      Get exclusive offers and fragrance tips
    </p>
    <div className="flex gap-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
      />
      <Button>Subscribe</Button>
    </div>
  </div>
</div>
\`\`\`

### Payment Icons (Optional)

Add payment method icons:

\`\`\`tsx
<div className="flex items-center gap-4 justify-center mt-8">
  <p className="text-sm text-muted-foreground">We Accept:</p>
  <Image src="/images/visa.png" alt="Visa" width={40} height={25} />
  <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} />
  <Image src="/images/jazzcash.png" alt="JazzCash" width={40} height={25} />
</div>
\`\`\`

## Mobile Responsiveness

### Navbar Mobile Menu

Mobile menu toggle is controlled by state:

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);
\`\`\`

The hamburger icon:
\`\`\`tsx
<button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
  {isOpen ? <X /> : <Menu />}
</button>
\`\`\`

### Footer Mobile Layout

Footer automatically stacks on mobile using Tailwind grid:

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
\`\`\`

To change mobile columns:
\`\`\`tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
\`\`\`

## Styling Tips

### Navbar Height
\`\`\`tsx
<nav className="h-16"> {/* Adjust height */}
\`\`\`

### Footer Padding
\`\`\`tsx
<footer className="py-12"> {/* Adjust top/bottom padding */}
\`\`\`

### Link Hover Effects
\`\`\`tsx
<Link className="hover:text-primary hover:underline transition-all">
\`\`\`

## Troubleshooting

### Navigation Links Not Working
- Verify href paths match your route structure
- Check for typos in route names
- Ensure pages exist in the `app` directory

### Mobile Menu Not Closing
- Check that `setIsOpen(false)` is called on link clicks
- Verify the mobile menu conditional rendering

### Footer Layout Broken
- Check grid column classes
- Verify responsive breakpoints (md:, lg:)
- Test on actual mobile devices

---

**Last Updated:** [Current Date]
**Components:** `components/navbar.tsx`, `components/footer.tsx`
