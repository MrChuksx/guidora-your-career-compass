import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up as a student or mentor and build your profile showcasing your goals, interests, and expertise.",
      color: "from-primary/20 to-primary/5",
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our smart algorithm connects you with the best mentors or students based on shared interests and goals.",
      color: "from-accent/20 to-accent/5",
    },
    {
      number: "03",
      title: "Book Sessions",
      description: "Schedule mentorship sessions at convenient times and connect through our platform.",
      color: "from-primary/20 to-primary/5",
    },
    {
      number: "04",
      title: "Grow Together",
      description: "Learn, share resources, and build a lasting mentorship relationship that accelerates your career.",
      color: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start Your Mentorship Journey{" "}
            <span className="text-gradient">in 4 Easy Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're a student seeking guidance or a mentor ready to share your expertise, 
            getting started is simple.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-12 last:mb-0 animate-fade-in-up ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Number Circle */}
                <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground font-bold text-lg shadow-glow">
                  {step.number}
                </div>

                {/* Content Card */}
                <div
                  className={`ml-24 lg:ml-0 lg:w-[calc(50%-3rem)] p-6 rounded-2xl bg-gradient-to-br ${step.color} border border-border/50 shadow-soft ${
                    index % 2 === 0 ? "lg:mr-auto lg:text-right" : "lg:ml-auto lg:text-left"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="xl" asChild>
            <Link to="/auth?mode=signup">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
