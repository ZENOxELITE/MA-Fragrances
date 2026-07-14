# Color Palette Management Guide

## Overview
This guide explains how to change and customize the color palette for The Formula Lab luxury fragrance e-commerce website.

---

## Current Color Palette

### Premium Luxury Theme (Active)

**Perfect for:** Premium perfumes, oud, attars, luxury scents

**Colors:**
- **#0E0E0E** – Rich Black (Primary text & dark elements)
- **#1C1C1C** – Charcoal Gray (Cards, secondary backgrounds)
- **#D4AF37** – Royal Gold (Primary buttons, accents, highlights)
- **#F5F5F5** – Soft White (Background, light surfaces)
- **#B8860B** – Warm Gold Accent (Hover states, secondary gold)

**Vibe:** Rich • Premium • Classy

**Usage:**
- **Navbar:** Black background with gold accents
- **Buttons:** Gold with black text
- **Cards:** Dark charcoal with gold borders
- **Background:** Soft white / Rich black (dark mode)
- **Text:** Black on light / White on dark

---

## How to Change Colors

### Location
All color variables are defined in: `app/globals.css`

### Step-by-Step Process

#### Step 1: Convert Hex to HSL

Use an online converter (e.g., https://htmlcolors.com/hex-to-hsl) to convert hex colors to HSL format.

**Example:**
- Hex: `#D4AF37` (Royal Gold)
- HSL: `43° 74% 49%`
- CSS Variable Format: `43 74% 49%` (remove degree symbol and commas)

#### Step 2: Update CSS Variables

Open `app/globals.css` and modify the `:root` section:

\`\`\`css
:root {
  /* Your color palette name and description */
  --background: [h s% l%];      /* Main background color */
  --foreground: [h s% l%];      /* Main text color */
  --primary: [h s% l%];         /* Primary brand color (buttons, links) */
  --primary-foreground: [h s% l%]; /* Text on primary color */
  --secondary: [h s% l%];       /* Secondary elements */
  --accent: [h s% l%];          /* Accent/highlight color */
  /* ... other variables */
}
\`\`\`

#### Step 3: Update Dark Mode

Update the `.dark` section with inverted/adapted colors:

\`\`\`css
.dark {
  --background: [h s% l%];      /* Dark background */
  --foreground: [h s% l%];      /* Light text */
  --primary: [h s% l%];         /* Primary color (same or adjusted) */
  /* ... other variables */
}
\`\`\`

#### Step 4: Test Changes

1. Save the file
2. Refresh your browser
3. Check all pages: Home, Collections, Product Details, Cart
4. Toggle dark mode and verify colors look good
5. Test on mobile devices

---

## Pre-Made Color Palettes

### 1. Sage Green (Natural & Calming)

**Perfect for:** Organic fragrances, botanical scents, natural products

**Hex Colors:**
- `#F1F3E0` – Light Cream
- `#D2DCB6` – Light Sage
- `#A1BC98` – Medium Sage
- `#778873` – Dark Sage

**CSS Variables:**
\`\`\`css
:root {
  --background: 75 47% 92%;      /* #F1F3E0 - Light cream */
  --foreground: 120 7% 49%;      /* #778873 - Dark sage */
  --primary: 120 7% 49%;         /* Dark sage */
  --primary-foreground: 75 47% 92%;
  --secondary: 75 30% 80%;       /* #D2DCB6 - Light sage */
  --accent: 105 20% 66%;         /* #A1BC98 - Medium sage */
  --accent-foreground: 75 47% 92%;
}
\`\`\`

---

### 2. Royal Purple (Elegant & Mysterious)

**Perfect for:** Luxury niche perfumes, mysterious scents, exclusive collections

**Hex Colors:**
- `#2D1B40` – Deep Purple
- `#4A2B5E` – Royal Purple
- `#A78BFA` – Light Purple
- `#F5F3FF` – Pale Lavender

**CSS Variables:**
\`\`\`css
:root {
  --background: 270 100% 98%;    /* #F5F3FF - Pale lavender */
  --foreground: 270 56% 16%;     /* #2D1B40 - Deep purple */
  --primary: 270 44% 26%;        /* #4A2B5E - Royal purple */
  --primary-foreground: 270 100% 98%;
  --secondary: 270 44% 26%;
  --accent: 258 90% 76%;         /* #A78BFA - Light purple */
  --accent-foreground: 270 56% 16%;
}
\`\`\`

---

### 3. Ocean Blue (Fresh & Modern)

**Perfect for:** Aquatic fragrances, fresh scents, modern brands

**Hex Colors:**
- `#0A2647` – Deep Navy
- `#144272` – Ocean Blue
- `#205295` – Bright Blue
- `#E8F4FD` – Ice Blue

**Hex Colors:**
- `#0A2647` – Deep Navy
- `#144272` – Ocean Blue
- `#205295` – Bright Blue
- `#E8F4FD` – Ice Blue

**CSS Variables:**
\`\`\`css
:root {
  --background: 205 85% 96%;     /* #E8F4FD - Ice blue */
  --foreground: 207 60% 10%;     /* #0A2647 - Deep navy */
  --primary: 210 74% 27%;        /* #144272 - Ocean blue */
  --primary-foreground: 205 85% 96%;
  --secondary: 210 65% 35%;      /* #205295 - Bright blue */
  --accent: 210 65% 35%;
  --accent-foreground: 205 85% 96%;
}
\`\`\`

---

### 4. Rose Gold (Feminine & Luxurious)

**Perfect for:** Floral fragrances, feminine scents, romantic collections

**Hex Colors:**
- `#2C2C2C` – Charcoal
- `#B76E79` – Rose Gold
- `#E8B4B8` – Soft Pink
- `#FFF5F7` – Blush White

**CSS Variables:**
\`\`\`css
:root {
  --background: 350 100% 98%;    /* #FFF5F7 - Blush white */
  --foreground: 0 0% 17%;        /* #2C2C2C - Charcoal */
  --primary: 352 35% 57%;        /* #B76E79 - Rose gold */
  --primary-foreground: 350 100% 98%;
  --secondary: 352 35% 57%;
  --accent: 352 55% 80%;         /* #E8B4B8 - Soft pink */
  --accent-foreground: 0 0% 17%;
}
\`\`\`

---

### 5. Forest Green (Earthy & Sophisticated)

**Perfect for:** Woody fragrances, oud, masculine scents

**Hex Colors:**
- `#1A2F1A` – Forest Green
- `#2D5016` – Deep Green
- `#8B9D77` – Sage
- `#F4F6F0` – Cream

**CSS Variables:**
\`\`\`css
:root {
  --background: 90 25% 96%;      /* #F4F6F0 - Cream */
  --foreground: 120 28% 14%;     /* #1A2F1A - Forest green */
  --primary: 95 55% 20%;         /* #2D5016 - Deep green */
  --primary-foreground: 90 25% 96%;
  --secondary: 88 17% 54%;       /* #8B9D77 - Sage */
  --accent: 88 17% 54%;
  --accent-foreground: 90 25% 96%;
}
\`\`\`

---

## Applying a Pre-Made Palette

1. Choose a palette from the options above
2. Open `app/globals.css`
3. Find the `:root` section (around line 5-30)
4. Replace the color variables with the chosen palette
5. Update the `.dark` section if you want custom dark mode
6. Save and test

**Example:**
\`\`\`css
@layer base {
  :root {
    /* Rose Gold Palette - Perfect for floral fragrances */
    --background: 350 100% 98%;
    --foreground: 0 0% 17%;
    --primary: 352 35% 57%;
    /* ... copy remaining variables ... */
  }
}
\`\`\`

---

## Creating Custom Palettes

### Step 1: Choose Your Colors

Use color palette generators:
- **ColorHunt**: https://colorhunt.co
- **Coolors**: https://coolors.co
- **Adobe Color**: https://color.adobe.com

Pick 4-5 colors:
1. **Background** (light, 90-98% lightness)
2. **Text/Foreground** (dark, 5-20% lightness)
3. **Primary** (brand color, 40-60% lightness)
4. **Accent** (complementary color)
5. **Secondary** (neutral or variation)

### Step 2: Convert to HSL

For each hex color:
1. Visit https://htmlcolors.com/hex-to-hsl
2. Enter the hex code
3. Note the HSL values
4. Format as: `[h] [s%] [l%]` (e.g., `43 74% 49%`)

### Step 3: Map to Variables

**Recommended mapping:**
\`\`\`css
:root {
  --background: [lightest color];
  --foreground: [darkest color];
  --primary: [main brand color];
  --primary-foreground: [contrast with primary];
  --secondary: [supporting color];
  --accent: [highlight/call-to-action color];
  --muted: [subtle backgrounds];
  --border: [slightly darker than background];
}
\`\`\`

### Step 4: Create Dark Mode

Invert lightness values:
- Light colors → Dark
- Dark colors → Light
- Keep hue and saturation similar

\`\`\`css
.dark {
  --background: [darkest color, 5-15% lightness];
  --foreground: [lightest color, 90-98% lightness];
  --primary: [same or adjusted brand color];
  /* ... */
}
\`\`\`

---

## Color Usage Guidelines

### Where Each Color is Used

**--background**
- Page backgrounds
- Card backgrounds
- Modal backgrounds

**--foreground**
- Body text
- Headings
- Icons

**--primary**
- Main buttons (CTA buttons)
- Primary links
- Active navigation items
- Brand elements

**--secondary**
- Secondary buttons
- Supporting elements
- Alternative actions

**--accent**
- Highlights
- Hover states
- Special badges
- Featured items

**--muted**
- Disabled states
- Subtle backgrounds
- Placeholder text

**--border**
- Component borders
- Dividers
- Separators

---

## Testing Your Colors

### Accessibility Check

Ensure good contrast ratios:
- **Text on Background**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio

Use: https://webaim.org/resources/contrastchecker/

### Browser Testing

Test in:
- Chrome
- Firefox
- Safari
- Mobile browsers

### Dark Mode Testing

1. Toggle dark mode using system preferences
2. Check all pages
3. Verify text is readable
4. Ensure interactive elements are visible

---

## Troubleshooting

### Colors Not Changing

**Solution:**
1. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
2. Check file saved properly
3. Verify HSL format is correct (no degree symbol, no commas)

### Poor Contrast

**Solution:**
1. Adjust lightness values
2. Increase saturation
3. Use contrast checker tool

### Dark Mode Issues

**Solution:**
1. Ensure `.dark` class styles are defined
2. Invert lightness properly (light → dark, dark → light)
3. Test in actual dark mode, not just CSS

### Borders Not Visible

**Solution:**
1. Increase `--border` lightness difference from `--background`
2. Try: `--border: [h] [s%] [l% minus 10%]`

---

## Advanced: Dynamic Color Themes

### Allow Users to Switch Themes

Create a theme switcher:

\`\`\`typescript
// hooks/use-theme-color.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const themes = {
  luxury: {
    background: '0 0% 96%',
    primary: '43 74% 49%',
    accent: '43 89% 38%',
  },
  sage: {
    background: '75 47% 92%',
    primary: '120 7% 49%',
    accent: '105 20% 66%',
  },
  // ... more themes
};

const ThemeColorContext = createContext();

export function ThemeColorProvider({ children }) {
  const [theme, setTheme] = useState('luxury');
  
  useEffect(() => {
    const root = document.documentElement;
    const colors = themes[theme];
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);
  
  return (
    <ThemeColorContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeColorContext.Provider>
  );
}

export const useThemeColor = () => useContext(ThemeColorContext);
\`\`\`

Use in components:

\`\`\`tsx
import { useThemeColor } from '@/hooks/use-theme-color';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useThemeColor();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      {Object.keys(themes).map(name => (
        <option key={name} value={name}>{name}</option>
      ))}
    </select>
  );
}
\`\`\`

---

## Quick Reference

### Color Variable Checklist

When changing colors, update these variables:

- [ ] `--background`
- [ ] `--foreground`
- [ ] `--primary`
- [ ] `--primary-foreground`
- [ ] `--secondary`
- [ ] `--secondary-foreground`
- [ ] `--accent`
- [ ] `--accent-foreground`
- [ ] `--muted`
- [ ] `--border`
- [ ] Dark mode equivalents

### Testing Checklist

- [ ] Homepage looks good
- [ ] Collections page products visible
- [ ] Product details page readable
- [ ] Cart and checkout functional
- [ ] Navbar links visible
- [ ] Buttons have good contrast
- [ ] Dark mode tested
- [ ] Mobile responsive
- [ ] Accessibility contrast checked

---

## Examples

### Changing Primary Color Only

To change just the primary brand color (buttons, links):

\`\`\`css
:root {
  --primary: 210 100% 50%; /* Bright blue */
  --primary-foreground: 0 0% 100%; /* White text on blue */
}

.dark {
  --primary: 210 100% 60%; /* Lighter blue for dark mode */
  --primary-foreground: 0 0% 0%; /* Black text on blue */
}
\`\`\`

### Adding Gold Accents

To add gold highlights while keeping other colors:

\`\`\`css
:root {
  --accent: 43 74% 49%; /* Royal gold */
  --accent-foreground: 0 0% 5%;
  --ring: 43 74% 49%; /* Gold focus rings */
}
\`\`\`

---

**Pro Tips:**

1. **Consistency:** Use colors from your palette consistently
2. **Hierarchy:** Primary > Secondary > Accent in importance
3. **Accessibility:** Always check contrast ratios
4. **Brand Identity:** Match your fragrance brand personality
5. **Test Everywhere:** Check all pages and components
6. **Save Backups:** Keep original CSS before major changes

---

**Need Help?**

- Check existing color palettes in this guide
- Use online color tools for inspiration
- Test thoroughly before deployment
- Document your custom palette for future reference

**Last Updated:** 2025
**File Location:** `app/globals.css`
