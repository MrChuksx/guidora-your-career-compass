import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AvailabilitySlot {
  id: string;
  mentor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_recurring: boolean;
  specific_date: string | null;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const useAvailability = (mentorId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);

  const targetMentorId = mentorId || user?.id;

  const fetchSlots = async () => {
    if (!targetMentorId) return;

    const { data, error } = await supabase
      .from("availability_slots")
      .select("*")
      .eq("mentor_id", targetMentorId)
      .order("day_of_week", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching availability:", error);
    } else {
      setSlots(data || []);
    }
    setLoading(false);
  };

  const addSlot = async (slot: Omit<AvailabilitySlot, "id" | "mentor_id">) => {
    if (!user) return false;

    const { error } = await supabase.from("availability_slots").insert({
      mentor_id: user.id,
      ...slot,
    });

    if (error) {
      console.error("Error adding slot:", error);
      toast({
        title: "Error",
        description: "Failed to add availability slot",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Availability slot added",
    });
    await fetchSlots();
    return true;
  };

  const removeSlot = async (slotId: string) => {
    const { error } = await supabase
      .from("availability_slots")
      .delete()
      .eq("id", slotId);

    if (error) {
      console.error("Error removing slot:", error);
      toast({
        title: "Error",
        description: "Failed to remove slot",
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Success",
      description: "Availability slot removed",
    });
    await fetchSlots();
    return true;
  };

  useEffect(() => {
    fetchSlots();
  }, [targetMentorId]);

  return {
    slots,
    loading,
    addSlot,
    removeSlot,
    fetchSlots,
    DAYS,
  };
};
