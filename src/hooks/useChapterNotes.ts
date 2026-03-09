import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface NotesData {
  notes: string;
  subject: string;
  chapter: string;
}

export function useChapterNotes() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [notesData, setNotesData] = useState<NotesData | null>(null);

  const generateNotes = async (subject: string, chapter: string) => {
    setIsGenerating(true);
    setNotesData(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-notes", {
        body: { subject, chapter },
      });

      if (error) throw new Error(error.message || "Failed to generate notes");
      if (data?.error) throw new Error(data.error);

      setNotesData(data as NotesData);
      toast({ title: "Notes generated!", description: `${chapter} notes are ready.` });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to generate notes";
      toast({ title: "Generation failed", description: msg, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const resetNotes = () => setNotesData(null);

  return { isGenerating, notesData, generateNotes, resetNotes };
}
