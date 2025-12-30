import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Mail, User, ArrowRight, Eye, EyeOff, Check } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", fullName: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (user && !showSuccess) {
      navigate("/admin");
    }
  }, [user, navigate, showSuccess]);

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsSubmitting(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
    
    if (error) {
      toast({
        title: "Signup Failed",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      toast({
        title: "Account Created",
        description: "Welcome aboard! Redirecting to dashboard...",
      });
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    }
  };

  // Success Animation Screen
  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background tactical-grid">
        <div className="absolute inset-0 hero-gradient" />
        
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative text-center"
        >
          {/* Animated Shield */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.8, times: [0, 0.6, 1] }}
            className="relative inline-block mb-8"
          >
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full animate-pulse-glow" />
            <Shield className="w-32 h-32 text-primary relative z-10" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2"
            >
              <Check className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mb-4 text-glow"
          >
            Access Granted
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mb-8"
          >
            Authentication verified. Entering secure zone...
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.7, duration: 1 }}
            className="h-1 bg-primary rounded-full max-w-xs mx-auto"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background tactical-grid p-4">
      <div className="absolute inset-0 hero-gradient" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative"
      >
        <div className="card-tactical rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-8 shadow-cyber">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex p-4 rounded-2xl bg-primary/10 mb-4"
            >
              <Shield className="w-12 h-12 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Secure Access" : "Create Account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin
                ? "Enter your credentials to access the admin panel"
                : "Register to manage your portfolio content"}
            </p>
          </div>

          {/* Form Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...loginForm.register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 bg-background/50"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...loginForm.register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-background/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-destructive text-xs mt-1">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 btn-tactical"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Authenticating..." : "Access Dashboard"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={signupForm.handleSubmit(handleSignup)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...signupForm.register("fullName")}
                      placeholder="Your Name"
                      className="pl-10 bg-background/50"
                    />
                  </div>
                  {signupForm.formState.errors.fullName && (
                    <p className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...signupForm.register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 bg-background/50"
                    />
                  </div>
                  {signupForm.formState.errors.email && (
                    <p className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...signupForm.register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-background/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {signupForm.formState.errors.password && (
                    <p className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      {...signupForm.register("confirmPassword")}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 bg-background/50"
                    />
                  </div>
                  {signupForm.formState.errors.confirmPassword && (
                    <p className="text-destructive text-xs mt-1">
                      {signupForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 btn-tactical"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Protected by defence-grade encryption
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
