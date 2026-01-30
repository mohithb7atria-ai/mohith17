import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PracticeSession as PracticeSessionComponent } from "@/components/practice/PracticeSession";
import { PracticeQuestion } from "@/hooks/usePracticeSession";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// Sample questions for demo (when no real questions in DB)
const sampleQuestions: PracticeQuestion[] = [
  {
    id: "1",
    question_text: "A body of mass 2 kg is thrown upward with an initial velocity of 20 m/s. What is the maximum height reached by the body? (Take g = 10 m/s²)",
    options: ["10 m", "20 m", "30 m", "40 m"],
    correct_option: 1,
    explanation: "Using the equation v² = u² - 2gh, at maximum height v = 0. So, h = u²/2g = (20)²/(2×10) = 400/20 = 20 m",
    difficulty: "easy",
    chapter_name: "Motion in a Straight Line",
    subject_name: "Physics",
  },
  {
    id: "2",
    question_text: "The hybridization of carbon atoms in diamond is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct_option: 2,
    explanation: "In diamond, each carbon atom is bonded to four other carbon atoms in a tetrahedral arrangement. This requires sp³ hybridization.",
    difficulty: "medium",
    chapter_name: "Chemical Bonding",
    subject_name: "Chemistry",
  },
  {
    id: "3",
    question_text: "If sin θ + cos θ = √2, then tan θ + cot θ equals:",
    options: ["1", "2", "√2", "2√2"],
    correct_option: 1,
    explanation: "Given sin θ + cos θ = √2. Squaring both sides: 1 + 2sin θ cos θ = 2, so sin θ cos θ = 1/2. Now, tan θ + cot θ = (sin²θ + cos²θ)/(sin θ cos θ) = 1/(1/2) = 2",
    difficulty: "medium",
    chapter_name: "Trigonometry",
    subject_name: "Mathematics",
  },
  {
    id: "4",
    question_text: "The site of protein synthesis in a cell is:",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    correct_option: 2,
    explanation: "Ribosomes are the cellular organelles responsible for protein synthesis. They translate mRNA into proteins by assembling amino acids in the correct sequence.",
    difficulty: "easy",
    chapter_name: "Cell Structure",
    subject_name: "Biology",
  },
  {
    id: "5",
    question_text: "A particle moves in a circle of radius R with a constant angular velocity ω. The magnitude of average velocity during time t = 2π/ω is:",
    options: ["0", "ωR", "2ωR/π", "ωR/2"],
    correct_option: 0,
    explanation: "Time t = 2π/ω is exactly one complete revolution. The particle returns to its starting position, so displacement = 0. Average velocity = displacement/time = 0",
    difficulty: "hard",
    chapter_name: "Circular Motion",
    subject_name: "Physics",
  },
];

export default function PracticeSessionPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const difficulty = searchParams.get("difficulty") || "medium";
  const category = searchParams.get("category") || "daily";
  const count = parseInt(searchParams.get("count") || "10", 10);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        
        let query = supabase
          .from("questions")
          .select(`
            id,
            question_text,
            options,
            correct_option,
            explanation,
            difficulty,
            question_image_url,
            chapters!inner(name, subjects!inner(name))
          `)
          .limit(count);

        if (difficulty !== "all") {
          query = query.eq("difficulty", difficulty);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        if (data && data.length > 0) {
          const formattedQuestions: PracticeQuestion[] = data.map((q: any) => ({
            id: q.id,
            question_text: q.question_text,
            options: q.options as string[],
            correct_option: q.correct_option,
            explanation: q.explanation,
            difficulty: q.difficulty,
            question_image_url: q.question_image_url,
            chapter_name: q.chapters?.name,
            subject_name: q.chapters?.subjects?.name,
          }));
          setQuestions(formattedQuestions);
        } else {
          // Use sample questions if no real data
          setQuestions(sampleQuestions.slice(0, count));
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        // Fall back to sample questions
        setQuestions(sampleQuestions.slice(0, count));
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [difficulty, count]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/practice">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Practice
          </Link>
        </Button>

        {/* Practice Session */}
        <PracticeSessionComponent 
          questions={questions}
          timePerQuestion={60}
        />
      </div>
    </div>
  );
}
