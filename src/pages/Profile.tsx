import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Briefcase,
  BookOpen,
  Star,
  Calendar,
  Clock,
  Edit3,
  Camera,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com",
    avatar: "JD",
    role: "student" as const,
    location: "San Francisco, CA",
    bio: "Computer Science student passionate about machine learning and building products that make a difference. Looking for mentors in AI/ML and startup development.",
    interests: ["Machine Learning", "Data Science", "Startups", "Python", "React"],
    education: "B.S. Computer Science, Stanford University",
    joinedDate: "September 2024",
    stats: {
      sessions: 12,
      mentors: 4,
      hoursLearned: 15,
      resourcesAccessed: 8,
    },
  };

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
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Guidora</span>
            </Link>
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
                    {userData.avatar}
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-2 rounded-full bg-secondary border border-border hover:bg-secondary/80 transition-colors">
                    <Camera className="h-4 w-4 text-foreground" />
                  </button>
                </div>

                {/* Name & Actions */}
                <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold text-foreground">{userData.name}</h1>
                      <Badge variant="secondary" className="capitalize">
                        {userData.role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {userData.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {userData.location}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "hero" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </div>

              {/* Bio */}
              {isEditing ? (
                <div className="space-y-2 mb-6">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue={userData.bio}
                    rows={3}
                    className="resize-none"
                  />
                </div>
              ) : (
                <p className="text-muted-foreground mb-6">{userData.bio}</p>
              )}

              {/* Interests */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Interests & Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="px-3 py-1">
                      {interest}
                    </Badge>
                  ))}
                  {isEditing && (
                    <button className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                      <Plus className="h-4 w-4" />
                      Add
                    </button>
                  )}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium text-foreground">{userData.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium text-foreground">{userData.joinedDate}</p>
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
                <p className="text-3xl font-bold text-foreground">{userData.stats.sessions}</p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </CardContent>
            </Card>
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{userData.stats.mentors}</p>
                <p className="text-sm text-muted-foreground">Mentors Connected</p>
              </CardContent>
            </Card>
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{userData.stats.hoursLearned}h</p>
                <p className="text-sm text-muted-foreground">Hours of Learning</p>
              </CardContent>
            </Card>
            <Card variant="gradient">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{userData.stats.resourcesAccessed}</p>
                <p className="text-sm text-muted-foreground">Resources Accessed</p>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={userData.name} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={userData.email} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={userData.location} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input id="education" defaultValue={userData.education} disabled={!isEditing} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
