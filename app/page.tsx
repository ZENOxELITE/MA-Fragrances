import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ProductShowcase from "@/components/product-showcase"
import FragranceNotes from "@/components/fragrance-notes"
import Collections from "@/components/collections"
import { CartPanel } from "@/components/cart-panel"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductShowcase />
      <FragranceNotes />
      <Collections />
      <Footer />
      <CartPanel />
    </>
  )
}
