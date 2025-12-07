import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Star, 
  Shield 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our AI-powered algorithm matches you with mentors based on your goals, interests, and learning style.",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book sessions at times that work for both you and your mentor with our integrated calendar.",
    },
    {
      icon: MessageSquare,
      title: "Direct Messaging",
      description: "Stay connected with your mentor through our secure messaging system for ongoing guidance.",
    },
    {
      icon: FileText,
      title: "Learning Resources",
      description: "Access curated materials, guides, and resources uploaded by experienced mentors.",
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Read authentic reviews from students to find the perfect mentor for your needs.",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and conversations are protected with enterprise-grade security.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Guidora provides all the tools students and mentors need for meaningful, 
            productive mentorship relationships.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              variant="gradient"
              className="group hover:shadow-glow transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 lg:p-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
