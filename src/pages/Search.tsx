import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { phones } from "@/data/phones";
import { personalCareProducts } from "@/data/products";

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return { phones: [], care: [] };
    return {
      phones: phones.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.tag.toLowerCase().includes(query) ||
          p.chip.toLowerCase().includes(query)
      ),
      care: personalCareProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      ),
    };
  }, [q]);

  const total = results.phones.length + results.care.length;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-24">
        <h1 className="text-3xl font-heading font-bold mb-2">Search</h1>
        <div className="relative max-w-xl mb-8">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            autoFocus
            onChange={(e) => setParams({ q: e.target.value })}
            placeholder="Search phones, serums, makeup..."
            className="w-full pl-10 pr-4 py-3 rounded-full bg-secondary/50 border border-border text-sm focus:outline-none focus:border-primary/50"
          />
        </div>

        {q && (
          <p className="text-sm text-muted-foreground mb-6">
            {total} result{total !== 1 ? "s" : ""} for "{q}"
          </p>
        )}

        {results.phones.length > 0 && (
          <section className="mb-10">
            <h2 className="font-heading text-xl font-semibold mb-4">Phones</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.phones.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 transition-all"
                >
                  <img src={p.image} alt={p.name} className="h-32 w-auto mx-auto object-contain mb-3" />
                  <p className="font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-primary font-bold text-sm">KES {p.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.care.length > 0 && (
          <section>
            <h2 className="font-heading text-xl font-semibold mb-4">Personal Care</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.care.map((p) => (
                <Link
                  key={p.id}
                  to={`/care/${p.id}`}
                  className="bg-card rounded-xl border border-border p-4 hover:border-primary/40 transition-all"
                >
                  <img src={p.image} alt={p.name} className="h-32 w-auto mx-auto object-contain mb-3" />
                  <p className="font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground mb-1">{p.category}</p>
                  <p className="text-primary font-bold text-sm">KES {p.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {q && total === 0 && (
          <p className="text-center text-muted-foreground py-16">No products matched your search.</p>
        )}
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default SearchPage;
