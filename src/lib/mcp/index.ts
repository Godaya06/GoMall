import { defineMcp } from "@lovable.dev/mcp-js";
import searchProducts from "./tools/search-products";
import getProduct from "./tools/get-product";
import listCategories from "./tools/list-categories";
import trackOrder from "./tools/track-order";

export default defineMcp({
  name: "gomall-mcp",
  title: "GoMall MCP",
  version: "0.1.0",
  instructions:
    "Tools for the GoMall marketplace. Use `search_products` and `list_categories` to browse phones, beauty, and personal care items. Use `get_product` for details and `track_order` to check an order status (requires the M-Pesa phone used at checkout).",
  tools: [searchProducts, getProduct, listCategories, trackOrder],
});
