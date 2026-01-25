import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Clock,
  Brain,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const subjectPerformance = [
  { 
    name: "Physics", 
    accuracy: 72, 
    questionsAttempted: 450, 
    avgTime: "2.1 min",
    trend: "up",
    weakTopics: ["Thermodynamics", "Electromagnetism"]
  },
  { 
    name: "Chemistry", 
    accuracy: 68, 
    questionsAttempted: 380, 
    avgTime: "1.8 min",
    trend: "up",
    weakTopics: ["Organic Chemistry", "Chemical Kinetics"]
  },
  { 
    name: "Mathematics", 
    accuracy: 78, 
    questionsAttempted: 520, 
    avgTime: "3.2 min",
    trend: "down",
    weakTopics: ["3D Geometry", "Probability"]
  },
  { 
    name: "Biology", 
    accuracy: 82, 
    questionsAttempted: 320, 
    avgTime: "1.5 min",
    trend: "up",
    weakTopics: ["Genetics", "Human Physiology"]
  },
];

const weakChapters = [
  { name: "Thermodynamics", subject: "Physics", accuracy: 45, priority: "high" },
  { name: "Organic Chemistry Reactions", subject: "Chemistry", accuracy: 52, priority: "high" },
  { name: "3D Geometry", subject: "Mathematics", accuracy: 55, priority: "medium" },
  { name: "Probability", subject: "Mathematics", accuracy: 58, priority: "medium" },
  { name: "Chemical Kinetics", subject: "Chemistry", accuracy: 60, priority: "low" },
];

const performanceHistory = [
  { week: "Week 1", physics: 65, chemistry: 60, maths: 70, biology: 75 },
  { week: "Week 2", physics: 68, chemistry: 62, maths: 72, biology: 78 },
  { week: "Week 3", physics: 70, chemistry: 65, maths: 75, biology: 80 },
  { week: "Week 4", physics: 72, chemistry: 68, maths: 78, biology: 82 },
];

export default function Analysis() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Performance Analysis</h1>
          <p className="text-muted-foreground">
            Track your progress, identify weaknesses, and get personalized improvement suggestions
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">74%</div>
                <div className="text-xs text-muted-foreground">Overall Accuracy</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-success">+8%</div>
                <div className="text-xs text-muted-foreground">This Month</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold">2.2 min</div>
                <div className="text-xs text-muted-foreground">Avg. per Question</div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-mathematics/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-mathematics" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,670</div>
                <div className="text-xs text-muted-foreground">Total Questions</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Subject Performance */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Subject-wise Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectPerformance.map((subject) => (
                  <div key={subject.name} className="p-4 rounded-xl bg-secondary/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{subject.name}</h4>
                        {subject.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <div className={cn(
                        "text-2xl font-bold",
                        subject.accuracy >= 75 ? "text-success" :
                        subject.accuracy >= 60 ? "text-warning" : "text-destructive"
                      )}>
                        {subject.accuracy}%
                      </div>
                    </div>

                    <Progress value={subject.accuracy} className="h-2 mb-3" />

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>{subject.questionsAttempted} questions</span>
                      <span>Avg. time: {subject.avgTime}</span>
                    </div>

                    {subject.weakTopics.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-muted-foreground">Weak areas:</span>
                        {subject.weakTopics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Progress Chart Placeholder */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-secondary/20 rounded-xl">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Performance trend visualization
                    </p>
                    <p className="text-sm text-muted-foreground/70">
                      Showing 4 weeks of data
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  {performanceHistory.map((week) => (
                    <div key={week.week} className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">{week.week}</div>
                      <div className="font-bold text-primary">
                        {Math.round((week.physics + week.chemistry + week.maths + week.biology) / 4)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weakness Analyzer */}
          <div className="space-y-6">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Focus Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {weakChapters.map((chapter) => (
                  <div
                    key={chapter.name}
                    className="p-3 rounded-lg bg-card border border-border hover:border-destructive/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{chapter.name}</h4>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        chapter.priority === "high" ? "bg-destructive/10 text-destructive" :
                        chapter.priority === "medium" ? "bg-warning/10 text-warning" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {chapter.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{chapter.subject}</span>
                      <span className="text-destructive font-medium">{chapter.accuracy}% accuracy</span>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-2 border-destructive/30 text-destructive hover:bg-destructive/10">
                  Practice Weak Topics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  Strong Areas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Laws of Motion</span>
                    <span className="text-success font-bold">92%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Physics</span>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Sets & Relations</span>
                    <span className="text-success font-bold">88%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Mathematics</span>
                </div>
                <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">Cell Biology</span>
                    <span className="text-success font-bold">86%</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Biology</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6 text-center">
                <Brain className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your performance, focus on Thermodynamics and Organic Chemistry this week.
                </p>
                <Button variant="default" className="w-full">
                  Get Study Plan
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
