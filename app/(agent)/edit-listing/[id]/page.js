"use client";

import React, { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUploader from "@/components/ui/ImageUploader";
import AuthContext from "@/context/AuthContext";
import { Edit3, Loader2, MapPin } from "lucide-react";
import AddressAutocomplete from "@/components/map/AddressAutoComplete";
import CityAutocomplete from "@/components/map/CityAutoComplete";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export default function EditListing() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    images: [],
    address: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    property: "",
    type: "",
    desc: "",
    utilities: "",
    size: "",
  });

  useEffect(() => {
    if (
      user.verificationStatus === "rejected" ||
      user.verificationStatus === "unverified"
    ) {
      router.push("/my-listings");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${id}`);
        if (response.status === 200) {
          const postData = response.data;
          setFormData({
            title: postData.title || "",
            price: postData.price || "",
            images: postData.images || [],
            address: postData.address || "",
            city: postData.city || "",
            bedrooms: postData.bedroom?.toString() || "",
            bathrooms: postData.bathroom?.toString() || "",
            property: postData.property || "",
            type: postData.type || "",
            desc: postData.postDetail?.desc || "",
            utilities: postData.postDetail?.utilities || "",
            size: postData.postDetail?.size?.toString() || "",
          });
        } else {
          toast.error("Failed to fetch post data.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching post data.");
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleImageUpload = (urls) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: urls,
    }));
  };

  const handleAddressSelect = (address) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: address,
    }));
  };

  const handleCitySelect = (city) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      city: city,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postDetail = {
      desc: formData.desc,
      utilities: formData.utilities,
      size: parseInt(formData.size, 10),
    };

    const postPayload = {
      title: formData.title,
      price: parseInt(formData.price, 10),
      images: formData.images,
      address: formData.address,
      city: formData.city,
      bedroom: parseInt(formData.bedrooms, 10),
      bathroom: parseInt(formData.bathrooms, 10),
      property: formData.property,
      type: formData.type,
      postDetail,
      userId: userId,
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/posts/${id}`,
        postPayload
      );
      if (response.status === 200) {
        toast.success("Post updated successfully!");
        router.push("/my-listings");
      } else {
        toast.error("Failed to update post.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the post.");
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/posts/${id}`
      );
      if (response.status === 200) {
        toast.success("Post deleted successfully!");
        router.push("/my-listings");
      } else {
        toast.error("Failed to delete post.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the post.");
      console.error("Error deleting post:", error);
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
            <BreadcrumbLink href="/my-listings">My Listings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Listing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">Edit Post</h1>
        <p className="text-lg mt-4">Manage your account and preferences</p>
      </div>
      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl">
        <div className="flex items-center gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <Edit3 />
          </div>
          Edit Your Property
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Delete Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-7">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold mb-4">
            Modify the details of your property.
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title**</Label>
                <Input
                  id="title"
                  placeholder="Enter a title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price**</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter a price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Description**</Label>
              <Textarea
                id="desc"
                rows={6}
                placeholder="Enter a description"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <ImageUploader
                onImageUpload={handleImageUpload}
                multiple={true}
                initialImages={formData.images}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address**</Label>
                <AddressAutocomplete
                  onAddressSelect={handleAddressSelect}
                  initialValue={formData.address}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City**</Label>
                <CityAutocomplete
                  onCitySelect={handleCitySelect}
                  initialValue={formData.city}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property">Property**</Label>
                <Select
                  id="property"
                  value={formData.property}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      property: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type**</Label>
                <Select
                  id="type"
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      type: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms(Optional)</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="Enter number of bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms(Optional)</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  placeholder="Enter number of bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="utilities">Utilities(Optional)</Label>
                <Input
                  id="utilities"
                  placeholder="Enter utilities"
                  value={formData.utilities}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size(in sqft)</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="Enter size"
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button type="submit">
              {loading ? (
                <div className="flex gap-2">
                  <Loader2 className="animate-spin" /> Updating Post
                </div>
              ) : (
                "Update Post"
              )}
            </Button>
          </form>
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Preview Your Property Post
          </h1>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 ">
            <div className="min-w-[300px] lg:min-w-[250px] w-[300px] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative mx-auto">
              <img
                className="w-full h-48 object-cover"
                src={
                  formData.images?.[0] || "https://via.placeholder.com/300x200"
                }
                alt={formData.address || "Property Image"}
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex gap-2">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                      {formData.type || "Rent"}
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                      {formData.property || "Apartment"}
                    </div>
                  </div>
                  <div className="text-lg font-semibold mt-2 truncate">
                    {formData.title || "HouseDey"}
                  </div>
                  <div className="text-gray-600 flex items-center mb-2 truncate">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">
                      {formData.address || "123 Main St, City, Country"}
                    </span>
                  </div>
                  <div className="text-xl font-semibold truncate">
                    {formatPrice(formData.price || 1000000)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
