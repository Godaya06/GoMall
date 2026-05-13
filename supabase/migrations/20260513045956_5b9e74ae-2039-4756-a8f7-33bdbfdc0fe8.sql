CREATE TABLE public.marketplace_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text NOT NULL,
  action text NOT NULL,
  source text NOT NULL DEFAULT 'manual',
  before_data jsonb,
  after_data jsonb,
  changed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit log"
ON public.marketplace_audit_log FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert audit log"
ON public.marketplace_audit_log FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND changed_by = auth.uid());

CREATE INDEX idx_marketplace_audit_created ON public.marketplace_audit_log(created_at DESC);
CREATE INDEX idx_marketplace_audit_product ON public.marketplace_audit_log(product_id);