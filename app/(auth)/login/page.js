"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, HomeIcon, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import AuthContext from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();
  const { login, user, requestPasswordReset } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      if (user?.role === "AGENT") {
        router.push("/for-agent");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "AGENT") {
        router.push("/for-agent");
      } else {
        router.push("/");
      }
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestPasswordReset(forgotPasswordEmail);
      setEmailSent(true); // Indicate that the email has been sent
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        <div className="flex flex-col items-start justify-center p-8 md:p-12 lg:p-16 xl:p-20 space-y-6 mt-10">
          <div className="space-y-2 text-left">
            <div className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-purple-100 px-7 py-2">
              <HomeIcon className="h-5 w-5 text-[#3aaaf5]" />
              <p className="text-sm font-semibold text-[#1d9bf0]">
                Finding Your Dream Home
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Fill the inputs to login your account.
            </p>
          </div>
          <form className="w-full max-w-md space-y-2" onSubmit={handleLogin}>
            <div className="w-full space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12"
                  required
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12"
                  required
                />
                <div
                  className="absolute right-3 top-[70%] transform text-muted-foreground text-[5px] -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full text-sm">
              <Button
                type="button"
                variant="link"
                className=" text-blue-600 hover:underline p-0"
                onClick={() => setIsForgotPasswordModalOpen(true)}
              >
                Forgot your Password?
              </Button>{" "}
              Let get you back in.
            </div>
            <Button type="submit" className="w-full h-12">
              {loading ? <Loader className="animate-spin" /> : "Login"}
            </Button>
            <div className="w-full flex items-center justify-center">
              <p className="">
                Not yet part of the family?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:block relative">
          <img
            src="/image2.png"
            width="1920"
            height="1080"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Dialog
        open={isForgotPasswordModalOpen}
        onOpenChange={(open) => {
          setIsForgotPasswordModalOpen(open);
          if (!open) setEmailSent(false); // Reset email sent state when closing modal
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              {emailSent
                ? "A password reset link has been sent to your email. Please check your inbox."
                : "Enter your email address and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>
          {!emailSent && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="forgot-password-email">Email</Label>
                <Input
                  id="forgot-password-email"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full h-12"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginPage;
