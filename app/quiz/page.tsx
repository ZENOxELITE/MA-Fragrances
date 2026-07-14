import ScentFinderQuiz from "@/components/scent-finder-quiz"
import Navbar from "@/components/navbar"
import { CartPanel } from "@/components/cart-panel"
import Footer from "@/components/footer"

export const metadata = {
  title: "Scent Finder Quiz | Luxe Fragrances",
  description: "Find your perfect fragrance with our personalized quiz",
}

export default function QuizPage() {
  return (
    <>
      <Navbar />
      <ScentFinderQuiz />
      <Footer />
      <CartPanel />
    </>
  )
}
