"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

import AgentBanner from "@/components/AgentBanner";
import FeaturedProperties from "@/components/FeaturedListing";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Video from "@/components/Video";
import InstallPrompt from "@/components/InstallPrompt";

const Page = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && user.role === "AGENT") {
      router.push("/for-agent");
    }
  }, [user, router]);

  return (
    <div>
      <InstallPrompt />
      <Hero />
      <Services />
      <FeaturedProperties />
      <Features />
      <Video />
      <AgentBanner />
    </div>
  );
};

export default Page;
