import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { phones } from "@/data/phones";
import { personalCareProducts } from "@/data/products";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistButton from "@/components/WishlistButton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  const { user } = useAuth();
  const { items } = useWishlist();
  const { addItem } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-32 text-center">
          <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold mb-2">Your Wishlist</h1>
          <p className="text-muted-foreground mb-6">Sign in to view your saved items</p>
          <Link to="/auth"><Button className="bg-gradient-primary text-primary-foreground">Sign In</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const wishlistProducts = items.map((item) => {
    if (item.product_type === "phone") {
      const phone = phones.find((p) => p.id === item.product_id);
      return phone ? { id: phone.id, name: phone.name, price: phone.price, image: phone.image, type: "phone" as const, link: `/product/${phone.id}` } : null;
    } else {
      const product = personalCareProducts.find((p) => p.id === item.product_id);
      return product ? { id: product.id, name: product.name, price: product.price, image: product.image, type: "care" as const, link: `/care/${product.id}` } : null;
    }
  }).filter(Boolean) as { id: string; name: string; price: number; image: string; type: "phone" | "care"; link: string }[];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-24">
        <h1 className="text-3xl font-heading font-bold mb-8 flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" /> My Wishlist
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
            <Link to="/"><Button variant="outline">Browse Products</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div key={`${product.type}-${product.id}`} className="bg-card rounded-2xl border border-border overflow-hidden group">
                <Link to={product.link} className="block">
                  <div className="relative aspect-square bg-secondary/30 p-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    <div className="absolute top-3 right-3">
                      <WishlistButton productId={product.id} productType={product.type} />
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="font-heading font-semibold text-sm truncate">{product.name}</p>
                    <p className="text-primary font-bold">KES {product.price.toLocaleString()}</p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-primary text-primary-foreground gap-2"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Wishlist;
