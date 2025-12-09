import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  mentor_id: string;
  student_id: string;
  topic: string;
  description: string | null;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
  mentor_name?: string;
  student_name?: string;
}

export const useSessions = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .or(`mentor_id.eq.${user.id},student_id.eq.${user.id}`)
      .order("scheduled_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching sessions:", error);
      setLoading(false);
      return;
    }

    // Fetch profile names
    const sessionsWithNames = await Promise.all(
      (data || []).map(async (session) => {
        const { data: mentorProfile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", session.mentor_id)
          .maybeSingle();

        const { data: studentProfile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", session.student_id)
          .maybeSingle();

        return {
          ...session,
          status: session.status as Session["status"],
          mentor_name: mentorProfile?.full_name || "Mentor",
          student_name: studentProfile?.full_name || "Student",
        };
      })
    );

    setSessions(sessionsWithNames as Session[]);
    setLoading(false);
  };

  const bookSession = async (sessionData: {
    mentor_id: string;
    topic: string;
    description?: string;
    scheduled_date: string;
    start_time: string;
    end_time: string;
  }) => {
    if (!user) return false;

    const { error } = await supabase.from("sessions").insert({
      ...sessionData,
      student_id: user.id,
      status: "pending",
    });

    if (error) {
      console.error("Error booking session:", error);
      toast({
        title: "Error",
        description: "Failed to book session",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Session Requested",
      description: "Your session request has been sent to the mentor",
    });
    await fetchSessions();
    return true;
  };

  const updateSessionStatus = async (sessionId: string, status: Session["status"]) => {
    const { error } = await supabase
      .from("sessions")
      .update({ status })
      .eq("id", sessionId);

    if (error) {
      console.error("Error updating session:", error);
      toast({
        title: "Error",
        description: "Failed to update session",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: `Session ${status}`,
    });
    await fetchSessions();
    return true;
  };

  useEffect(() => {
    fetchSessions();
  }, [user]);

  return {
    sessions,
    loading,
    bookSession,
    updateSessionStatus,
    fetchSessions,
  };
};
