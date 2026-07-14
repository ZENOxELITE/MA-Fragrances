# Hero Section Management Guide

## Overview
The hero section is the first thing visitors see on your homepage. This guide explains how to customize it.

## Hero Component Location
File: `components/hero.tsx`

## Current Hero Structure

The hero section includes:
1. Gradient background
2. Main headline
3. Subheading text
4. Call-to-action buttons
5. Decorative elements

## Editing Text Content

### Main Headline

Location in `components/hero.tsx`:

\`\`\`tsx
<h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
  The Formula Lab // Edit this text
</h1>
\`\`\`

**Example Changes:**
\`\`\`tsx
// Shorter
<h1>Formula Lab</h1>

// With line break
<h1>
  The Formula<br />Lab
</h1>

// Different styling
<h1 className="font-serif text-6xl font-light">
  Discover Your Signature Scent
</h1>
\`\`\`

### Subheading

\`\`\`tsx
<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
  Discover luxury fragrances crafted with precision // Edit this
</p>
\`\`\`

**Example:**
\`\`\`tsx
<p>
  Premium handcrafted perfumes designed to capture your unique essence
</p>
\`\`\`

### Tagline

\`\`\`tsx
<p className="text-sm md:text-base text-muted-foreground/80 mb-12">
  Where Science Meets Elegance // Edit this
</p>
\`\`\`

## Customizing Buttons

### Button Text

\`\`\`tsx
<Button size="lg">
  Explore Collection // Edit button text
</Button>

<Button size="lg" variant="outline">
  Find Your Scent // Edit button text
</Button>
\`\`\`

### Button Links

Currently buttons use Link components:

\`\`\`tsx
<Link href="/collections">
  <Button>Explore Collection</Button>
</Link>

<Link href="/quiz">
  <Button variant="outline">Find Your Scent</Button>
</Link>
\`\`\`

**To change destinations:**
\`\`\`tsx
<Link href="/products"> {/* Custom link */}
  <Button>View Products</Button>
</Link>
\`\`\`

### Button Styling

Current: Primary solid button + Outline button

**Both solid buttons:**
\`\`\`tsx
<Button size="lg" variant="default">Explore</Button>
<Button size="lg" variant="default">Find Scent</Button>
\`\`\`

**Different colors:**
\`\`\`tsx
<Button size="lg" className="bg-gold hover:bg-gold/90">
  Explore
</Button>
\`\`\`

## Background Customization

### Current Background
Gradient background from dark to lighter:

\`\`\`tsx
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background/95 to-background/90">
\`\`\`

### Solid Color Background

\`\`\`tsx
<section className="relative min-h-screen flex items-center justify-center bg-background">
\`\`\`

### Image Background

\`\`\`tsx
<section 
  className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/hero-background.jpg)' }}
>
  {/* Add overlay for text readability */}
  <div className="absolute inset-0 bg-black/40"></div>
  
  {/* Content with higher z-index */}
  <div className="relative z-10">
    {/* Your hero content */}
  </div>
</section>
\`\`\`

### Custom Gradient

\`\`\`tsx
<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
\`\`\`

## Adding Hero Image/Video

### Add Product Image

\`\`\`tsx
<section className="relative min-h-screen flex items-center justify-center">
  <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
    {/* Left: Text */}
    <div className="text-center md:text-left">
      <h1>The Formula Lab</h1>
      {/* ... rest of content */}
    </div>
    
    {/* Right: Image */}
    <div className="flex justify-center">
      <Image
        src="/images/hero-product.jpg"
        alt="Featured Product"
        width={500}
        height={700}
        className="rounded-lg shadow-2xl"
      />
    </div>
  </div>
</section>
\`\`\`

### Add Background Video

\`\`\`tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/videos/hero-background.mp4" type="video/mp4" />
  </video>
  
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/50"></div>
  
  {/* Content */}
  <div className="relative z-10">
    {/* Your hero content */}
  </div>
</section>
\`\`\`

## Decorative Elements

### Current Animated Circles

The hero has decorative floating circles:

\`\`\`tsx
<div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
\`\`\`

**To remove all decorative circles:**
Delete all `<div>` elements with `absolute` positioning and `rounded-full`.

**To add more circles:**
\`\`\`tsx
<div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
\`\`\`

**To change colors:**
\`\`\`tsx
// Gold accent
<div className="absolute top-20 left-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>

// Blue accent
<div className="absolute top-20 right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
\`\`\`

## Height Adjustments

### Full Screen (Current)
\`\`\`tsx
<section className="min-h-screen">
\`\`\`

### Shorter Hero
\`\`\`tsx
<section className="min-h-[60vh]"> {/* 60% of viewport height */}
\`\`\`

### Fixed Height
\`\`\`tsx
<section className="h-[600px]">
\`\`\`

## Text Alignment

### Current: Centered
\`\`\`tsx
<div className="text-center">
\`\`\`

### Left Aligned
\`\`\`tsx
<div className="text-left">
\`\`\`

### Right Aligned
\`\`\`tsx
<div className="text-right">
\`\`\`

## Adding Additional Elements

### Add Social Proof

\`\`\`tsx
<div className="mt-8 flex items-center justify-center gap-8">
  <div className="text-center">
    <p className="text-2xl font-bold">10K+</p>
    <p className="text-sm text-muted-foreground">Happy Customers</p>
  </div>
  <div className="text-center">
    <p className="text-2xl font-bold">50+</p>
    <p className="text-sm text-muted-foreground">Unique Scents</p>
  </div>
  <div className="text-center">
    <p className="text-2xl font-bold">4.9★</p>
    <p className="text-sm text-muted-foreground">Average Rating</p>
  </div>
</div>
\`\`\`

### Add Trust Badges

\`\`\`tsx
<div className="mt-8 flex items-center justify-center gap-4">
  <Image src="/images/badge-organic.png" alt="Organic" width={60} height={60} />
  <Image src="/images/badge-cruelty-free.png" alt="Cruelty Free" width={60} height={60} />
  <Image src="/images/badge-made-local.png" alt="Made Locally" width={60} height={60} />
</div>
\`\`\`

## Mobile Optimization

### Text Sizes
Current responsive text sizing:
\`\`\`tsx
text-5xl md:text-7xl lg:text-8xl
\`\`\`

- `text-5xl` - Mobile (48px)
- `md:text-7xl` - Tablet (72px)
- `lg:text-8xl` - Desktop (96px)

### Button Layout
Stack buttons vertically on mobile:

\`\`\`tsx
<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <Button>Explore</Button>
  <Button>Find Scent</Button>
</div>
\`\`\`

## Tips

1. **Keep It Simple**: Don't overcrowd the hero section
2. **Clear CTA**: Make your primary action obvious
3. **Fast Loading**: Optimize images/videos for web
4. **Test Mobile**: Always preview on mobile devices
5. **Brand Consistency**: Match colors with your brand

## Troubleshooting

### Text Not Readable
- Add a dark overlay if using background images
- Increase font weight
- Add text shadow: `className="drop-shadow-lg"`

### Buttons Not Clickable
- Check z-index values
- Ensure buttons are inside the clickable area
- Remove any overlapping absolute positioned elements

### Layout Breaks on Mobile
- Test with browser dev tools
- Check responsive classes (md:, lg:)
- Verify container padding on small screens

---

**Last Updated:** [Current Date]
**Component:** `components/hero.tsx`
