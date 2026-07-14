"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const collectionCategories = [
  { id: "all", label: "All Fragrances" },
  { id: "masculine", label: "Masculine" },
  { id: "feminine", label: "Feminine" },
  { id: "unisex", label: "Unisex" },
  { id: "limited", label: "Limited Edition" },
]

const scents = [
  { id: 1, name: "Midnight Velvet", category: "masculine", family: "Woody", image: "/images/midnight-velvet.jpg" },
  { id: 2, name: "Rose Ethereal", category: "feminine", family: "Floral", image: "/images/rose-ethereal.jpg" },
  { id: 3, name: "Citrus Dawn", category: "unisex", family: "Citrus", image: "/images/citrus-dawn.jpg" },
  { id: 4, name: "Oud Luxe", category: "masculine", family: "Woody", image: "/images/oud-luxe.jpg" },
  { id: 5, name: "Floral Silk", category: "feminine", family: "Floral", image: "/images/floral-silk.jpg" },
  { id: 6, name: "Ocean Breeze", category: "unisex", family: "Fresh", image: "/images/ocean-breeze.jpg" },
]

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredScents = activeCategory === "all" ? scents : scents.filter((scent) => scent.category === activeCategory)

  return (
    <section className="py-12 md:py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Collections</h2>
          <p className="text-base md:text-lg text-muted-foreground">Browse by category</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
          {collectionCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 md:px-6 py-2 rounded-full font-medium transition text-sm md:text-base ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredScents.map((scent) => (
            <Link
              key={scent.id}
              href={`/products/${scent.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                <Image
                  src={scent.image || "/placeholder.svg"}
                  alt={scent.name}
                  fill
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent group-hover:from-foreground/10 transition"></div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{scent.name}</h3>
                <p className="text-sm text-accent mb-4">{scent.family}</p>
                <div className="w-full py-2 bg-foreground text-background rounded-lg font-semibold hover:bg-accent transition text-center text-sm md:text-base">
                  View Details
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
