
-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

-- Create user roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    exam_type TEXT CHECK (exam_type IN ('JEE', 'NEET')),
    target_year INTEGER,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subjects table
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    exam_types TEXT[] DEFAULT ARRAY['JEE', 'NEET'],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chapters table
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    chapter_number INTEGER,
    weightage INTEGER DEFAULT 0,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(subject_id, slug)
);

-- Create topics table
CREATE TABLE public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    content TEXT,
    formulas TEXT[],
    key_points TEXT[],
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(chapter_id, slug)
);

-- Create questions table
CREATE TABLE public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
    topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
    question_text TEXT NOT NULL,
    question_image_url TEXT,
    options JSONB NOT NULL,
    correct_option INTEGER NOT NULL,
    explanation TEXT,
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
    exam_type TEXT CHECK (exam_type IN ('JEE Main', 'JEE Advanced', 'NEET')),
    year INTEGER,
    is_pyq BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tests table
CREATE TABLE public.tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    test_type TEXT CHECK (test_type IN ('mock', 'sectional', 'chapter', 'daily')) NOT NULL,
    exam_type TEXT CHECK (exam_type IN ('JEE Main', 'JEE Advanced', 'NEET')),
    duration_minutes INTEGER NOT NULL,
    total_marks INTEGER NOT NULL,
    negative_marking DECIMAL(3,2) DEFAULT 0.25,
    is_published BOOLEAN DEFAULT false,
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test_questions junction table
CREATE TABLE public.test_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE NOT NULL,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
    section_name TEXT,
    question_number INTEGER NOT NULL,
    marks INTEGER DEFAULT 4,
    UNIQUE(test_id, question_id)
);

-- Create user_progress table
CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE NOT NULL,
    questions_attempted INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    last_practiced_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id, chapter_id)
);

-- Create test_attempts table
CREATE TABLE public.test_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    test_id UUID REFERENCES public.tests(id) ON DELETE CASCADE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE,
    score INTEGER,
    total_marks INTEGER,
    answers JSONB,
    time_taken_seconds INTEGER,
    status TEXT CHECK (status IN ('in_progress', 'completed', 'abandoned')) DEFAULT 'in_progress'
);

-- Create daily_streaks table
CREATE TABLE public.daily_streaks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_practice_date DATE,
    total_practice_days INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doubt_conversations table
CREATE TABLE public.doubt_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    subject TEXT,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create doubt_messages table
CREATE TABLE public.doubt_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES public.doubt_conversations(id) ON DELETE CASCADE NOT NULL,
    role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubt_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubt_messages ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for public content (subjects, chapters, topics, questions)
CREATE POLICY "Anyone can view subjects" ON public.subjects
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage subjects" ON public.subjects
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view chapters" ON public.chapters
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage chapters" ON public.chapters
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view topics" ON public.topics
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage topics" ON public.topics
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view questions" ON public.questions
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage questions" ON public.questions
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for tests
CREATE POLICY "Anyone can view published tests" ON public.tests
    FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all tests" ON public.tests
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view test questions" ON public.test_questions
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage test questions" ON public.test_questions
    FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user-specific data
CREATE POLICY "Users can view their own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own progress" ON public.user_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own test attempts" ON public.test_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own test attempts" ON public.test_attempts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own streaks" ON public.daily_streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own streaks" ON public.daily_streaks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own doubt conversations" ON public.doubt_conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own doubt conversations" ON public.doubt_conversations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own doubt messages" ON public.doubt_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.doubt_conversations 
            WHERE id = conversation_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert their own doubt messages" ON public.doubt_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.doubt_conversations 
            WHERE id = conversation_id AND user_id = auth.uid()
        )
    );

-- Trigger to auto-create profile and role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id)
    VALUES (NEW.id);
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'student');
    
    INSERT INTO public.daily_streaks (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at
    BEFORE UPDATE ON public.user_progress
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default subjects
INSERT INTO public.subjects (name, slug, description, icon, color, exam_types, display_order) VALUES
('Physics', 'physics', 'Mechanics, Thermodynamics, Electromagnetism, Optics, Modern Physics', 'Atom', 'physics', ARRAY['JEE', 'NEET'], 1),
('Chemistry', 'chemistry', 'Physical, Organic, and Inorganic Chemistry', 'FlaskConical', 'chemistry', ARRAY['JEE', 'NEET'], 2),
('Mathematics', 'mathematics', 'Algebra, Calculus, Coordinate Geometry, Trigonometry', 'Calculator', 'mathematics', ARRAY['JEE'], 3),
('Biology', 'biology', 'Botany, Zoology, Human Physiology, Genetics', 'Dna', 'biology', ARRAY['NEET'], 4);
