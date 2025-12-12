import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  GraduationCap,
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Clock,
  Edit3,
  Camera,
  Plus,
  X,
  Trash2,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useAvailability } from "@/hooks/useAvailability";
import { supabase } from "@/integrations/supabase/client";
import ThemeToggle from "@/components/ThemeToggle";
import { BeamsBackground } from "@/components/ui/beams-background";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user, profile, role, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { slots, addSlot, removeSlot, DAYS, loading: availabilityLoading } = useAvailability();

  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState("");
  
  // Availability state for mentors
  const [newSlot, setNewSlot] = useState({
    day_of_week: 1,
    start_time: "09:00",
    end_time: "10:00",
    is_recurring: true,
  });
  const [isAddingSlot, setIsAddingSlot] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth?mode=login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        skills: profile.skills || [],
      });
    }
  }, [profile]);

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

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          skills: formData.skills,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  if (loading) {
    return (
      <BeamsBackground intensity="subtle" className="bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </BeamsBackground>
    );
  }

  if (!user) {
    return null;
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header Card */}
          <Card variant="elevated" className="mb-6 overflow-hidden">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-primary relative">
              <button className="absolute bottom-4 right-4 p-2 rounded-lg bg-background/20 backdrop-blur-sm text-primary-foreground hover:bg-background/30 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 mb-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground text-3xl font-bold border-4 border-background shadow-medium">
                    {getUserInitials()}
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-2 rounded-full bg-secondary border border-border hover:bg-secondary/80 transition-colors">
                    <Camera className="h-4 w-4 text-foreground" />
                  </button>
                </div>

                {/* Name & Actions */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-foreground">
                        {isEditing ? (
                          <Input
                            value={formData.full_name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                            className="text-2xl font-bold h-auto p-0 border-0 focus-visible:ring-0"
                            placeholder="Your name"
                          />
                        ) : (
                          formData.full_name || "Your Name"
                        )}
                      </h1>
                      <Badge variant="secondary" className="capitalize">
                        {role || "student"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "hero" : "outline"}
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="gap-2"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Edit3 className="h-4 w-4" />
                    )}
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-2 block">Bio</Label>
                {isEditing ? (
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="resize-none"
                    placeholder="Tell us about yourself, your goals, and what you're looking for in a mentor..."
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {formData.bio || "No bio yet. Click edit to add one!"}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Skills & Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 flex items-center gap-1">
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        placeholder="Add skill"
                        className="w-32 h-8 text-sm"
                      />
                      <button
                        onClick={addSkill}
                        className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </button>
                    </div>
                  )}
                </div>
                {formData.skills.length === 0 && !isEditing && (
                  <p className="text-sm text-muted-foreground">No skills added yet.</p>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium text-foreground capitalize">{role || "Student"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">
                      {profile?.created_at
                        ? new Date(profile.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : "Recently joined"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </CardContent>
            </Card>
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Mentors Connected</p>
              </CardContent>
            </Card>
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">0h</p>
                <p className="text-sm text-muted-foreground">Hours of Learning</p>
              </CardContent>
            </Card>
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">0</p>
                <p className="text-sm text-muted-foreground">Resources Accessed</p>
              </CardContent>
            </Card>
          </div>

          {/* Availability Section - Only for Mentors */}
          {role === "mentor" && (
            <Card variant="elevated" className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Manage Availability
                </CardTitle>
                <CardDescription>Set your available time slots for mentorship sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add New Slot */}
                <div className="grid sm:grid-cols-4 gap-4 mb-6 p-4 rounded-xl bg-secondary/50">
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
                    <Button
                      onClick={async () => {
                        if (newSlot.start_time >= newSlot.end_time) {
                          toast({
                            title: "Invalid time",
                            description: "End time must be after start time",
                            variant: "destructive",
                          });
                          return;
                        }
                        setIsAddingSlot(true);
                        await addSlot({
                          day_of_week: newSlot.day_of_week,
                          start_time: newSlot.start_time,
                          end_time: newSlot.end_time,
                          is_recurring: newSlot.is_recurring,
                          specific_date: null,
                        });
                        setIsAddingSlot(false);
                      }}
                      disabled={isAddingSlot}
                      className="w-full"
                    >
                      {isAddingSlot ? (
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

                {/* Weekly Schedule */}
                <div className="space-y-3">
                  {availabilityLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : (
                    DAYS.map((day, dayIndex) => {
                      const daySlots = slots.filter((s) => s.day_of_week === dayIndex);
                      return (
                        <div
                          key={day}
                          className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl bg-secondary/30"
                        >
                          <div className="sm:w-24 font-medium text-foreground text-sm">{day}</div>
                          <div className="flex-1">
                            {daySlots.length === 0 ? (
                              <span className="text-sm text-muted-foreground">No availability</span>
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
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account Info */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={role || "student"} disabled className="capitalize" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </BeamsBackground>
  );
};

export default Profile;
