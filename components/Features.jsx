import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";

const Features = () => {
  return (
    <section className="w-full py-12 border-b">
      <div className="container px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">Special Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border shadow-sm">
            <img
              src="/message-agents-clients.svg"
              alt="Message-Agents-Clients"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <CardContent>
              <CardTitle className="my-4">Message Agents/Clients</CardTitle>
              <p>
                Privately chat with agents or clients using our secure messaging platform. Stay connected and informed throughout the process.
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <img
              src="/advanced-search.svg"
              alt="Advanced-Search"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <CardContent>
              <CardTitle className="my-4">Advanced Search</CardTitle>
              <p>
                Discover properties by filtering categories, tags, and locations. Tailor your search to meet all your specific needs.
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <img
              src="/map-navigation.svg"
              alt="Map-Navigation"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <CardContent>
              <CardTitle className="my-4">Map Navigation</CardTitle>
              <p>
                Use our advanced map feature to view property locations and directions worldwide, helping you navigate effortlessly.
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <div className="relative">
              <img
                src="/secure-escrows.svg"
                alt="Secure-Escrow"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <Badge className="absolute bottom-2 right-2">coming soon</Badge>
            </div>
            <CardContent>
              <CardTitle className="my-4">Secure Escrow</CardTitle>
              <p>
                Safeguard your funds with our escrow service. Payments are held securely until you're satisfied with the final deal.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
