import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft, User, BookOpen, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup";
type UserRole = "student" | "mentor";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<AuthMode>((searchParams.get("mode") as AuthMode) || "login");
  const [role, setRole] = useState<UserRole>((searchParams.get("role") as UserRole) || "student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const modeParam = searchParams.get("mode") as AuthMode;
    const roleParam = searchParams.get("role") as UserRole;
    if (modeParam) setMode(modeParam);
    if (roleParam) setRole(roleParam);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({
        title: "Account created!",
        description: `Welcome to Guidora as a ${role}. Please check your email to verify your account.`,
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    }

    // Navigate to dashboard after successful auth
    navigate("/dashboard");
    setIsLoading(false);
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Guidora</span>
            </Link>
          </div>

          <Card variant="elevated" className="backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {mode === "login" ? "Welcome Back" : "Create Your Account"}
              </CardTitle>
              <CardDescription>
                {mode === "login"
                  ? "Log in to continue your mentorship journey"
                  : "Join Guidora and start connecting with mentors or students"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection (Signup only) */}
                {mode === "signup" && (
                  <div className="space-y-3">
                    <Label>I want to join as a</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole("student")}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                          role === "student"
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <User className={cn("h-6 w-6", role === "student" ? "text-primary" : "text-muted-foreground")} />
                        <span className={cn("font-medium", role === "student" ? "text-primary" : "text-foreground")}>
                          Student
                        </span>
                        <span className="text-xs text-muted-foreground text-center">
                          Find mentors & grow
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("mentor")}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2",
                          role === "mentor"
                            ? "border-primary bg-secondary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <BookOpen className={cn("h-6 w-6", role === "mentor" ? "text-primary" : "text-muted-foreground")} />
                        <span className={cn("font-medium", role === "mentor" ? "text-primary" : "text-foreground")}>
                          Mentor
                        </span>
                        <span className="text-xs text-muted-foreground text-center">
                          Share expertise
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Full Name (Signup only) */}
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Signup only) */}
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button variant="hero" size="lg" className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {mode === "login" ? "Logging in..." : "Creating account..."}
                    </span>
                  ) : mode === "login" ? (
                    "Log In"
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Toggle Mode */}
                <p className="text-center text-sm text-muted-foreground">
                  {mode === "login" ? (
                    <>
                      Don't have an account?{" "}
                      <button type="button" onClick={toggleMode} className="text-primary font-medium hover:underline">
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button type="button" onClick={toggleMode} className="text-primary font-medium hover:underline">
                        Log in
                      </button>
                    </>
                  )}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
