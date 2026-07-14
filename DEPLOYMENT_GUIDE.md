# Vercel Deployment Guide for The Formula Lab

This guide will help you deploy The Formula Lab luxury fragrance e-commerce website to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)
- Git installed on your local machine

## Step 1: Prepare Your Repository

1. **Initialize Git Repository** (if not already done):
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit - The Formula Lab website"
   \`\`\`

2. **Create a GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., "formula-lab-ecommerce")
   - Don't initialize with README, .gitignore, or license

3. **Push to GitHub**:
   \`\`\`bash
   git remote add origin https://github.com/YOUR_USERNAME/formula-lab-ecommerce.git
   git branch -M main
   git push -u origin main
   \`\`\`

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Sign in or create an account

2. **Import Your Project**:
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository

3. **Configure Build Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `pnpm build` (or leave default)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `pnpm install` (or leave default)

4. **Environment Variables** (Optional):
   Click "Environment Variables" and add:
   \`\`\`
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   NEXT_PUBLIC_SITE_NAME=The Formula Lab
   \`\`\`
   
   If using JazzCash payment gateway:
   \`\`\`
   JAZZCASH_MERCHANT_ID=your_merchant_id
   JAZZCASH_PASSWORD=your_password
   JAZZCASH_INTEGRITY_SALT=your_integrity_salt
   JAZZCASH_RETURN_URL=https://your-project.vercel.app/api/jazzcash/callback
   JAZZCASH_API_URL=https://sandbox.jazzcash.com.pk
   \`\`\`

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login to Vercel**:
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**:
   \`\`\`bash
   vercel
   \`\`\`
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Select your account
   - Link to existing project? `N`
   - Project name? `formula-lab-ecommerce`
   - Directory? `./` (press Enter)

4. **Add Environment Variables**:
   \`\`\`bash
   vercel env add NEXT_PUBLIC_SITE_URL
   vercel env add NEXT_PUBLIC_SITE_NAME
   \`\`\`

5. **Deploy to Production**:
   \`\`\`bash
   vercel --prod
   \`\`\`

## Step 3: Configure Custom Domain (Optional)

1. **Go to Project Settings**:
   - Navigate to your project in Vercel dashboard
   - Click "Settings" → "Domains"

2. **Add Custom Domain**:
   - Click "Add"
   - Enter your domain (e.g., `formulalab.com`)
   - Follow DNS configuration instructions

3. **Update Environment Variables**:
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Update `JAZZCASH_RETURN_URL` if using JazzCash

## Step 4: Verify Deployment

1. **Check Homepage**:
   - Visit your deployed URL
   - Verify hero section loads correctly
   - Test navigation links

2. **Test Key Features**:
   - Browse collections page
   - View product details
   - Add items to cart
   - Test checkout flow (without payment)
   - Complete the scent finder quiz

3. **Test Mobile Responsiveness**:
   - Open site on mobile device or use browser dev tools
   - Check all pages are mobile-friendly

## Step 5: Enable Analytics (Optional)

1. **Vercel Analytics** (Recommended):
   \`\`\`bash
   pnpm add @vercel/analytics
   \`\`\`
   
   The analytics are already integrated in the layout.tsx file.

2. **Google Analytics**:
   - Add `NEXT_PUBLIC_GA_ID` environment variable
   - Implement tracking in layout.tsx (see SITE_SETTINGS.md)

## Automatic Deployments

Vercel automatically deploys your site when you push to GitHub:

- **Production**: Pushes to `main` branch
- **Preview**: Pushes to other branches or pull requests

### To Update Your Site:

\`\`\`bash
# Make changes to your code
git add .
git commit -m "Updated product images"
git push origin main
\`\`\`

Vercel will automatically build and deploy in 2-3 minutes.

## Troubleshooting

### Build Fails

**Error**: "Module not found"
- **Solution**: Ensure all imports use correct paths
- Check `@/` paths in tsconfig.json

**Error**: "Image optimization error"
- **Solution**: Images are set to unoptimized in next.config.mjs
- Verify image paths in public/ folder

### Environment Variables Not Working

**Issue**: Variables not accessible in app
- **Solution**: Redeploy after adding environment variables
- Ensure client-side variables use `NEXT_PUBLIC_` prefix

### Slow Initial Load

**Issue**: First visit takes long to load
- **Solution**: This is normal for cold starts (serverless)
- Consider upgrading to Vercel Pro for better performance

### 404 Errors on Product Pages

**Issue**: Direct navigation to `/products/1` gives 404
- **Solution**: Ensure dynamic routes are properly configured
- Check app/products/[id]/page.tsx exists

## Performance Optimization

1. **Image Optimization**:
   - Replace placeholder images with optimized product photos
   - Use WebP format for better compression
   - Recommended size: 800x800px at 80% quality

2. **Reduce Bundle Size**:
   - The three.js library has been removed
   - All 3D animations replaced with static images
   - Current bundle should be under 500KB

3. **Enable Caching**:
   - Vercel automatically caches static assets
   - Images in public/ folder are cached at edge

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Product images display properly
- [ ] Cart functionality works
- [ ] Checkout modal opens
- [ ] Quiz completes successfully
- [ ] Mobile responsive on all pages
- [ ] Forms validate properly
- [ ] Footer links work
- [ ] Site metadata is correct (title, description)

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Community**: https://github.com/vercel/next.js/discussions

## Security Notes

1. **Never commit .env file** - It's in .gitignore
2. **Use environment variables** for sensitive data
3. **JazzCash credentials** should only be in Vercel dashboard
4. **Enable HTTPS** - Vercel provides this automatically
5. **Set up domain verification** for custom domains

## Maintenance

### Regular Updates:
\`\`\`bash
# Update dependencies monthly
pnpm update

# Test locally
pnpm dev

# Deploy if tests pass
git add .
git commit -m "Updated dependencies"
git push origin main
\`\`\`

### Monitoring:
- Check Vercel dashboard for deployment status
- Monitor analytics for traffic patterns
- Review function logs for errors

Your Formula Lab e-commerce website is now live and ready to sell luxury fragrances!
