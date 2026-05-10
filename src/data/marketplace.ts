import samsungA15 from "@/assets/mp-samsung-a15.png";
import xiaomiRedmi from "@/assets/mp-xiaomi-redmi.png";
import earbuds from "@/assets/mp-earbuds.png";
import powerbank from "@/assets/mp-powerbank.png";
import smartwatch from "@/assets/mp-smartwatch.png";
import phoneHolder from "@/assets/mp-phone-holder.png";
import dashcam from "@/assets/mp-dashcam.png";
import seatOrganizer from "@/assets/mp-seat-organizer.png";
import airfryer from "@/assets/mp-airfryer.png";
import warmingTray from "@/assets/mp-warming-tray.png";
import vegSlicer from "@/assets/mp-veg-slicer.png";
import streetwear from "@/assets/mp-streetwear.png";
import leggings from "@/assets/mp-leggings.png";
import babyCarrier from "@/assets/mp-baby-carrier.png";
import babyNail from "@/assets/mp-baby-nail.png";
import diaperBag from "@/assets/mp-diaper-bag.png";
import petFeeder from "@/assets/mp-pet-feeder.png";
import petGrooming from "@/assets/mp-pet-grooming.png";
import bambooBrush from "@/assets/mp-bamboo-brush.png";
import solarLight from "@/assets/mp-solar-light.png";
import reusableBag from "@/assets/mp-reusable-bag.png";

export interface MarketplaceProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  details: string[];
}

export const marketplaceCategories = [
  "All",
  "Electronics",
  "Automotive",
  "Home & Kitchen",
  "Fashion",
  "Baby & Mother",
  "Pet Supplies",
  "Eco-Friendly",
] as const;

export const marketplaceProducts: MarketplaceProduct[] = [
  // Electronics & Mobile Accessories
  { id: "mp-samsung-a15", name: "Samsung Galaxy A15", price: 18500, image: samsungA15, category: "Electronics", description: "Budget-friendly 5G smartphone with 50MP camera and large battery.", details: ["6GB RAM", "128GB", "5000mAh"] },
  { id: "mp-xiaomi-redmi", name: "Xiaomi Redmi Note 13", price: 22900, image: xiaomiRedmi, category: "Electronics", description: "Sleek mid-range with 108MP camera and AMOLED display.", details: ["8GB RAM", "256GB", "AMOLED"] },
  { id: "mp-earbuds", name: "True Wireless Earbuds Pro", price: 2500, originalPrice: 3500, image: earbuds, category: "Electronics", description: "Bluetooth 5.3 earbuds with active noise cancellation and 24h battery.", details: ["BT 5.3", "ANC", "24h"], },
  { id: "mp-powerbank", name: "20000mAh Fast Power Bank", price: 2200, image: powerbank, category: "Electronics", description: "High capacity power bank with 22.5W PD fast charging — perfect for daily commutes.", details: ["20000mAh", "22.5W PD", "Dual USB"] },
  { id: "mp-smartwatch", name: "Health-Tracking Smartwatch", price: 4500, image: smartwatch, category: "Electronics", description: "Track heart rate, SpO2, sleep, steps and over 100 sport modes.", details: ["HR + SpO2", "IP68", "7 day battery"] },

  // Automotive
  { id: "mp-phone-holder", name: "Magnetic Car Phone Holder", price: 1200, image: phoneHolder, category: "Automotive", description: "Strong magnetic mount for dashboard or windscreen — secure grip on Nairobi roads.", details: ["Magnetic", "360° rotate", "Universal"] },
  { id: "mp-dashcam", name: "1080p Car Dash Camera", price: 6800, image: dashcam, category: "Automotive", description: "Full HD dashcam with night vision and loop recording for safer driving.", details: ["1080p", "Night vision", "G-sensor"] },
  { id: "mp-seat-organizer", name: "Leather Car Seat Gap Organizer", price: 950, image: seatOrganizer, category: "Automotive", description: "Premium PU leather organizer that fills the seat gap and keeps phones, keys & coins handy.", details: ["PU leather", "2 cup holders", "Universal fit"] },

  // Home & Kitchen
  { id: "mp-airfryer", name: "5L Digital Air Fryer", price: 7500, originalPrice: 9500, image: airfryer, category: "Home & Kitchen", description: "Healthier oil-free cooking with 8 preset modes — fries, chicken, fish and more.", details: ["5L", "8 presets", "1500W"] },
  { id: "mp-warming-tray", name: "Electric Food Warming Tray", price: 3200, image: warmingTray, category: "Home & Kitchen", description: "Keep food warm during meals or events. Adjustable temperature and easy-clean surface.", details: ["Glass top", "Adjustable", "Family size"] },
  { id: "mp-veg-slicer", name: "Multi-Blade Vegetable Slicer", price: 1450, image: vegSlicer, category: "Home & Kitchen", description: "Slice, dice, julienne and grate in seconds — saves prep time for busy households.", details: ["6 blades", "Stainless steel", "Hand guard"] },

  // Fashion
  { id: "mp-streetwear", name: "Oversized Streetwear Hoodie", price: 2800, image: streetwear, category: "Fashion", description: "Baggy fit cotton-blend hoodie — Gen Z streetwear staple.", details: ["Cotton blend", "Unisex", "S–XXL"] },
  { id: "mp-leggings", name: "High-Waisted Activewear Leggings", price: 1900, image: leggings, category: "Fashion", description: "Squat-proof high-rise leggings with hidden pocket — gym to street.", details: ["High waist", "Squat-proof", "4-way stretch"] },

  // Baby & Mother Care
  { id: "mp-baby-carrier", name: "Ergonomic Baby Carrier", price: 3500, image: babyCarrier, category: "Baby & Mother", description: "Hip-healthy ergonomic carrier with lumbar support — 0–36 months.", details: ["0–36 mo", "Lumbar support", "Breathable"] },
  { id: "mp-baby-nail", name: "Electric Baby Nail Trimmer", price: 1100, image: babyNail, category: "Baby & Mother", description: "Whisper-quiet trimmer with LED light — safe for newborns and toddlers.", details: ["Quiet", "LED light", "6 grinders"] },
  { id: "mp-diaper-bag", name: "Mom Diaper Backpack", price: 2900, image: diaperBag, category: "Baby & Mother", description: "Multi-pocket waterproof diaper bag with insulated bottle pockets and stroller straps.", details: ["Waterproof", "USB port", "Stroller straps"] },

  // Pet Supplies
  { id: "mp-pet-feeder", name: "Automatic Pet Feeder Bowl", price: 2400, image: petFeeder, category: "Pet Supplies", description: "Programmable smart feeder with dual bowls — feed pets on schedule.", details: ["Auto", "Dual bowl", "App control"] },
  { id: "mp-pet-grooming", name: "Pro Pet Grooming Kit", price: 3300, image: petGrooming, category: "Pet Supplies", description: "Cordless clippers + scissors + brushes for full at-home grooming.", details: ["Cordless", "Low noise", "7 pieces"] },

  // Eco-Friendly
  { id: "mp-bamboo-brush", name: "Bamboo Toothbrush (4-pack)", price: 450, image: bambooBrush, category: "Eco-Friendly", description: "Biodegradable bamboo handle with soft BPA-free bristles.", details: ["Biodegradable", "BPA-free", "4 pack"] },
  { id: "mp-solar-light", name: "Solar LED Camping Lantern", price: 1500, image: solarLight, category: "Eco-Friendly", description: "Off-grid solar lantern with USB charging — great for outdoor and emergencies.", details: ["Solar", "USB", "12h runtime"] },
  { id: "mp-reusable-bag", name: "Reusable Canvas Tote Bag", price: 350, image: reusableBag, category: "Eco-Friendly", description: "Durable cotton canvas tote — replace dozens of plastic bags.", details: ["Cotton", "Foldable", "15kg load"] },
];
