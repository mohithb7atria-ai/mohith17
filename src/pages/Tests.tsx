import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ClipboardList, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Tests() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">Mock Tests</h1>
          <p className="text-muted-foreground">
            Generate AI-powered, NCERT-aligned mock tests for any chapter with a built-in countdown timer.
          </p>
        </div>

        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="p-8 flex flex-col items-center text-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ClipboardList className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">AI Mock Test Generator</h2>
              <p className="text-muted-foreground max-w-md">
                Choose exam, subject, chapter and question count. Get an original timed test with solutions.
              </p>
            </div>
            <Link to="/tests/generate">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" /> Generate AI Test
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
