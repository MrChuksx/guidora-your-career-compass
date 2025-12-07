import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      avatar: "SC",
      rating: 5,
      text: "Guidora connected me with a senior software engineer who helped me land my dream internship at a top tech company. The personalized guidance was invaluable!",
    },
    {
      name: "Dr. James Okafor",
      role: "Senior Data Scientist & Mentor",
      avatar: "JO",
      rating: 5,
      text: "As a mentor, I love how Guidora makes it easy to share my knowledge with the next generation. The platform is intuitive and the students are motivated.",
    },
    {
      name: "Maria Rodriguez",
      role: "Business Administration Student",
      avatar: "MR",
      rating: 5,
      text: "The resource library and session booking features are fantastic. My mentor has helped me develop a clear career path in marketing.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Trusted by Students &{" "}
            <span className="text-gradient">Mentors Alike</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our community about how Guidora has transformed their learning and mentorship experiences.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              variant="elevated"
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 lg:p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
