
CREATE TABLE public.chapter_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  chapter text NOT NULL,
  exam_type text NOT NULL DEFAULT 'JEE',
  file_path text NOT NULL,
  file_url text NOT NULL,
  file_size_bytes integer,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.chapter_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view chapter notes" ON public.chapter_notes FOR SELECT USING (true);
CREATE POLICY "Admins manage chapter notes" ON public.chapter_notes FOR ALL USING (has_role(auth.uid(),'admin'));

INSERT INTO storage.buckets (id, name, public) VALUES ('chapter-notes','chapter-notes', true) ON CONFLICT (id) DO NOTHING;
CREATE POLICY "Public read chapter-notes" ON storage.objects FOR SELECT USING (bucket_id = 'chapter-notes');
CREATE POLICY "Admins write chapter-notes" ON storage.objects FOR INSERT WITH CHECK (bucket_id='chapter-notes' AND has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update chapter-notes" ON storage.objects FOR UPDATE USING (bucket_id='chapter-notes' AND has_role(auth.uid(),'admin'));
