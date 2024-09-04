"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, PlayCircle, Home, DollarSign, Users, MessageCircle, Bell } from "lucide-react"

export default function AgentHomePage() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Your Property Listing in Minutes
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your property management process. List, manage, and grow your real estate portfolio with ease.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    Step 1: Sign Up
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Create your account and verify your agent or landlord status.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    Step 2: Add Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Enter property information, upload photos, and set your terms.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    Step 3: Publish and Manage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Your listing goes live. Manage inquiries and bookings from your dashboard.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Video Tutorial</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Watch our step-by-step guide on creating the perfect property listing.
              </p>
              <div className="w-full max-w-3xl aspect-video bg-muted rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <PlayCircle className="h-20 w-20 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Us</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6 text-primary" />
                    Maximize Your Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  Our platform helps you optimize pricing and occupancy to increase your revenue.
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
                  Get exposure to our vast network of verified tenants looking for properties like yours.
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
                  Our tools make it easy to manage bookings, communicate with tenants, and track payments.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-16">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of successful agents and landlords who trust our platform.
              </p>
              <Button size="lg">Create Your Listing Now</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}