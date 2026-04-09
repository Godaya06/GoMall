import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Sparkles, Droplets, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { personalCareProducts } from "@/data/products";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import ProductReviews from "@/components/ProductReviews";

const ProductCareDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const product = personalCareProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <h1 className="font-heading text-2xl font-bold">Product not found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 pt-24 pb-16">
        <div className="container">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to all products</span>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-card rounded-3xl border border-border p-8 flex items-center justify-center card-shadow"
            >
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {product.category}
              </div>
              <div className="absolute top-4 right-4">
                <WishlistButton productId={product.id} productType="care" />
              </div>
              <img
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full max-w-xs object-contain"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                {product.category}
              </span>
              <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-primary font-bold text-2xl lg:text-3xl mb-4">
                KES {product.price.toLocaleString()}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quick details */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.details.map((d) => (
                  <span
                    key={d}
                    className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div className="bg-card rounded-2xl border border-border p-5 mb-4">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" /> Key Ingredients
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
              )}

              {/* How to use */}
              {product.howToUse && (
                <div className="bg-card rounded-2xl border border-border p-5 mb-6">
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-primary" /> How to Use
                  </h3>
                  <p className="text-sm text-foreground leading-relaxed">
                    {product.howToUse}
                  </p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full bg-gradient-primary text-primary-foreground font-semibold text-base"
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })
                }
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart — KES{" "}
                {product.price.toLocaleString()}
              </Button>
            </motion.div>
          </div>

          {/* Reviews */}
          <div className="mt-16">
            <ProductReviews productId={product.id} productType="care" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCareDetail;
