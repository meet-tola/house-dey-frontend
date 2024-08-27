import AgentBanner from "@/components/AgentBanner"
import FeaturedProperties from "@/components/FeaturedListing"
import Features from "@/components/Features"
import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Video from "@/components/Video"

const page = () => {
  return (
    <div>
      <Hero />
      <Services />
      <FeaturedProperties />
      <Features />
      <Video />
      <AgentBanner />
    </div>
  )
}

export default page