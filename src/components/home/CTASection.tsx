import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-mathematics p-8 md:p-16 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 h-40 w-40 rounded-full border-2 border-white/50" />
            <div className="absolute bottom-10 right-10 h-60 w-60 rounded-full border-2 border-white/30" />
            <div className="absolute top-1/2 left-1/3 h-20 w-20 rounded-full border border-white/20" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 mb-6">
              <Sparkles className="h-4 w-4" />
              Start Your Journey Today
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Crack JEE & NEET?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of successful aspirants. Get personalized learning, 
              unlimited practice, and expert guidance – all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Create Free Account
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button 
                  size="xl" 
                  variant="outline"
                  className="border-2 border-white/30 text-white bg-white/10 hover:bg-white/20"
                >
                  Explore Features
                </Button>
              </Link>
            </div>

            <p className="text-white/60 text-sm mt-6">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
