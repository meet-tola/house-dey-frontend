"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, HomeIcon, Loader } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthContext from "@/context/AuthContext";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <h1 className="text-3xl md:text-4xl font-bold">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Welcome! Please fill in the form to create your account.
            </p>
          </div>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSignup}>
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
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12"
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
            <Button
              type="submit"
              className="w-full h-12 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Sign Up"}
            </Button>
            <p className="text-center mt-2">
              Already have an account? <Link href="/login">Login</Link>
            </p>
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

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check Your Email</DialogTitle>
            <DialogDescription>
              A verification link has been sent to your email address. Please check your inbox and click the link to verify your account.
            </DialogDescription>
            <Button onClick={closeModal} className="mt-6">
              Go to Login
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignupPage;
