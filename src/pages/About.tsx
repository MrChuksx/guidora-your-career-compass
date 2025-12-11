import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Lightbulb } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beams-background";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in the power of mentorship and community to transform careers and lives.",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Every connection on our platform is designed to help you achieve your career objectives.",
    },
    {
      icon: Heart,
      title: "Passion for Growth",
      description: "We're passionate about helping individuals grow and reach their full potential.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously improve our platform to provide the best mentorship experience.",
    },
  ];

  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Guidora
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Guidora is a career mentorship matchmaking platform connecting students with skilled mentors 
              across technology, science, business, agriculture, and other fields. We bridge the gap between 
              academic learning and practical career readiness through structured mentorship.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg">
                Our mission is to solve the problem of students lacking career direction, structured guidance, 
                and networking opportunities. We connect aspiring professionals with experienced mentors who 
                can provide valuable insights, guidance, and support on their career journey.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Create Your Profile</h3>
                  <p className="text-muted-foreground">Sign up and tell us about your goals, interests, and expertise.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Find Your Match</h3>
                  <p className="text-muted-foreground">Browse mentors in your field or let our smart matching connect you.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Book Sessions</h3>
                  <p className="text-muted-foreground">Schedule mentorship sessions at times that work for both of you.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Grow Together</h3>
                  <p className="text-muted-foreground">Learn, network, and achieve your career goals with expert guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-primary rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Join thousands of students and mentors already connecting on Guidora.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/auth?mode=signup">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </BeamsBackground>
  );
};

export default About;
