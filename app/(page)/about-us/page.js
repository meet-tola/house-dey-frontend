import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CheckIcon } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto p-4 mt-16 px-4 md:px-16 space-y-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  About HouseDey
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your trusted partner in finding the perfect home. With years
                  of experience and a passion for real estate, we're here to
                  make your property dreams a reality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Acme Real Estate, our mission is to guide our clients through
              the complex process of buying, selling, or renting properties with
              expertise, integrity, and personalized service. We strive to
              exceed expectations and build long-lasting relationships based on
              trust and results.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Our Values</h2>
            <ul className="text-lg text-muted-foreground space-y-2">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Integrity in every transaction
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Client-focused approach
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Continuous market education
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Innovation in real estate solutions
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-primary" />
                Community engagement and support
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                image: "https://via.placeholder.com/400x400",
              },
              {
                name: "Jane Smith",
                role: "Lead Real Estate Agent",
                image: "https://via.placeholder.com/400x400",
              },
              {
                name: "Mike Johnson",
                role: "Property Manager",
                image: "https://via.placeholder.com/400x400",
              },
            ].map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's start your journey to the perfect property today. Our expert
            team is here to guide you every step of the way.
          </p>
          <Button size="lg" className="text-lg px-8">
            Contact Us
          </Button>
        </section>
      </main>
    </div>
  );
}
