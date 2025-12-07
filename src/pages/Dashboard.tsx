import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Search,
  Calendar,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Star,
  Clock,
  BookOpen,
  Users,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const mockMentors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "SJ",
    expertise: ["Machine Learning", "Data Science", "Python"],
    rating: 4.9,
    sessions: 156,
    field: "Technology",
    bio: "Senior Data Scientist at Google with 10+ years of experience.",
    availability: "Available",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    expertise: ["Business Strategy", "Entrepreneurship", "Marketing"],
    rating: 4.8,
    sessions: 89,
    field: "Business",
    bio: "Founder & CEO of two successful startups. Harvard MBA.",
    availability: "Available",
  },
  {
    id: 3,
    name: "Prof. Amara Osei",
    avatar: "AO",
    expertise: ["Agricultural Technology", "Sustainable Farming"],
    rating: 4.7,
    sessions: 67,
    field: "Agriculture",
    bio: "Professor of Agricultural Sciences with a focus on sustainable practices.",
    availability: "Busy",
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "DK",
    expertise: ["React", "Node.js", "System Design"],
    rating: 4.9,
    sessions: 203,
    field: "Technology",
    bio: "Staff Engineer at Meta. Open source contributor.",
    availability: "Available",
  },
];

const mockUpcomingSessions = [
  {
    id: 1,
    mentorName: "Dr. Sarah Johnson",
    topic: "Career Path in Data Science",
    date: "Dec 10, 2024",
    time: "3:00 PM",
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    topic: "Building Your First Startup",
    date: "Dec 12, 2024",
    time: "5:00 PM",
  },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fields = ["All", "Technology", "Business", "Science", "Agriculture"];

  const filteredMentors = mockMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesField = !selectedField || selectedField === "All" || mentor.field === selectedField;
    return matchesSearch && matchesField;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border hidden lg:block">
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Guidora</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium"
            >
              <Users className="h-5 w-5" />
              Browse Mentors
            </Link>
            <Link
              to="/dashboard/sessions"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Calendar className="h-5 w-5" />
              My Sessions
            </Link>
            <Link
              to="/dashboard/messages"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              Messages
              <Badge className="ml-auto bg-accent text-accent-foreground text-xs">3</Badge>
            </Link>
            <Link
              to="/dashboard/resources"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              Resources
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full">
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Find Your Mentor</h1>
              <p className="text-muted-foreground">Browse and connect with expert mentors</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
              </button>
              <Link to="/profile" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  JD
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search & Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search mentors by name or expertise..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {/* Field Tags */}
              <div className="flex flex-wrap gap-2">
                {fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => setSelectedField(field === "All" ? null : field)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      selectedField === field || (field === "All" && !selectedField)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {field}
                  </button>
                ))}
              </div>

              {/* Mentors Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredMentors.map((mentor) => (
                  <Card key={mentor.id} variant="interactive" className="group">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg shrink-0">
                          {mentor.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground truncate">{mentor.name}</h3>
                            <Badge
                              variant={mentor.availability === "Available" ? "default" : "secondary"}
                              className={cn(
                                "text-xs shrink-0",
                                mentor.availability === "Available"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                              )}
                            >
                              {mentor.availability}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{mentor.field}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-accent fill-accent" />
                              {mentor.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {mentor.sessions} sessions
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {mentor.expertise.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{mentor.expertise.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                        <p className="text-sm text-muted-foreground line-clamp-1">{mentor.bio}</p>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Sessions */}
              <Card variant="gradient">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your scheduled mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockUpcomingSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:shadow-soft transition-shadow"
                    >
                      <p className="font-medium text-foreground mb-1">{session.topic}</p>
                      <p className="text-sm text-muted-foreground mb-2">with {session.mentorName}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Sessions
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card variant="gradient">
                <CardHeader>
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Sessions</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">4</p>
                      <p className="text-sm text-muted-foreground">Mentors</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">8</p>
                      <p className="text-sm text-muted-foreground">Resources</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">15h</p>
                      <p className="text-sm text-muted-foreground">Learning</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
