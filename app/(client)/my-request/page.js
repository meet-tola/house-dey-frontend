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
import { HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUserRequests } from "@/utils/request";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const MyRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getUserRequests = async () => {
      const userRequests = await fetchUserRequests();
      console.log(userRequests);

      if (userRequests) {
        setRequests(userRequests);
      }
    };
    getUserRequests();
  }, []);

  const formatPrice = (budget) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(budget);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 px-4 md:px-16 mt-20">
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
            <BreadcrumbPage>My Requests</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">
          My Properties Requests
        </h1>
      </div>

      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl">
        <div className="flex items-center gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          All Requests
        </div>
        <Button>
          <Link href="/create-request">Create a Request</Link>
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Requests</h2>
        {requests.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {requests.map((request, index) => (
              <Card
                key={index}
                className="flex flex-col w-72 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <CardContent className="flex-grow p-6">
                  <h3 className="font-semibold text-lg mb-2">{request.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Type:</span> {request.type}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Request Type:</span>{" "}
                    {request.property}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Budget:</span> {formatPrice(request.budget)}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Location:</span> {request.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Date:</span> {formatDate(request.createdAt)}
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  <Button variant="outline" className="w-full">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <NoPropertiesFound />
        )}
      </div>
    </div>
  );
};

export default MyRequest;
