import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, Package, RefreshCw, Shield, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Order {
  id: string;
  phone_number: string;
  total_amount: number;
  delivery_fee: number;
  county: string | null;
  town: string | null;
  delivery_address: string | null;
  status: string;
  mpesa_receipt: string | null;
  items: any;
  created_at: string;
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  completed: "bg-green-500/10 text-green-500 border-green-500/30",
  failed: "bg-red-500/10 text-red-500 border-red-500/30",
};

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => setIsAdmin(!!data));
  }, [user, authLoading]);

  const loadOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Failed to load orders", description: error.message, variant: "destructive" });
    else setOrders((data as Order[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) loadOrders();
  }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    setUpdating(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast({ title: "Order updated", description: `Status set to ${status}` });
  };

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="container py-32 text-center max-w-md">
          <Shield className="h-14 w-14 mx-auto text-muted-foreground/40 mb-4" />
          <h1 className="font-heading text-2xl font-bold mb-2">Admin access required</h1>
          <p className="text-muted-foreground mb-6">
            Your account ({user.email}) is not an admin. Add your user id to the user_roles table with role 'admin'.
          </p>
          <p className="text-xs text-muted-foreground/70 font-mono break-all mb-6">User ID: {user.id}</p>
          <Button asChild><Link to="/">Back to home</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalRevenue = orders.filter((o) => o.status === "completed").reduce((s, o) => s + Number(o.total_amount), 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container py-24 max-w-6xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground mt-1">Manage all GoMall orders</p>
          </div>
          <Button onClick={loadOrders} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Total Orders</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold">{orders.length}</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Pending</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-yellow-500">{pendingCount}</p></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">Revenue (Completed)</CardTitle></CardHeader><CardContent><p className="text-3xl font-bold text-primary">KES {totalRevenue.toLocaleString()}</p></CardContent></Card>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const items = Array.isArray(o.items) ? o.items : [];
              const itemsTotal = Number(o.total_amount) - Number(o.delivery_fee || 0);
              return (
                <Card key={o.id} className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div>
                        <CardTitle className="text-base font-mono">#{o.id.slice(0, 8)}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(o.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={statusColor[o.status] || ""}>{o.status}</Badge>
                        <Select
                          value={o.status}
                          onValueChange={(v) => updateStatus(o.id, v)}
                          disabled={updating === o.id}
                        >
                          <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="bg-secondary/40 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">Customer</p>
                        <p className="font-medium">{o.phone_number}</p>
                        {o.mpesa_receipt && <p className="text-xs font-mono mt-1">Receipt: {o.mpesa_receipt}</p>}
                      </div>
                      <div className="bg-secondary/40 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Delivery</p>
                        {o.county || o.town ? (
                          <>
                            <p className="font-medium">{o.town || "—"}, {o.county || "—"}</p>
                            {o.delivery_address && <p className="text-xs text-muted-foreground mt-1">{o.delivery_address}</p>}
                          </>
                        ) : (
                          <p className="text-muted-foreground italic">Not provided</p>
                        )}
                      </div>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-3 space-y-1">
                      {items.map((it: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{it.name} × {it.quantity}</span>
                          <span>KES {(it.price * it.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="text-muted-foreground">Items</span>
                        <span>KES {itemsTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Delivery Fee</span>
                        <span>KES {Number(o.delivery_fee || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t border-border">
                        <span>Total</span>
                        <span className="text-primary">KES {Number(o.total_amount).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
