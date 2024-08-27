import { ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const AgentBanner = () => {
  return (
    <div className="inset-x-0 bottom-0 z-10 flex items-center justify-between bg-primary px-4 md:px-16 py-3">
      <div className="flex items-center">
        <div className="py-4">
          <h1 className="text-white font-bold md:text-xl text-sm">
            Are you an estate agent or developer? List your property for FREE.
          </h1>
        </div>
      </div>
      <Link href="/signup">
        <Button variant="outline" className="gap-2 text-primary">
          Get Started
          <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default AgentBanner;
