"use client";

import React, { useContext, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import Image from "next/image";
import ImageUploader from "@/components/ui/ImageUploader";
import { Loader } from "lucide-react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingRole, setPendingRole] = useState("");

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

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
    setFormData({
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

  const handleRoleToggle = () => {
    const newRole = formData.role === "AGENT" ? "CLIENT" : "AGENT";
    setPendingRole(newRole);
    setDialogOpen(true);
  };

  const handleConfirmRoleChange = async () => {
    setDialogOpen(false);
    setLoading(true);

    try {
      const response = await axios.put(`${API_URL}/api/user/${user.id}`, {
        ...formData,
        role: pendingRole,
      });
      if (response.status === 200) {
        toast.success("Role updated successfully!");
        updateUser(response.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          role: pendingRole,
        }));
      } else {
        console.error("Unexpected response status:", response.status);
        toast.error("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update role.");
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
      <div className="max-w-7xl mx-auto p-6 mt-20">
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
            <img
              src={formData.avatar || ""}
              width={100}
              height={100}
              alt="User Profile"
              className="rounded-full h-20 w-20 mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-600">Role: {formData.role}</p>
            </div>
          </div>
          <Separator />
          <h2 className="text-xl font-semibold my-4">My Details</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4"
          >
            <div className="flex items-center gap-4">
              <ImageUploader
                onImageUpload={handleImageUpload}
                multiple={false}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="role-switch">Role</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between individual and agent modes
                  </p>
                </div>
                <Switch
                  id="role-switch"
                  checked={formData.role === "AGENT"}
                  onCheckedChange={handleRoleToggle}
                />
              </div>
              <p className="text-sm">
                {formData.role === "AGENT"
                  ? "You are currently in Agent mode. You can handle multiple conversations."
                  : "You are currently in Individual mode. You can only handle one conversation at a time."}
              </p>
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
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Role Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to switch to{" "}
              {pendingRole === "AGENT" ? "Agent" : "Individual"} mode? This will
              change all your user settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRoleChange}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
