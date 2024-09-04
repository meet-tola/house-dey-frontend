"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HouseIcon, MapPin, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUserPosts } from "@/utils/post";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import AgentProtectedRoute from "@/components/protected/AgentProtectedRoute";

const MyListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getUserPosts = async () => {
      const userPosts = await fetchUserPosts();
      if (userPosts) {
        setProperties(userPosts);
      }
    };

    getUserPosts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account">Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Listing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">
          My Properties Listing
        </h1>
      </div>

      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl">
        <div className="flex items-center gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          All Listing
        </div>
        <Button>
          <Link href="create-post">Create a Post</Link>
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Properties for Rent</h2>
        {properties.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {properties.map((property, index) => (
              <div
                key={index}
                className="min-w-[300px] lg:min-w-[250px] w-[300px] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={
                    property.images?.[0] ||
                    "https://via.placeholder.com/300x200"
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

                {/* Edit Button */}
                <div className="absolute top-3 right-3">
                  <Link href={`/edit-post/${property.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoPropertiesFound />
        )}
      </div>
    </div>
  );
};

export default MyListings;
