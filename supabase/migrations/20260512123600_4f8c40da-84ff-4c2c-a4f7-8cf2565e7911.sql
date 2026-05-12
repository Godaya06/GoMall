
CREATE TABLE public.marketplace_products (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  price NUMERIC,
  original_price NUMERIC,
  category TEXT,
  description TEXT,
  image_url TEXT,
  details JSONB,
  hidden BOOLEAN NOT NULL DEFAULT false,
  is_custom BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view non-hidden marketplace products"
  ON public.marketplace_products FOR SELECT
  USING (hidden = false OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert marketplace products"
  ON public.marketplace_products FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update marketplace products"
  ON public.marketplace_products FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete marketplace products"
  ON public.marketplace_products FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_marketplace_products_updated_at
  BEFORE UPDATE ON public.marketplace_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
