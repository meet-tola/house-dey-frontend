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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AuthContext from "@/context/AuthContext";

const MyListings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);

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

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${deleteId}`
      );
      if (response.status === 200) {
        toast.success("Post deleted successfully!");
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property.id !== deleteId)
        );
        router.push("/my-listings");
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.");
      console.error("Error deleting post:", error);
    } finally {
      setDeleteId(null);
      setShowDeleteAlert(false);
    }
  };

  const handleCreatePostClick = () => {
    if (
      user.verificationStatus === "approved" ||
      user.verificationStatus === "pending"
    ) {
      router.push("/create-listing");
    } else if (
      user.verificationStatus === "unverified" ||
      user.verificationStatus === "rejected"
    ) {
      setShowPopup(true);
    }
  };

  return (
    <div className="mt-16 mx-auto px-4 md:px-16 py-6">
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
        <Button onClick={handleCreatePostClick}>Create a Post</Button>
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
              : properties.map((property) => (
                  <div
                    key={property.id}
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

                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="bg-white text-primary px-3 py-2 cursor-pointer rounded-md hover:bg-accent">
                            <MoreVertical className="w-5 h-5" />
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link href={`/edit-listing/${property.id}`}>
                              <div className="p-1">Edit</div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => {
                            setDeleteId(property.id);
                            setShowDeleteAlert(true);
                          }}>
                            <div className="p-1 text-red-500">Delete</div>
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

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {user.verificationStatus === "unverified"
                ? "Verification Required"
                : user.verificationStatus === "rejected"
                ? "Account Suspended"
                : "Verification in Progress"}
            </DialogTitle>
            <DialogDescription>
              {user.verificationStatus === "unverified"
                ? "As an unverified agent, you must complete the verification process to access all features."
                : user.verificationStatus === "rejected"
                ? "Your verification was rejected. Please upload the correct credentials to regain access to post creation."
                : "Your verification is currently in progress. Please wait for approval before creating a post."}
            </DialogDescription>
          </DialogHeader>
          <p className="py-4">
            {user.verificationStatus === "rejected"
              ? "Please upload correct credentials for re-verification."
              : "Please upload your official document ID to verify your status."}
          </p>
          <DialogFooter>
            <Button asChild>
              <Link href="/agent-verification">Go to Verification Page</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              property listing and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyListings;