import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Smartphone, ShoppingCart, Package, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems, setIsOpen: openCart } = useCart();
  const { user, profile, signOut } = useAuth();
  const links = ["Phones", "Products", "Deals", "Support"];

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
          <Link to="/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Package className="h-4 w-4" /> Orders
          </Link>
          <button onClick={() => openCart(true)} className="relative text-foreground hover:text-primary transition-colors p-2">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="max-w-[100px] truncate text-sm">
                    {profile?.display_name || user.email || user.phone}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="text-xs text-muted-foreground" disabled>
                  {user.email || user.phone}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-primary text-primary-foreground font-semibold glow">
                  Shop Now
                </Button>
              </Link>
            </>
          )}
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
            <Link to="/orders" className="text-sm text-muted-foreground py-2 flex items-center gap-1">
              <Package className="h-4 w-4" /> Orders
            </Link>
            {user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="justify-start text-destructive">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-gradient-primary text-primary-foreground font-semibold mt-2 w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
