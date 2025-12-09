import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { useSessions } from "@/hooks/useSessions";
import { useAvailability } from "@/hooks/useAvailability";

interface BookSessionDialogProps {
  mentorId: string;
  mentorName: string;
  children: React.ReactNode;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const BookSessionDialog = ({ mentorId, mentorName, children }: BookSessionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const { bookSession } = useSessions();
  const { slots } = useAvailability(mentorId);

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    scheduled_date: "",
    slot_id: "",
  });

  const selectedSlot = slots.find((s) => s.id === formData.slot_id);

  // Get next occurrence of a day of week
  const getNextDate = (dayOfWeek: number) => {
    const today = new Date();
    const result = new Date(today);
    result.setDate(today.getDate() + ((dayOfWeek + 7 - today.getDay()) % 7 || 7));
    return result.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !formData.topic) return;

    setIsBooking(true);
    const success = await bookSession({
      mentor_id: mentorId,
      topic: formData.topic,
      description: formData.description || undefined,
      scheduled_date: formData.scheduled_date || getNextDate(selectedSlot.day_of_week),
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
    });

    if (success) {
      setOpen(false);
      setFormData({ topic: "", description: "", scheduled_date: "", slot_id: "" });
    }
    setIsBooking(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Session</DialogTitle>
          <DialogDescription>Request a mentorship session with {mentorName}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Session Topic *</Label>
            <Input
              id="topic"
              placeholder="e.g., Career advice in Data Science"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Tell the mentor what you'd like to discuss..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Available Time Slot *</Label>
            {slots.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                This mentor hasn't set their availability yet.
              </p>
            ) : (
              <Select
                value={formData.slot_id}
                onValueChange={(v) => setFormData({ ...formData, slot_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {slots.map((slot) => (
                    <SelectItem key={slot.id} value={slot.id}>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {DAYS[slot.day_of_week]}
                        <Clock className="h-4 w-4 ml-2" />
                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedSlot && (
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.scheduled_date || getNextDate(selectedSlot.day_of_week)}
                onChange={(e) => setFormData({ ...formData, scheduled_date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.topic || !formData.slot_id || isBooking}
              className="flex-1"
            >
              {isBooking ? (
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                "Request Session"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
