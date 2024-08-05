"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuth } from "@/utils/auth";
import PageLoader from "@/components/PageLoader";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      setIsLoading(true);
      const auth = await checkAuth();
      if (!auth) {
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    authenticate();
  }, [router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
