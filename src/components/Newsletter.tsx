import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You're on the list! 🎉");
    setEmail("");
  };

  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-card rounded-3xl border border-border p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-glow opacity-40" />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              Don't Miss a <span className="text-gradient">Deal</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Subscribe and get exclusive offers, early access to new launches, and insider deals.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border flex-1"
              />
              <Button type="submit" className="bg-gradient-primary text-primary-foreground font-semibold glow">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
