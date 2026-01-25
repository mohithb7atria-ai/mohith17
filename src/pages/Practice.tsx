import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  Clock, 
  Flame,
  ChevronRight,
  Zap,
  Trophy,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const difficultyLevels = [
  { id: "easy", name: "Easy", color: "bg-success", count: 850 },
  { id: "medium", name: "Medium", color: "bg-warning", count: 1200 },
  { id: "hard", name: "Hard", color: "bg-destructive", count: 650 },
];

const practiceCategories = [
  {
    id: "daily",
    name: "Daily Practice",
    icon: Flame,
    description: "Fresh questions every day",
    questions: 25,
    color: "from-accent to-accent/80",
    streak: 7,
    isNew: true,
  },
  {
    id: "topic",
    name: "Topic-wise Practice",
    icon: Target,
    description: "Focus on specific chapters",
    questions: 5000,
    color: "from-primary to-primary/80",
  },
  {
    id: "pyq",
    name: "Previous Year Questions",
    icon: Clock,
    description: "10+ years of JEE & NEET",
    questions: 3500,
    color: "from-mathematics to-mathematics/80",
  },
  {
    id: "weakness",
    name: "Weakness Practice",
    icon: Brain,
    description: "AI-identified weak areas",
    questions: 150,
    color: "from-destructive to-destructive/80",
  },
];

const recentTopics = [
  { name: "Laws of Motion", subject: "Physics", accuracy: 78, questions: 45 },
  { name: "Chemical Bonding", subject: "Chemistry", accuracy: 65, questions: 38 },
  { name: "Trigonometry", subject: "Maths", accuracy: 82, questions: 52 },
  { name: "Cell Division", subject: "Biology", accuracy: 71, questions: 30 },
];

export default function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Practice MCQs</h1>
          <p className="text-muted-foreground">
            Strengthen your concepts with unlimited practice questions
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,245</div>
                <div className="text-xs text-muted-foreground">Questions Solved</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold">74%</div>
                <div className="text-xs text-muted-foreground">Overall Accuracy</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Flame className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">7 Days</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-mathematics/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-mathematics" />
              </div>
              <div>
                <div className="text-2xl font-bold">Top 15%</div>
                <div className="text-xs text-muted-foreground">National Rank</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Practice Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {practiceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={cn("h-1.5 bg-gradient-to-r", category.color)} />
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                      category.color
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {category.isNew && (
                      <Badge className="bg-accent text-accent-foreground">New Today</Badge>
                    )}
                    {category.streak && (
                      <Badge variant="outline" className="gap-1">
                        <Flame className="h-3 w-3 text-accent" />
                        {category.streak}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {category.questions.toLocaleString()}+ questions
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Start <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Difficulty Selector */}
          <Card className="lg:col-span-1">
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
                    "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200",
                    selectedDifficulty === level.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("h-3 w-3 rounded-full", level.color)} />
                    <span className="font-semibold">{level.name}</span>
                  </div>
                  <span className={cn(
                    "text-sm",
                    selectedDifficulty === level.id ? "text-white/70" : "text-muted-foreground"
                  )}>
                    {level.count} Qs
                  </span>
                </button>
              ))}

              <Button variant="hero" className="w-full mt-4">
                Start Practice
              </Button>
            </CardContent>
          </Card>

          {/* Recent Topics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Continue Practicing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div>
                      <h4 className="font-semibold">{topic.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {topic.subject} • {topic.questions} questions solved
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={cn(
                          "font-bold",
                          topic.accuracy >= 80 ? "text-success" :
                          topic.accuracy >= 60 ? "text-warning" : "text-destructive"
                        )}>
                          {topic.accuracy}%
                        </div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
