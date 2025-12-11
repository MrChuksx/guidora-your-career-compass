import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BeamsBackground } from "@/components/ui/beams-background";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Community Manager",
      department: "Operations",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
    },
  ];

  const benefits = [
    "Flexible remote work",
    "Competitive salary",
    "Health insurance",
    "Professional development budget",
    "Unlimited PTO",
    "Team retreats",
  ];

  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our <span className="text-primary">Mission</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us connect students with mentors and shape the future of career guidance.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-primary/5 text-center font-medium"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {openPositions.map((position, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" className="shrink-0">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </BeamsBackground>
  );
};

export default Careers;
