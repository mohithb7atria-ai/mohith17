import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2, BookOpen, GraduationCap, Beaker, Calculator, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MockTestConfig } from "@/hooks/useMockTestGenerator";

const EXAM_OPTIONS = [
  { value: "JEE_MAIN", label: "JEE Main" },
  { value: "JEE_ADVANCED", label: "JEE Advanced" },
  { value: "NEET", label: "NEET" },
];

const SUBJECT_MAP: Record<string, { label: string; icon: typeof BookOpen; chapters: string[] }> = {
  Physics: {
    label: "Physics",
    icon: BookOpen,
    chapters: [
      "Mechanics", "Kinematics", "Laws of Motion", "Work Energy Power",
      "Rotational Motion", "Gravitation", "Thermodynamics", "Waves",
      "Optics", "Electrostatics", "Current Electricity", "Magnetism",
      "Electromagnetic Induction", "Modern Physics", "Semiconductors",
    ],
  },
  Chemistry: {
    label: "Chemistry",
    icon: Beaker,
    chapters: [
      "Atomic Structure", "Chemical Bonding", "States of Matter",
      "Thermodynamics", "Equilibrium", "Redox Reactions", "Organic Chemistry Basics",
      "Hydrocarbons", "Coordination Compounds", "Electrochemistry",
      "Chemical Kinetics", "Surface Chemistry", "p-Block Elements", "d-Block Elements",
    ],
  },
  Mathematics: {
    label: "Mathematics",
    icon: Calculator,
    chapters: [
      "Sets & Relations", "Trigonometry", "Complex Numbers",
      "Quadratic Equations", "Sequences & Series", "Permutations & Combinations",
      "Binomial Theorem", "Straight Lines", "Conic Sections", "Limits & Derivatives",
      "Integrals", "Differential Equations", "Vectors", "3D Geometry", "Probability",
    ],
  },
  Biology: {
    label: "Biology",
    icon: Leaf,
    chapters: [
      "Cell Biology", "Cell Division", "Biomolecules", "Plant Anatomy",
      "Plant Physiology", "Human Physiology", "Reproduction",
      "Genetics & Evolution", "Ecology", "Biotechnology", "Human Health & Disease",
    ],
  },
};

const QUESTION_COUNTS = [5, 10, 15, 20, 25, 30];

interface MockTestConfigFormProps {
  onGenerate: (config: MockTestConfig) => void;
  isGenerating: boolean;
}

export function MockTestConfigForm({ onGenerate, isGenerating }: MockTestConfigFormProps) {
  const [exam, setExam] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [includeSolutions, setIncludeSolutions] = useState(true);

  const subjectData = subject ? SUBJECT_MAP[subject] : null;
  const availableSubjects = exam === "NEET"
    ? ["Physics", "Chemistry", "Biology"]
    : ["Physics", "Chemistry", "Mathematics"];

  const handleSubmit = () => {
    if (!exam || !subject || !chapter) return;
    onGenerate({ exam, subject, chapter, numQuestions, includeSolutions });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Mock Test Generator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure your test and let AI generate exam-quality questions
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Exam */}
        <div className="space-y-2">
          <Label>Exam Type</Label>
          <Select value={exam} onValueChange={(v) => { setExam(v); setSubject(""); setChapter(""); }}>
            <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
            <SelectContent>
              {EXAM_OPTIONS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" /> {e.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        {exam && (
          <div className="space-y-2 animate-fade-in">
            <Label>Subject</Label>
            <Select value={subject} onValueChange={(v) => { setSubject(v); setChapter(""); }}>
              <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
              <SelectContent>
                {availableSubjects.map((s) => {
                  const Icon = SUBJECT_MAP[s].icon;
                  return (
                    <SelectItem key={s} value={s}>
                      <span className="flex items-center gap-2"><Icon className="h-4 w-4" /> {s}</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Chapter */}
        {subjectData && (
          <div className="space-y-2 animate-fade-in">
            <Label>Chapter</Label>
            <Select value={chapter} onValueChange={setChapter}>
              <SelectTrigger><SelectValue placeholder="Select chapter" /></SelectTrigger>
              <SelectContent>
                {subjectData.chapters.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Question Count */}
        {chapter && (
          <div className="space-y-2 animate-fade-in">
            <Label>Number of Questions</Label>
            <div className="flex flex-wrap gap-2">
              {QUESTION_COUNTS.map((n) => (
                <Button
                  key={n}
                  variant={numQuestions === n ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNumQuestions(n)}
                >
                  {n}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">Easy: {Math.round(numQuestions * 0.3)}</Badge>
              <Badge variant="secondary">Moderate: {numQuestions - Math.round(numQuestions * 0.3) - Math.round(numQuestions * 0.2)}</Badge>
              <Badge variant="secondary">Hard: {Math.round(numQuestions * 0.2)}</Badge>
            </div>
          </div>
        )}

        {/* Solutions Toggle */}
        {chapter && (
          <div className="flex items-center justify-between animate-fade-in">
            <Label htmlFor="solutions">Include Solutions</Label>
            <Switch id="solutions" checked={includeSolutions} onCheckedChange={setIncludeSolutions} />
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleSubmit}
          disabled={!exam || !subject || !chapter || isGenerating}
          className="w-full gap-2"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Generating {numQuestions} Questions...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" /> Generate Mock Test
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
