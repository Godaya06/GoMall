import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Headphones } from "lucide-react";

const props = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders over $50. Delivered in 2-3 days." },
  { icon: Shield, title: "2-Year Warranty", desc: "Every device backed by our extended protection plan." },
  { icon: RefreshCw, title: "Easy Trade-In", desc: "Get instant credit for your old phone towards a new one." },
  { icon: Headphones, title: "24/7 Support", desc: "Real humans ready to help, anytime you need us." },
];

const ValueProps = () => (
  <section className="py-24 border-t border-border">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {props.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
              <p.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueProps;
