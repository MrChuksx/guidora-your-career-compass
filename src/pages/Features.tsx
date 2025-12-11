import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BeamsBackground } from "@/components/ui/beams-background";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Search, 
  Star, 
  Clock, 
  Shield, 
  Zap,
  BookOpen,
  Bell
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our intelligent algorithm connects you with mentors based on your goals, interests, and expertise areas.",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book sessions with mentors based on their availability. Manage your calendar effortlessly.",
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: MessageSquare,
      title: "Direct Messaging",
      description: "Communicate directly with your mentors through our built-in messaging system.",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      icon: Users,
      title: "Expert Mentors",
      description: "Access a diverse network of experienced professionals across various industries.",
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Make informed decisions with mentor ratings and reviews from other students.",
      color: "bg-yellow-500/10 text-yellow-500",
    },
    {
      icon: Clock,
      title: "Flexible Sessions",
      description: "Choose from various session lengths and formats that fit your schedule.",
      color: "bg-pink-500/10 text-pink-500",
    },
    {
      icon: BookOpen,
      title: "Resource Library",
      description: "Access educational materials and resources shared by mentors.",
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Stay updated with session reminders and important messages.",
      color: "bg-red-500/10 text-red-500",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data and conversations are protected with enterprise-grade security.",
      color: "bg-teal-500/10 text-teal-500",
    },
  ];

  const forStudents = [
    "Browse mentors by expertise and industry",
    "Book sessions based on mentor availability",
    "Track your mentorship progress",
    "Rate and review your sessions",
    "Access shared resources and materials",
  ];

  const forMentors = [
    "Set your own availability schedule",
    "Manage incoming session requests",
    "Share educational materials",
    "Build your professional network",
    "Track your mentorship impact",
  ];

  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Platform Features
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Everything you need to connect, learn, and grow with expert mentors in your field.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`p-3 rounded-lg w-fit mb-4 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* For Students & Mentors */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* For Students */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">For Students</h2>
              </div>
              <ul className="space-y-4">
                {forStudents.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" asChild>
                <Link to="/auth?mode=signup">Find a Mentor</Link>
              </Button>
            </div>

            {/* For Mentors */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">For Mentors</h2>
              </div>
              <ul className="space-y-4">
                {forMentors.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="mt-6 w-full" asChild>
                <Link to="/auth?mode=signup">Become a Mentor</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-gradient-primary rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Join Guidora today and take the next step in your career journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/auth?mode=signup">Create Account</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </BeamsBackground>
  );
};

export default Features;
