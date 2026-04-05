-- Create applications table to store resume submissions
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  resume_text TEXT,
  job_description TEXT NOT NULL,
  match_score INTEGER,
  matching_skills TEXT[],
  missing_skills TEXT[],
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create policy for public inserts (students can submit applications)
CREATE POLICY "Allow public inserts" ON public.applications
  FOR INSERT
  WITH CHECK (true);

-- Create policy for public reads
CREATE POLICY "Allow public reads" ON public.applications
  FOR SELECT
  USING (true);

-- Create policy for updates
CREATE POLICY "Allow public updates" ON public.applications
  FOR UPDATE
  USING (true);
