import { Link } from "react-router-dom";
import { Smartphone, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { phones } from "@/data/phones";
import { personalCareProducts, personalCareCategories } from "@/data/products";

const Categories = () => {
  const careCounts = personalCareCategories
    .filter((c) => c !== "All")
    .map((cat) => ({
      name: cat,
      count: personalCareProducts.filter((p) => p.category === cat).length,
      image: personalCareProducts.find((p) => p.category === cat)?.image,
    }));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-24">
        <h1 className="text-3xl font-heading font-bold mb-2">Browse Categories</h1>
        <p className="text-muted-foreground mb-10">Explore everything GoMall has to offer.</p>

        <section className="mb-12">
          <h2 className="flex items-center gap-2 font-heading text-xl font-semibold mb-4">
            <Smartphone className="h-5 w-5 text-primary" /> Phones
          </h2>
          <Link
            to="/?tab=phones"
            className="block bg-card rounded-2xl border border-border p-6 hover:border-primary/40 transition-all"
          >
            <p className="font-semibold mb-1">All Phones</p>
            <p className="text-sm text-muted-foreground">{phones.length} models — iPhone 6 to iPhone 16 Pro Max</p>
          </Link>
        </section>

        <section>
          <h2 className="flex items-center gap-2 font-heading text-xl font-semibold mb-4">
            <Sparkles className="h-5 w-5 text-primary" /> Personal Care
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {careCounts.map((cat) => (
              <Link
                key={cat.name}
                to={`/?tab=personal&cat=${encodeURIComponent(cat.name)}`}
                className="group bg-card rounded-2xl border border-border p-4 hover:border-primary/40 transition-all text-center"
              >
                {cat.image && (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-24 w-auto mx-auto object-contain mb-3 group-hover:scale-105 transition-transform"
                  />
                )}
                <p className="font-semibold text-sm">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count} products</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Categories;
