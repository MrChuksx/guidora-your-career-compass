import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft, User, BookOpen, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";
import { BeamsBackground } from "@/components/ui/beams-background";

type AuthMode = "login" | "signup";
type UserRole = "student" | "mentor";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signUp, signIn, loading: authLoading } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>((searchParams.get("mode") as AuthMode) || "login");
  const [role, setRole] = useState<UserRole>((searchParams.get("role") as UserRole) || "student");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const modeParam = searchParams.get("mode") as AuthMode;
    const roleParam = searchParams.get("role") as UserRole;
    if (modeParam) setMode(modeParam);
    if (roleParam) setRole(roleParam);
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    const emailResult = emailSchema.safeParse(formData.email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(formData.password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    if (mode === "signup") {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Please enter your full name";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.password = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await signUp(formData.email, formData.password, formData.fullName, role);
        
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account exists",
              description: "An account with this email already exists. Please log in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Sign up failed",
              description: error.message,
              variant: "destructive",
            });
          }
          setIsLoading(false);
          return;
        }

        toast({
          title: "Account created!",
          description: `Welcome to Guidora as a ${role}. You're now logged in.`,
        });
        navigate("/dashboard");
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setErrors({});
  };

  if (authLoading) {
    return (
      <BeamsBackground intensity="subtle" className="bg-background flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </BeamsBackground>
    );
  }

  return (
    <BeamsBackground intensity="subtle" className="bg-background flex flex-col">
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
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName}</p>
                    )}
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
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
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
                      className={cn("pr-10", errors.password ? "border-destructive" : "")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
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
    </BeamsBackground>
  );
};

export default Auth;
