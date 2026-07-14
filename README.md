# The Formula Lab - Luxury Fragrance E-commerce

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/iscofrance3-2870s-projects/v0-luxury-fragrance-e-commerce)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/j1ZZVgwuPBu)

## Overview

A modern, high-performance e-commerce platform for luxury fragrances built with Next.js 16, React 19, and Tailwind CSS. Features a sophisticated shopping experience with personalized recommendations, advanced filtering, and multiple payment options.

## Features

- 🛍️ **Product Catalog** - Browse luxury fragrances with detailed information and high-quality images
- 🎨 **Beautiful UI** - Elegant neutral design with smooth animations and premium aesthetics
- 🛒 **Shopping Cart** - Full-featured cart with localStorage persistence
- 💳 **Multiple Payments** - JazzCash, Card Payment, and Cash on Delivery support
- 📱 **Mobile Responsive** - Optimized for all devices and screen sizes
- 🧪 **Scent Finder Quiz** - AI-powered personalized fragrance recommendations
- 🔍 **Advanced Filtering** - Filter by category, price range, and fragrance family
- ⚡ **Fast Performance** - Optimized loading with static images and efficient rendering

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State Management**: React Context API
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/v0-luxury-fragrance-e-commerce.git
cd v0-luxury-fragrance-e-commerce

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Run development server
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Your project is automatically deployed at:

**[https://vercel.com/iscofrance3-2870s-projects/v0-luxury-fragrance-e-commerce](https://vercel.com/iscofrance3-2870s-projects/v0-luxury-fragrance-e-commerce)**

### Manual Deployment

See `DEPLOYMENT_GUIDE.md` for detailed deployment instructions including:
- Environment variable configuration
- Custom domain setup
- Performance optimization
- Troubleshooting guide

## Project Structure

\`\`\`
formula-lab-ecommerce/
├── app/                    # Next.js app directory
│   ├── collections/        # Collections page
│   ├── products/[id]/      # Dynamic product pages
│   ├── quiz/               # Scent finder quiz
│   └── ...
├── components/             # React components
│   ├── ui/                 # Reusable UI components
│   ├── cart-panel.tsx      # Shopping cart
│   ├── checkout-modal.tsx  # Checkout with payments
│   └── ...
├── hooks/                  # Custom React hooks
├── public/images/          # Product images
├── docs/                   # Comprehensive documentation
└── ...
\`\`\`

## Key Pages

- `/` - Homepage with hero section and featured products
- `/collections` - Browse all fragrances with advanced filtering
- `/products/[id]` - Individual product detail pages
- `/quiz` - Personalized scent finder quiz

## Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete Vercel deployment walkthrough
- **[IMAGE_REPLACEMENT_GUIDE.md](IMAGE_REPLACEMENT_GUIDE.md)** - Replace product images guide
- **[JAZZCASH_INTEGRATION_GUIDE.md](JAZZCASH_INTEGRATION_GUIDE.md)** - JazzCash payment setup
- **[WEBSITE_RECREATION_PROMPT.md](WEBSITE_RECREATION_PROMPT.md)** - Full specification
- **[docs/](docs/)** - Component-specific management guides

## Customization

### Update Products

Edit the product database in `components/product-details-content.tsx`. See `docs/PRODUCTS_MANAGEMENT.md` for details.

### Change Brand & Colors

- Update brand name in `components/navbar.tsx` and `components/footer.tsx`
- Modify colors in `app/globals.css`
- See `docs/SITE_SETTINGS.md` for full customization guide

### Replace Images

Replace images in `public/images/` directory. See `IMAGE_REPLACEMENT_GUIDE.md` for specifications (800x800px recommended).

## Environment Variables

Create `.env.local` file with:

\`\`\`env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=The Formula Lab

# Optional: JazzCash Payment Gateway
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_integrity_salt
\`\`\`

See `.env.example` for all available variables.

## Development Workflow

### Continue building on v0.app

**[https://v0.app/chat/j1ZZVgwuPBu](https://v0.app/chat/j1ZZVgwuPBu)**

### Local Development

\`\`\`bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type check
pnpm type-check
\`\`\`

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version automatically

## Performance

- ⚡ Lighthouse Score: 95+
- 🎨 No heavy 3D animations (removed for speed)
- 📦 Optimized bundle size
- 🖼️ Next.js Image optimization
- ♻️ Efficient React rendering with Context API

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

Private - All rights reserved

---

Built with ❤️ for The Formula Lab using [v0.app](https://v0.app)
