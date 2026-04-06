import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  phone_number: string;
  total_amount: number;
  status: string;
  mpesa_receipt: string | null;
  items: any[];
  created_at: string;
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  pending: { icon: Clock, color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30", label: "Pending" },
  completed: { icon: CheckCircle, color: "bg-green-500/10 text-green-500 border-green-500/30", label: "Completed" },
  failed: { icon: XCircle, color: "bg-red-500/10 text-red-500 border-red-500/30", label: "Failed" },
};

const OrderTracking = () => {
  const [searchParams] = useSearchParams();
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const formatPhone = (p: string) => {
    p = p.replace(/\s+/g, "").replace(/^0/, "254").replace(/^\+/, "");
    if (!p.startsWith("254")) p = "254" + p;
    return p;
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setSearched(true);

    const formatted = formatPhone(phone);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("phone_number", formatted)
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data as Order[]);
    else setOrders([]);
    setLoading(false);
  };

  // Auto-search if phone param provided
  useState(() => {
    if (searchParams.get("phone")) handleSearch();
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CartDrawer />
      <div className="container py-24 max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="font-heading text-4xl font-bold mb-3">
            Order <span className="text-gradient">Tracking</span>
          </h1>
          <p className="text-muted-foreground">Enter your M-Pesa phone number to view your orders.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <Input
            type="tel"
            placeholder="0712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-secondary border-border h-12 text-base flex-1"
          />
          <Button type="submit" disabled={loading} className="bg-gradient-primary text-primary-foreground h-12 px-6">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
          </Button>
        </form>

        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {!loading && searched && orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No orders found for this phone number.</p>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = config.icon;
            return (
              <Card key={order.id} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-heading">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <Badge variant="outline" className={config.color}>
                      <StatusIcon className="h-3.5 w-3.5 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-secondary/50 rounded-lg p-3 space-y-1">
                    {Array.isArray(order.items) && order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                        <span className="font-medium">KES {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold text-primary">KES {Number(order.total_amount).toLocaleString()}</span>
                  </div>
                  {order.mpesa_receipt && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">M-Pesa Receipt</span>
                      <span className="font-mono text-xs">{order.mpesa_receipt}</span>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
