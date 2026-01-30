import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ExplanationCardProps {
  explanation: string | null;
  isCorrect: boolean;
}

export function ExplanationCard({ explanation, isCorrect }: ExplanationCardProps) {
  return (
    <Card className={`border-0 shadow-md ${isCorrect ? "bg-success/5" : "bg-destructive/5"}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Lightbulb className={`h-5 w-5 ${isCorrect ? "text-success" : "text-destructive"}`} />
          <span className={isCorrect ? "text-success" : "text-destructive"}>
            {isCorrect ? "Correct!" : "Incorrect"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {explanation ? (
          <p className="text-muted-foreground leading-relaxed">{explanation}</p>
        ) : (
          <p className="text-muted-foreground italic">No explanation available for this question.</p>
        )}
      </CardContent>
    </Card>
  );
}
