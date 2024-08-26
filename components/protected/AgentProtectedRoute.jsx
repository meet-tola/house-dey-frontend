"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import PageLoader from "@/components/PageLoader";
import { HomeIcon } from "lucide-react";
import { Button } from "../ui/button";


const AgentProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (user && user.role !== "AGENT") {
    return (
      <div className="w-full max-w-md mx-auto h-screen">
        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
          <div className="rounded-full bg-muted p-3">
            <HomeIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            This page is only available for agents.
          </h2>
          <p className="text-sm text-muted-foreground">
            Switch to agents on your profile settings.
          </p>
          <Button>Go to Profile</Button>
        </div>
      </div>
    );
  }

  return children;
};

export default AgentProtectedRoute;
