import { ShoppingBag } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <a href="/" className="flex items-center gap-2 font-heading text-lg font-bold mb-4">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="text-gradient">GoMall</span>
          </a>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Phones, beauty & personal care. Your everyday mall, online.
          </p>
        </div>
        {[
          { title: "Shop", links: ["All Phones", "Deals", "Accessories", "Trade-In"] },
          { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
          { title: "Help", links: ["Support", "Shipping", "Returns", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-semibold mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
        © 2026 GoMall. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
