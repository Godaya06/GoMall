import { useState } from "react";
import { Menu, X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
          <Button variant="ghost" size="sm">Sign In</Button>
          <Button size="sm" className="bg-gradient-primary text-primary-foreground font-semibold glow">
            Shop Now
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
