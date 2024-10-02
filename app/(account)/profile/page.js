"use client";

import React, { useContext, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AuthContext from "@/context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, UserIcon, Upload, Trash2 } from "lucide-react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    street: user?.street || "",
    locality: user?.locality || "",
    state: user?.state || "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      street: user?.street || "",
      locality: user?.locality || "",
      state: user?.state || "",
      avatar: user?.avatar || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Updated Image Upload Logic
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "bxmkzdav");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvvirefzi/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );
      const fileData = await res.json();

      const updatedData = { ...formData, avatar: fileData.secure_url };
      const response = await axios.put(
        `${API_URL}/api/user/${user.id}`,
        updatedData
      );

      if (response.status === 200) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: fileData.secure_url,
        }));
        updateUser({ ...user, avatar: fileData.secure_url });
        toast.success("Profile image uploaded successfully!");
      } else {
        toast.error("Failed to update profile after image upload.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Updated Image Delete Logic
  const handleImageDelete = async () => {
    setLoading(true);
    try {
      const updatedData = { ...formData, avatar: "" };
      const response = await axios.put(
        `${API_URL}/api/user/${user.id}`,
        updatedData
      );

      if (response.status === 200) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          avatar: "",
        }));
        updateUser({ ...user, avatar: "" });
        toast.success("Profile image deleted successfully!");
      } else {
        toast.error("Failed to delete profile image.");
      }
    } catch (error) {
      console.error("Error deleting profile image:", error);
      toast.error("Failed to delete profile image.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      toast.error("User ID is missing. Please try again.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/user/${user.id}`,
        formData
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        updateUser(response.data);
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
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
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
          <h1 className="text-4xl lg:text-6xl font-bold">My Profile</h1>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-6">
            {formData.avatar ? (
                <img
                  src={formData.avatar}
                  width={100}
                  height={100}
                  className="h-20 w-20 mr-4 object-cover rounded-full"
                  alt="Profile image"
                />
            ) : (
              <div className="rounded-full h-20 w-20 mr-4 flex items-center justify-center bg-gray-200">
                <UserIcon className="h-10 w-10 text-gray-500" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold truncate">
                {user?.username}
              </h2>
              <p className="text-gray-600 truncate">{user?.email}</p>
            </div>
          </div>
          <Separator />
          <h2 className="text-xl font-semibold my-4">My Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full bg-gray-200">
                {formData.avatar ? (
                  <>
                    <img
                      src={formData.avatar}
                      width={128}
                      height={128}
                      className="w-full h-full rounded-full object-cover"
                      alt="Profile image"
                    />
                    <button
                      onClick={handleImageDelete}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      aria-label="Delete profile image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <UserIcon className="w-full h-full p-4 text-gray-400" />
                )}
              </div>
              <div className="relative">
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary"
                >
                  {uploading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <Upload className="mr-2" />
                  )}
                  {uploading ? "Uploading..." : "Change Photo"}
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <Label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name/Company Name
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 block w-full"
                  placeholder="John"
                  value={formData.fullName}
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
                  type="tel"
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
                  Street
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
            </div>
            <div>
              <Button type="submit" className="w-full">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
