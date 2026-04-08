import hairSerumImg from "@/assets/hair-serum.png";
import faceCareImg from "@/assets/face-care.png";
import skinCareImg from "@/assets/skin-care.png";
import bodyOilImg from "@/assets/body-oil.png";
import bodyLotionImg from "@/assets/body-lotion.png";
import sunscreenImg from "@/assets/sunscreen.png";
import makeupImg from "@/assets/makeup.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  details: string[];
}

export const personalCareCategories = [
  "All",
  "Hair Care",
  "Face Care",
  "Skin Care",
  "Body Oils",
  "Lotions",
  "Sunscreen",
  "Makeup",
] as const;

export const personalCareProducts: Product[] = [
  {
    id: "hair-growth-serum-1",
    name: "Premium Hair Growth Serum",
    price: 2500,
    image: hairSerumImg,
    category: "Hair Care",
    description:
      "Advanced formula with biotin, castor oil, and keratin to stimulate hair follicles and promote thicker, healthier hair growth.",
    details: ["50ml", "Biotin & Keratin", "All Hair Types"],
  },
  {
    id: "hair-repair-oil",
    name: "Argan Hair Repair Oil",
    price: 1800,
    image: hairSerumImg,
    category: "Hair Care",
    description:
      "Pure argan oil blend that repairs damaged hair, reduces frizz, and adds brilliant shine from root to tip.",
    details: ["100ml", "Argan Oil", "Damaged Hair"],
  },
  {
    id: "face-moisturizer-1",
    name: "Hydrating Face Cream",
    price: 3200,
    image: faceCareImg,
    category: "Face Care",
    description:
      "Luxurious daily moisturizer with hyaluronic acid and vitamin E for deep hydration and a radiant, youthful glow.",
    details: ["50g", "Hyaluronic Acid", "All Skin Types"],
  },
  {
    id: "face-serum-1",
    name: "Vitamin C Brightening Serum",
    price: 2800,
    image: faceCareImg,
    category: "Face Care",
    description:
      "Potent vitamin C serum that brightens skin tone, reduces dark spots, and protects against environmental damage.",
    details: ["30ml", "Vitamin C 20%", "Brightening"],
  },
  {
    id: "skin-care-set-1",
    name: "Complete Skin Care Set",
    price: 5500,
    image: skinCareImg,
    category: "Skin Care",
    description:
      "A curated 3-piece set including cleanser, toner, and moisturizer for a complete daily skincare routine.",
    details: ["3-Piece Set", "Natural Extracts", "Daily Routine"],
  },
  {
    id: "anti-aging-cream",
    name: "Anti-Aging Night Cream",
    price: 4200,
    image: skinCareImg,
    category: "Skin Care",
    description:
      "Rich retinol night cream that reduces fine lines, firms skin, and promotes cell renewal while you sleep.",
    details: ["50g", "Retinol Complex", "Night Use"],
  },
  {
    id: "body-oil-1",
    name: "Nourishing Body Oil",
    price: 2200,
    image: bodyOilImg,
    category: "Body Oils",
    description:
      "Luxurious blend of jojoba, sweet almond, and coconut oils that deeply moisturizes and leaves skin silky smooth.",
    details: ["200ml", "Natural Oils", "Deep Moisture"],
  },
  {
    id: "body-oil-rose",
    name: "Rose & Gold Shimmer Oil",
    price: 2800,
    image: bodyOilImg,
    category: "Body Oils",
    description:
      "A stunning shimmer body oil infused with rose extract and gold particles for a luminous, glowing finish.",
    details: ["150ml", "Rose Extract", "Shimmer Finish"],
  },
  {
    id: "body-lotion-1",
    name: "Shea Butter Body Lotion",
    price: 1500,
    image: bodyLotionImg,
    category: "Lotions",
    description:
      "Ultra-rich body lotion with pure shea butter and cocoa butter for 24-hour moisture and incredibly soft skin.",
    details: ["400ml", "Shea Butter", "24hr Moisture"],
  },
  {
    id: "body-lotion-aloe",
    name: "Aloe Vera Cooling Lotion",
    price: 1200,
    image: bodyLotionImg,
    category: "Lotions",
    description:
      "Lightweight, fast-absorbing lotion with aloe vera and cucumber extract that soothes and cools the skin.",
    details: ["300ml", "Aloe Vera", "Cooling Effect"],
  },
  {
    id: "sunscreen-spf50",
    name: "SPF 50+ Sunscreen",
    price: 1800,
    image: sunscreenImg,
    category: "Sunscreen",
    description:
      "Broad-spectrum SPF 50+ protection with a lightweight, non-greasy formula that blends seamlessly into all skin tones.",
    details: ["100ml", "SPF 50+", "Water Resistant"],
  },
  {
    id: "sunscreen-tinted",
    name: "Tinted Sunscreen SPF 30",
    price: 2200,
    image: sunscreenImg,
    category: "Sunscreen",
    description:
      "Tinted mineral sunscreen with SPF 30 that evens out skin tone while providing reliable sun protection daily.",
    details: ["50ml", "SPF 30", "Tinted Formula"],
  },
  {
    id: "makeup-palette-1",
    name: "Glamour Eyeshadow Palette",
    price: 3500,
    image: makeupImg,
    category: "Makeup",
    description:
      "Stunning 12-shade eyeshadow palette with matte, shimmer, and metallic finishes for endless day-to-night looks.",
    details: ["12 Shades", "Long-Wear", "Highly Pigmented"],
  },
  {
    id: "makeup-lipstick-set",
    name: "Matte Lipstick Collection",
    price: 2800,
    image: makeupImg,
    category: "Makeup",
    description:
      "Set of 4 long-lasting matte lipsticks in universally flattering shades from nude to bold red.",
    details: ["4-Piece Set", "Matte Finish", "12hr Wear"],
  },
  {
    id: "makeup-foundation",
    name: "Flawless Foundation",
    price: 3000,
    image: makeupImg,
    category: "Makeup",
    description:
      "Buildable coverage liquid foundation with a natural, skin-like finish. Available in 20 inclusive shades.",
    details: ["30ml", "Buildable Coverage", "20 Shades"],
  },
];
