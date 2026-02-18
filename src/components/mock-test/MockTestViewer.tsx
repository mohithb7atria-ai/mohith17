import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2, XCircle, ChevronLeft, ChevronRight, Eye, EyeOff,
  Clock, BarChart3, RotateCcw, Trophy
} from "lucide-react";
import type { MockTestData, MockTestQuestion } from "@/hooks/useMockTestGenerator";

interface MockTestViewerProps {
  testData: MockTestData;
  onReset: () => void;
}

const OPTION_KEYS = ["A", "B", "C", "D"] as const;

export function MockTestViewer({ testData, onReset }: MockTestViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const q = testData.questions[currentIndex];
  const total = testData.questions.length;
  const progress = ((currentIndex + 1) / total) * 100;

  const stats = useMemo(() => {
    if (!submitted) return null;
    let correct = 0, wrong = 0, unanswered = 0;
    testData.questions.forEach((question) => {
      const ans = answers[question.id];
      if (!ans) unanswered++;
      else if (ans === question.correct_answer) correct++;
      else wrong++;
    });
    return { correct, wrong, unanswered, total, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }, [submitted, answers, testData.questions, total]);

  const selectAnswer = (key: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [q.id]: key }));
  };

  const toggleSolution = (id: number) => {
    setShowSolution((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getOptionStyle = (key: string) => {
    const selected = answers[q.id] === key;
    const isCorrect = q.correct_answer === key;

    if (!submitted) {
      return selected
        ? "border-primary bg-primary/10 ring-2 ring-primary/30"
        : "border-border hover:border-primary/40 hover:bg-secondary/50";
    }
    if (isCorrect) return "border-success bg-success/10";
    if (selected && !isCorrect) return "border-destructive bg-destructive/10";
    return "border-border opacity-60";
  };

  if (submitted && stats) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Results Summary */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-2">
            <Trophy className="h-12 w-12 text-accent mx-auto mb-2" />
            <CardTitle className="text-2xl">Test Complete!</CardTitle>
            <p className="text-muted-foreground">
              {testData.meta.exam} · {testData.meta.subject} · {testData.meta.chapter}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-primary/10 rounded-xl">
                <div className="text-3xl font-bold text-primary">{stats.accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-xl">
                <div className="text-3xl font-bold text-success">{stats.correct}</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-xl">
                <div className="text-3xl font-bold text-destructive">{stats.wrong}</div>
                <div className="text-xs text-muted-foreground">Wrong</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-xl">
                <div className="text-3xl font-bold">{stats.unanswered}</div>
                <div className="text-xs text-muted-foreground">Unanswered</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={onReset} variant="outline" className="flex-1 gap-2">
                <RotateCcw className="h-4 w-4" /> New Test
              </Button>
              <Button onClick={() => { setSubmitted(true); setCurrentIndex(0); }} className="flex-1 gap-2">
                <BarChart3 className="h-4 w-4" /> Review Answers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review all questions */}
        <div className="space-y-4">
          {testData.questions.map((question, idx) => {
            const userAns = answers[question.id];
            const isCorrect = userAns === question.correct_answer;
            return (
              <Card key={question.id} className="border-0 shadow-md">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Q{idx + 1}</Badge>
                      <Badge variant="secondary" className="capitalize">{question.difficulty}</Badge>
                      {userAns ? (
                        isCorrect ? <CheckCircle2 className="h-5 w-5 text-success" /> : <XCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Badge variant="secondary">Skipped</Badge>
                      )}
                    </div>
                  </div>
                  <p className="font-medium mb-3">{question.question}</p>
                  <div className="grid gap-2 mb-3">
                    {OPTION_KEYS.map((key) => {
                      const isCorrectOpt = question.correct_answer === key;
                      const isUserOpt = userAns === key;
                      let style = "p-3 rounded-lg border text-sm ";
                      if (isCorrectOpt) style += "border-success bg-success/10";
                      else if (isUserOpt) style += "border-destructive bg-destructive/10";
                      else style += "border-border opacity-60";
                      return (
                        <div key={key} className={style}>
                          <span className="font-semibold mr-2">{key}.</span>
                          {question.options[key]}
                          {isCorrectOpt && <CheckCircle2 className="h-4 w-4 text-success inline ml-2" />}
                          {isUserOpt && !isCorrectOpt && <XCircle className="h-4 w-4 text-destructive inline ml-2" />}
                        </div>
                      );
                    })}
                  </div>
                  {question.solution && (
                    <div>
                      <Button variant="ghost" size="sm" onClick={() => toggleSolution(question.id)} className="gap-1 mb-2">
                        {showSolution[question.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        {showSolution[question.id] ? "Hide" : "Show"} Solution
                      </Button>
                      {showSolution[question.id] && (
                        <div className="p-4 bg-secondary/50 rounded-lg text-sm leading-relaxed animate-fade-in">
                          {question.solution}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Active test view
  return (
    <div className="space-y-4 animate-fade-in">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {currentIndex + 1} of {total}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> ~{testData.meta.estimated_time_minutes} min
        </span>
      </div>
      <Progress value={progress} className="h-2" />

      {/* Question Navigation Dots */}
      <div className="flex flex-wrap gap-1.5">
        {testData.questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
              idx === currentIndex
                ? "bg-primary text-primary-foreground"
                : answers[testData.questions[idx].id]
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">Q{currentIndex + 1}</Badge>
            <Badge variant="secondary" className="capitalize">{q.difficulty}</Badge>
            <Badge variant="secondary">{q.bloom_level}</Badge>
            {q.concept_tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium leading-relaxed">{q.question}</p>

          <div className="grid gap-3">
            {OPTION_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => selectAnswer(key)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${getOptionStyle(key)}`}
              >
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-sm font-bold mr-3">
                  {key}
                </span>
                {q.options[key]}
                {submitted && q.correct_answer === key && <CheckCircle2 className="h-5 w-5 text-success inline ml-2" />}
                {submitted && answers[q.id] === key && q.correct_answer !== key && <XCircle className="h-5 w-5 text-destructive inline ml-2" />}
              </button>
            ))}
          </div>

          {/* Solution (post-submit) */}
          {submitted && q.solution && (
            <div>
              <Button variant="ghost" size="sm" onClick={() => toggleSolution(q.id)} className="gap-1">
                {showSolution[q.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showSolution[q.id] ? "Hide" : "Show"} Solution
              </Button>
              {showSolution[q.id] && (
                <div className="p-4 mt-2 bg-secondary/50 rounded-lg text-sm leading-relaxed animate-fade-in">
                  {q.solution}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>

        {currentIndex < total - 1 ? (
          <Button onClick={() => setCurrentIndex((i) => i + 1)} className="gap-1">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setSubmitted(true)}
            variant="default"
            className="gap-2 bg-accent hover:bg-accent/90"
            disabled={submitted}
          >
            <Trophy className="h-4 w-4" /> Submit Test
          </Button>
        )}
      </div>
    </div>
  );
}
