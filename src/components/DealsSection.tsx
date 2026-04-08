import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { phones } from "@/data/phones";
import { personalCareProducts } from "@/data/products";

interface DealItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  type: "phone" | "product";
  tag: string;
  discount: number;
}

const deals: DealItem[] = [
  {
    id: phones[4].id,
    name: phones[4].name,
    price: 115000,
    originalPrice: phones[4].price,
    image: phones[4].image,
    type: "phone",
    tag: "30% OFF",
    discount: 30,
  },
  {
    id: phones[5].id,
    name: phones[5].name,
    price: 69000,
    originalPrice: phones[5].price,
    image: phones[5].image,
    type: "phone",
    tag: "25% OFF",
    discount: 25,
  },
  {
    id: phones[7].id,
    name: phones[7].name,
    price: 32000,
    originalPrice: phones[7].price,
    image: phones[7].image,
    type: "phone",
    tag: "40% OFF",
    discount: 40,
  },
  {
    id: "hair-growth-serum-1",
    name: "Premium Hair Growth Serum",
    price: 1750,
    originalPrice: 2500,
    image: personalCareProducts[0].image,
    type: "product",
    tag: "30% OFF",
    discount: 30,
  },
  {
    id: "skin-care-set-1",
    name: "Complete Skin Care Set",
    price: 3850,
    originalPrice: 5500,
    image: personalCareProducts.find((p) => p.id === "skin-care-set-1")!.image,
    type: "product",
    tag: "30% OFF",
    discount: 30,
  },
  {
    id: "makeup-palette-1",
    name: "Glamour Eyeshadow Palette",
    price: 2450,
    originalPrice: 3500,
    image: personalCareProducts.find((p) => p.id === "makeup-palette-1")!.image,
    type: "product",
    tag: "30% OFF",
    discount: 30,
  },
];

const DealsSection = () => {
  const { addItem } = useCart();

  return (
    <section id="deals" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-destructive/30 bg-destructive/10 text-destructive text-xs font-semibold mb-4">
            <Percent className="h-3.5 w-3.5" />
            Limited Time Offers
          </span>
          <h2 className="font-heading text-4xl font-bold mb-4">
            Hot <span className="text-gradient">Deals</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Massive savings on phones and personal care products. Grab them before they're gone!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id + "-deal"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-card rounded-2xl border border-border p-6 card-shadow hover:border-destructive/40 transition-all duration-300"
            >
              {/* Discount badge */}
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                {deal.tag}
              </span>

              <Link
                to={deal.type === "phone" ? `/product/${deal.id}` : `/care/${deal.id}`}
                className="block"
              >
                <div className="flex justify-center py-6">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    loading="lazy"
                    width={200}
                    height={200}
                    className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-heading text-lg font-semibold mb-1">{deal.name}</h3>

                <div className="flex items-center gap-3 mb-3">
                  <p className="text-primary font-bold text-xl">
                    KES {deal.price.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground line-through text-sm">
                    KES {deal.originalPrice.toLocaleString()}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-destructive/10 text-destructive text-xs font-medium mb-3">
                  Save KES {(deal.originalPrice - deal.price).toLocaleString()}
                </div>
              </Link>

              <Button
                className="w-full bg-gradient-primary text-primary-foreground font-semibold"
                onClick={() =>
                  addItem({
                    id: deal.id,
                    name: deal.name,
                    price: deal.price,
                    image: deal.image,
                  })
                }
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

export default DealsSection;
