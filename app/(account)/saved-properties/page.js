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
import { HouseIcon, MapPin, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchSavedPosts, savePost } from "@/utils/post";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PropertySkeleton } from "@/components/PropertySkeleton";

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSavedPosts = async () => {
      const savedPosts = await fetchSavedPosts();
      if (savedPosts) {
        setSavedProperties(savedPosts);
      }
      setLoading(false);
    };

    getSavedPosts();
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      await savePost(propertyId);
      setSavedProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
      );
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-16 px-4 md:px-16">
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
            <BreadcrumbPage>Saved Properties</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">My Saved Properties</h1>
      </div>

      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl">
        <div className="flex items-center gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          All Properties
        </div>
        <Button variant="outline">
          <Link href="/properties">View Properties</Link>
        </Button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Properties for Rent</h2>
        {savedProperties.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <PropertySkeleton key={index} />
                ))
              : savedProperties.map((property, index) => (
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
                    <Link
                      className="p-4 flex flex-col justify-between flex-grow"
                      href={`/properties/${property.id}`}
                    >
                      <div>
                        <div className="flex gap-2">
                          <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                            {property.property} for {property.type} 
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
                    </Link>

                    {/* Delete Button with Alert Dialog */}
                    <div className="absolute top-3 right-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Trash className="w-4 h-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently remove the property from your saved
                              list.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(property.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

export default SavedProperties;
