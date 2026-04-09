import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  product_id: string;
  product_type: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  isInWishlist: (productId: string, productType: string) => boolean;
  toggleWishlist: (productId: string, productType: string) => void;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) { setItems([]); return; }
    const { data } = await supabase
      .from("wishlist")
      .select("id, product_id, product_type")
      .eq("user_id", user.id);
    if (data) setItems(data);
  }, [user]);

  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);

  const isInWishlist = (productId: string, productType: string) =>
    items.some((i) => i.product_id === productId && i.product_type === productType);

  const toggleWishlist = async (productId: string, productType: string) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to use your wishlist", variant: "destructive" });
      return;
    }
    setLoading(true);
    const existing = items.find((i) => i.product_id === productId && i.product_type === productType);
    if (existing) {
      await supabase.from("wishlist").delete().eq("id", existing.id);
      setItems((prev) => prev.filter((i) => i.id !== existing.id));
      toast({ title: "Removed from wishlist" });
    } else {
      const { data } = await supabase
        .from("wishlist")
        .insert({ user_id: user.id, product_id: productId, product_type: productType })
        .select()
        .single();
      if (data) {
        setItems((prev) => [...prev, { id: data.id, product_id: data.product_id, product_type: data.product_type }]);
        toast({ title: "Added to wishlist ❤️" });
      }
    }
    setLoading(false);
  };

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};
