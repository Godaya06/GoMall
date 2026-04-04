import { useState } from "react";
import { Phone, Loader2, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface MpesaCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MpesaCheckout = ({ open, onOpenChange }: MpesaCheckoutProps) => {
  const { totalPrice, items, clearCart } = useCart();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\s/g, "").length < 9) {
      toast({ title: "Invalid phone number", description: "Enter a valid M-Pesa number", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: { phone, amount: totalPrice },
      });

      if (error) throw error;

      if (data?.success) {
        setSent(true);
        toast({ title: "STK Push Sent!", description: "Check your phone and enter your M-Pesa PIN." });
      } else {
        toast({ title: "Payment failed", description: data?.message || "Try again", variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (sent) {
      clearCart();
      setSent(false);
    }
    setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            M-Pesa Checkout
          </DialogTitle>
          <DialogDescription>
            Pay KES {totalPrice.toLocaleString()} via M-Pesa to Till {`4720870`}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="font-heading font-semibold text-lg">STK Push Sent!</p>
            <p className="text-muted-foreground text-sm">Check your phone and enter your M-Pesa PIN to complete the payment.</p>
            <Button onClick={handleClose} className="w-full bg-gradient-primary text-primary-foreground">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="bg-secondary/50 rounded-xl p-3 space-y-1.5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="font-medium">KES {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-border font-bold">
                  <span>Total</span>
                  <span className="text-primary">KES {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1.5 block">M-Pesa Phone Number</label>
                <Input
                  type="tel"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-secondary border-border h-12 text-base"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !phone}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold h-12 text-base"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending STK Push...
                </>
              ) : (
                `Pay KES ${totalPrice.toLocaleString()}`
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MpesaCheckout;
