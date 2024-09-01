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
    let isMounted = true;
  
    const verifyToken = async () => {
      if (isMounted) {
        try {
          await verifyEmail(params.token);
          toast.success("Email verified successfully!");
          router.push("/");
        } catch (error) {
          toast.error("Invalid or expired verification link.");
        } finally {
          if (isMounted) setLoading(false);
        }
      }
    };
  
    if (loading) {
      verifyToken();
    }
  
    return () => {
      isMounted = false;
    };
  }, [params.token, verifyEmail, router, loading]);
  

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
