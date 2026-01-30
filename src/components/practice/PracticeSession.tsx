import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, SkipForward, Check } from "lucide-react";
import { QuestionCard } from "./QuestionCard";
import { PracticeTimer } from "./PracticeTimer";
import { ExplanationCard } from "./ExplanationCard";
import { SessionSummary } from "./SessionSummary";
import { usePracticeSession, PracticeQuestion } from "@/hooks/usePracticeSession";
import { usePracticeTimer } from "@/hooks/usePracticeTimer";

interface PracticeSessionProps {
  questions: PracticeQuestion[];
  timePerQuestion?: number;
  onExit?: () => void;
}

export function PracticeSession({ 
  questions, 
  timePerQuestion = 60,
  onExit 
}: PracticeSessionProps) {
  const session = usePracticeSession({ questions, timePerQuestion });
  const timer = usePracticeTimer({
    initialSeconds: timePerQuestion,
    onTimeUp: session.handleTimeUp,
    autoStart: true,
  });

  // Reset timer when moving to next question
  useEffect(() => {
    if (!session.showFeedback && !session.sessionComplete) {
      timer.reset(timePerQuestion);
      timer.start();
    }
  }, [session.currentIndex, session.showFeedback, session.sessionComplete]);

  // Pause timer when showing feedback
  useEffect(() => {
    if (session.showFeedback) {
      timer.pause();
    }
  }, [session.showFeedback]);

  if (session.sessionComplete) {
    return (
      <SessionSummary
        stats={session.stats}
        totalQuestions={session.totalQuestions}
        onRestart={session.resetSession}
      />
    );
  }

  if (!session.currentQuestion) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No questions available</p>
      </div>
    );
  }

  const isCorrect = session.selectedOption === session.currentQuestion.correct_option;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Progress value={session.progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Question {session.currentIndex + 1} of {session.totalQuestions}
          </p>
        </div>
        <div className="ml-4">
          <PracticeTimer 
            formattedTime={timer.formattedTime}
            seconds={timer.seconds}
            totalSeconds={timePerQuestion}
          />
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        questionNumber={session.currentIndex + 1}
        totalQuestions={session.totalQuestions}
        questionText={session.currentQuestion.question_text}
        questionImageUrl={session.currentQuestion.question_image_url}
        options={session.currentQuestion.options}
        selectedOption={session.selectedOption}
        correctOption={session.currentQuestion.correct_option}
        showFeedback={session.showFeedback}
        difficulty={session.currentQuestion.difficulty}
        chapterName={session.currentQuestion.chapter_name}
        onSelectOption={session.handleSelectOption}
      />

      {/* Explanation */}
      {session.showFeedback && (
        <ExplanationCard
          explanation={session.currentQuestion.explanation}
          isCorrect={isCorrect}
        />
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!session.showFeedback ? (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={session.handleSkipQuestion}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip
            </Button>
            <Button
              variant="hero"
              className="flex-1"
              onClick={session.handleSubmitAnswer}
              disabled={session.selectedOption === null}
            >
              <Check className="h-4 w-4 mr-2" />
              Submit Answer
            </Button>
          </>
        ) : (
          <Button
            variant="hero"
            className="w-full"
            onClick={session.handleNextQuestion}
          >
            {session.currentIndex < session.totalQuestions - 1 ? (
              <>
                Next Question
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                View Results
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
