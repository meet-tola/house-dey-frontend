"use client";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const VerifyPage = ({ params }) => {
  const { verifyEmail } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await verifyEmail(params.token);
        toast.success("Email verified successfully!");
        router.push("/login");
      } catch (error) {
        toast.error("Invalid or expired verification link.");
        router.push("/signup");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [params.token, verifyEmail, router]);

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
