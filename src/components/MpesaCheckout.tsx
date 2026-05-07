import { useMemo, useState } from "react";
import { Phone, Loader2, CheckCircle, MapPin, Truck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { KENYA_COUNTIES } from "@/data/kenya-counties";
import { calculateDeliveryFee, getDeliveryEstimate } from "@/data/delivery-fees";

interface MpesaCheckoutProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MpesaCheckout = ({ open, onOpenChange }: MpesaCheckoutProps) => {
  const { totalPrice, items, clearCart } = useCart();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const deliveryFee = useMemo(() => calculateDeliveryFee(county, town), [county, town]);
  const grandTotal = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\s/g, "").length < 9) {
      toast({ title: "Invalid phone number", description: "Enter a valid M-Pesa number", variant: "destructive" });
      return;
    }
    if (!county || !town.trim()) {
      toast({ title: "Delivery location required", description: "Select your county and enter your town", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: {
          phone,
          amount: grandTotal,
          delivery_fee: deliveryFee,
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          county,
          town,
          delivery_address: address,
        },
      });

      if (error) throw error;

      if (data?.success) {
        setSent(true);
        toast({ title: "STK Push Sent!", description: "Enter your M-Pesa PIN to pay GoMall." });
        // Navigate to confirmation page
        const orderId = data.orderId;
        clearCart();
        onOpenChange(false);
        setSent(false);
        navigate(`/order-confirmation/${orderId}?phone=${encodeURIComponent(phone)}`);
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
    setPhone("");
    setCounty("");
    setTown("");
    setAddress("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            M-Pesa Checkout
          </DialogTitle>
          <DialogDescription>
            Pay <span className="font-semibold text-primary">GoMall</span> securely via M-Pesa
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="font-heading font-semibold text-lg">STK Push Sent!</p>
            <p className="text-muted-foreground text-sm">Redirecting to your order confirmation...</p>
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
                <div className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">KES {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5" /> Delivery
                    {county && <span className="text-xs">({getDeliveryEstimate(county)})</span>}
                  </span>
                  <span className="font-medium">
                    {county ? `KES ${deliveryFee.toLocaleString()}` : "Select county"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border font-bold">
                  <span>Total</span>
                  <span className="text-primary">KES {grandTotal.toLocaleString()}</span>
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

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <MapPin className="h-4 w-4 text-primary" /> Delivery Location (Kenya)
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">County</label>
                  <Select value={county} onValueChange={setCounty} disabled={loading}>
                    <SelectTrigger className="bg-secondary border-border h-11">
                      <SelectValue placeholder="Select your county" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64">
                      {KENYA_COUNTIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Town / Area</label>
                  <Input
                    type="text"
                    placeholder="e.g. Westlands"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className="bg-secondary border-border h-11"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Delivery Address (optional)</label>
                  <Textarea
                    placeholder="Building, street, landmark, instructions..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-secondary border-border min-h-[60px]"
                    disabled={loading}
                  />
                </div>
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
                `Pay KES ${grandTotal.toLocaleString()} to GoMall`
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MpesaCheckout;
