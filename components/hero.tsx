"use client"

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative w-full h-screen pt-20 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
            Discover Your
            <br />
            <span className="text-accent">Signature Scent</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Immerse yourself in luxury fragrances crafted with the finest ingredients from MA Fragrances
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-8 px-4">
            <Link href="/collections">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-background rounded-full font-semibold hover:bg-accent hover:text-background transition duration-300 shadow-lg hover:shadow-xl">
                Explore Collections
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
