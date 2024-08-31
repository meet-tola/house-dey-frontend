"use client";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const VerifyPage = ({ params }) => {
  const { verifyEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false); // To track if verification was successful
  const router = useRouter();

  useEffect(() => {
    if (!verified) {  // Only run if not verified yet
      const verifyToken = async () => {
        try {
          await verifyEmail(params.token);
          setVerified(true);  // Set verified to true on successful verification
          toast.success("Email verified successfully!");
          router.push("/");
        } catch (error) {
          toast.error("Invalid or expired verification link.");
        } finally {
          setLoading(false);
        }
      };

      verifyToken();
    }
  }, [params.token, verifyEmail, router, verified]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <Loader className="animate-spin text-purple-500" size={32} />
      ) : (
        <p>Verifying your email...</p>
      )}
    </div>
  );
};

export default VerifyPage;
