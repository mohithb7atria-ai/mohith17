import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface PracticeTimerProps {
  formattedTime: string;
  seconds: number;
  totalSeconds: number;
}

export function PracticeTimer({ formattedTime, seconds, totalSeconds }: PracticeTimerProps) {
  const percentage = (seconds / totalSeconds) * 100;
  const isLow = percentage <= 20;
  const isCritical = percentage <= 10;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg font-bold transition-colors",
        isCritical && "bg-destructive text-destructive-foreground animate-pulse",
        isLow && !isCritical && "bg-warning text-warning-foreground",
        !isLow && "bg-secondary text-secondary-foreground"
      )}
    >
      <Clock className="h-5 w-5" />
      <span>{formattedTime}</span>
    </div>
  );
}
