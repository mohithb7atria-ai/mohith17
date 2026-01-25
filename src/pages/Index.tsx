import { HeroSection } from "@/components/home/HeroSection";
import { ExamSelector } from "@/components/home/ExamSelector";
import { SubjectCards } from "@/components/home/SubjectCards";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ExamSelector />
      <SubjectCards />
      <FeaturesSection />
      <CTASection />
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold">
                <span className="text-primary">Prep</span>
                <span className="text-accent">Master</span>
              </span>
              <span className="text-muted-foreground text-sm">
                © 2024 All rights reserved
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
