import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPhones from "@/components/FeaturedPhones";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedMarketplace from "@/components/FeaturedMarketplace";
import DealsSection from "@/components/DealsSection";
import ValueProps from "@/components/ValueProps";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Smartphone, Sparkles, ShoppingBag } from "lucide-react";

type Tab = "phones" | "personal" | "marketplace";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>("phones");

  const tabs: { id: Tab; label: string; icon: typeof Smartphone }[] = [
    { id: "phones", label: "Phones", icon: Smartphone },
    { id: "personal", label: "Personal Care", icon: Sparkles },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      <div className="container pt-20 pb-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-secondary/60 border border-border flex-wrap">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === id
                    ? "bg-gradient-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "phones" && <FeaturedPhones />}
      {activeTab === "personal" && <FeaturedProducts />}
      {activeTab === "marketplace" && <FeaturedMarketplace />}

      <DealsSection />
      <ValueProps />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
