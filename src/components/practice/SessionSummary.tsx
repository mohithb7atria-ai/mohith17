import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Target, 
  Clock, 
  SkipForward, 
  CheckCircle2, 
  XCircle,
  RotateCcw,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SessionSummaryProps {
  stats: {
    attempted: number;
    correct: number;
    skipped: number;
    accuracy: number;
    totalTime: number;
    avgTime: number;
  };
  totalQuestions: number;
  onRestart: () => void;
}

export function SessionSummary({ stats, totalQuestions, onRestart }: SessionSummaryProps) {
  const incorrect = stats.attempted - stats.correct;
  const performanceLevel = 
    stats.accuracy >= 80 ? "excellent" :
    stats.accuracy >= 60 ? "good" :
    stats.accuracy >= 40 ? "average" : "needs-improvement";

  const performanceMessages = {
    excellent: { emoji: "🏆", text: "Excellent Performance!", color: "text-success" },
    good: { emoji: "👍", text: "Good Job!", color: "text-primary" },
    average: { emoji: "📚", text: "Keep Practicing!", color: "text-warning" },
    "needs-improvement": { emoji: "💪", text: "Don't Give Up!", color: "text-destructive" },
  };

  const { emoji, text, color } = performanceMessages[performanceLevel];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}m ${secs}s`;
    }
    return `${secs}s`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground">
          <div className="text-5xl mb-4">{emoji}</div>
          <h2 className="text-2xl font-bold mb-2">{text}</h2>
          <p className="opacity-90">You completed {totalQuestions} questions</p>
        </div>
        <CardContent className="p-6">
          {/* Accuracy Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className="stroke-secondary"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  className={cn(
                    "transition-all duration-1000 ease-out",
                    stats.accuracy >= 60 ? "stroke-success" : "stroke-destructive"
                  )}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(stats.accuracy / 100) * 352} 352`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-3xl font-bold", color)}>{stats.accuracy}%</span>
                <span className="text-xs text-muted-foreground">Accuracy</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-success/10">
              <CheckCircle2 className="h-6 w-6 text-success" />
              <div>
                <div className="text-2xl font-bold text-success">{stats.correct}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10">
              <XCircle className="h-6 w-6 text-destructive" />
              <div>
                <div className="text-2xl font-bold text-destructive">{incorrect}</div>
                <div className="text-xs text-muted-foreground">Incorrect</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-warning/10">
              <SkipForward className="h-6 w-6 text-warning" />
              <div>
                <div className="text-2xl font-bold text-warning">{stats.skipped}</div>
                <div className="text-xs text-muted-foreground">Skipped</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">{formatTime(stats.avgTime)}</div>
                <div className="text-xs text-muted-foreground">Avg. Time</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="hero-outline" className="flex-1" asChild>
          <Link to="/practice">
            <Home className="h-4 w-4 mr-2" />
            Back to Practice
          </Link>
        </Button>
        <Button variant="hero" className="flex-1" onClick={onRestart}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Practice Again
        </Button>
      </div>
    </div>
  );
}
