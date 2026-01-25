import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Trophy, Brain } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-mathematics/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Trusted by 50,000+ JEE & NEET Aspirants
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl animate-slide-up">
            Crack{" "}
            <span className="gradient-text">JEE & NEET</span>
            {" "}with AI-Powered Learning
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Master Physics, Chemistry, Mathematics & Biology with personalized practice, 
            instant doubt solving, and smart analytics designed for NCERT & NTA syllabus.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/learn">
              <Button variant="hero" size="xl" className="gap-2">
                Start Learning Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/doubt-solver">
              <Button variant="hero-outline" size="xl" className="gap-2">
                <Brain className="h-5 w-5" />
                Try AI Doubt Solver
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <StatItem icon={Target} value="10,000+" label="Practice Questions" />
            <StatItem icon={Brain} value="24/7" label="AI Support" />
            <StatItem icon={Trophy} value="95%" label="Success Rate" />
            <StatItem icon={Sparkles} value="500+" label="Video Lessons" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
