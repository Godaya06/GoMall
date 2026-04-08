import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPhones from "@/components/FeaturedPhones";
import FeaturedProducts from "@/components/FeaturedProducts";
import DealsSection from "@/components/DealsSection";
import ValueProps from "@/components/ValueProps";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Smartphone, Sparkles } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"phones" | "personal">("phones");

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Tab Switcher */}
      <div className="container pt-20 pb-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-secondary/60 border border-border">
            <button
              onClick={() => setActiveTab("phones")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "phones"
                  ? "bg-gradient-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Phones
            </button>
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === "personal"
                  ? "bg-gradient-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Personal Care
            </button>
          </div>
        </div>
      </div>

      {activeTab === "phones" ? <FeaturedPhones /> : <FeaturedProducts />}

      <DealsSection />
      <ValueProps />
      <Newsletter />
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
