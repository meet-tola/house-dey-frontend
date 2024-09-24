"use client";

import React, { useState, useContext, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUploader from "@/components/ui/ImageUploader";
import AuthContext from "@/context/AuthContext";
import { Loader2, MapPin } from "lucide-react";
import AddressAutocomplete from "@/components/map/AddressAutoComplete";
import CityAutocomplete from "@/components/map/CityAutoComplete";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";
export default function CreateListing() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId");
  const [loading, setLoading] = useState(false);
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
      desc: formData.desc || "",
      utilities: formData.utilities || "",
      size: parseInt(formData.size, 10) || "",
    };

    const postPayload = {
      title: formData.title || "",
      price: parseInt(formData.price, 10) || "",
      images: formData.images || "",
      address: formData.address || "",
      city: formData.city || "",
      bedroom: parseInt(formData.bedrooms, 10) || "",
      bathroom: parseInt(formData.bathrooms, 10) || "",
      property: formData.property || "",
      type: formData.type || "",
      postDetail,
      userId: userId,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/posts?requestId=${requestId}`,
        postPayload
      );

      if (response.status === 200) {
        toast.success("Post created successfully!");
        setFormData({
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
        router.push("/my-listings");
      } else {
        toast.error("Failed to create post.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the post.");
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
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
            <BreadcrumbPage>Create Listing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">Create a Post</h1>
        <p className="text-lg mt-4">Manage your account and preferences</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">List Your Property</h1>
          <p className="text-muted-foreground text-md">
            Fill out the form below to advertise your property.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title**</Label>
                <Input
                  id="title"
                  placeholder="Enter a title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
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
                  required
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
                required
              />
            </div>
            <div className="space-y-2">
              <ImageUploader
                onImageUpload={handleImageUpload}
                multiple={true}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address**</Label>
                <AddressAutocomplete onAddressSelect={handleAddressSelect} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">City**</Label>
                <CityAutocomplete onCitySelect={handleCitySelect} />
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
                  required
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
                <Label htmlFor="property">Type**</Label>
                <Select
                  id="property"
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      type: value,
                    }))
                  }
                  required
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
                  m
                  placeholder="Enter size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <Button type="submit">
              {loading ? (
                <div>
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                "Create Post"
              )}
            </Button>
          </form>
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Preview Your Property Post
          </h1>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 shadow-lg">
            <div className="min-w-[300px] lg:min-w-[250px] w-[300px] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative mx-auto">
              <img
                className="w-full h-48 object-cover"
                src={
                  formData.images?.[0] ||
                  "https://via.placeholder.com/300x200"
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
