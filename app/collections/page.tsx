import CollectionsPage from "@/components/collections-page"
import Navbar from "@/components/navbar"
import { CartPanel } from "@/components/cart-panel"
import Footer from "@/components/footer"

export const metadata = {
  title: "Collections | Luxe Fragrances",
  description: "Browse our full collection of luxury fragrances",
}

export default function CollectionsRoute() {
  return (
    <>
      <Navbar />
      <CollectionsPage />
      <Footer />
      <CartPanel />
    </>
  )
}
