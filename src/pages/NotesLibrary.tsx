import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Atom, FlaskConical, Calculator, Loader2 } from "lucide-react";
import heroImg from "@/assets/hero-marvel.jpg";

interface Note {
  id: string;
  subject: string;
  chapter: string;
  file_url: string;
  display_order: number;
}

const ICONS: Record<string, any> = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
};

export default function NotesLibrary() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("chapter_notes")
      .select("*")
      .order("subject")
      .order("display_order")
      .then(({ data }) => {
        setNotes((data as Note[]) || []);
        setLoading(false);
      });
  }, []);

  const grouped = notes.reduce<Record<string, Note[]>>((acc, n) => {
    (acc[n.subject] ||= []).push(n);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="container relative mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              <FileText className="h-3.5 w-3.5" /> Notes Vault
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-3">
              JEE <span className="gradient-text">Chapter Notes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Detailed NCERT-aligned notes — download instantly. Suit up, study smart.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([subject, items], si) => {
              const Icon = ICONS[subject] || FileText;
              return (
                <motion.section
                  key={subject}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: si * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold">{subject}</h2>
                      <p className="text-xs text-muted-foreground">
                        {items.length} chapters available
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((n, i) => (
                      <motion.div
                        key={n.id}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card className="group relative overflow-hidden border-border/60 hover:border-primary/60 transition-colors h-full">
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 transition-opacity" />
                          <CardContent className="relative p-5 flex flex-col h-full">
                            <div className="flex items-start gap-3 mb-4">
                              <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                <FileText className="h-5 w-5 text-accent" />
                              </div>
                              <h3 className="font-semibold leading-snug flex-1">
                                {n.chapter}
                              </h3>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              className="mt-auto gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                            >
                              <a href={n.file_url} target="_blank" rel="noreferrer" download>
                                <Download className="h-4 w-4" /> Download PDF
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              );
            })}
            {!notes.length && (
              <p className="text-center text-muted-foreground py-12">
                No notes available yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
