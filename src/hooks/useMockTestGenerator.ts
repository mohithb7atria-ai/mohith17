import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface MockTestQuestion {
  id: number;
  difficulty: string;
  bloom_level: string;
  concept_tags: string[];
  type: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correct_answer: string;
  solution?: string;
}

interface MockTestMeta {
  exam: string;
  subject: string;
  chapter: string;
  total_questions: number;
  estimated_time_minutes: number;
}

interface MockTestData {
  meta: MockTestMeta;
  questions: MockTestQuestion[];
}

interface MockTestConfig {
  exam: string;
  subject: string;
  chapter: string;
  numQuestions: number;
  includeSolutions: boolean;
}

export function useMockTestGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [testData, setTestData] = useState<MockTestData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateTest = async (config: MockTestConfig) => {
    setIsGenerating(true);
    setError(null);
    setTestData(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-mock-test", {
        body: {
          exam: config.exam,
          subject: config.subject,
          chapter: config.chapter,
          num_questions: config.numQuestions,
          include_solutions: config.includeSolutions,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || "Failed to generate test");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setTestData(data as MockTestData);
      toast({ title: "Mock test generated!", description: `${data.meta.total_questions} questions ready.` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to generate test";
      setError(msg);
      toast({ title: "Generation failed", description: msg, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetTest = () => {
    setTestData(null);
    setError(null);
  };

  return { isGenerating, testData, error, generateTest, resetTest };
}

export type { MockTestData, MockTestQuestion, MockTestMeta, MockTestConfig };
