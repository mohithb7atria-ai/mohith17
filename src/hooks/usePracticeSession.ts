import { useState, useCallback, useMemo } from "react";

export interface PracticeQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number;
  explanation: string | null;
  difficulty: string | null;
  chapter_name?: string;
  subject_name?: string;
  question_image_url?: string | null;
}

export interface AnswerRecord {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean;
  timeTaken: number;
}

interface UsePracticeSessionProps {
  questions: PracticeQuestion[];
  timePerQuestion?: number;
}

export function usePracticeSession({
  questions,
  timePerQuestion = 60,
}: UsePracticeSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex] || null;
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = useCallback((optionIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optionIndex);
  }, [showFeedback]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedOption === null || !currentQuestion) return;

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = selectedOption === currentQuestion.correct_option;

    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect,
      timeTaken,
    };

    setAnswers((prev) => [...prev, record]);
    setShowFeedback(true);
  }, [selectedOption, currentQuestion, questionStartTime]);

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setQuestionStartTime(Date.now());
    } else {
      setSessionComplete(true);
    }
  }, [currentIndex, totalQuestions]);

  const handleSkipQuestion = useCallback(() => {
    if (!currentQuestion) return;

    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    
    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      selectedOption: null,
      isCorrect: false,
      timeTaken,
    };

    setAnswers((prev) => [...prev, record]);
    handleNextQuestion();
  }, [currentQuestion, questionStartTime, handleNextQuestion]);

  const handleTimeUp = useCallback(() => {
    if (showFeedback) return;
    
    if (selectedOption !== null) {
      handleSubmitAnswer();
    } else {
      handleSkipQuestion();
    }
  }, [showFeedback, selectedOption, handleSubmitAnswer, handleSkipQuestion]);

  const stats = useMemo(() => {
    const attempted = answers.filter((a) => a.selectedOption !== null).length;
    const correct = answers.filter((a) => a.isCorrect).length;
    const skipped = answers.filter((a) => a.selectedOption === null).length;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const totalTime = answers.reduce((sum, a) => sum + a.timeTaken, 0);
    const avgTime = answers.length > 0 ? Math.round(totalTime / answers.length) : 0;

    return {
      attempted,
      correct,
      skipped,
      accuracy,
      totalTime,
      avgTime,
    };
  }, [answers]);

  const resetSession = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setAnswers([]);
    setSessionComplete(false);
    setQuestionStartTime(Date.now());
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    progress,
    selectedOption,
    showFeedback,
    sessionComplete,
    answers,
    stats,
    handleSelectOption,
    handleSubmitAnswer,
    handleNextQuestion,
    handleSkipQuestion,
    handleTimeUp,
    resetSession,
    timePerQuestion,
  };
}
