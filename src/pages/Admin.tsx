import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Loader2, Package, RefreshCw, Shield, MapPin, Eye, EyeOff, Pencil, Trash2, Plus, Save, X, Upload, Download, History, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMarketplace } from "@/hooks/useMarketplace";
import { marketplaceCategories } from "@/data/marketplace";

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

const categoryOptions = marketplaceCategories.filter((c) => c !== "All");

interface EditState {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  image: string;
  details: string;
  hidden: boolean;
  isCustom: boolean;
  isNew?: boolean;
  customId?: string;
}

const blankEdit = (): EditState => ({
  id: "",
  name: "",
  price: "",
  originalPrice: "",
  category: "Electronics",
  description: "",
  image: "",
  details: "",
  hidden: false,
  isCustom: true,
  isNew: true,
  customId: "",
});

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { products, reload: reloadProducts, loading: productsLoading } = useMarketplace(true);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productCategory, setProductCategory] = useState<string>("All");
  const [productVisibility, setProductVisibility] = useState<"all" | "visible" | "hidden">("all");
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [csvUploading, setCsvUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const logAudit = async (action: string, productId: string, before: any, after: any, source = "manual") => {
    if (!user) return;
    await supabase.from("marketplace_audit_log").insert({
      action, product_id: productId, before_data: before, after_data: after, changed_by: user.id, source,
    });
  };

  const loadAudit = async () => {
    setAuditLoading(true);
    const { data } = await supabase.from("marketplace_audit_log").select("*").order("created_at", { ascending: false }).limit(200);
    setAuditLog(data || []);
    setAuditLoading(false);
  };

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

  const beginEdit = (p: typeof products[number]) =>
    setEditing({
      id: p.id,
      name: p.name,
      price: String(p.price),
      originalPrice: p.originalPrice ? String(p.originalPrice) : "",
      category: p.category,
      description: p.description,
      image: p.image,
      details: (p.details || []).join(", "),
      hidden: !!p.hidden,
      isCustom: !!p.isCustom,
    });

  const toggleHidden = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("marketplace_products")
      .upsert({ id, hidden: !current }, { onConflict: "id" });
    if (error) {
      toast({ title: "Failed", description: error.message, variant: "destructive" });
      return;
    }
    await logAudit(current ? "unhide" : "hide", id, { hidden: current }, { hidden: !current });
    toast({ title: current ? "Product visible" : "Product hidden" });
    reloadProducts();
  };

  const saveProduct = async () => {
    if (!editing) return;
    const id = editing.isNew ? (editing.customId?.trim() || `custom-${Date.now()}`) : editing.id;
    if (editing.isNew && !editing.name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }
    if (editing.isNew && !editing.image.trim()) {
      toast({ title: "Image URL required", variant: "destructive" });
      return;
    }
    const detailsArr = editing.details
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);
    const payload: any = {
      id,
      name: editing.name.trim() || null,
      price: editing.price ? Number(editing.price) : null,
      original_price: editing.originalPrice ? Number(editing.originalPrice) : null,
      category: editing.category || null,
      description: editing.description || null,
      image_url: editing.image || null,
      details: detailsArr,
      hidden: editing.hidden,
      is_custom: editing.isCustom,
    };
    const before = editing.isNew ? null : products.find((p) => p.id === id);
    setSavingProduct(true);
    const { error } = await supabase
      .from("marketplace_products")
      .upsert(payload, { onConflict: "id" });
    setSavingProduct(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    await logAudit(editing.isNew ? "create" : "update", id, before, payload);
    toast({ title: "Product saved" });
    setEditing(null);
    reloadProducts();
  };

  const deleteCustom = async (id: string) => {
    if (!confirm("Delete this custom product?")) return;
    const before = products.find((p) => p.id === id);
    const { error } = await supabase.from("marketplace_products").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    await logAudit("delete", id, before, null);
    toast({ title: "Product deleted" });
    reloadProducts();
  };

  const resetOverride = async (id: string) => {
    if (!confirm("Reset this product to its original values?")) return;
    const before = products.find((p) => p.id === id);
    const { error } = await supabase.from("marketplace_products").delete().eq("id", id);
    if (error) {
      toast({ title: "Reset failed", description: error.message, variant: "destructive" });
      return;
    }
    await logAudit("reset", id, before, null);
    toast({ title: "Reset to defaults" });
    reloadProducts();
  };

  // ---- CSV import/export ----
  const parseCsv = (text: string): Record<string, string>[] => {
    const rows: string[][] = [];
    let cur: string[] = [];
    let field = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') inQuotes = false;
        else field += c;
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ",") { cur.push(field); field = ""; }
        else if (c === "\n" || c === "\r") {
          if (field !== "" || cur.length) { cur.push(field); rows.push(cur); cur = []; field = ""; }
          if (c === "\r" && text[i + 1] === "\n") i++;
        } else field += c;
      }
    }
    if (field !== "" || cur.length) { cur.push(field); rows.push(cur); }
    if (!rows.length) return [];
    const header = rows[0].map((h) => h.trim().toLowerCase());
    return rows.slice(1).filter((r) => r.some((v) => v.trim() !== "")).map((r) => {
      const obj: Record<string, string> = {};
      header.forEach((h, idx) => (obj[h] = (r[idx] ?? "").trim()));
      return obj;
    });
  };

  const downloadCsvTemplate = () => {
    const header = "id,name,category,price,original_price,image_url,description,details,hidden,is_custom";
    const sample = `custom-sample-1,Sample Product,Electronics,1999,2499,https://example.com/img.png,A sample product,"item1; item2",false,true`;
    const blob = new Blob([header + "\n" + sample + "\n"], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "marketplace-template.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const header = ["id","name","category","price","original_price","image_url","description","details","hidden","is_custom"];
    const esc = (v: any) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [header.join(",")];
    for (const p of products) {
      lines.push([
        p.id, p.name, p.category, p.price, p.originalPrice ?? "",
        p.image, p.description, (p.details || []).join("; "),
        p.hidden ? "true" : "false", p.isCustom ? "true" : "false",
      ].map(esc).join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `marketplace-export-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const handleCsvUpload = async (file: File) => {
    setCsvUploading(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      if (!rows.length) {
        toast({ title: "Empty CSV", variant: "destructive" });
        return;
      }
      const payloads: any[] = [];
      const errors: string[] = [];
      rows.forEach((r, i) => {
        const id = (r.id || `custom-${Date.now()}-${i}`).trim();
        const name = r.name?.trim();
        if (!name) { errors.push(`Row ${i + 2}: missing name`); return; }
        payloads.push({
          id,
          name,
          category: r.category || "Electronics",
          price: r.price ? Number(r.price) : null,
          original_price: r.original_price ? Number(r.original_price) : null,
          image_url: r.image_url || null,
          description: r.description || null,
          details: r.details ? r.details.split(/[;|]/).map((d) => d.trim()).filter(Boolean) : [],
          hidden: /^(true|1|yes)$/i.test(r.hidden || ""),
          is_custom: r.is_custom ? /^(true|1|yes)$/i.test(r.is_custom) : true,
        });
      });
      if (!payloads.length) {
        toast({ title: "No valid rows", description: errors.join("; "), variant: "destructive" });
        return;
      }
      const { error } = await supabase.from("marketplace_products").upsert(payloads, { onConflict: "id" });
      if (error) {
        toast({ title: "Import failed", description: error.message, variant: "destructive" });
        return;
      }
      await Promise.all(payloads.map((p) => logAudit("csv_upsert", p.id, null, p, "csv")));
      toast({
        title: `Imported ${payloads.length} products`,
        description: errors.length ? `${errors.length} skipped` : undefined,
      });
      reloadProducts();
    } catch (e: any) {
      toast({ title: "CSV error", description: e.message, variant: "destructive" });
    } finally {
      setCsvUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    return products.filter((p) => {
      if (productCategory !== "All" && p.category !== productCategory) return false;
      if (productVisibility === "visible" && p.hidden) return false;
      if (productVisibility === "hidden" && !p.hidden) return false;
      if (q && !`${p.name} ${p.category} ${p.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, productSearch, productCategory, productVisibility]);

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
        <div className="mb-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">
            Admin <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage orders and marketplace products</p>
        </div>

        <Tabs defaultValue="orders" className="w-full" onValueChange={(v) => { if (v === "audit") loadAudit(); }}>
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Marketplace Products</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="flex justify-end mb-4">
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
                            <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)} disabled={updating === o.id}>
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
          </TabsContent>

          <TabsContent value="products">
            <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} of {products.length} shown ({products.filter(p => p.hidden).length} hidden)
              </p>
              <div className="flex gap-2 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleCsvUpload(e.target.files[0])}
                />
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm" disabled={csvUploading}>
                  {csvUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                  Upload CSV
                </Button>
                <Button onClick={downloadCsvTemplate} variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Template
                </Button>
                <Button onClick={exportCsv} variant="ghost" size="sm">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
                <Button onClick={reloadProducts} variant="outline" size="sm" disabled={productsLoading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${productsLoading ? "animate-spin" : ""}`} /> Refresh
                </Button>
                <Button onClick={() => setEditing(blankEdit())} size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search by name, id, category"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All categories</SelectItem>
                  {categoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={productVisibility} onValueChange={(v: any) => setProductVisibility(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="visible">Visible only</SelectItem>
                  <SelectItem value="hidden">Hidden only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {editing && (
              <Card className="mb-6 border-primary/40">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {editing.isNew ? "New Product" : `Edit: ${editing.name}`}
                    <Button variant="ghost" size="icon" onClick={() => setEditing(null)}><X className="h-4 w-4" /></Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {editing.isNew && (
                    <div className="md:col-span-2">
                      <Label>Custom ID (optional)</Label>
                      <Input
                        value={editing.customId || ""}
                        onChange={(e) => setEditing({ ...editing, customId: e.target.value })}
                        placeholder="auto-generated if empty"
                      />
                    </div>
                  )}
                  <div>
                    <Label>Name</Label>
                    <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price (KES)</Label>
                    <Input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} />
                  </div>
                  <div>
                    <Label>Original Price (optional)</Label>
                    <Input type="number" value={editing.originalPrice} onChange={(e) => setEditing({ ...editing, originalPrice: e.target.value })} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Image URL</Label>
                    <Input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Details (comma-separated)</Label>
                    <Input value={editing.details} onChange={(e) => setEditing({ ...editing, details: e.target.value })} placeholder="e.g. 6GB RAM, 128GB, 5000mAh" />
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <input
                      id="hidden"
                      type="checkbox"
                      checked={editing.hidden}
                      onChange={(e) => setEditing({ ...editing, hidden: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="hidden" className="cursor-pointer">Hide from store</Label>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                    <Button onClick={saveProduct} disabled={savingProduct}>
                      {savingProduct ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {productsLoading ? (
              <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <Card key={p.id} className={`bg-card border-border ${p.hidden ? "opacity-60" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img src={p.image} alt={p.name} className="h-20 w-20 object-contain bg-secondary/30 rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.category}</p>
                          <p className="text-primary font-bold mt-1">KES {p.price.toLocaleString()}</p>
                          <div className="flex gap-1 mt-1">
                            {p.isCustom && <Badge variant="outline" className="text-xs">Custom</Badge>}
                            {p.hidden && <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500">Hidden</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 mt-3 flex-wrap">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => beginEdit(p)}>
                          <Pencil className="h-3 w-3 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleHidden(p.id, !!p.hidden)}>
                          {p.hidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                        {p.isCustom ? (
                          <Button size="sm" variant="outline" onClick={() => deleteCustom(p.id)}>
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" title="Reset to defaults" onClick={() => resetOverride(p.id)}>
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="audit">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Last 200 marketplace changes</p>
              <Button onClick={loadAudit} variant="outline" size="sm" disabled={auditLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${auditLoading ? "animate-spin" : ""}`} /> Refresh
              </Button>
            </div>
            {auditLoading ? (
              <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : auditLog.length === 0 ? (
              <div className="text-center py-16">
                <History className="h-14 w-14 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No audit entries yet.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {auditLog.map((a) => (
                  <Card key={a.id} className="bg-card border-border">
                    <CardContent className="p-3 flex items-start gap-3 flex-wrap">
                      <Badge variant="outline" className="uppercase text-xs">{a.action}</Badge>
                      <Badge variant="outline" className="text-xs bg-secondary/40">{a.source}</Badge>
                      <code className="text-xs text-muted-foreground">{a.product_id}</code>
                      <span className="text-xs text-muted-foreground ml-auto">{new Date(a.created_at).toLocaleString()}</span>
                      {(a.before_data || a.after_data) && (
                        <details className="w-full mt-1">
                          <summary className="text-xs cursor-pointer text-muted-foreground">View change</summary>
                          <pre className="text-xs bg-secondary/30 p-2 rounded mt-1 overflow-auto max-h-48">
{JSON.stringify({ before: a.before_data, after: a.after_data }, null, 2)}
                          </pre>
                        </details>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
