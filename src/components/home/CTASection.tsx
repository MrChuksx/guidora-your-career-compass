import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-background/20 mb-8">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-background">
              Start your journey today
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-background mb-6">
            Ready to Transform Your Career?
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-background/70 max-w-2xl mx-auto mb-10">
            Join thousands of students and mentors who are already building 
            meaningful connections and accelerating their professional growth.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="accent" 
              size="xl" 
              asChild
            >
              <Link to="/auth?mode=signup&role=student">
                Find a Mentor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="xl" 
              className="bg-background/10 text-background border border-background/20 hover:bg-background/20"
              asChild
            >
              <Link to="/auth?mode=signup&role=mentor">
                Share Your Expertise
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <p className="mt-10 text-sm text-background/50">
            Free to get started • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
