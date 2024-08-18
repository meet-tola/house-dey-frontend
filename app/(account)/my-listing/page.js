"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HouseIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const properties = [
  {
    image: "https://via.placeholder.com/300x200",
    title: "Luxury Shop in VI",
    price: "₦155,000/month",
    address: "1/498 Toorak Road, Toorak, VI",
    type: "Shop",
  },
  {
    image: "https://via.placeholder.com/300x200",
    title: "Modern House in Apapa",
    price: "₦650,000/month",
    address: "39 Albert Street, Apapa Port",
    type: "House",
  },
  {
    image: "https://via.placeholder.com/300x200",
    title: "Spacious Apartment in New Road",
    price: "₦200,000/month",
    address: "13 Watersedge Terrace, New Road",
    type: "Apartment",
  },
  {
    image: "https://via.placeholder.com/300x200",
    title: "Affordable Hostel in Camberwell",
    price: "₦355,000/month",
    address: "22 Lockhart Street, Camberwell",
    type: "Hostel",
  },
];

const Profile = () => {
  return (
    <>
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
            <div>
              <HouseIcon />
            </div>
            All Listing
          </div>
          <Button>Create a Post</Button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
           Properties for Rent
          </h2>
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {properties.map((property, index) => (
              <div
                key={index}
                className="min-w-[300px] lg:min-w-[250px] w-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={property.image}
                  alt={property.address}
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex gap-2">
                      <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                        Rent
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
                      {property.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
