import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import phone1 from "@/assets/phone1.png";
import phone2 from "@/assets/phone2.png";
import phone3 from "@/assets/phone3.png";
import phone2 from "@/assets/phone2.png";
import phone3 from "@/assets/phone3.png";

const phones = [
  { id: "ultra", name: "GoPhone Ultra", price: 899, image: phone1, tag: "Best Seller" },
  { id: "promax", name: "GoPhone Pro Max", price: 1199, image: phone2, tag: "New" },
  { id: "flex", name: "GoPhone Flex", price: 749, image: phone3, tag: "Popular" },
];

const FeaturedPhones = () => {
  const { addItem } = useCart();

  return (
    <div className="container">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl font-bold mb-4">
          Featured <span className="text-gradient">Devices</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Handpicked flagships with the best specs, design, and value.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {phones.map((phone, i) => (
          <motion.div
            key={phone.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="group relative bg-card rounded-2xl border border-border p-6 card-shadow hover:border-primary/40 transition-all duration-300"
          >
            <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {phone.tag}
            </span>
            <div className="flex justify-center py-8">
              <img
                src={phone.image}
                alt={phone.name}
                loading="lazy"
                width={200}
                height={200}
                className="h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="font-heading text-lg font-semibold mb-1">{phone.name}</h3>
            <p className="text-primary font-bold text-xl mb-4">${phone.price.toLocaleString()}</p>
            <Button
              className="w-full bg-gradient-primary text-primary-foreground font-semibold"
              onClick={() => addItem({ id: phone.id, name: phone.name, price: phone.price, image: phone.image })}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default FeaturedPhones;
