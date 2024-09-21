"use client";

import { useState, useRef, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function VerifyEmail() {
  const { verifyEmail } = useContext(AuthContext);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value !== "" && index < 4) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const token = code.join("");
    setLoading(true);

    try {
      await verifyEmail(token);
      toast.success("Verification successful.");
      router.push("/");
    } catch (error) {
      toast.error("" + error);
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify Your Account
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We've sent a 5-digit verification code to your email. Please enter the
          code below to confirm your account.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <div
            className="flex space-x-2"
            role="group"
            aria-labelledby="code-label"
          >
            <span id="code-label" className="sr-only">
              Enter 5-digit verification code
            </span>
            {code.map((digit, index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                className="w-12 h-12 text-center text-2xl"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
          <Button
            onClick={handleVerify}
            disabled={!isCodeComplete}
            className="w-full mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify Account"}
          </Button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Didn't receive the code?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Resend code
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
