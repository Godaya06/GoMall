import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPhone from "@/assets/hero-phone.png";

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
    {/* Glow background */}
    <div className="absolute inset-0 bg-glow opacity-60" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-xs font-medium mb-6 tracking-wide">
          🔥 New arrivals — Spring 2026
        </span>
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          The Future of
          <br />
          <span className="text-gradient">Smart Phones</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mb-8 leading-relaxed">
          Premium devices at unbeatable prices. Trade in, upgrade, and experience next-gen tech — all in one place.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-gradient-primary text-primary-foreground font-semibold glow px-8 text-base">
            Browse Phones <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary px-8 text-base">
            Trade-In Value
          </Button>
        </div>

        <div className="flex gap-10 mt-12">
          {[["50K+", "Happy Customers"], ["4.9★", "App Store Rating"], ["24/7", "Support"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-2xl font-heading font-bold text-foreground">{val}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center"
      >
        <img src={heroPhone} alt="GoPhones flagship device" width={500} height={500} className="drop-shadow-2xl" />
      </motion.div>
    </div>
  </section>
);

export default Hero;
