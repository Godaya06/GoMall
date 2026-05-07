import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, Loader2, Package, MapPin, Phone, Truck, Clock, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  phone_number: string;
  total_amount: number;
  delivery_fee: number;
  status: string;
  items: OrderItem[];
  county: string | null;
  town: string | null;
  delivery_address: string | null;
  mpesa_receipt: string | null;
  created_at: string;
}

const OrderConfirmation = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (!error && data) {
        setOrder(data as unknown as Order);
        if (data.status !== "pending") setPolling(false);
      }
      setLoading(false);
    };

    fetchOrder();
    const interval = polling ? setInterval(fetchOrder, 4000) : null;
    return () => { if (interval) clearInterval(interval); };
  }, [id, polling]);

  const subtotal = order ? Number(order.total_amount) - Number(order.delivery_fee || 0) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-2xl">
        {loading ? (
          <div className="flex flex-col items-center py-20 gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your order...</p>
          </div>
        ) : !order ? (
          <div className="text-center py-20">
            <h1 className="font-heading text-2xl font-bold mb-2">Order not found</h1>
            <Link to="/" className="text-primary underline">Back to home</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              {order.status === "completed" ? (
                <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto mb-3" />
              ) : order.status === "failed" || order.status === "cancelled" ? (
                <XCircle className="h-20 w-20 text-destructive mx-auto mb-3" />
              ) : (
                <Clock className="h-20 w-20 text-amber-500 mx-auto mb-3 animate-pulse" />
              )}
              <h1 className="font-heading text-3xl font-bold">
                {order.status === "completed" ? "Order Confirmed!" :
                 order.status === "failed" ? "Payment Failed" :
                 order.status === "cancelled" ? "Payment Cancelled" :
                 "Awaiting M-Pesa Payment"}
              </h1>
              <p className="text-muted-foreground mt-2">
                {order.status === "completed"
                  ? "Thank you for shopping with GoMall. We're preparing your order."
                  : order.status === "pending"
                  ? "Check your phone and enter your M-Pesa PIN to complete payment to GoMall."
                  : "Please try placing your order again."}
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
              <div className="flex justify-between items-start pb-4 border-b border-border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">Order ID</p>
                  <p className="font-mono text-sm">{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase">Date</p>
                  <p className="text-sm">{new Date(order.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2"><Package className="h-4 w-4 text-primary" /> Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span className="font-medium">KES {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Delivery</span>
                  <span>KES {Number(order.delivery_fee || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-border">
                  <span>Total Paid to GoMall</span>
                  <span className="text-primary">KES {Number(order.total_amount).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> Delivery to</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.town}, {order.county}
                    {order.delivery_address && <><br />{order.delivery_address}</>}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1.5 flex items-center gap-1.5"><Phone className="h-4 w-4 text-primary" /> M-Pesa</h4>
                  <p className="text-sm text-muted-foreground">{order.phone_number}</p>
                  {order.mpesa_receipt && (
                    <p className="text-xs text-green-500 mt-1">Receipt: {order.mpesa_receipt}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button asChild variant="outline" className="flex-1">
                <Link to={`/orders?phone=${encodeURIComponent(phone || order.phone_number)}`}>Track Orders</Link>
              </Button>
              <Button asChild className="flex-1 bg-gradient-primary text-primary-foreground">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
