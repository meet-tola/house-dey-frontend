"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone, UserX } from "lucide-react";
import { fetchAgent } from "@/utils/user";
import { useParams } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import Link from "next/link";

export default function AgentProfile() {
  const { username } = useParams();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAgentData = async () => {
      try {
        const agentData = await fetchAgent(username);
        setAgent(agentData);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAgentData();
  }, [username]);

  if (loading) {
    return <PageLoader />;
  }

  if (!agent) {
    return (
      <div className="w-full max-w-md mx-auto h-[400px]">
        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
          <div className="rounded-full bg-muted p-3">
            <UserX className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Agent Not Found</h2>
          <p className="text-sm text-muted-foreground">
            We couldn't find the agent you're looking for. They may have moved or no longer be with our agency.
          </p>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container mx-auto p-4 mt-16 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Agent Info Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={agent.avatar || "/placeholder.svg?height=150&width=150"}
                  alt={agent.fullName}
                  className="rounded-full w-32 h-32 object-cover mb-4"
                />
                <h1 className="text-2xl font-bold mb-1">
                  {agent.fullName}
                </h1>
                <p className="text-muted-foreground mb-4">@{agent.username}</p>
                <Badge className="mb-4">Verified Agent</Badge>
                <Button className="w-full mb-4">Contact Agent</Button>
    
                <div className="w-full space-y-2">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{agent.mobile || "Not available"}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{agent.locality || "Location not specified"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Listings Section */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Current Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agent.post && agent.post.length > 0 ? (
              agent.post.map((property, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative"
                >
                  <Link href={`/properties/${property.id}`}>
                    <img
                      className="w-full h-48 object-cover"
                      src={
                        property.images?.[0] || "https://via.placeholder.com/300x200"
                      }
                      alt={property.address}
                    />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex gap-2">
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                            {property.property}
                          </div>
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                            {property.type}
                          </div>
                        </div>
                        <div className="text-lg font-semibold mt-2 truncate">
                          {property.title}
                        </div>
                        <div className="text-gray-600 flex items-center mb-2 truncate">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="truncate">{property.address}</span>
                        </div>
                        <div className="text-xl font-semibold truncate">
                        {formatPrice(property.price)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <NoPropertiesFound />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
