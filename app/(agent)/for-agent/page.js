"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, DollarSign, Users } from "lucide-react";

export default function AgentHomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 mt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  List Your Property in less than a Minute
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Find an easier, faster way to connect with potential
                  tenants/buyers. No more waiting for a long period of time just
                  to get a tenant/buyer.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/my-listings">
                  <Button>Get Started</Button>
                </Link>
                <Link href="#video-tutorial">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="relative">
                <div className="absolute left-0 top-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <Card className="pt-8 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      Sign Up
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Create an account and verify your status. It's quick, easy,
                    and secure.
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <Card className="pt-8 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      Add Property Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Enter property information, upload photos/videos, set your
                    terms and price. Our intuitive interface makes it simple.
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <div className="absolute left-0 top-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <Card className="pt-8 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      Publish and Manage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    Your listing goes live instantly. Manage inquiries and
                    engage with potential customers through our user-friendly
                    dashboard.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="video-tutorial"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Video Tutorial
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
                Watch our step-by-step guide on creating the perfect property
                listing.
              </p>
              <div className="w-full max-w-3xl aspect-video bg-muted rounded-xl overflow-hidden shadow-lg">
                <video
                  controls
                  poster="/placeholder.svg"
                  className="w-full h-full object-cover"
                >
                  <source src="/path-to-your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    Maximize Your Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  We help bring you closer to potential tenants or buyers,
                  making it easier to close deals quickly and effectively.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Reach More Tenants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Get exposure to our vast network of verified tenants looking
                  for properties like yours.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-6 w-6 text-primary" />
                    Effortless Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Our tools make it easy to manage bookings, communicate with
                  tenants, and track payments.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of successful agents and landlords who trust our
                platform. Start listing your properties today and experience the
                difference.
              </p>
              <Link href="/my-listings">
                <Button size="lg" className="mt-4">
                  Create Your Listing Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
