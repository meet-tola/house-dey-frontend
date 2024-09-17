import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  return (
    <section className="w-full py-12 border-b">
      <div className="container px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-4">Special Features</h2>
        <div className="grid gap-6 lg:grid-cols-4">
          <Card className="border shadow-sm">
            <img
              src="/message-agents-clients.svg"
              alt="Message-Agents-Clients"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <CardContent>
              <CardTitle className="my-4">Message Agents/Clients</CardTitle>
              <p>
                With our secure messaging platform, chat privately, hop on calls
                and get familiar with your agent or client.
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
                Search for properties in different locations, filter between
                different types of categories and tags.
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
                Use our advanced map geolocation to see the location and
                direction of any property, anywhere in the world.
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <img
              src="/secure-escrows.svg"
              alt="Secure-Escrow"
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <CardContent>
              <CardTitle className="my-4">Secure Escrow</CardTitle>
              <p>
                Wish to protect your funds? With our optional escrow service,
                you can deposit your money and we will pay the agent when you
                are satisfied with your choice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
