import ProductDetails from "@/components/product-details-content"
import Navbar from "@/components/navbar"
import { CartPanel } from "@/components/cart-panel"
import Footer from "@/components/footer"

export const metadata = {
  title: "Product Details | Luxe Fragrances",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Navbar />
      <ProductDetails id={params.id} />
      <Footer />
      <CartPanel />
    </>
  )
}
