
DROP POLICY "Anyone can create orders" ON public.orders;
DROP POLICY "Edge functions can update orders" ON public.orders;

CREATE POLICY "Orders can be created with pending status"
ON public.orders FOR INSERT WITH CHECK (status = 'pending');
