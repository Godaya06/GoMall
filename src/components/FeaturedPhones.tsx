import { motion } from "framer-motion";
import { ShoppingCart, Cpu, HardDrive, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import phone1 from "@/assets/phone1.png";
import phone2 from "@/assets/phone2.png";
import phone3 from "@/assets/phone3.png";
import phone4 from "@/assets/phone4.png";
import phone5 from "@/assets/phone5.png";
import phone6 from "@/assets/phone6.png";

interface Phone {
  id: string;
  name: string;
  price: number;
  image: string;
  tag: string;
  ram: string;
  storage: string;
  camera: string;
}

const phones: Phone[] = [
  { id: "iphone16promax", name: "iPhone 16 Pro Max", price: 239000, image: phone1, tag: "Flagship", ram: "8 GB", storage: "1 TB", camera: "48 MP" },
  { id: "iphone16pro", name: "iPhone 16 Pro", price: 199000, image: phone2, tag: "Best Seller", ram: "8 GB", storage: "512 GB", camera: "48 MP" },
  { id: "iphone16", name: "iPhone 16", price: 149000, image: phone3, tag: "New", ram: "8 GB", storage: "256 GB", camera: "48 MP" },
  { id: "iphone15pro", name: "iPhone 15 Pro", price: 179000, image: phone4, tag: "Popular", ram: "8 GB", storage: "512 GB", camera: "48 MP" },
  { id: "iphone15", name: "iPhone 15", price: 125000, image: phone5, tag: "Value", ram: "6 GB", storage: "256 GB", camera: "48 MP" },
  { id: "iphone14", name: "iPhone 14", price: 89000, image: phone6, tag: "Budget", ram: "6 GB", storage: "128 GB", camera: "12 MP" },
];

const SpecBadge = ({ icon: Icon, label }: { icon: typeof Cpu; label: string }) => (
  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
    <Icon className="h-3.5 w-3.5 text-primary/70" />
    <span>{label}</span>
  </div>
);

const FeaturedPhones = () => {
  const { addItem } = useCart();

  return (
    <section id="phones" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Devices</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Handpicked flagships with the best specs, design, and value.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {phones.map((phone, i) => (
            <motion.div
              key={phone.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative bg-card rounded-2xl border border-border p-6 card-shadow hover:border-primary/40 transition-all duration-300"
            >
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {phone.tag}
              </span>
              <div className="flex justify-center py-6">
                <img
                  src={phone.image}
                  alt={phone.name}
                  loading="lazy"
                  width={200}
                  height={200}
                  className="h-44 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-1">{phone.name}</h3>
              <p className="text-primary font-bold text-xl mb-3">KES {phone.price.toLocaleString()}</p>

              <div className="flex items-center gap-4 mb-4 py-2 px-3 rounded-lg bg-secondary/50">
                <SpecBadge icon={Cpu} label={phone.ram} />
                <SpecBadge icon={HardDrive} label={phone.storage} />
                <SpecBadge icon={Camera} label={phone.camera} />
              </div>

              <Button
                className="w-full bg-gradient-primary text-primary-foreground font-semibold"
                onClick={() => addItem({ id: phone.id, name: phone.name, price: phone.price, image: phone.image })}
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPhones;
