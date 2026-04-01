import phone1 from "@/assets/phone1.png";
import phone2 from "@/assets/phone2.png";
import phone3 from "@/assets/phone3.png";
import phone4 from "@/assets/phone4.png";
import phone5 from "@/assets/phone5.png";
import phone6 from "@/assets/phone6.png";

export interface Phone {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  ram: string;
  storage: string;
  camera: string;
  display: string;
  battery: string;
  chip: string;
  description: string;
  colors: string[];
}

export const phones: Phone[] = [
  {
    id: "iphone16promax",
    name: "iPhone 16 Pro Max",
    price: 239000,
    image: phone1,
    tag: "Flagship",
    ram: "8 GB",
    storage: "1 TB",
    camera: "48 MP",
    display: "6.9\" Super Retina XDR OLED",
    battery: "4685 mAh",
    chip: "A18 Pro",
    description: "The ultimate iPhone experience. The iPhone 16 Pro Max features a stunning 6.9-inch display, the powerful A18 Pro chip, and a pro-grade 48MP camera system with 5x optical zoom. Built with aerospace-grade titanium.",
    colors: ["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"],
  },
  {
    id: "iphone16pro",
    name: "iPhone 16 Pro",
    price: 199000,
    image: phone2,
    tag: "Best Seller",
    ram: "8 GB",
    storage: "512 GB",
    camera: "48 MP",
    display: "6.3\" Super Retina XDR OLED",
    battery: "3582 mAh",
    chip: "A18 Pro",
    description: "Pro-level performance in a refined design. The iPhone 16 Pro delivers the A18 Pro chip, a 48MP camera with advanced computational photography, and all-day battery life in a sleek titanium body.",
    colors: ["Black Titanium", "Natural Titanium", "White Titanium", "Desert Titanium"],
  },
  {
    id: "iphone16",
    name: "iPhone 16",
    price: 149000,
    image: phone3,
    tag: "New",
    ram: "8 GB",
    storage: "256 GB",
    camera: "48 MP",
    display: "6.1\" Super Retina XDR OLED",
    battery: "3561 mAh",
    chip: "A18",
    description: "Beautifully powerful. The iPhone 16 features the fast A18 chip, a 48MP Fusion camera, and a vibrant 6.1-inch display. Available in stunning new colors.",
    colors: ["Blue", "Pink", "Teal", "White", "Black"],
  },
  {
    id: "iphone15pro",
    name: "iPhone 15 Pro",
    price: 179000,
    image: phone4,
    tag: "Popular",
    ram: "8 GB",
    storage: "512 GB",
    camera: "48 MP",
    display: "6.1\" Super Retina XDR OLED",
    battery: "3274 mAh",
    chip: "A17 Pro",
    description: "Forged in titanium. The iPhone 15 Pro features a strong and light titanium design, the A17 Pro chip, and a pro camera system with 48MP main lens.",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
  },
  {
    id: "iphone15",
    name: "iPhone 15",
    price: 125000,
    image: phone5,
    tag: "Value",
    ram: "6 GB",
    storage: "256 GB",
    camera: "48 MP",
    display: "6.1\" Super Retina XDR OLED",
    battery: "3349 mAh",
    chip: "A16 Bionic",
    description: "New camera. New design. Newphoria. iPhone 15 brings a 48MP camera, the Dynamic Island, and the powerful A16 Bionic chip in a gorgeous color-infused glass design.",
    colors: ["Pink", "Yellow", "Green", "Blue", "Black"],
  },
  {
    id: "iphone14",
    name: "iPhone 14",
    price: 89000,
    image: phone6,
    tag: "Budget",
    ram: "6 GB",
    storage: "128 GB",
    camera: "12 MP",
    display: "6.1\" Super Retina XDR OLED",
    battery: "3279 mAh",
    chip: "A15 Bionic",
    description: "Impressive. And an impressive value. iPhone 14 features a 6.1-inch display, the A15 Bionic chip, and advanced camera features including Photonic Engine.",
    colors: ["Blue", "Purple", "Yellow", "Midnight", "Starlight", "Red"],
  },
];
