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
import { Loader2 } from "lucide-react";
import AddressAutocomplete from "@/components/map/AddressAutoComplete";

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
      const response = await axios.post(`${API_URL}/api/posts?requestId=${requestId}`, postPayload);
  
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
                <Label htmlFor="city">City**</Label>
                <Input
                  id="city"
                  placeholder="Enter a city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
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
                  m placeholder="Enter size"
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
          <Card>
            <CardHeader>
              <CardTitle>Preview Your Property Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="bg-muted rounded-lg overflow-hidden">
                <img
                  src={formData.images[0]}
                  alt="Property Image"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                  {formData.title || "HouseDey"}
                </h2>
                <p className="text-muted-foreground text-lg">
                  Address: {formData.address}
                </p>
                <p className="text-muted-foreground text-lg">
                  Bedrooms: {formData.bedrooms || 32} | Bathrooms:{" "}
                  {formData.bathrooms || 24}
                </p>
                <p className="text-muted-foreground text-lg">
                  Property Type: {formData.property || "Apartment"} | Type:{" "}
                  {formData.type || "Rent"}
                </p>
                <p className="text-muted-foreground text-lg">
                  Description:{" "}
                  {formData.desc ||
                    "beautiful family house with spacious rooms and a large garden."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
