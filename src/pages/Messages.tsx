import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  ArrowLeft,
  Send,
  MessageSquare,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages } from "@/hooks/useMessages";
import ThemeToggle from "@/components/ThemeToggle";
import { BeamsBackground } from "@/components/ui/beams-background";

const Messages = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const {
    conversations,
    messages,
    activeConversation,
    setActiveConversation,
    sendMessage,
    loading,
  } = useMessages();
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?mode=login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;
    setIsSending(true);
    const success = await sendMessage(newMessage);
    if (success) {
      setNewMessage("");
    }
    setIsSending(false);
  };

  const activeConv = conversations.find((c) => c.id === activeConversation);

  if (authLoading || loading) {
    return (
      <BeamsBackground intensity="subtle" className="bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </BeamsBackground>
    );
  }

  return (
    <BeamsBackground intensity="subtle" className="bg-background">
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Conversations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-14rem)]">
                {conversations.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No conversations yet</p>
                    <p className="text-sm">Start a conversation from a mentor's profile</p>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversation(conv.id)}
                      className={cn(
                        "w-full p-4 text-left border-b border-border hover:bg-secondary/50 transition-colors",
                        activeConversation === conv.id && "bg-secondary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold shrink-0">
                          {conv.other_user?.full_name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-foreground truncate">
                              {conv.other_user?.full_name || "User"}
                            </p>
                            {conv.unread_count && conv.unread_count > 0 && (
                              <Badge className="bg-primary text-primary-foreground text-xs">
                                {conv.unread_count}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.last_message || "No messages yet"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 flex flex-col">
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {activeConv?.other_user?.full_name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {activeConv?.other_user?.full_name || "User"}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-[calc(100vh-22rem)] p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex",
                            msg.sender_id === user?.id ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[70%] rounded-2xl px-4 py-2",
                              msg.sender_id === user?.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            )}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p
                              className={cn(
                                "text-xs mt-1",
                                msg.sender_id === user?.id
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              )}
                            >
                              {new Date(msg.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!newMessage.trim() || isSending}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a conversation</p>
                  <p className="text-sm">Choose a conversation from the list to start chatting</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </BeamsBackground>
  );
};

export default Messages;
