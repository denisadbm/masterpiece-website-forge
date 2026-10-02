CREATE TABLE public.customer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 2 AND 80),
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL CHECK (char_length(comment) BETWEEN 20 AND 1000),
  service TEXT CHECK (service IS NULL OR service IN ('Assistance médicale', 'Logement / hébergement', 'Accompagnement des malades')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.customer_reviews TO anon;
GRANT SELECT, INSERT ON public.customer_reviews TO authenticated;
GRANT ALL ON public.customer_reviews TO service_role;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read approved reviews"
ON public.customer_reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved');
CREATE POLICY "Visitors can submit reviews for moderation"
ON public.customer_reviews FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');
CREATE INDEX customer_reviews_approved_created_idx ON public.customer_reviews (created_at DESC) WHERE status = 'approved';