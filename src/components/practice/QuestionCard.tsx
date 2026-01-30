import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  questionImageUrl?: string | null;
  options: string[];
  selectedOption: number | null;
  correctOption: number;
  showFeedback: boolean;
  difficulty?: string | null;
  chapterName?: string;
  onSelectOption: (index: number) => void;
}

const optionLabels = ["A", "B", "C", "D"];

export function QuestionCard({
  questionNumber,
  totalQuestions,
  questionText,
  questionImageUrl,
  options,
  selectedOption,
  correctOption,
  showFeedback,
  difficulty,
  chapterName,
  onSelectOption,
}: QuestionCardProps) {
  const getOptionState = (index: number) => {
    if (!showFeedback) {
      return selectedOption === index ? "selected" : "default";
    }
    if (index === correctOption) return "correct";
    if (index === selectedOption && selectedOption !== correctOption) return "incorrect";
    return "default";
  };

  const getOptionStyles = (state: string) => {
    switch (state) {
      case "selected":
        return "border-primary bg-primary/10 ring-2 ring-primary/30";
      case "correct":
        return "border-success bg-success/10 ring-2 ring-success/30";
      case "incorrect":
        return "border-destructive bg-destructive/10 ring-2 ring-destructive/30";
      default:
        return "border-border hover:border-primary/50 hover:bg-secondary/50";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        {/* Question Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              Q{questionNumber}/{totalQuestions}
            </Badge>
            {difficulty && (
              <Badge
                className={cn(
                  difficulty === "easy" && "bg-success text-success-foreground",
                  difficulty === "medium" && "bg-warning text-warning-foreground",
                  difficulty === "hard" && "bg-destructive text-destructive-foreground"
                )}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
            )}
          </div>
          {chapterName && (
            <span className="text-sm text-muted-foreground">{chapterName}</span>
          )}
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <p className="text-lg font-medium leading-relaxed">{questionText}</p>
          {questionImageUrl && (
            <div className="mt-4">
              <img
                src={questionImageUrl}
                alt="Question diagram"
                className="max-w-full max-h-64 rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => {
            const state = getOptionState(index);
            const isDisabled = showFeedback;

            return (
              <button
                key={index}
                onClick={() => !isDisabled && onSelectOption(index)}
                disabled={isDisabled}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  getOptionStyles(state),
                  isDisabled && "cursor-not-allowed"
                )}
              >
                <span
                  className={cn(
                    "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors",
                    state === "selected" && "bg-primary text-primary-foreground",
                    state === "correct" && "bg-success text-success-foreground",
                    state === "incorrect" && "bg-destructive text-destructive-foreground",
                    state === "default" && "bg-secondary text-secondary-foreground"
                  )}
                >
                  {optionLabels[index]}
                </span>
                <span className="flex-1">{option}</span>
                {showFeedback && state === "correct" && (
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                )}
                {showFeedback && state === "incorrect" && (
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
