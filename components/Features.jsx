import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  return (
    <section className="w-full py-12 border-b">
      <div className="container px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">Special Features</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border shadow-sm">
            <CardHeader>
              <img
                src="/home-chart-feature.svg"
                alt="Experience"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4">Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                With over 20 years in the industry, we bring unparalleled
                expertise to every transaction.
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardHeader>
              <img
                src="/home-compare-feature.svg"
                alt="Local Knowledge"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4">Local Knowledge</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our team has in-depth knowledge of the local real estate market
                and neighborhoods.
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardHeader>
              <img
                src="/home-map-feature.svg"
                alt="Client-Focused"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardTitle className="mt-4">Client-Focused</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We prioritize your needs and work tirelessly to exceed your
                expectations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
