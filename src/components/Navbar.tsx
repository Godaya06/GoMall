import { useState } from "react";
import { Menu, X, Smartphone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems, setIsOpen: openCart } = useCart();
  const links = ["Phones", "Deals", "Trade-In", "Support"];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <Smartphone className="h-6 w-6 text-primary" />
          <span className="text-gradient">GoPhones</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => openCart(true)} className="relative text-foreground hover:text-primary transition-colors p-2">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground font-semibold glow">
            Shop Now
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => openCart(true)} className="relative p-1 text-foreground">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground py-2">
                {l}
              </a>
            ))}
            <Button size="sm" className="bg-gradient-primary text-primary-foreground font-semibold mt-2">
              Shop Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
