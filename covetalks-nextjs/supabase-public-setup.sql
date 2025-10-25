-- SQL script for CoveTalks public site tables
-- This includes only the tables needed for the public-facing site
-- Run this in your Supabase SQL editor

-- Create contact_inquiries table for the contact form
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'general' CHECK (type IN ('general', 'support', 'partnership', 'speaker', 'organization')),
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_created ON contact_inquiries(created_at DESC);

-- Enable Row Level Security
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for contact form)
CREATE POLICY "Anyone can create contact inquiries"
ON contact_inquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy for reading (only authenticated users can read)
CREATE POLICY "Only authenticated users can read contact inquiries"
ON contact_inquiries
FOR SELECT
TO authenticated
USING (true);

-- Create newsletter_subscribers table (optional, for newsletter signup)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create index for email lookups
CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);

-- For public data queries, make sure these tables have proper RLS policies
-- Assuming these tables already exist from your DATABASE.md

-- Public read access for members (speakers)
CREATE POLICY IF NOT EXISTS "Public can view speakers"
ON members
FOR SELECT
TO anon
USING (member_type = 'Speaker');

-- Public read access for organizations
CREATE POLICY IF NOT EXISTS "Public can view organizations"
ON organizations
FOR SELECT
TO anon
USING (true);

-- Public read access for opportunities
CREATE POLICY IF NOT EXISTS "Public can view open opportunities"
ON speaking_opportunities
FOR SELECT
TO anon
USING (status = 'Open' AND event_date >= NOW());

-- Public read access for reviews (for testimonials)
CREATE POLICY IF NOT EXISTS "Public can view reviews"
ON reviews
FOR SELECT
TO anon
USING (true);

-- Create a function to handle contact form notifications (optional)
CREATE OR REPLACE FUNCTION handle_new_contact_inquiry()
RETURNS TRIGGER AS $$
BEGIN
  -- You can add logic here to send email notifications
  -- For example, using pg_net to call an Edge Function
  
  -- Log the inquiry (optional)
  INSERT INTO activity (
    activity_type,
    actor_id,
    target_id,
    metadata
  ) VALUES (
    'contact_form_submission',
    NULL,
    NEW.id,
    jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'subject', NEW.subject,
      'type', NEW.type
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for contact form submissions
CREATE TRIGGER on_contact_inquiry_created
  AFTER INSERT ON contact_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact_inquiry();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
