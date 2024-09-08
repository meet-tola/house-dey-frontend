"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HouseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { fetchUserRequests } from "@/utils/request";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

const MyRequest = () => {
  const [requests, setRequests] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getUserRequests = async () => {
      const userRequests = await fetchUserRequests();
      if (userRequests) {
        setRequests(userRequests);
      }
    };
    getUserRequests();
  }, []);

  const handleDelete = async (requestId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/requests/${requestId}`
      );
      if (response.status === 200) {
        toast.success("Request deleted successfully!");
        router.push("/my-requests");
      } else {
        toast.error("Failed to delete request.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the request.");
      console.error("Error deleting request:", error);
    }
  };

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
          Requests
        </div>
        <Button>
          <Link href="/create-request">Create a Request</Link>
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">All Requests</h2>
        {requests.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {requests.map((request, index) => (
              <Card
                key={index}
                className="flex flex-col min-w-[300px] lg:min-w-[250px] w-[300px] bg-white rounded-lg overflow-hidden duration-300 ease-in-out"
              >
                <CardContent className="flex-grow p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {request.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Type:</span> {request.type}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Request Type:</span>{" "}
                    {request.property}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Budget:</span>{" "}
                    {formatPrice(request.budget)}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Location:</span>{" "}
                    {request.address}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Date:</span>{" "}
                    {formatDate(request.createdAt)}
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this request? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Close
                          </Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(request.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
