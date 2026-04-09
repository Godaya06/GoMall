import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Cpu, HardDrive, Camera, Monitor, Battery, Microchip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { phones } from "@/data/phones";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import ProductReviews from "@/components/ProductReviews";

const SpecRow = ({ icon: Icon, label, value }: { icon: typeof Cpu; label: string; value: string }) => (
  <div className="flex items-center gap-3 py-3 border-b border-border last:border-0">
    <Icon className="h-5 w-5 text-primary shrink-0" />
    <span className="text-muted-foreground text-sm w-24">{label}</span>
    <span className="font-medium text-sm">{value}</span>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const phone = phones.find((p) => p.id === id);

  if (!phone) {
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
          <Link to="/#phones" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to all phones</span>
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
                {phone.tag}
              </div>
              <img
                src={phone.image}
                alt={phone.name}
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
              <h1 className="font-heading text-3xl lg:text-4xl font-bold mb-2">{phone.name}</h1>
              <p className="text-primary font-bold text-2xl lg:text-3xl mb-4">KES {phone.price.toLocaleString()}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{phone.description}</p>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {phone.colors.map((color) => (
                    <span key={color} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="bg-card rounded-2xl border border-border p-5 mb-6">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Specifications</h3>
                <SpecRow icon={Microchip} label="Chip" value={phone.chip} />
                <SpecRow icon={Monitor} label="Display" value={phone.display} />
                <SpecRow icon={Cpu} label="RAM" value={phone.ram} />
                <SpecRow icon={HardDrive} label="Storage" value={phone.storage} />
                <SpecRow icon={Camera} label="Camera" value={phone.camera} />
                <SpecRow icon={Battery} label="Battery" value={phone.battery} />
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-primary text-primary-foreground font-semibold text-base"
                onClick={() => addItem({ id: phone.id, name: phone.name, price: phone.price, image: phone.image })}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart — KES {phone.price.toLocaleString()}
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
