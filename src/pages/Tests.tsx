import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  Clock, 
  FileText, 
  Trophy,
  ChevronRight,
  Play,
  Calendar,
  Lock,
  Star,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const testCategories = [
  { id: "sectional", name: "Sectional Tests", count: 120, icon: FileText },
  { id: "full-length", name: "Full Length Mocks", count: 25, icon: ClipboardList },
  { id: "jee-main", name: "JEE Main Pattern", count: 15, icon: Trophy },
  { id: "jee-adv", name: "JEE Advanced Pattern", count: 10, icon: Star },
  { id: "neet", name: "NEET Pattern", count: 12, icon: Trophy },
];

const upcomingTests = [
  {
    id: 1,
    name: "JEE Main Mock Test - 5",
    date: "Today, 4:00 PM",
    duration: "3 hours",
    questions: 90,
    marks: 300,
    enrolled: 1250,
    status: "live",
  },
  {
    id: 2,
    name: "Physics Sectional - Mechanics",
    date: "Tomorrow, 10:00 AM",
    duration: "1 hour",
    questions: 30,
    marks: 100,
    enrolled: 890,
    status: "upcoming",
  },
  {
    id: 3,
    name: "NEET Full Syllabus Test - 3",
    date: "Jan 28, 2024",
    duration: "3 hours 20 min",
    questions: 200,
    marks: 720,
    enrolled: 2100,
    status: "upcoming",
  },
];

const completedTests = [
  {
    id: 1,
    name: "JEE Main Mock Test - 4",
    score: 245,
    maxScore: 300,
    rank: 156,
    totalParticipants: 1450,
    percentile: 89.2,
    date: "Jan 20, 2024",
  },
  {
    id: 2,
    name: "Chemistry Sectional - Organic",
    score: 78,
    maxScore: 100,
    rank: 45,
    totalParticipants: 780,
    percentile: 94.2,
    date: "Jan 18, 2024",
  },
  {
    id: 3,
    name: "Maths Sectional - Calculus",
    score: 65,
    maxScore: 100,
    rank: 220,
    totalParticipants: 650,
    percentile: 66.2,
    date: "Jan 15, 2024",
  },
];

export default function Tests() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">Test Series</h1>
              <p className="text-muted-foreground">
                Practice with exam-simulated mock tests and track your performance
              </p>
            </div>
            <Link to="/tests/generate">
              <Button className="gap-2" variant="default">
                <Sparkles className="h-4 w-4" /> Generate AI Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Test Category Pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          {testCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={index === 0 ? "default" : "outline"}
                className="gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.name}
                <Badge variant="secondary" className="ml-1 bg-white/20">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming/Live Tests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming & Live Tests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-5 rounded-xl border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {test.status === "live" && (
                            <Badge className="bg-destructive animate-pulse">
                              🔴 LIVE NOW
                            </Badge>
                          )}
                          <h3 className="font-semibold">{test.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{test.date}</p>
                      </div>
                      <Button 
                        variant={test.status === "live" ? "accent" : "outline"}
                        className="gap-2"
                      >
                        {test.status === "live" ? (
                          <>
                            <Play className="h-4 w-4" /> Start Now
                          </>
                        ) : (
                          <>
                            <Calendar className="h-4 w-4" /> Register
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {test.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" /> {test.questions} Questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="h-4 w-4" /> {test.marks} Marks
                      </span>
                      <span className="flex items-center gap-1">
                        👥 {test.enrolled.toLocaleString()} enrolled
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Completed Tests */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Your Test Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedTests.map((test) => (
                  <div
                    key={test.id}
                    className="p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{test.name}</h3>
                        <p className="text-sm text-muted-foreground">{test.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {test.score}/{test.maxScore}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {test.percentile} percentile
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Rank: #{test.rank} / {test.totalParticipants}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Analysis <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <Progress 
                      value={(test.score / test.maxScore) * 100} 
                      className="h-2 mt-3" 
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-1">86.5</div>
                  <div className="text-sm text-muted-foreground">Avg. Percentile</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/50 rounded-xl text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-muted-foreground">Tests Taken</div>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl text-center">
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-xs text-muted-foreground">Avg. Score</div>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl text-center">
                    <div className="text-2xl font-bold text-success">+12</div>
                    <div className="text-xs text-muted-foreground">Rank Improvement</div>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl text-center">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-xs text-muted-foreground">Best Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Premium Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Unlock 50+ premium mock tests with detailed solutions and AIR prediction
                </p>
                <Button variant="accent" className="w-full">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
