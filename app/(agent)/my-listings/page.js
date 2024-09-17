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
import { HouseIcon, MapPin, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchUserPosts } from "@/utils/post";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUserPosts = async () => {
      const userPosts = await fetchUserPosts();
      if (userPosts) {
        setProperties(userPosts);
      }
      setLoading(false);
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`
      );
      if (response.status === 200) {
        toast.success("Post deleted successfully!");
        // Optionally update properties after deletion
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.id !== id)
        );
        router.push("/my-listings");
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.");
      console.error("Error deleting post:", error);
    }
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
          <Link href="/create-post">Create a Post</Link>
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Properties</h2>
        {properties.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto scrollbar-none">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-3 mb-4">
                    <Skeleton className="h-[150px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))
              : properties.map((property, index) => (
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

                    {/* Dropdown Menu for Edit and Delete */}
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button className="bg-white text-primary px-3">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link href={`/edit-post/${property.id}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(property.id)}
                            className="text-red-500"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
