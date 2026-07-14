# Site-Wide Settings Management Guide

## Overview
This guide covers global settings that affect the entire Formula Lab website.

---

## Brand Identity

### Site Metadata

Location: `app/layout.tsx`

\`\`\`typescript
export const metadata = {
  title: "The Formula Lab - Luxury Fragrances", // Site title
  description: "Discover handcrafted luxury fragrances...", // Description
  keywords: "perfume, fragrance, luxury, scent", // SEO keywords
}
\`\`\`

### Favicon

Replace the favicon:
1. Add your favicon file to `public/`
2. Update in `app/layout.tsx`:

\`\`\`tsx
<link rel="icon" href="/favicon.ico" />
\`\`\`

---

## Design Tokens & Theme

### Location
File: `app/globals.css`

### Color Palette

Current theme colors are defined in the `:root` section:

\`\`\`css
:root {
  --background: 0 0% 100%;        /* White background */
  --foreground: 0 0% 3.9%;        /* Near-black text */
  --primary: 0 0% 9%;             /* Black primary color */
  --primary-foreground: 0 0% 98%; /* White text on primary */
  --accent: 0 0% 96%;             /* Light gray accent */
  /* ... more colors */
}
\`\`\`

### Changing Brand Colors

#### To Gold/Luxury Theme:
\`\`\`css
:root {
  --primary: 45 100% 51%;           /* Gold primary */
  --primary-foreground: 0 0% 0%;    /* Black text on gold */
  --accent: 45 100% 96%;            /* Light gold accent */
}
\`\`\`

#### To Blue/Modern Theme:
\`\`\`css
:root {
  --primary: 217 91% 60%;           /* Blue primary */
  --primary-foreground: 0 0% 100%;  /* White text on blue */
  --accent: 217 91% 95%;            /* Light blue accent */
}
\`\`\`

#### To Purple/Elegant Theme:
\`\`\`css
:root {
  --primary: 270 70% 50%;           /* Purple primary */
  --primary-foreground: 0 0% 100%;  /* White text on purple */
  --accent: 270 70% 95%;            /* Light purple accent */
}
\`\`\`

### Dark Mode Colors

Dark mode colors are in the `.dark` section:

\`\`\`css
.dark {
  --background: 0 0% 3.9%;          /* Dark background */
  --foreground: 0 0% 98%;           /* Light text */
  --primary: 0 0% 98%;              /* Light primary */
  /* ... more dark mode colors */
}
\`\`\`

To disable dark mode entirely, remove all `.dark` class styles.

---

## Typography

### Font Families

Fonts are configured in `app/layout.tsx`:

\`\`\`typescript
import { Playfair_Display, Montserrat } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif'
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-sans'
})
\`\`\`

### Changing Fonts

#### To Different Google Fonts:

\`\`\`typescript
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans'
})

// Apply in the HTML tag:
<html className={`${cormorant.variable} ${inter.variable}`}>
\`\`\`

#### Using Custom Fonts:

1. Add font files to `public/fonts/`
2. Define in `globals.css`:

\`\`\`css
@font-face {
  font-family: 'MyCustomFont';
  src: url('/fonts/my-custom-font.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@theme inline {
  --font-serif: 'MyCustomFont', serif;
}
\`\`\`

### Font Usage

- **Headings**: Use `font-serif` class
- **Body text**: Use `font-sans` class (default)
- **Monospace**: Use `font-mono` class

\`\`\`tsx
<h1 className="font-serif">Elegant Heading</h1>
<p className="font-sans">Body paragraph text</p>
<code className="font-mono">Code snippet</code>
\`\`\`

---

## Layout & Spacing

### Container Width

Global container settings in components:

\`\`\`tsx
<div className="container mx-auto px-4">
  {/* Content */}
</div>
\`\`\`

**To change max width:**
\`\`\`tsx
<div className="max-w-7xl mx-auto px-4"> {/* Wider */}
<div className="max-w-4xl mx-auto px-4"> {/* Narrower */}
\`\`\`

### Global Padding

Adjust horizontal padding:

\`\`\`tsx
<div className="container mx-auto px-4">  {/* Default: 1rem */}
<div className="container mx-auto px-8">  {/* Larger: 2rem */}
<div className="container mx-auto px-2">  {/* Smaller: 0.5rem */}
\`\`\`

---

## Currency & Pricing

### Default Currency

Prices are displayed with `$` symbol. To change:

#### Find All Price Displays:

\`\`\`bash
# Search for price formatting in components
grep -r "price" components/
\`\`\`

#### Update Price Formatting:

Create a utility function in `lib/utils.ts`:

\`\`\`typescript
export function formatPrice(price: number, currency: string = 'USD') {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs.' // For Pakistani Rupee
  };
  
  return `${symbols[currency]}${price.toFixed(2)}`;
}
\`\`\`

Use in components:

\`\`\`tsx
import { formatPrice } from '@/lib/utils';

<p>{formatPrice(product.price, 'PKR')}</p> // Displays: Rs.129.99
\`\`\`

---

## Internationalization

### Adding Multiple Languages

#### Step 1: Create Translation Files

Create `lib/translations.ts`:

\`\`\`typescript
export const translations = {
  en: {
    nav: {
      home: 'Home',
      collections: 'Collections',
      quiz: 'Find Your Scent'
    },
    hero: {
      title: 'The Formula Lab',
      subtitle: 'Discover luxury fragrances...'
    }
  },
  ur: { // Urdu
    nav: {
      home: 'ہوم',
      collections: 'مجموعہ',
      quiz: 'اپنی خوشبو تلاش کریں'
    },
    hero: {
      title: 'دی فارمولا لیب',
      subtitle: 'لگژری خوشبوئیں دریافت کریں...'
    }
  }
};
\`\`\`

#### Step 2: Create Language Hook

\`\`\`typescript
// hooks/use-language.tsx
'use client';

import { createContext, useContext, useState } from 'react';
import { translations } from '@/lib/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
\`\`\`

#### Step 3: Use in Components

\`\`\`tsx
import { useLanguage } from '@/hooks/use-language';

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <nav>
      <Link href="/">{t('nav.home')}</Link>
      <Link href="/collections">{t('nav.collections')}</Link>
      
      {/* Language Switcher */}
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ur">اردو</option>
      </select>
    </nav>
  );
}
\`\`\`

---

## SEO Settings

### Open Graph Tags

Add social sharing metadata in `app/layout.tsx`:

\`\`\`typescript
export const metadata = {
  title: "The Formula Lab",
  description: "Luxury fragrances...",
  openGraph: {
    title: 'The Formula Lab',
    description: 'Discover luxury fragrances...',
    url: 'https://formulalab.com',
    siteName: 'The Formula Lab',
    images: [
      {
        url: 'https://formulalab.com/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Formula Lab',
    description: 'Discover luxury fragrances...',
    images: ['https://formulalab.com/twitter-image.jpg'],
  }
}
\`\`\`

### Structured Data

Add JSON-LD for rich search results:

\`\`\`tsx
// In app/layout.tsx or specific pages
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'The Formula Lab',
      description: 'Luxury fragrance store',
      url: 'https://formulalab.com',
      telephone: '+1-555-123-4567',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Fragrance St',
        addressLocality: 'City',
        addressRegion: 'State',
        postalCode: '12345',
        addressCountry: 'US'
      }
    })
  }}
/>
\`\`\`

---

## Performance Settings

### Image Optimization

Next.js Image component settings in `next.config.js`:

\`\`\`javascript
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200], // Breakpoints
    imageSizes: [16, 32, 48, 64, 96], // Icon sizes
    domains: ['yourdomain.com'], // External image domains
  }
}
\`\`\`

### Loading States

Add global loading indicator in `app/loading.tsx`:

\`\`\`tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );
}
\`\`\`

---

## Analytics & Tracking

### Google Analytics

Add to `app/layout.tsx`:

\`\`\`tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
\`\`\`

### Facebook Pixel

\`\`\`tsx
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</Script>
\`\`\`

---

## Environment Variables

### Setup

Create `.env.local` file in root:

\`\`\`env
# Site
NEXT_PUBLIC_SITE_URL=https://formulalab.com
NEXT_PUBLIC_SITE_NAME=The Formula Lab

# Payment
NEXT_PUBLIC_JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_INTEGRITY_SALT=your_salt_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_password

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

### Usage in Code

\`\`\`typescript
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const merchantId = process.env.NEXT_PUBLIC_JAZZCASH_MERCHANT_ID;
\`\`\`

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## Tips

1. **Test Changes**: Always test theme changes across all pages
2. **Backup First**: Save original values before major changes
3. **Consistent Spacing**: Use Tailwind spacing scale (4, 6, 8, 12, etc.)
4. **Accessibility**: Maintain good color contrast ratios
5. **Mobile Test**: Check all changes on mobile devices

---

**Last Updated:** [Current Date]
**Affects:** All components and pages
