import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  LogOut,
  Clock,
  Users,
  Menu,
  X,
  Home,
  Info,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useSessions } from "@/hooks/useSessions";
import { useMessages } from "@/hooks/useMessages";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";
import { BookSessionDialog } from "@/components/BookSessionDialog";
import { BeamsBackground } from "@/components/ui/beams-background";

interface Mentor {
  id: string;
  user_id: string;
  full_name: string;
  bio: string | null;
  skills: string[] | null;
  avatar: string;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, role, signOut, loading } = useAuth();
  const { sessions } = useSessions();
  const { conversations, startConversation } = useMessages();
  const navigate = useNavigate();
  const location = useLocation();

  const fields = ["All", "Technology", "Business", "Science", "Agriculture"];

  // Fetch mentors from database
  useEffect(() => {
    const fetchMentors = async () => {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "mentor");

      if (roleData && roleData.length > 0) {
        const mentorIds = roleData.map((r) => r.user_id);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .in("user_id", mentorIds);

        if (profileData) {
          setMentors(
            profileData.map((p) => ({
              id: p.id,
              user_id: p.user_id,
              full_name: p.full_name || "Mentor",
              bio: p.bio,
              skills: p.skills,
              avatar: p.full_name
                ? p.full_name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "M",
            }))
          );
        }
      }
      setLoadingMentors(false);
    };

    fetchMentors();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth?mode=login");
    }
  }, [user, loading, navigate]);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (mentor.skills || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const unreadCount = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0);
  const upcomingSessions = sessions.filter((s) => s.status === "confirmed" || s.status === "pending");
  const pendingCount = sessions.filter((s) => s.status === "pending").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isActivePath = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: Users },
    { name: "Sessions", path: "/sessions", icon: Calendar, badge: pendingCount },
    { name: "Messages", path: "/messages", icon: MessageSquare, badge: unreadCount },
    ...(role === "mentor" ? [{ name: "Availability", path: "/availability", icon: Clock }] : []),
    { name: "Profile", path: "/profile", icon: User },
    { name: "About", path: "/about", icon: Info },
    { name: "Features", path: "/features", icon: Sparkles },
  ];

  return (
    <BeamsBackground intensity="subtle" className="bg-background">
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
              <div className="p-2 rounded-lg bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Guidora</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                  isActivePath(item.path)
                    ? "bg-secondary text-secondary-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {item.badge && item.badge > 0 && (
                  <Badge className="ml-auto bg-primary text-primary-foreground text-xs">{item.badge}</Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <button
            onClick={() => { handleSignOut(); setSidebarOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {role === "mentor" ? "Student Requests" : "Find Your Mentor"}
                </h1>
                <p className="text-muted-foreground hidden sm:block">
                  {role === "mentor" ? "Manage your mentorship requests" : "Browse and connect with expert mentors"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/sessions" className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                {pendingCount > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full" />
                )}
              </Link>
              <Link to="/profile" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {getUserInitials()}
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
                    placeholder="Search mentors by name or skills..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Mentors Grid */}
              {loadingMentors ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              ) : filteredMentors.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-lg font-medium text-foreground mb-2">No mentors found</p>
                    <p className="text-muted-foreground">
                      {mentors.length === 0
                        ? "No mentors have signed up yet. Check back later!"
                        : "Try adjusting your search query"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredMentors.map((mentor) => (
                    <Card key={mentor.id} variant="interactive" className="group">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg shrink-0">
                            {mentor.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate mb-2">{mentor.full_name}</h3>
                            {mentor.skills && mentor.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {mentor.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                                {mentor.skills.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{mentor.skills.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                            {mentor.bio && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                          <BookSessionDialog mentorId={mentor.user_id} mentorName={mentor.full_name}>
                            <Button variant="hero" size="sm" className="flex-1">
                              <Calendar className="h-4 w-4 mr-2" />
                              Book Session
                            </Button>
                          </BookSessionDialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              await startConversation(mentor.user_id);
                              navigate("/messages");
                            }}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* User Info Card */}
              <Card variant="elevated">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{profile?.full_name || "User"}</p>
                      <Badge variant="secondary" className="capitalize mt-1">
                        {role || "student"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link to="/profile">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

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
                  {upcomingSessions.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming sessions</p>
                  ) : (
                    upcomingSessions.slice(0, 3).map((session) => (
                      <div
                        key={session.id}
                        className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:shadow-soft transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-medium text-foreground">{session.topic}</p>
                          <Badge
                            className={cn(
                              "text-xs",
                              session.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600"
                                : "bg-primary/10 text-primary"
                            )}
                          >
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          with {role === "mentor" ? session.student_name : session.mentor_name}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(session.scheduled_date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {session.start_time.slice(0, 5)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                  <Link to="/sessions">
                    <Button variant="outline" className="w-full">
                      View All Sessions
                    </Button>
                  </Link>
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
                      <p className="text-2xl font-bold text-foreground">
                        {sessions.filter((s) => s.status === "completed").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Sessions</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <p className="text-2xl font-bold text-foreground">{conversations.length}</p>
                      <p className="text-sm text-muted-foreground">Conversations</p>
                    </div>
                    <Link to="/sessions" className="text-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                      <p className="text-2xl font-bold text-foreground">{upcomingSessions.length}</p>
                      <p className="text-sm text-muted-foreground">Upcoming</p>
                    </Link>
                    <Link to="/messages" className="text-center p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                      <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
                      <p className="text-sm text-muted-foreground">Unread</p>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </BeamsBackground>
  );
};

export default Dashboard;
