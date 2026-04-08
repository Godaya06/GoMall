import { products } from '@/data/products'; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import ProductCareDetail from "./pages/ProductCareDetail.tsx";
import OrderTracking from "./pages/OrderTracking.tsx";
import Auth from "./pages/Auth.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/care/:id" element={<ProductCareDetail />} />
              <Route path="/orders" element={<OrderTracking />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
// src/data/products.tsx

export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  size: string;
  image: string;
  brand: string;
  description: string;
}

export const products: Product[] = [
  // --- TV, AUDIO & VIDEO ---
  {
    id: 1,
    name: "Vitron 32\" Smart Android TV (2025)",
    category: "TV, Audio & Video",
    price: "KSh 12,499",
    size: "32-inch",
    brand: "Vitron",
    description: "HD resolution, inbuilt Wi-Fi, and Netflix/YouTube pre-installed.",
    image: "https://unsplash.com"
  },
  {
    id: 2,
    name: "TCL 43\" 4K HDR Google TV",
    category: "TV, Audio & Video",
    price: "KSh 27,999",
    size: "43-inch",
    brand: "TCL Kenya",
    description: "High value for 4K. Includes Dolby Audio and hands-free voice control.",
    image: "https://unsplash.com"
  },
  {
    id: 3,
    name: "Skyworth 55\" 4K UHD QLED",
    category: "TV, Audio & Video",
    price: "KSh 46,799",
    size: "55-inch",
    brand: "Skyworth",
    description: "Premium display tech for vibrant colors and deep contrasts.",
    image: "https://unsplash.com"
  },
  {
    id: 4,
    name: "Sony Bravia 43\" X75K 4K",
    category: "TV, Audio & Video",
    price: "KSh 50,999",
    size: "43-inch",
    brand: "Sony",
    description: "Premium build with Sony’s legendary X1 processor for clarity.",
    image: "https://unsplash.com"
  },
  // --- SHOES ---
  {
    id: 5,
    name: "Bata Safari Boots",
    category: "Shoes",
    price: "KSh 3,500",
    size: "UK 6 - 11",
    brand: "Bata Kenya 🇰🇪",
    description: "The iconic 'shoe that says Kenya.' Handcrafted in Limuru with suede.",
    image: "https://unsplash.com"
  },
  {
    id: 6,
    name: "Enda Iten Running Shoes",
    category: "Shoes",
    price: "KSh 12,000",
    size: "UK 4 - 12",
    brand: "Enda 🇰🇪",
    description: "Proudly Kenyan-made high-performance trainers.",
    image: "https://unsplash.com"
  },
  {
    id: 7,
    name: "Nike Air Force 1 '07",
    category: "Shoes",
    price: "KSh 14,500",
    size: "UK 3 - 12",
    brand: "Nike",
    description: "A global classic, widely available in major Kenyan malls.",
    image: "https://unsplash.com"
  },
  // --- PHONES & ACCESSORIES ---
  {
    id: 8,
    name: "Samsung Galaxy A05s",
    category: "Phones & Accessories",
    price: "KSh 16,500",
    size: "128GB / 4GB RAM",
    brand: "Samsung Kenya",
    description: "Popular budget-friendly reliable smartphone.",
    image: "https://unsplash.com"
  },
  {
    id: 9,
    name: "Tecno Spark 20 Pro",
    category: "Phones & Accessories",
    price: "KSh 21,000",
    size: "256GB / 8GB RAM",
    brand: "Tecno",
    description: "Known for high-spec cameras at a competitive price.",
    image: "https://unsplash.com"
  },
  {
    id: 10,
    name: "Refurbished iPhone 13",
    category: "Phones & Accessories",
    price: "KSh 65,000",
    size: "128GB",
    brand: "Apple",
    description: "High demand in the premium refurbished market.",
    image: "https://unsplash.com"
  },
  // --- HOME, KITCHEN & BEAUTY ---
  {
    id: 11,
    name: "Ramtons RM/581 Fridge",
    category: "Home & Kitchen",
    price: "KSh 22,000",
    size: "90 Liters",
    brand: "Ramtons",
    description: "The gold standard for Kenyan home appliances.",
    image: "https://unsplash.com"
  },
  {
    id: 12,
    name: "SuzieBeauty Lip Gloss",
    category: "Health & Beauty",
    price: "KSh 1,200",
    size: "Standard",
    brand: "SuzieBeauty 🇰🇪",
    description: "Award-winning Kenyan beauty brand developed by Suzie Wokabi.",
    image: "https://unsplash.com"
  },
  {
    id: 13,
    name: "Nice & Lovely Lotion",
    category: "Health & Beauty",
    import React from 'react';
// Using your shortcut alias '@/' to point to the src folder
import { products, Product } from '@/data/products';
import './App.css';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="product-card">
    <div className="image-container">
      <img src={product.image} alt={product.name} loading="lazy" />
      <span className="category-badge">{product.category}</span>
    </div>
    <div className="product-details">
      <p className="brand-name">{product.brand}</p>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <div className="price-row">
        <span className="price-tag">{product.price}</span>
        <button className="view-btn">View Details</button>
      </div>
    </div>
  </div>
);

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Kenya Retail Hub 🇰🇪</h1>
        <p>Discover top Kenyan brands and premium global products</p>
      </header>

      <main className="product-grid">
        {products.length > 0 ? (
          products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="error-msg">No products found. Check your data file!</p>
        )}
      </main>
    </div>
  );
}

    price: "KSh 450",
    size: "400ml",
    brand: "Nice & Lovely 🇰🇪",
    description: "Ubiquitous local skincare brand.",
    image: "https://unsplash.com"
  }
];
