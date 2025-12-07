import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GraduationCap,
  ArrowLeft,
  Send,
  Calendar,
  Clock,
  Star,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const mockConversations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "SJ",
    lastMessage: "That sounds great! Let's schedule a session for next week.",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    lastMessage: "I've uploaded some resources for you to review.",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Prof. Amara Osei",
    avatar: "AO",
    lastMessage: "Great progress on your project!",
    time: "3h ago",
    unread: 0,
    online: false,
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "mentor",
    text: "Hi John! How are you doing with your machine learning project?",
    time: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    sender: "user",
    text: "Hi Dr. Johnson! I've been making good progress. I finished implementing the neural network architecture we discussed.",
    time: "10:32 AM",
    read: true,
  },
  {
    id: 3,
    sender: "mentor",
    text: "That's excellent! What challenges did you face during implementation?",
    time: "10:35 AM",
    read: true,
  },
  {
    id: 4,
    sender: "user",
    text: "The main challenge was optimizing the training process. The model was taking too long to converge.",
    time: "10:38 AM",
    read: true,
  },
  {
    id: 5,
    sender: "mentor",
    text: "I see. There are several techniques we can use to speed that up. Would you like to schedule a session to go through optimization strategies?",
    time: "10:40 AM",
    read: true,
  },
  {
    id: 6,
    sender: "user",
    text: "That would be really helpful! When are you available?",
    time: "10:42 AM",
    read: true,
  },
  {
    id: 7,
    sender: "mentor",
    text: "That sounds great! Let's schedule a session for next week. I have openings on Tuesday and Thursday afternoon.",
    time: "10:45 AM",
    read: false,
  },
];

const Connection = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">Back to Dashboard</span>
              </Link>
            </div>
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Guidora</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-[calc(100vh-10rem)] grid lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card variant="default" className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full">
                <div className="px-4 pb-4 space-y-2">
                  {mockConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={cn(
                        "w-full p-4 rounded-xl text-left transition-all flex items-start gap-3",
                        selectedConversation.id === conversation.id
                          ? "bg-secondary shadow-soft"
                          : "hover:bg-secondary/50"
                      )}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                          {conversation.avatar}
                        </div>
                        {conversation.online && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground truncate">{conversation.name}</h3>
                          <span className="text-xs text-muted-foreground shrink-0">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-accent text-accent-foreground shrink-0">
                          {conversation.unread}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card variant="default" className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {selectedConversation.avatar}
                  </div>
                  {selectedConversation.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{selectedConversation.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Calendar className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[70%] p-4 rounded-2xl",
                        message.sender === "user"
                          ? "bg-gradient-primary text-primary-foreground rounded-br-sm"
                          : "bg-secondary text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div
                        className={cn(
                          "flex items-center justify-end gap-1 mt-2 text-xs",
                          message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}
                      >
                        <span>{message.time}</span>
                        {message.sender === "user" && (
                          message.read ? (
                            <CheckCheck className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  variant="hero"
                  size="icon"
                  onClick={handleSendMessage}
                  className="shrink-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Card */}
        <Card variant="gradient" className="mt-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Ready for your next session?</h3>
                  <p className="text-sm text-muted-foreground">
                    Book a session with {selectedConversation.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="gap-2">
                  <Clock className="h-4 w-4" />
                  View Availability
                </Button>
                <Button variant="hero" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Book Session
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Connection;
