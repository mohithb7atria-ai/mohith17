import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Clock, Flame, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const difficultyLevels = [
  { id: "easy", name: "Easy", color: "bg-success" },
  { id: "medium", name: "Medium", color: "bg-warning" },
  { id: "hard", name: "Hard", color: "bg-destructive" },
];

const practiceCategories = [
  { id: "daily", name: "Daily Practice", icon: Flame, description: "Fresh mixed-topic questions", color: "from-accent to-accent/80" },
  { id: "topic", name: "Topic-wise Practice", icon: Target, description: "Focus on specific chapters", color: "from-primary to-primary/80" },
  { id: "pyq", name: "Previous Year Questions", icon: Clock, description: "JEE & NEET PYQs", color: "from-mathematics to-mathematics/80" },
  { id: "weakness", name: "Mixed Challenge", icon: Brain, description: "Tougher conceptual mix", color: "from-destructive to-destructive/80" },
];

export default function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const navigate = useNavigate();

  const handleStartPractice = (category?: string) => {
    const params = new URLSearchParams();
    params.set("difficulty", selectedDifficulty);
    if (category) params.set("category", category);
    params.set("count", "10");
    navigate(`/practice/session?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Practice MCQs</h1>
          <p className="text-muted-foreground">
            Strengthen your concepts with timed MCQ practice sessions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {practiceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                onClick={() => handleStartPractice(category.id)}
              >
                <div className={cn("h-1.5 bg-gradient-to-r", category.color)} />
                <CardContent className="p-5">
                  <div className={cn(
                    "mb-4 h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                    category.color
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Start <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Select Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {difficultyLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200",
                  selectedDifficulty === level.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary hover:bg-secondary/80"
                )}
              >
                <div className={cn("h-3 w-3 rounded-full", level.color)} />
                <span className="font-semibold">{level.name}</span>
              </button>
            ))}
            <Button variant="hero" className="w-full mt-4" onClick={() => handleStartPractice()}>
              Start Practice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
