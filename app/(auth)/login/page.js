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
import AuthContext from "@/context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      router.push("/");
    } catch (error) {
      toast.error(error.message); 
      router.push("/signup");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex items-center justify-between absolute w-full h-20 pl-8 md:pl-12 lg:pl-16 xl:pl-20 border-b-2 border-gray-200">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <Image src="logo.svg" width={160} height={40} alt="house-dey-logo" />
        </Link>
      </div>
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
              Login to your account
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Please login to your account.
            </p>
          </div>
          <form className="w-full max-w-md space-y-4" onSubmit={handleLogin}>
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
            <Button type="submit" className="w-full h-12">
              {loading ? <Loader className="animate-spin" /> : "Login"}
            </Button>
            <p className="text-center mt-2">
              Don't have an account? <Link href="/signup">Sign Up</Link>
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
    </>
  );
};

export default LoginPage;
