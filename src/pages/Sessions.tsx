import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useSessions } from "@/hooks/useSessions";
import ThemeToggle from "@/components/ThemeToggle";

const Sessions = () => {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { sessions, loading, updateSessionStatus } = useSessions();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?mode=login");
    }
  }, [user, authLoading, navigate]);

  const pendingSessions = sessions.filter((s) => s.status === "pending");
  const upcomingSessions = sessions.filter((s) => s.status === "confirmed");
  const pastSessions = sessions.filter((s) => s.status === "completed" || s.status === "cancelled");

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { className: string; icon: React.ReactNode }> = {
      pending: { className: "bg-yellow-500/10 text-yellow-600", icon: <AlertCircle className="h-3 w-3" /> },
      confirmed: { className: "bg-primary/10 text-primary", icon: <CheckCircle className="h-3 w-3" /> },
      completed: { className: "bg-green-500/10 text-green-600", icon: <CheckCircle className="h-3 w-3" /> },
      cancelled: { className: "bg-destructive/10 text-destructive", icon: <XCircle className="h-3 w-3" /> },
    };
    const variant = variants[status] || variants.pending;
    return (
      <Badge className={cn("flex items-center gap-1", variant.className)}>
        {variant.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const SessionCard = ({ session }: { session: typeof sessions[0] }) => {
    const isMentor = session.mentor_id === user?.id;
    const otherPersonName = isMentor ? session.student_name : session.mentor_name;

    return (
      <Card variant="interactive" className="overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">{session.topic}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                with {otherPersonName}
              </p>
            </div>
            {getStatusBadge(session.status)}
          </div>

          {session.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{session.description}</p>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(session.scheduled_date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {session.start_time.slice(0, 5)} - {session.end_time.slice(0, 5)}
            </span>
          </div>

          {/* Actions for mentors on pending sessions */}
          {isMentor && session.status === "pending" && (
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                size="sm"
                onClick={() => updateSessionStatus(session.id, "confirmed")}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Confirm
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateSessionStatus(session.id, "cancelled")}
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </div>
          )}

          {/* Complete/Cancel for confirmed sessions */}
          {session.status === "confirmed" && (
            <div className="flex gap-2 pt-4 border-t border-border">
              <Button
                size="sm"
                onClick={() => updateSessionStatus(session.id, "completed")}
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark Complete
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateSessionStatus(session.id, "cancelled")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/" className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Guidora</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Sessions</h1>
            <p className="text-muted-foreground">Manage your mentorship sessions</p>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingSessions.length > 0 && (
                  <Badge className="ml-2 bg-yellow-500 text-white text-xs">
                    {pendingSessions.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingSessions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No pending session requests</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {pendingSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="upcoming">
              {upcomingSessions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No upcoming sessions</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {upcomingSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastSessions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No past sessions</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {pastSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Sessions;
