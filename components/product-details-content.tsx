"use client"

import { useState } from "react"
import { Heart, Truck, Shield, RotateCcw, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { PRODUCT_PRICES, formatPrice, VOLUME_MULTIPLIERS } from "@/lib/config/pricing"

interface ProductDetailsProps {
  id: string
}

const productDatabase = {
  "1": {
    name: "Midnight Velvet",
    category: "Masculine",
    price: PRODUCT_PRICES[1], // Using centralized pricing
    rating: 4.8,
    reviews: 234,
    image: "/images/midnight-velvet.jpg",
    bottleColor: "#2a2520",
    capColor: "#c9a961",
    liquidColor: "#8b6f47",
    description:
      "A sophisticated blend of deep woods and sensual musk that captures the essence of midnight luxury. Midnight Velvet is a timeless masculine fragrance that exudes confidence and elegance.",
    details: {
      concentration: "Eau de Parfum",
      volume: ["75ml", "100ml", "200ml"],
      projectionDuration: "8-10 hours",
      longevity: "Very Strong",
      sillage: "Moderate to Heavy",
      season: "Fall, Winter",
    },
    topNotes: ["Bergamot", "Black Pepper", "Ginger"],
    heartNotes: ["Orris Root", "Cedar", "Violet"],
    baseNotes: ["Oud", "Musk", "Amber", "Sandalwood"],
    description_long:
      "Midnight Velvet represents the pinnacle of luxury fragrancing for the discerning gentleman. Crafted with precision and passion, this eau de parfum opens with bright citrus and spice notes that immediately capture attention. The heart reveals a complex interplay of woody and floral elements, while the deep base of oud and musk provides an intoxicating finish that lingers for hours.",
    benefits: [
      "Long-lasting fragrance that evolves throughout the day",
      "Premium ingredients sourced from around the world",
      "Versatile for both day and evening wear",
      "Suitable for all skin types",
      "Eco-friendly packaging",
    ],
    usageTips: [
      "Apply to pulse points: wrists, neck, and behind ears",
      "Best applied to clean, moisturized skin",
      "For longer longevity, apply to inner elbows and behind knees",
      "One to two sprays is sufficient per application",
      "Store away from direct sunlight and heat",
    ],
  },
  "2": {
    name: "Rose Ethereal",
    category: "Feminine",
    price: PRODUCT_PRICES[2], // Using centralized pricing
    rating: 4.9,
    reviews: 312,
    image: "/images/rose-ethereal.jpg",
    bottleColor: "#4a3555",
    capColor: "#d4af37",
    liquidColor: "#f0c8d8",
    description:
      "Delicate rose petals with ethereal jasmine heart create a captivating feminine fragrance. Rose Ethereal is the epitome of elegance and grace.",
    details: {
      concentration: "Eau de Parfum",
      volume: ["75ml", "100ml", "200ml"],
      projectionDuration: "7-9 hours",
      longevity: "Strong",
      sillage: "Moderate",
      season: "Spring, Summer, Fall",
    },
    topNotes: ["Pink Pepper", "Bergamot", "Grapefruit"],
    heartNotes: ["Rose", "Jasmine", "Peony"],
    baseNotes: ["Musk", "Amber", "Sandalwood"],
    description_long:
      "Rose Ethereal is a floral masterpiece that celebrates the beauty of the rose in all its forms. With its delicate balance of fresh citrus, romantic florals, and warm base notes, this fragrance is perfect for the modern woman who appreciates timeless elegance with a contemporary twist.",
    benefits: [
      "Enchanting floral composition with fresh citrus opening",
      "Perfect balance between sweetness and sophistication",
      "Ideal for romantic occasions and everyday wear",
      "Non-irritating formula suitable for sensitive skin",
      "Responsibly sourced botanical ingredients",
    ],
    usageTips: [
      "Apply to pulse points for best projection",
      "Layer with our Rose Ethereal body cream for enhanced longevity",
      "Perfect for spring and summer seasons",
      "One spray is often sufficient due to its projection",
      "Avoid applying before sun exposure to prevent photosensitivity",
    ],
  },
  "3": {
    name: "Citrus Dawn",
    category: "Unisex",
    price: PRODUCT_PRICES[3], // Using centralized pricing
    rating: 4.7,
    reviews: 189,
    image: "/images/citrus-dawn.jpg",
    bottleColor: "#1a3a3a",
    capColor: "#ffd700",
    liquidColor: "#fffacd",
    description:
      "Fresh morning citrus with warm cedar base creates an invigorating unisex fragrance. Citrus Dawn is perfect for those seeking vibrancy and freshness.",
    details: {
      concentration: "Eau de Toilette",
      volume: ["100ml", "200ml"],
      projectionDuration: "5-7 hours",
      longevity: "Medium",
      sillage: "Moderate",
      season: "Spring, Summer",
    },
    topNotes: ["Lemon", "Bergamot", "Grapefruit"],
    heartNotes: ["Neroli", "Orange Blossom", "Green Tea"],
    baseNotes: ["Cedar", "Vetiver", "Musk"],
    description_long:
      "Citrus Dawn is a refreshing fragrance that captures the essence of a perfect morning. With its bright citrus opening and aromatic woody base, it's an excellent choice for anyone seeking a clean, energizing fragrance that works for any gender.",
    benefits: [
      "Energizing citrus fragrance perfect for morning wear",
      "Unisex appeal makes it perfect for sharing",
      "Fresh and clean scent without overwhelming florals",
      "Great for gym and outdoor activities",
      "Affordable luxury with premium quality",
    ],
    usageTips: [
      "Perfect for applying before heading to work or gym",
      "Reapply after 4-5 hours for sustained freshness",
      "Combine with unscented moisturizer for layering",
      "Excellent as a day fragrance before evening wear",
      "Store in cool, dark place to preserve citrus notes",
    ],
  },
  "4": {
    name: "Oud Luxe",
    category: "Masculine",
    price: PRODUCT_PRICES[4], // Using centralized pricing
    rating: 4.9,
    reviews: 156,
    image: "/images/oud-luxe.jpg",
    bottleColor: "#3d3d3d",
    capColor: "#c9a961",
    liquidColor: "#a0826d",
    description:
      "Precious oud with rich amber and sandalwood creates an ultra-luxurious fragrance. Oud Luxe is the ultimate expression of sophistication.",
    details: {
      concentration: "Eau de Parfum",
      volume: ["50ml", "75ml"],
      projectionDuration: "10+ hours",
      longevity: "Extremely Strong",
      sillage: "Heavy",
      season: "Fall, Winter",
    },
    topNotes: ["Cinnamon", "Cardamom", "Black Pepper"],
    heartNotes: ["Oud", "Agarwood", "Leather"],
    baseNotes: ["Amber", "Sandalwood", "Musk", "Vetiver"],
    description_long:
      "Oud Luxe represents the pinnacle of oriental fragrancing. This extraordinary eau de parfum features premium oud from Cambodi, blended with rare agarwood and enveloped in luxurious amber and sandalwood. It's a fragrance for those who truly appreciate the finer things in life.",
    benefits: [
      "Authentic oud sourced from premium regions",
      "Extremely long-lasting performance",
      "Rich, complex scent profile with depth",
      "Perfect for special occasions and evening wear",
      "Investment-worthy fragrance for collectors",
    ],
    usageTips: [
      "Best applied to pulse points in the evening",
      "One to two sprays is recommended due to strength",
      "Pairs well with evening wear and formal attire",
      "Perfect for cooler months and nighttime",
      "Store in original packaging to preserve rare oud",
    ],
  },
  "5": {
    name: "Floral Silk",
    category: "Feminine",
    price: PRODUCT_PRICES[5], // Using centralized pricing
    rating: 4.6,
    reviews: 198,
    image: "/images/floral-silk.jpg",
    bottleColor: "#e8d5e8",
    capColor: "#d4af37",
    liquidColor: "#f5e6f5",
    description:
      "A silky smooth floral bouquet with notes of peony and white musk. Floral Silk is elegant sophistication in a bottle.",
    details: {
      concentration: "Eau de Parfum",
      volume: ["75ml", "100ml", "200ml"],
      projectionDuration: "6-8 hours",
      longevity: "Strong",
      sillage: "Moderate",
      season: "Spring, Summer",
    },
    topNotes: ["Peach", "Mandarin", "Blackcurrant"],
    heartNotes: ["Peony", "Magnolia", "Lily of the Valley"],
    baseNotes: ["White Musk", "Vanilla", "Blonde Woods"],
    description_long:
      "Floral Silk is a luminous fragrance that embodies grace and femininity. Its powdery floral heart is surrounded by fruity top notes and creamy base notes, creating a sophisticated composition that's both modern and timeless. Perfect for the woman who appreciates understated luxury.",
    benefits: [
      "Soft, powdery floral scent with excellent projection",
      "Versatile for both professional and social settings",
      "Gentle formula suitable for sensitive skin",
      "Elegant packaging perfect for gifting",
      "Long-lasting without being overpowering",
    ],
    usageTips: [
      "Apply to clothing for extended longevity",
      "Layer with matching body lotion for enhanced effect",
      "Perfect for daytime and romantic evening wear",
      "Two sprays provide optimal sillage",
      "Ideal for spring and summer occasions",
    ],
  },
  "6": {
    name: "Ocean Breeze",
    category: "Unisex",
    price: PRODUCT_PRICES[6], // Using centralized pricing
    rating: 4.5,
    reviews: 167,
    image: "/images/ocean-breeze.jpg",
    bottleColor: "#4a7a8c",
    capColor: "#a8c5d1",
    liquidColor: "#b8d4e0",
    description:
      "Fresh aquatic notes with sea salt and driftwood create a revitalizing coastal escape. Ocean Breeze captures the essence of the seaside.",
    details: {
      concentration: "Eau de Toilette",
      volume: ["100ml", "200ml"],
      projectionDuration: "4-6 hours",
      longevity: "Medium",
      sillage: "Light to Moderate",
      season: "Spring, Summer",
    },
    topNotes: ["Sea Salt", "Bergamot", "Cucumber"],
    heartNotes: ["Marine Accord", "Sage", "Lavender"],
    baseNotes: ["Driftwood", "Amber", "Musk"],
    description_long:
      "Ocean Breeze transports you to a pristine coastline with its refreshing aquatic composition. This clean and invigorating fragrance features crisp marine notes balanced with warm woody undertones, making it perfect for those who love fresh, breezy scents with a modern twist.",
    benefits: [
      "Crisp, clean aquatic scent perfect for warm weather",
      "Unisex appeal suitable for anyone who loves fresh fragrances",
      "Light and refreshing without being too sweet",
      "Ideal for active lifestyles and casual wear",
      "Affordable everyday luxury",
    ],
    usageTips: [
      "Perfect for post-shower application",
      "Reapply throughout the day for continuous freshness",
      "Great for gym, beach, and outdoor activities",
      "Layer with unscented products to avoid clashing",
      "Best worn during spring and summer months",
    ],
  },
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const { addItem } = useCart()
  const product = productDatabase[id as keyof typeof productDatabase]

  const [selectedVolume, setSelectedVolume] = useState(product?.details?.volume[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Calculate price based on selected volume
  const getVolumePrice = () => {
    const multiplier = VOLUME_MULTIPLIERS[selectedVolume as keyof typeof VOLUME_MULTIPLIERS] || 1
    return Math.round(product.price * multiplier)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
          <a
            href="/collections"
            className="px-6 py-3 bg-foreground text-background rounded-full font-semibold hover:bg-accent transition-colors inline-block"
          >
            Browse Our Collection
          </a>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id,
      name: product.name,
      price: getVolumePrice(),
      volume: selectedVolume,
      quantity,
      image: product.image,
      category: product.category,
    })
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Project Disclaimer */}
        <div className="mb-8 p-4 bg-accent/10 border border-accent rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <strong>Note:</strong> This is a portfolio project only. The website will not receive or process any actual orders.
          </p>
        </div>
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md h-80 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-secondary/5 border border-border/50 relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-start space-y-8">
            {/* Header */}
            <div>
              <p className="text-accent font-semibold tracking-wide mb-2 text-sm uppercase">{product.category}</p>
              <h1 className="text-5xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? "text-accent" : "text-muted"}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div>
              <p className="text-5xl font-bold text-accent">{formatPrice(getVolumePrice())}</p>
              <p className="text-sm text-muted-foreground mt-2">Premium Luxury Fragrance</p>
            </div>

            {/* Volume Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                Select Volume
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.details.volume.map((vol) => (
                  <button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                      selectedVolume === vol
                        ? "bg-foreground text-background ring-2 ring-accent"
                        : "bg-muted text-foreground hover:bg-muted-foreground/20"
                    }`}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground hover:bg-muted transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-foreground">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground hover:bg-muted transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3 bg-foreground text-background rounded-full font-semibold hover:bg-accent transition-colors flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-8 py-3 rounded-full font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? "bg-accent/20 border-accent text-accent"
                      : "border-border text-foreground hover:bg-muted"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                  Wishlist
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "Authentic" },
                { icon: RotateCcw, label: "30-Day Return" },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <feature.icon className="w-6 h-6 text-accent" />
                  <span className="text-xs font-semibold text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Tabs */}
        <div className="space-y-8 border-t border-border pt-12">
          {/* Fragrance Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Concentration", value: product.details.concentration },
              { label: "Longevity", value: product.details.longevity },
              { label: "Sillage", value: product.details.sillage },
              { label: "Best Season", value: product.details.season },
            ].map((spec, i) => (
              <div key={i} className="bg-muted/50 rounded-xl p-4 border border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                  {spec.label}
                </p>
                <p className="text-foreground font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Fragrance Notes */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Fragrance Composition</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { tier: "Top Notes", notes: product.topNotes, color: "from-yellow-200 to-orange-200" },
                { tier: "Heart Notes", notes: product.heartNotes, color: "from-rose-200 to-pink-300" },
                { tier: "Base Notes", notes: product.baseNotes, color: "from-amber-400 to-orange-600" },
              ].map((section, i) => (
                <div key={i} className={`bg-gradient-to-b ${section.color} rounded-xl p-6 border border-foreground/10`}>
                  <h4 className="text-lg font-bold text-foreground mb-4">{section.tier}</h4>
                  <ul className="space-y-2">
                    {section.notes.map((note, idx) => (
                      <li key={idx} className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">About This Fragrance</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">{product.description_long}</p>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Why You'll Love It</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, i) => (
                <div key={i} className="flex gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
                  <span className="text-accent text-xl flex-shrink-0">✓</span>
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Tips */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Usage Tips</h3>
            <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-xl p-8 border border-border/50">
              <ol className="space-y-4">
                {product.usageTips.map((tip, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-accent font-bold text-lg flex-shrink-0 w-8">{i + 1}.</span>
                    <p className="text-foreground leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
