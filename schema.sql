-- Supabase SQL Schema for CareerApply AI
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL,
    student_name TEXT NOT NULL,
    target_role TEXT NOT NULL,
    company_name TEXT NOT NULL,
    profile JSONB NOT NULL,
    job JSONB NOT NULL,
    outputs JSONB NOT NULL,
    result JSONB NOT NULL,
    paid BOOLEAN DEFAULT false NOT NULL,
    payment_id TEXT NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 3. Create public access policy for reading & writing applications
CREATE POLICY "Allow public insert" ON public.applications 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read" ON public.applications 
    FOR SELECT USING (true);

-- 4. Index for fast date sorting and search
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_student_name ON public.applications (student_name);
