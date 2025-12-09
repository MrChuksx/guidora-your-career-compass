import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  ArrowLeft,
  Clock,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAvailability } from "@/hooks/useAvailability";
import ThemeToggle from "@/components/ThemeToggle";

const Availability = () => {
  const { user, role, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { slots, loading, addSlot, removeSlot, DAYS } = useAvailability();
  
  const [newSlot, setNewSlot] = useState({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "10:00",
    is_recurring: true,
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth?mode=login");
    }
    if (!authLoading && role !== "mentor") {
      navigate("/dashboard");
    }
  }, [user, role, authLoading, navigate]);

  const handleAddSlot = async () => {
    if (newSlot.start_time >= newSlot.end_time) {
      return;
    }
    setIsAdding(true);
    await addSlot({
      day_of_week: newSlot.day_of_week,
      start_time: newSlot.start_time,
      end_time: newSlot.end_time,
      is_recurring: newSlot.is_recurring,
      specific_date: null,
    });
    setIsAdding(false);
  };

  // Group slots by day
  const slotsByDay = DAYS.map((day, index) => ({
    day,
    dayIndex: index,
    slots: slots.filter((s) => s.day_of_week === index),
  }));

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Manage Availability</h1>
            <p className="text-muted-foreground">Set your available time slots for mentorship sessions</p>
          </div>

          {/* Add New Slot */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Add Time Slot
              </CardTitle>
              <CardDescription>Add a recurring weekly time slot for sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Day</Label>
                  <Select
                    value={newSlot.day_of_week.toString()}
                    onValueChange={(v) => setNewSlot({ ...newSlot, day_of_week: parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS.map((day, index) => (
                        <SelectItem key={day} value={index.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={newSlot.start_time}
                    onChange={(e) => setNewSlot({ ...newSlot, start_time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={newSlot.end_time}
                    onChange={(e) => setNewSlot({ ...newSlot, end_time: e.target.value })}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleAddSlot} disabled={isAdding} className="w-full">
                    {isAdding ? (
                      <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Slot
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Your current availability for each day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {slotsByDay.map(({ day, dayIndex, slots: daySlots }) => (
                  <div
                    key={day}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="sm:w-28 font-semibold text-foreground">{day}</div>
                    <div className="flex-1">
                      {daySlots.length === 0 ? (
                        <span className="text-sm text-muted-foreground">No availability set</span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {daySlots.map((slot) => (
                            <Badge
                              key={slot.id}
                              variant="secondary"
                              className="px-3 py-1.5 flex items-center gap-2"
                            >
                              <Clock className="h-3 w-3" />
                              {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                              <button
                                onClick={() => removeSlot(slot.id)}
                                className="ml-1 hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Availability;
