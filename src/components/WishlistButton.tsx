import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface Props {
  productId: string;
  productType: "phone" | "care";
  className?: string;
}

const WishlistButton = ({ productId, productType, className = "" }: Props) => {
  const { isInWishlist, toggleWishlist, loading } = useWishlist();
  const active = isInWishlist(productId, productType);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(productId, productType); }}
      disabled={loading}
      className={`p-2 rounded-full transition-all ${active ? "text-red-500 bg-red-500/10" : "text-muted-foreground hover:text-red-400 bg-secondary/50 hover:bg-red-500/10"} ${className}`}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${active ? "fill-red-500" : ""}`} />
    </button>
  );
};

export default WishlistButton;
