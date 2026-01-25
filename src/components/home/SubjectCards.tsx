import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical, Calculator, Dna, ArrowRight, BookOpen, FileQuestion, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    color: "bg-physics",
    chapters: 30,
    questions: 2500,
    description: "Mechanics, Waves, Optics, Modern Physics & more",
    topics: ["Mechanics", "Thermodynamics", "Electromagnetism", "Modern Physics"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    color: "bg-chemistry",
    chapters: 28,
    questions: 2200,
    description: "Physical, Organic, Inorganic Chemistry",
    topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    color: "bg-mathematics",
    chapters: 35,
    questions: 3000,
    description: "Algebra, Calculus, Coordinate Geometry, Vectors",
    topics: ["Algebra", "Calculus", "Coordinate Geometry", "Trigonometry"],
  },
  {
    id: "biology",
    name: "Biology",
    icon: Dna,
    color: "bg-biology",
    chapters: 38,
    questions: 2800,
    description: "Botany, Zoology, Human Physiology",
    topics: ["Botany", "Zoology", "Human Physiology", "Ecology"],
  },
];

export function SubjectCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Master All Subjects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive coverage of NCERT syllabus with chapter-wise learning and practice
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card
                key={subject.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={cn("h-2", subject.color)} />
                <CardContent className="p-6">
                  <div className={cn(
                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white",
                    subject.color
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="font-display text-lg font-bold mb-2">{subject.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{subject.description}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {subject.chapters} Chapters
                    </span>
                    <span className="flex items-center gap-1">
                      <FileQuestion className="h-3 w-3" />
                      {subject.questions}+ MCQs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {subject.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded-full bg-secondary/80 text-[10px] font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <Link to={`/learn/${subject.id}`}>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300" size="sm">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
