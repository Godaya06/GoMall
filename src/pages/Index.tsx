import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPhones from "@/components/FeaturedPhones";
import ValueProps from "@/components/ValueProps";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const Index = () => (
  <CartProvider>
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedPhones />
      <ValueProps />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </div>
  </CartProvider>
);

export default Index;
