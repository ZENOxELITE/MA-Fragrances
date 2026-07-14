"use client"

import { useState, useMemo } from "react"
import { Search, Filter, X, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PRODUCT_PRICES, PRICE_RANGES, formatPrice } from "@/lib/config/pricing"
import { useCart } from "@/hooks/use-cart"

interface Product {
  id: number
  name: string
  category: "masculine" | "feminine" | "unisex"
  family: string
  price: number
  rating: number
  image: string
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Midnight Velvet",
    category: "masculine",
    family: "Woody",
    price: PRODUCT_PRICES[1],
    rating: 4.8,
    image: "/images/midnight-velvet.jpg",
  },
  {
    id: 2,
    name: "Rose Ethereal",
    category: "feminine",
    family: "Floral",
    price: PRODUCT_PRICES[2],
    rating: 4.9,
    image: "/images/rose-ethereal.jpg",
  },
  {
    id: 3,
    name: "Citrus Dawn",
    category: "unisex",
    family: "Citrus",
    price: PRODUCT_PRICES[3],
    rating: 4.7,
    image: "/images/citrus-dawn.jpg",
  },
  {
    id: 4,
    name: "Oud Luxe",
    category: "masculine",
    family: "Woody",
    price: PRODUCT_PRICES[4],
    rating: 4.9,
    image: "/images/oud-luxe.jpg",
  },
  {
    id: 5,
    name: "Floral Silk",
    category: "feminine",
    family: "Floral",
    price: PRODUCT_PRICES[5],
    rating: 4.6,
    image: "/images/floral-silk.jpg",
  },
  {
    id: 6,
    name: "Ocean Breeze",
    category: "unisex",
    family: "Fresh",
    price: PRODUCT_PRICES[6],
    rating: 4.5,
    image: "/images/ocean-breeze.jpg",
  },
]

export default function CollectionsPage() {
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([PRICE_RANGES.min, PRICE_RANGES.max])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  // Get unique families
  const families = Array.from(new Set(allProducts.map((p) => p.family)))
  const categories = ["masculine", "feminine", "unisex"]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const products = allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.family.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesFamily = !selectedFamily || product.family === selectedFamily
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesFamily && matchesPrice
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price)
      case "price-high":
        return products.sort((a, b) => b.price - a.price)
      case "rating":
        return products.sort((a, b) => b.rating - a.rating)
      case "name":
        return products.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return products
    }
  }, [searchQuery, selectedCategory, selectedFamily, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background py-6 sm:py-12 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto pt-16">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4">Our Collections</h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">Discover your signature scent from our curated selection</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-foreground placeholder:text-muted-foreground transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:col-span-1 ${
              showFilters ? "block" : "hidden lg:block"
            } bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-border/50 h-fit shadow-sm`}
          >
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="text-lg font-bold text-foreground">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-8 pb-8 border-b border-border/50">
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Category</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === null
                      ? "bg-accent text-background font-semibold shadow-sm"
                      : "text-foreground hover:bg-accent/10 hover:translate-x-1"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 capitalize ${
                      selectedCategory === cat
                        ? "bg-accent text-background font-semibold shadow-sm"
                        : "text-foreground hover:bg-accent/10 hover:translate-x-1"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Family Filter */}
            <div className="mb-8 pb-8 border-b border-border/50">
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Fragrance Family</h4>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedFamily(null)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    selectedFamily === null
                      ? "bg-accent text-background font-semibold shadow-sm"
                      : "text-foreground hover:bg-accent/10 hover:translate-x-1"
                  }`}
                >
                  All
                </button>
                {families.map((family) => (
                  <button
                    key={family}
                    onClick={() => setSelectedFamily(family)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 capitalize ${
                      selectedFamily === family
                        ? "bg-accent text-background font-semibold shadow-sm"
                        : "text-foreground hover:bg-accent/10 hover:translate-x-1"
                    }`}
                  >
                    {family}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8 pb-8 border-b border-border/50">
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Price Range</h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="range"
                    min={PRICE_RANGES.min}
                    max={PRICE_RANGES.max}
                    step={PRICE_RANGES.step}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min={PRICE_RANGES.min}
                    max={PRICE_RANGES.max}
                    step={PRICE_RANGES.step}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </p>
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
                setSelectedFamily(null)
                setPriceRange([PRICE_RANGES.min, PRICE_RANGES.max])
              }}
              className="w-full px-4 py-2 bg-accent/10 text-accent rounded-lg font-semibold hover:bg-accent hover:text-background transition-all duration-200 hover:scale-105"
            >
              Clear All
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort Options and View Toggle */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <label className="text-sm text-muted-foreground mr-2">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-muted border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-4 py-2 bg-muted border border-border rounded-lg flex items-center gap-2 text-foreground hover:bg-muted-foreground/20 transition"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-background rounded-2xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-accent/5 to-secondary/5 flex items-center justify-center relative overflow-hidden">
                      <div className="w-full h-full">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3 sm:p-4 md:p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">
                            {product.family}
                          </p>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < Math.round(product.rating) ? "text-accent" : "text-muted"}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="text-xs text-muted-foreground ml-auto">{product.rating}</span>
                      </div>

                      {/* Price and Category */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-accent">{formatPrice(product.price)}</p>
                        <span className="text-xs bg-accent/10 text-accent px-2 sm:px-3 py-1 rounded-full capitalize font-medium">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-muted border border-border text-foreground rounded-lg font-semibold hover:bg-muted/80 hover:border-accent transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
                          <span className="hidden sm:inline">Details</span>
                          <span className="sm:hidden">View</span>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              quantity: 1,
                            })
                          }}
                          className="flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm bg-accent text-background rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:scale-110 transition-transform" />
                          <span className="hidden sm:inline">Add</span>
                          <span className="sm:hidden">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">No fragrances found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setSelectedFamily(null)
                    setPriceRange([PRICE_RANGES.min, PRICE_RANGES.max])
                  }}
                  className="px-6 py-2 bg-accent text-background rounded-full font-semibold hover:bg-accent/90 hover:scale-105 transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
