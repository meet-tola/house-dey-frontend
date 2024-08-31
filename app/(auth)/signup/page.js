"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, HomeIcon, Loader, Check, X } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthContext from "@/context/AuthContext";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const router = useRouter();
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(username, email, password, role.toUpperCase());
      setIsModalOpen(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error("Error: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  const updatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  useEffect(() => {
    updatePasswordStrength(password);
  }, [password]);

  const getStrengthColor = (index) => {
    if (index >= passwordStrength) return "bg-gray-200";
    if (passwordStrength < 2) return "bg-red-500";
    if (passwordStrength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Forgot password for:", forgotPasswordEmail);
    toast.success("Password reset link sent to your email");
    setIsForgotPasswordModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        <div className="flex flex-col items-start justify-center p-8 md:p-12 lg:p-16 xl:p-20 space-y-6 mt-12">
          <div className="space-y-2 text-left">
            <div className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-purple-100 px-7 py-2">
              <HomeIcon className="h-5 w-5 text-[#3aaaf5]" />
              <p className="text-sm font-semibold text-[#1d9bf0]">
                Finding Your Dream Home
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Sign in, Join Us!
            </h1>
            <p className="text-muted-foreground">
              Welcome! Please fill in the form to create your account.
            </p>
          </div>
          <form className="w-full max-w-md space-y-2" onSubmit={handleSignup}>
            <div className="w-full space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-12"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12"
                />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className="w-full h-12 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
                {isPasswordFocused && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md space-y-2">
                    <div className="flex space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded ${getStrengthColor(
                            i
                          )}`}
                        />
                      ))}
                    </div>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center space-x-2">
                        {password.length >= 8 ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-red-500" />
                        )}
                        <span>At least 8 characters</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        {password.match(/[A-Z]/) ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-red-500" />
                        )}
                        <span>At least one capital letter</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        {password.match(/[0-9]/) ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-red-500" />
                        )}
                        <span>At least one number</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        {password.match(/[^A-Za-z0-9]/) ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-red-500" />
                        )}
                        <span>At least one symbol</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => setRole(value)}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="client">
                        Individual (searching for property)
                      </SelectItem>
                      <SelectItem value="agent">Agent/Landlord</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
              </Button>
              {" "}Let get you back in.
            </div>
            <Button
              type="submit"
              className="w-full h-12 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Sign Up"}
            </Button>
            <div className="w-full flex items-center justify-center">
              <p className="">
                Already part of the family{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden lg:block relative">
          <img
            src="https://via.placeholder.com/1920x1080"
            width="1920"
            height="1080"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Signup Success Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check Your Email</DialogTitle>
            <DialogDescription>
              A verification link has been sent to your email address. Please
              check your inbox and click the link to verify your account.
            </DialogDescription>
            <Button onClick={closeModal} className="mt-6">
              Go to Login
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Forgot Password Modal */}
      <Dialog
        open={isForgotPasswordModalOpen}
        onOpenChange={setIsForgotPasswordModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a link to reset your
              password.
            </DialogDescription>
          </DialogHeader>
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
              Send Reset Link
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignupPage;
