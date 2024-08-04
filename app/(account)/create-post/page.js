"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUploader from "@/components/ui/ImageUploader";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    desc: "",
    images: [],
    address: "",
    city: "",
    bedrooms: "",
    bathrooms: "",
    latitude: "",
    longitude: "",
    property: "",
    type: "",
    utilities: "",
    size: "",
    income: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleImageUpload = (url) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, url],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      if (key === "images") {
        formData[key].forEach((image, index) => {
          formDataObj.append(`images[${index}]`, image);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
        formDataObj
      );
      if (response.status === 200) {
        toast.success("Post created successfully!");
        setFormData({
          title: "",
          price: "",
          desc: "",
          images: [],
          address: "",
          city: "",
          bedrooms: "",
          bathrooms: "",
          latitude: "",
          longitude: "",
          property: "",
          type: "",
          utilities: "",
          size: "",
        });
      } else {
        toast.error("Failed to create post.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the post.");
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="bg-blue-100 p-12 rounded-2xl mb-6">
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
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
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                rows={6}
                placeholder="Enter a description"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter an address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Enter a city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="property">Property</Label>
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
                <Label htmlFor="property">Type</Label>
                <Select
                  id="property"
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
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  placeholder="Enter number of bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
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
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  placeholder="Enter latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  placeholder="Enter longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="utilities">Utilities</Label>
                <Input
                  id="utilities"
                  placeholder="Enter utilities"
                  value={formData.utilities}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  type="number"
                  placeholder="Enter size"
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="income">Income</Label>
                <Input
                  id="income"
                  type="number"
                  placeholder="Enter income"
                  value={formData.income}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <Button type="submit">Create Post</Button>
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
                  src="/placeholder.svg"
                  alt="Property Image"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  Showcase Your Property
                </h2>
                <p className="text-muted-foreground text-lg">
                  List your property on our platform to reach a wide audience of
                  potential buyers and renters.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}