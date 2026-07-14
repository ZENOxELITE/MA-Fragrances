"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PRODUCT_PRICES, formatPrice } from "@/lib/config/pricing"
import { useCart } from "@/hooks/use-cart"

const products = [
  {
    id: 1,
    name: "Midnight Velvet",
    category: "Masculine",
    price: PRODUCT_PRICES[1],
    notes: "Woody, Musk, Amber",
    description: "A sophisticated blend of deep woods and sensual musk",
    concentration: "Eau de Parfum",
    volume: "100ml",
    image: "/images/midnight-velvet.jpg",
  },
  {
    id: 2,
    name: "Rose Ethereal",
    category: "Feminine",
    price: PRODUCT_PRICES[2],
    notes: "Floral, Jasmine, Musk",
    description: "Delicate rose petals with ethereal jasmine heart",
    concentration: "Eau de Parfum",
    volume: "100ml",
    image: "/images/rose-ethereal.jpg",
  },
  {
    id: 3,
    name: "Citrus Dawn",
    category: "Unisex",
    price: PRODUCT_PRICES[3],
    notes: "Bergamot, Lemon, Cedar",
    description: "Fresh morning citrus with warm cedar base",
    concentration: "Eau de Toilette",
    volume: "100ml",
    image: "/images/citrus-dawn.jpg",
  },
  {
    id: 4,
    name: "Oud Luxe",
    category: "Masculine",
    price: PRODUCT_PRICES[4],
    notes: "Oud, Amber, Sandalwood",
    description: "Precious oud with rich amber and sandalwood",
    concentration: "Eau de Parfum",
    volume: "75ml",
    image: "/images/oud-luxe.jpg",
  },
]

export default function ProductShowcase() {
  const { addItem } = useCart()
  const [current, setCurrent] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const next = () => setCurrent((current + 1) % products.length)
  const prev = () => setCurrent((current - 1 + products.length) % products.length)

  const getVisibleProducts = () => {
    const visible = []
    for (let i = 0; i < 4; i++) {
      visible.push(products[(current + i) % products.length])
    }
    return visible
  }

  return (
    <section className="py-12 md:py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Signature Collection</h2>
          <p className="text-base md:text-lg text-muted-foreground">Curated luxury fragrances for discerning tastes</p>
        </div>

        {/* Featured Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* 3D Product Visualization */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-secondary/5">
              <Image
                src={products[current].image || "/placeholder.svg"}
                alt={products[current].name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <div>
              <p className="text-accent font-semibold tracking-wide mb-2 text-xs md:text-sm">
                {products[current].category.toUpperCase()}
              </p>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{products[current].name}</h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {products[current].description}
              </p>
            </div>

            {/* Product Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Concentration</p>
                <p className="text-foreground font-semibold text-sm md:text-base">{products[current].concentration}</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Volume</p>
                <p className="text-foreground font-semibold text-sm md:text-base">{products[current].volume}</p>
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Fragrance Notes</p>
              <div className="flex gap-2 flex-wrap">
                {products[current].notes.split(", ").map((note, idx) => (
                  <span
                    key={idx}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-accent/10 border border-accent/30 text-foreground rounded-full text-xs md:text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex flex-col gap-4 pt-4 border-t border-border">
              <p className="text-3xl md:text-4xl font-bold text-accent">{formatPrice(products[current].price)}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/products/${products[current].id}`}
                  className="flex-1 px-6 md:px-8 py-3 bg-muted border-2 border-border text-foreground rounded-full font-semibold hover:bg-muted/80 hover:border-accent transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  View Details
                </Link>
                <button
                  onClick={() => {
                    addItem({
                      id: products[current].id,
                      name: products[current].name,
                      price: products[current].price,
                      image: products[current].image,
                      quantity: 1,
                    })
                  }}
                  className="flex-1 px-6 md:px-8 py-3 bg-accent text-background rounded-full font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Grid with Navigation */}
        <div className="relative">
          {/* Grid of product cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {getVisibleProducts().map((product, idx) => (
              <button
                key={product.id}
                onClick={() => setCurrent((current + idx) % products.length)}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-gradient-to-br from-background to-muted/40 border border-border/50 hover:border-accent/50 ${
                  idx === 0 ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/10"></div>

                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-background/20 p-3 md:p-4 transition-all duration-300 group-hover:from-background/98">
                  <h4 className="text-foreground font-semibold text-xs md:text-sm">{product.name}</h4>
                  <p className="text-accent text-xs mt-1">{formatPrice(product.price)}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-foreground text-background hover:bg-accent transition-colors z-10 hidden lg:flex items-center justify-center"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-foreground text-background hover:bg-accent transition-colors z-10 hidden lg:flex items-center justify-center"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "bg-foreground w-8" : "bg-muted hover:bg-muted-foreground w-2"
              }`}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
