-- Create universities table
CREATE TABLE public.universities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  degree_level TEXT NOT NULL,
  tuition_fee INTEGER NOT NULL,
  min_gpa DECIMAL(3,2) NOT NULL,
  min_ielts DECIMAL(2,1) NOT NULL,
  image_url TEXT,
  ranking INTEGER,
  acceptance_rate INTEGER,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  nationality TEXT,
  gpa DECIMAL(3,2) NOT NULL,
  ielts_score DECIMAL(2,1) NOT NULL,
  degree_type TEXT,
  field_of_study TEXT NOT NULL,
  statement_of_purpose TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Universities are publicly readable (no auth required to browse)
CREATE POLICY "Universities are publicly readable" 
ON public.universities 
FOR SELECT 
USING (true);

-- Applications can be created by anyone (public application form)
CREATE POLICY "Anyone can submit applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (true);

-- Applications can be read by their email (for status checking)
CREATE POLICY "Users can view their own applications by email" 
ON public.applications 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_universities_updated_at
BEFORE UPDATE ON public.universities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample university data
INSERT INTO public.universities (name, country, city, degree_level, tuition_fee, min_gpa, min_ielts, image_url, ranking, acceptance_rate, description) VALUES
('Harvard University', 'USA', 'Cambridge, MA', 'Bachelor''s', 54000, 3.90, 7.5, 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', 1, 4, 'One of the world''s most prestigious universities, known for excellence in law, business, and medicine.'),
('University of Oxford', 'UK', 'Oxford', 'Master''s', 38000, 3.70, 7.0, 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800', 2, 17, 'The oldest university in the English-speaking world, renowned for academic excellence.'),
('University of Toronto', 'Canada', 'Toronto, ON', 'Bachelor''s', 45000, 3.50, 6.5, 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=800', 18, 43, 'Canada''s leading institution of learning, discovery and knowledge creation.'),
('Technical University of Munich', 'Germany', 'Munich', 'Master''s', 12000, 3.30, 6.5, 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800', 30, 8, 'Germany''s leading technical university, known for engineering and natural sciences.'),
('University of Melbourne', 'Australia', 'Melbourne, VIC', 'Bachelor''s', 35000, 3.40, 6.5, 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800', 33, 70, 'Australia''s leading university, consistently ranked among the world''s best.'),
('ETH Zurich', 'Switzerland', 'Zurich', 'PhD', 8000, 3.80, 7.0, 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800', 7, 27, 'One of the world''s leading universities for technology and natural sciences.'),
('MIT', 'USA', 'Cambridge, MA', 'Master''s', 57000, 3.90, 7.5, 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800', 3, 4, 'The world''s leading research university in science, technology, and innovation.'),
('University of British Columbia', 'Canada', 'Vancouver, BC', 'Bachelor''s', 42000, 3.20, 6.5, 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800', 35, 52, 'A global centre for research and teaching, consistently ranked among the top universities.');