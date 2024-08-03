"use client";

import React, { useContext, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import AuthContext from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import ImageUploader from "@/components/ui/ImageUploader";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    street: user?.street || "",
    locality: user?.locality || "",
    state: user?.state || "",
    role: user?.role || "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      street: user?.street || "",
      locality: user?.locality || "",
      state: user?.state || "",
      role: user?.role || "",
      avatar: user?.avatar || "",
    }));
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      avatar: imageUrl,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        updateUser(response.data.user);
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20">
      <div className="bg-blue-100 p-12 rounded-2xl mb-6">
        <h1 className="text-4xl lg:text-6xl font-bold">My Profile</h1>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Image
            src={formData.avatar || ""}
            width={100}
            height={100}
            alt="User Profile"
            className="rounded-full h-20 w-20 mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user?.username}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">Role: {user?.role}</p>
          </div>
        </div>
        <Separator />
        <h2 className="text-xl font-semibold my-4">My Details</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4"
        >
          <div className="flex items-center gap-4">
            <ImageUploader onImageUpload={handleImageUpload} />
          </div>
          <div className="mt-1 block w-full">
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) =>
                handleInputChange({
                  target: { name: "role", value: e.target.value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Individual</SelectItem>
                <SelectItem value="AGENT">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name*
            </Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 block w-full"
              placeholder="John"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 block w-full"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full"
              placeholder="youremail@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile
            </Label>
            <Input
              type="text"
              id="mobile"
              name="mobile"
              className="mt-1 block w-full"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700"
            >
              Street*
            </Label>
            <Input
              type="text"
              id="street"
              name="street"
              className="mt-1 block w-full"
              placeholder="Your street address"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              htmlFor="locality"
              className="block text-sm font-medium text-gray-700"
            >
              Locality
            </Label>
            <Input
              type="text"
              id="locality"
              name="locality"
              className="mt-1 block w-full"
              placeholder="Your locality"
              value={formData.locality}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </Label>
            <Input
              type="text"
              id="state"
              name="state"
              className="mt-1 block w-full"
              placeholder="Your state"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button type="submit" className="mt-4 w-full">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
