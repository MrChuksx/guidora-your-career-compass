import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BeamsBackground } from "@/components/ui/beams-background";

const Blog = () => {
  const posts = [
    {
      title: "How to Find the Right Mentor for Your Career",
      excerpt: "Discover the key factors to consider when choosing a mentor who can guide your professional journey.",
      category: "Career Tips",
      author: "Sarah Johnson",
      date: "Dec 5, 2025",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
    },
    {
      title: "5 Questions to Ask Your Mentor in Your First Session",
      excerpt: "Make the most of your mentorship by asking these essential questions from the start.",
      category: "Mentorship",
      author: "Michael Chen",
      date: "Dec 3, 2025",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    },
    {
      title: "The Benefits of Industry-Specific Mentorship",
      excerpt: "Learn why having a mentor in your specific field can accelerate your career growth.",
      category: "Industry Insights",
      author: "Emily Davis",
      date: "Nov 28, 2025",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
    },
    {
      title: "Building a Successful Mentor-Mentee Relationship",
      excerpt: "Tips for creating a productive and lasting mentorship connection.",
      category: "Career Tips",
      author: "David Wilson",
      date: "Nov 25, 2025",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400",
    },
  ];

  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Guidora <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and stories about mentorship and career development.
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {posts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </span>
                      </div>
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

export default Blog;
