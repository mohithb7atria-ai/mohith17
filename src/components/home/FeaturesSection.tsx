import { 
  Brain, 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar, 
  FileText,
  Zap,
  BarChart3,
  RefreshCw,
  MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "AI Doubt Solver",
    description: "Get instant step-by-step solutions with formula explanations. Upload images or type your questions.",
    color: "from-primary to-primary/80",
  },
  {
    icon: Target,
    title: "Topic-wise Practice",
    description: "Practice MCQs chapter-wise with difficulty levels. JEE Main, Advanced & NEET patterns.",
    color: "from-accent to-accent/80",
  },
  {
    icon: Clock,
    title: "Daily Practice Questions",
    description: "Fresh set of questions daily across subjects. Build consistency with streak tracking.",
    color: "from-success to-success/80",
  },
  {
    icon: FileText,
    title: "Mock Tests & PYQs",
    description: "Full-length mocks with real exam simulation. 10+ years of previous year questions.",
    color: "from-mathematics to-mathematics/80",
  },
  {
    icon: TrendingUp,
    title: "Weakness Analyzer",
    description: "AI identifies your weak topics and suggests focused revision strategies.",
    color: "from-destructive to-destructive/80",
  },
  {
    icon: RefreshCw,
    title: "Smart Revision",
    description: "Formula sheets, one-page summaries, and mistake-based revision mode.",
    color: "from-biology to-biology/80",
  },
  {
    icon: Calendar,
    title: "Study Planner",
    description: "AI-generated personalized timetables with exam countdown and reminders.",
    color: "from-physics to-physics/80",
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track progress, accuracy, time per question, and compare with toppers.",
    color: "from-chemistry to-chemistry/80",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm font-medium text-accent mb-4">
            <Zap className="h-4 w-4" />
            Supercharge Your Preparation
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From concept learning to exam day, we've got every aspect of your preparation covered
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={cn(
                  "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                  feature.color
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
