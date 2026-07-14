"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, RotateCcw } from "lucide-react"
import { PRODUCT_PRICES, BUDGET_CATEGORIES, formatPrice } from "@/lib/config/pricing"

interface QuizQuestion {
  id: number
  question: string
  description: string
  options: {
    text: string
    value: string
  }[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your preferred fragrance gender?",
    description: "This helps us understand your style preference",
    options: [
      { text: "Masculine", value: "masculine" },
      { text: "Feminine", value: "feminine" },
      { text: "Unisex", value: "unisex" },
    ],
  },
  {
    id: 2,
    question: "Which scent family appeals to you?",
    description: "Choose the fragrance profile you're drawn to",
    options: [
      { text: "Floral", value: "floral" },
      { text: "Woody", value: "woody" },
      { text: "Fresh", value: "fresh" },
      { text: "Oriental", value: "oriental" },
    ],
  },
  {
    id: 3,
    question: "How long do you want the scent to last?",
    description: "Consider your daily activities and preferences",
    options: [
      { text: "Light (3-5 hours)", value: "light" },
      { text: "Moderate (5-8 hours)", value: "moderate" },
      { text: "Strong (8+ hours)", value: "strong" },
    ],
  },
  {
    id: 4,
    question: "When do you typically wear fragrance?",
    description: "Tell us about your lifestyle",
    options: [
      { text: "Daily/Office", value: "daily" },
      { text: "Evening/Special Occasions", value: "evening" },
      { text: "Both Day & Night", value: "both" },
    ],
  },
  {
    id: 5,
    question: "What's your budget?",
    description: "We have options for every price point",
    options: [
      { text: BUDGET_CATEGORIES.budget.label, value: "budget" },
      { text: BUDGET_CATEGORIES.midrange.label, value: "midrange" },
      { text: BUDGET_CATEGORIES.premium.label, value: "premium" },
    ],
  },
]

const recommendationMap: {
  [key: string]: number
} = {
  masculine_woody_strong_evening_premium: 4,
  masculine_woody_moderate_daily_midrange: 1,
  feminine_floral_moderate_both_midrange: 2,
  feminine_floral_light_daily_budget: 5,
  unisex_fresh_light_daily_budget: 6,
  unisex_fresh_moderate_both_midrange: 3,
}

const products = [
  {
    id: 1,
    name: "Midnight Velvet",
    category: "Masculine",
    price: PRODUCT_PRICES[1],
    family: "Woody",
    description: "Deep, sophisticated, perfect for the evening gentleman",
    image: "/images/midnight-velvet.jpg",
  },
  {
    id: 2,
    name: "Rose Ethereal",
    category: "Feminine",
    price: PRODUCT_PRICES[2],
    family: "Floral",
    description: "Delicate and romantic, elegant for any occasion",
    image: "/images/rose-ethereal.jpg",
  },
  {
    id: 3,
    name: "Citrus Dawn",
    category: "Unisex",
    price: PRODUCT_PRICES[3],
    family: "Fresh",
    description: "Fresh and uplifting, perfect for active lifestyles",
    image: "/images/citrus-dawn.jpg",
  },
  {
    id: 4,
    name: "Oud Luxe",
    category: "Masculine",
    price: PRODUCT_PRICES[4],
    family: "Woody",
    description: "Ultra-luxurious, a scent for the connoisseur",
    image: "/images/oud-luxe.jpg",
  },
  {
    id: 5,
    name: "Floral Silk",
    category: "Feminine",
    price: PRODUCT_PRICES[5],
    family: "Floral",
    description: "Soft and graceful, timeless elegance",
    image: "/images/floral-silk.jpg",
  },
  {
    id: 6,
    name: "Ocean Breeze",
    category: "Unisex",
    price: PRODUCT_PRICES[6],
    family: "Fresh",
    description: "Clean and crisp, evokes seaside freshness",
    image: "/images/ocean-breeze.jpg",
  },
]

export default function ScentFinderQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendedProductId, setRecommendedProductId] = useState<number | null>(null)

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion]: value }
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate recommendation
      const answerKey = Object.values(newAnswers).join("_")
      const productId = recommendationMap[answerKey] || Math.floor(Math.random() * 6) + 1
      setRecommendedProductId(productId)
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setRecommendedProductId(null)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResults && recommendedProductId) {
    const product = products.find((p) => p.id === recommendedProductId)!

    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-foreground mb-4">Your Perfect Match</h1>
            <p className="text-lg text-muted-foreground">Based on your preferences, we recommend:</p>
          </div>

          {/* Product Recommendation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Bottle Visualization */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-secondary/5 border border-border/50 relative">
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

            {/* Product Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-accent font-semibold tracking-wide mb-2 text-sm uppercase">{product.family}</p>
                <h2 className="text-4xl font-bold text-foreground mb-3">{product.name}</h2>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground font-medium">Category</span>
                  <span className="text-accent font-semibold">{product.category}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground font-medium">Price</span>
                  <span className="text-accent font-semibold">{formatPrice(product.price)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full px-8 py-3 bg-foreground text-background rounded-full font-semibold hover:bg-accent transition-colors text-center"
                >
                  View Full Details
                </Link>
                <button
                  onClick={handleRestart}
                  className="w-full px-8 py-3 border-2 border-foreground text-foreground rounded-full font-semibold hover:bg-foreground hover:text-background transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Take Quiz Again
                </button>
              </div>
            </div>
          </div>

          {/* Why This Match */}
          <div className="bg-muted/30 rounded-xl p-8 border border-border/50 mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Why This Match?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Your Style", desc: "Matches your gender and fragrance family preferences perfectly" },
                { title: "Perfect Duration", desc: "Longevity aligns with your lifestyle and daily activities" },
                { title: "Your Budget", desc: "Offers the best luxury value in your preferred price range" },
              ].map((item, i) => (
                <div key={i} className="bg-background rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Other Options */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Other Recommendations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((other) => (
                  <Link
                    key={other.id}
                    href={`/products/${other.id}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 transition-all hover:shadow-lg"
                  >
                    <div className="aspect-square bg-gradient-to-br from-accent/5 to-secondary/5 flex items-center justify-center relative">
                      <Image
                        src={other.image || "/placeholder.svg"}
                        alt={other.name}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-foreground mb-1 group-hover:text-accent transition">
                        {other.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">{other.family}</p>
                      <p className="text-accent font-bold">{formatPrice(other.price)}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Find Your Signature Scent</h1>
          <p className="text-lg text-muted-foreground">Answer a few questions to get personalized recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-accent to-secondary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-lg mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-3">{question.question}</h2>
            <p className="text-muted-foreground text-lg">{question.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                  answers[currentQuestion] === option.value
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border hover:border-accent/50 text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 px-6 py-3 border-2 border-border text-foreground rounded-full font-semibold hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={() => handleAnswer(answers[currentQuestion] || "")}
              disabled={!answers[currentQuestion]}
              className="flex-1 px-6 py-3 bg-foreground text-background rounded-full font-semibold hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
