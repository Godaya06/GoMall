import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowUpDown, Search, Droplets, Sparkles, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { personalCareProducts, personalCareCategories } from "@/data/products";

type SortOption = "default" | "price-asc" | "price-desc";

const DetailBadge = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
    <Sparkles className="h-3.5 w-3.5 text-primary/70" />
    <span>{label}</span>
  </div>
);

const FeaturedProducts = () => {
  const { addItem } = useCart();
  const [active, setActive] = useState<string>("All");
  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = active === "All" ? personalCareProducts : personalCareProducts.filter((p) => p.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [active, sort, search]);

  return (
    <section id="products" className="py-24">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Personal <span className="text-gradient">Care</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Premium beauty & wellness products for your daily self-care routine.
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products... e.g. serum, sunscreen"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {personalCareCategories.map((cat) => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-card rounded-2xl border border-border p-6 card-shadow hover:border-primary/40 transition-all duration-300"
            >
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {product.category}
              </span>

              <div className="flex justify-center py-6">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={200}
                  height={200}
                  className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="font-heading text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-primary font-bold text-xl mb-2">KES {product.price.toLocaleString()}</p>
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center gap-4 mb-4 py-2 px-3 rounded-lg bg-secondary/50">
                {product.details.map((d) => (
                  <DetailBadge key={d} label={d} />
                ))}
              </div>

              <Button
                className="w-full bg-gradient-primary text-primary-foreground font-semibold"
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No products found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
