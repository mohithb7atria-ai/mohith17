import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Atom, 
  FlaskConical, 
  Calculator, 
  Dna, 
  ChevronRight, 
  BookOpen, 
  Clock,
  FileText
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

const subjects = [
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    color: "bg-physics",
    colorClass: "physics",
    chapters: [
      { id: 1, name: "Units and Measurements", progress: 75, questions: 120 },
      { id: 2, name: "Motion in a Straight Line", progress: 60, questions: 150 },
      { id: 3, name: "Motion in a Plane", progress: 45, questions: 180 },
      { id: 4, name: "Laws of Motion", progress: 30, questions: 200 },
      { id: 5, name: "Work, Energy and Power", progress: 0, questions: 175 },
      { id: 6, name: "System of Particles", progress: 0, questions: 160 },
      { id: 7, name: "Gravitation", progress: 0, questions: 140 },
      { id: 8, name: "Mechanical Properties of Solids", progress: 0, questions: 100 },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    color: "bg-chemistry",
    colorClass: "chemistry",
    chapters: [
      { id: 1, name: "Some Basic Concepts of Chemistry", progress: 90, questions: 130 },
      { id: 2, name: "Structure of Atom", progress: 70, questions: 160 },
      { id: 3, name: "Classification of Elements", progress: 50, questions: 120 },
      { id: 4, name: "Chemical Bonding", progress: 25, questions: 200 },
      { id: 5, name: "States of Matter", progress: 0, questions: 140 },
      { id: 6, name: "Thermodynamics", progress: 0, questions: 180 },
      { id: 7, name: "Equilibrium", progress: 0, questions: 170 },
      { id: 8, name: "Redox Reactions", progress: 0, questions: 110 },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    color: "bg-mathematics",
    colorClass: "mathematics",
    chapters: [
      { id: 1, name: "Sets", progress: 100, questions: 80 },
      { id: 2, name: "Relations and Functions", progress: 85, questions: 150 },
      { id: 3, name: "Trigonometric Functions", progress: 65, questions: 200 },
      { id: 4, name: "Complex Numbers", progress: 40, questions: 180 },
      { id: 5, name: "Linear Inequalities", progress: 20, questions: 100 },
      { id: 6, name: "Permutations & Combinations", progress: 0, questions: 160 },
      { id: 7, name: "Binomial Theorem", progress: 0, questions: 120 },
      { id: 8, name: "Sequences and Series", progress: 0, questions: 150 },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    icon: Dna,
    color: "bg-biology",
    colorClass: "biology",
    chapters: [
      { id: 1, name: "The Living World", progress: 80, questions: 100 },
      { id: 2, name: "Biological Classification", progress: 60, questions: 140 },
      { id: 3, name: "Plant Kingdom", progress: 40, questions: 160 },
      { id: 4, name: "Animal Kingdom", progress: 30, questions: 180 },
      { id: 5, name: "Morphology of Plants", progress: 0, questions: 150 },
      { id: 6, name: "Anatomy of Plants", progress: 0, questions: 130 },
      { id: 7, name: "Structural Organisation in Animals", progress: 0, questions: 120 },
      { id: 8, name: "Cell: The Unit of Life", progress: 0, questions: 200 },
    ],
  },
];

export default function Learn() {
  const { subject: subjectParam } = useParams();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(
    subjectParam || "physics"
  );

  const currentSubject = subjects.find((s) => s.id === selectedSubject) || subjects[0];
  const Icon = currentSubject.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Learn Concepts</h1>
          <p className="text-muted-foreground">
            Master each chapter with NCERT-aligned explanations, formulas, and diagrams
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Subject Selector - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Subjects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {subjects.map((subject) => {
                  const SubIcon = subject.icon;
                  const isSelected = selectedSubject === subject.id;
                  return (
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "hover:bg-secondary"
                      )}
                    >
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          isSelected ? "bg-white/20" : subject.color
                        )}
                      >
                        <SubIcon className={cn("h-5 w-5", isSelected ? "" : "text-white")} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{subject.name}</div>
                        <div className={cn("text-xs", isSelected ? "text-white/70" : "text-muted-foreground")}>
                          {subject.chapters.length} Chapters
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Chapters List */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", currentSubject.color)}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">{currentSubject.name}</h2>
                <p className="text-muted-foreground text-sm">
                  {currentSubject.chapters.filter(c => c.progress > 0).length} of {currentSubject.chapters.length} chapters started
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {currentSubject.chapters.map((chapter, index) => {
                const goToNotes = () =>
                  navigate(`/learn/notes?subject=${encodeURIComponent(currentSubject.name)}&chapter=${encodeURIComponent(chapter.name)}`);
                return (
                  <Card
                    key={chapter.id}
                    onClick={goToNotes}
                    className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg",
                            currentSubject.color
                          )}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                              {chapter.name}
                            </h3>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-3 w-3" />
                                NCERT-aligned notes
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                ~2 hours
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-xs"
                            onClick={(e) => { e.stopPropagation(); goToNotes(); }}
                          >
                            <FileText className="h-3.5 w-3.5" /> Open Notes
                          </Button>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
