import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, MessageSquare, Calendar, CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNotifications, Notification } from "@/hooks/useNotifications";

const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
  switch (type) {
    case "session_request":
    case "session_confirmed":
    case "session_cancelled":
      return <Calendar className="h-4 w-4" />;
    case "new_message":
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const NotificationsDropdown = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();
  const [open, setOpen] = useState(false);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-accent-foreground text-xs font-medium rounded-full px-1">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs gap-1"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <Link
                key={notification.id}
                to={notification.link || "#"}
                onClick={() => {
                  markAsRead(notification.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-start gap-3 p-4 border-b border-border hover:bg-secondary/50 transition-colors",
                  !notification.read && "bg-primary/5"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg shrink-0",
                    notification.type === "session_request"
                      ? "bg-yellow-500/10 text-yellow-600"
                      : notification.type === "session_confirmed"
                      ? "bg-green-500/10 text-green-600"
                      : notification.type === "new_message"
                      ? "bg-blue-500/10 text-blue-600"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(notification.created_at)}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-3 border-t border-border">
            <Link to="/sessions" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </Link>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
