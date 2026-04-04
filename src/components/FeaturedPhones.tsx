import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Cpu, HardDrive, Camera, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { phones } from "@/data/phones";

const categories = ["All", "Flagship", "Best Seller", "New", "Popular", "Value", "Budget", "Classic", "Legacy"] as const;
type SortOption = "default" | "price-asc" | "price-desc";

const SpecBadge = ({ icon: Icon, label }: { icon: typeof Cpu; label: string }) => (
  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
    <Icon className="h-3.5 w-3.5 text-primary/70" />
    <span>{label}</span>
  </div>
);

const FeaturedPhones = () => {
  const { addItem } = useCart();
  const [active, setActive] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let list = active === "All" ? phones : phones.filter((p) => p.tag === active);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [active, sort]);

  return (
    <section id="phones" className="py-24">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Devices</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Handpicked flagships with the best specs, design, and value.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                active === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {([
            ["default", "Default"],
            ["price-asc", "Price: Low → High"],
            ["price-desc", "Price: High → Low"],
          ] as [SortOption, string][]).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setSort(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                sort === value
                  ? "bg-accent text-accent-foreground border-primary/60"
                  : "bg-secondary/30 text-muted-foreground border-border hover:border-primary/30"
              }`}
            >
              <ArrowUpDown className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
          {filtered.map((phone, i) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-card rounded-2xl border border-border p-6 card-shadow hover:border-primary/40 transition-all duration-300"
            >
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {phone.tag}
              </span>
              <Link to={`/product/${phone.id}`} className="block">
                <div className="flex justify-center py-6">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    loading="lazy"
                    width={200}
                    height={200}
                    className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-1">{phone.name}</h3>
                <p className="text-primary font-bold text-xl mb-3">KES {phone.price.toLocaleString()}</p>
              </Link>

              <div className="flex items-center gap-4 mb-4 py-2 px-3 rounded-lg bg-secondary/50">
                <SpecBadge icon={Cpu} label={phone.ram} />
                <SpecBadge icon={HardDrive} label={phone.storage} />
                <SpecBadge icon={Camera} label={phone.camera} />
              </div>

              <Button
                className="w-full bg-gradient-primary text-primary-foreground font-semibold"
                onClick={() => addItem({ id: phone.id, name: phone.name, price: phone.price, image: phone.image })}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No devices found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedPhones;
