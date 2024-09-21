'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon, HomeIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from '@/components/ui/progress';
import AuthContext from '@/context/AuthContext';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('CLIENT');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [usernameLength, setUsernameLength] = useState(0);

  const router = useRouter();
  const { signup } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (usernameLength < 4) {
      toast.error('Username must be at least 4 characters.');
      return;
    }
    setLoading(true);
    try {
      await signup(username, email, password, role.toUpperCase());
      toast.success('Check your email for verification.');
      router.push('/verify-email'); 
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const calculatePasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 6) strength += 20;
    if (pass.length > 10) strength += 20;
    if (/[A-Z]/.test(pass)) strength += 20;
    if (/[0-9]/.test(pass)) strength += 20;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 20;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  useEffect(() => {
    setUsernameLength(username.length);
  }, [username]);

  const getStrengthColor = (strength) => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength) => {
    if (strength < 40) return 'Weak';
    if (strength < 80) return 'Medium';
    return 'Strong';
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Forgot password for:', forgotPasswordEmail);
    toast.success('Password reset link sent to your email');
    setIsForgotPasswordModalOpen(false);
  };

  const getUsernameMessage = (length) => {
    if (length === 0) return '';
    if (length < 4) return 'Username must be at least 4 characters long.';
    return 'Username is valid.';
  };

  const getUsernameColor = (length) => {
    if (length === 0) return '';
    if (length < 4) return 'text-red-500';
    return 'text-green-500';
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        <div className="flex flex-col items-start justify-center p-8 md:p-12 lg:p-16 xl:p-20 space-y-6 mt-14">
          <div className="space-y-2 text-left">
            <div className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-purple-100 px-5 py-2">
              <HomeIcon className="h-4 w-4 text-[#3aaaf5]" />
              <p className="text-sm font-semibold text-[#1d9bf0]">
                Finding Your Dream Home
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Sign up, Join Us!
            </h1>
            <p className="text-muted-foreground">
              Welcome! Please fill in the form to create your account.
            </p>
          </div>
          <form className="w-full max-w-md space-y-2" onSubmit={handleSignup}>
            <div className="w-full space-y-4">
              {/* Role Selector */}
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => setRole(value)} required>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                      <SelectItem value="CLIENT">
                        I want to search for a property (Individual)
                      </SelectItem>
                      <SelectItem value="AGENT">
                        I want to list your property (Agent/Landlord)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Full Name Input */}
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name/Company Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-10"
                  required
                />
              </div>

              {/* Username Input */}
              <div className="grid gap-2 relative">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setIsUsernameFocused(true)}
                  onBlur={() => setIsUsernameFocused(false)}
                  className="w-full h-10"
                  required
                />
                {isUsernameFocused && (
                  <p className={`mt-1 text-sm ${getUsernameColor(usernameLength)}`}>
                    {getUsernameMessage(usernameLength)}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10"
                  required
                />
              </div>

              {/* Mobile Input */}
              <div className="grid gap-2">
                <Label htmlFor="mobile">Phone Number</Label>
                <Input
                  id="mobile"
                  type="number"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full h-10"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    className="w-full h-10 pr-10"
                    required
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
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Password strength:</span>
                      <span>{getStrengthText(passwordStrength)}</span>
                    </div>
                    <Progress
                      value={passwordStrength}
                      className={`h-2 ${getStrengthColor(passwordStrength)}`}
                    />
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="grid gap-2 relative">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon size={20} />
                    ) : (
                      <EyeIcon size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="w-full text-sm">
              <Button
                type="button"
                variant="link"
                className="text-blue-600 hover:underline p-0"
                onClick={() => setIsForgotPasswordModalOpen(true)}
              >
                Forgot your Password?
              </Button>{' '}
              Let get you back in.
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full h-10 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
            </Button>

            {/* Already have an account */}
            <div className="w-full flex items-center justify-center">
              <p>
                Already part of the family{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
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
                className="w-full h-10"
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
