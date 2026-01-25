import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  BookOpen, 
  Calculator, 
  ListChecks,
  Clock,
  ChevronRight,
  Zap,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const revisionModes = [
  {
    id: "formula",
    name: "Formula Sheets",
    icon: Calculator,
    description: "Quick reference for all important formulas",
    count: "500+ formulas",
    color: "from-primary to-primary/80",
  },
  {
    id: "summary",
    name: "Chapter Summaries",
    icon: BookOpen,
    description: "One-page summaries for quick revision",
    count: "130+ chapters",
    color: "from-success to-success/80",
  },
  {
    id: "mistakes",
    name: "Mistake Revision",
    icon: AlertTriangle,
    description: "Review questions you got wrong",
    count: "45 questions",
    color: "from-destructive to-destructive/80",
  },
  {
    id: "quick",
    name: "Quick Revision",
    icon: Zap,
    description: "Last day before exam revision mode",
    count: "Key concepts",
    color: "from-accent to-accent/80",
  },
];

const formulas = [
  { subject: "Physics", chapters: 30, formulas: 180, reviewed: 120 },
  { subject: "Chemistry", chapters: 28, formulas: 150, reviewed: 95 },
  { subject: "Mathematics", chapters: 35, formulas: 220, reviewed: 180 },
  { subject: "Biology", chapters: 38, formulas: 100, reviewed: 45 },
];

const recentMistakes = [
  {
    id: 1,
    question: "A particle moves in a circle of radius R with constant angular velocity ω. The magnitude of average velocity...",
    chapter: "Circular Motion",
    subject: "Physics",
    attempts: 2,
  },
  {
    id: 2,
    question: "The hybridisation of carbon in diamond, graphite and fullerene respectively is...",
    chapter: "Chemical Bonding",
    subject: "Chemistry",
    attempts: 1,
  },
  {
    id: 3,
    question: "If f(x) = x³ - 3x² + 3x - 1, then the value of f'(1) is...",
    chapter: "Differentiation",
    subject: "Mathematics",
    attempts: 3,
  },
];

export default function Revision() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Revision Hub</h1>
          <p className="text-muted-foreground">
            Smart revision tools to help you remember and recall concepts effectively
          </p>
        </div>

        {/* Revision Modes */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {revisionModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Card
                key={mode.id}
                className="group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={cn("h-1.5 bg-gradient-to-r", mode.color)} />
                <CardContent className="p-5">
                  <div className={cn(
                    "mb-4 h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white",
                    mode.color
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display font-bold mb-1">{mode.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{mode.count}</span>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Open <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Formula Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Formula Review Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formulas.map((subject) => (
                  <div key={subject.subject} className="p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{subject.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {subject.chapters} chapters • {subject.formulas} formulas
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {subject.reviewed}/{subject.formulas}
                        </div>
                        <div className="text-xs text-muted-foreground">reviewed</div>
                      </div>
                    </div>
                    <Progress 
                      value={(subject.reviewed / subject.formulas) * 100} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Mistakes */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Questions to Review
                  </CardTitle>
                  <Badge variant="outline" className="text-destructive border-destructive">
                    {recentMistakes.length} pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMistakes.map((mistake) => (
                  <div
                    key={mistake.id}
                    className="p-4 rounded-xl border border-border hover:border-primary/20 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2 mb-2">
                          {mistake.question}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="px-2 py-0.5 rounded-full bg-secondary">
                            {mistake.subject}
                          </span>
                          <span>{mistake.chapter}</span>
                          <span>• {mistake.attempts} attempts</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Revise
                      </Button>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  View All Mistakes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revision Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl text-center">
                    <div className="text-2xl font-bold text-primary">440</div>
                    <div className="text-xs text-muted-foreground">Formulas Reviewed</div>
                  </div>
                  <div className="p-4 bg-success/10 rounded-xl text-center">
                    <div className="text-2xl font-bold text-success">85</div>
                    <div className="text-xs text-muted-foreground">Chapters Done</div>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-xl text-center">
                    <div className="text-2xl font-bold text-accent">12h</div>
                    <div className="text-xs text-muted-foreground">Revision Time</div>
                  </div>
                  <div className="p-4 bg-destructive/10 rounded-xl text-center">
                    <div className="text-2xl font-bold text-destructive">45</div>
                    <div className="text-xs text-muted-foreground">Mistakes Fixed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Quick Revision Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Last-day revision mode with key concepts, important formulas, 
                  and high-weightage topics compiled for rapid review.
                </p>
                <Button variant="accent" className="w-full">
                  Start Quick Revision
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Revision Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span>Today</span>
                    <span className="font-medium">Physics - Optics</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span>Tomorrow</span>
                    <span className="font-medium">Chemistry - Organic</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span>Day 3</span>
                    <span className="font-medium">Maths - Calculus</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
