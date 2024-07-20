import FeaturedProperties from "@/components/FeaturedListing"
import Hero from "@/components/Hero"
import Services from "@/components/Services"

const page = () => {
  return (
    <div>
      <Hero />
      <Services />
      <FeaturedProperties />
    </div>
  )
}

export default page