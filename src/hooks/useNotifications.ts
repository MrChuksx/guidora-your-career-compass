import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Notification {
  id: string;
  type: "session_request" | "session_confirmed" | "session_cancelled" | "new_message";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
  related_id?: string;
}

export const useNotifications = () => {
  const { user, role } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const notifs: Notification[] = [];

    // Fetch pending session requests (for mentors) or confirmations (for students)
    const { data: sessions } = await supabase
      .from("sessions")
      .select("*")
      .or(`mentor_id.eq.${user.id},student_id.eq.${user.id}`)
      .order("created_at", { ascending: false })
      .limit(10);

    if (sessions) {
      for (const session of sessions) {
        // For mentors: show pending requests from students
        if (role === "mentor" && session.mentor_id === user.id && session.status === "pending") {
          // Get student name
          const { data: studentProfile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("user_id", session.student_id)
            .single();

          notifs.push({
            id: `session-${session.id}`,
            type: "session_request",
            title: "New Session Request",
            message: `${studentProfile?.full_name || "A student"} requested a session on "${session.topic}"`,
            read: false,
            created_at: session.created_at,
            link: "/sessions",
            related_id: session.id,
          });
        }

        // For students: show confirmed sessions
        if (session.student_id === user.id && session.status === "confirmed") {
          const { data: mentorProfile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("user_id", session.mentor_id)
            .single();

          // Only show if confirmed within last 7 days
          const confirmedDate = new Date(session.updated_at);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          
          if (confirmedDate > weekAgo) {
            notifs.push({
              id: `session-confirmed-${session.id}`,
              type: "session_confirmed",
              title: "Session Confirmed",
              message: `${mentorProfile?.full_name || "Your mentor"} confirmed your session on "${session.topic}"`,
              read: false,
              created_at: session.updated_at,
              link: "/sessions",
              related_id: session.id,
            });
          }
        }
      }
    }

    // Fetch unread messages
    const { data: conversations } = await supabase
      .from("conversations")
      .select("*")
      .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`);

    if (conversations) {
      for (const conv of conversations) {
        const { count } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("conversation_id", conv.id)
          .eq("is_read", false)
          .neq("sender_id", user.id);

        if (count && count > 0) {
          const otherUserId = conv.participant_1 === user.id ? conv.participant_2 : conv.participant_1;
          const { data: otherProfile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("user_id", otherUserId)
            .single();

          notifs.push({
            id: `message-${conv.id}`,
            type: "new_message",
            title: "New Message",
            message: `You have ${count} unread message${count > 1 ? "s" : ""} from ${otherProfile?.full_name || "someone"}`,
            read: false,
            created_at: conv.last_message_at || conv.created_at,
            link: "/messages",
            related_id: conv.id,
          });
        }
      }
    }

    // Sort by date
    notifs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setNotifications(notifs);
    setLoading(false);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    fetchNotifications();
  }, [user, role]);

  return {
    notifications,
    loading,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh: fetchNotifications,
  };
};
