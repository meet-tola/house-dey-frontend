import React, { useContext } from "react"; 
import { Button } from "./ui/button";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";

const AgentBanner = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return null;
  }

  return (
    <div className="w-full py-12 bg-muted">
      <div className="container px-4 md:px-16">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Join thousands of successful agents, landlords and individuals who
            trust our platform.
          </p>
          <Link href="/signup">
            <Button size="lg">Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentBanner;
