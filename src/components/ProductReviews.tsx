import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  created_at: string;
  user_id: string;
}

interface Props {
  productId: string;
  productType: "phone" | "care";
}

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`h-5 w-5 transition-colors ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"} ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={() => interactive && onRate?.(s)}
      />
    ))}
  </div>
);

const ProductReviews = ({ productId, productType }: Props) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("product_reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("product_type", productType)
        .order("created_at", { ascending: false });
      if (data) setReviews(data);
    };
    fetch();
  }, [productId, productType]);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast({ title: "Sign in to leave a review", variant: "destructive" }); return; }
    if (!rating) { toast({ title: "Please select a rating", variant: "destructive" }); return; }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("product_reviews")
      .insert({ user_id: user.id, product_id: productId, product_type: productType, rating, title: title || null, comment: comment || null })
      .select()
      .single();
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else if (data) {
      setReviews((prev) => [data, ...prev]);
      setRating(0); setTitle(""); setComment("");
      toast({ title: "Review submitted! ⭐" });
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-heading font-bold">Reviews</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StarRating rating={Math.round(Number(avgRating))} />
          <span>{avgRating} ({reviews.length})</span>
        </div>
      </div>

      {/* Review form */}
      <form onSubmit={handleSubmit} className="bg-secondary/30 rounded-xl p-4 space-y-3 border border-border">
        <p className="text-sm font-semibold">Write a Review</p>
        <StarRating rating={rating} onRate={setRating} interactive />
        <Input placeholder="Review title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background border-border" />
        <Textarea placeholder="Share your experience..." value={comment} onChange={(e) => setComment(e.target.value)} className="bg-background border-border min-h-[80px]" />
        <Button type="submit" disabled={submitting || !rating} className="bg-gradient-primary text-primary-foreground gap-2">
          <Send className="h-4 w-4" /> Submit Review
        </Button>
      </form>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-6">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="bg-secondary/20 rounded-xl p-4 border border-border space-y-2">
              <div className="flex items-center justify-between">
                <StarRating rating={r.rating} />
                <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
              {r.title && <p className="font-semibold text-sm">{r.title}</p>}
              {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
