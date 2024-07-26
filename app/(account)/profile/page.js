"use client";
import React, { useContext, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { UploadIcon } from "lucide-react";
import AuthContext from "@/context/AuthContext"; // Import your AuthContext
import axios from "axios"; // Import axios
import toast from "react-hot-toast"; // Import toast

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    locality: "",
    state: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      // Populate form with user data
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        street: user.street || "",
        locality: user.locality || "",
        state: user.state || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          <img
            src={user?.avatar || "https://via.placeholder.com/80"}
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline">
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload New Image
              </Button>
              <Input type="file" className="sr-only" />
            </div>
          </div>
          <div className="mt-1 block w-full">
            <Label htmlFor="role">Role</Label>
            <Select id="role" name="role" value={formData.role} onChange={handleInputChange}>
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
            <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
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
            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
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
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <Label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
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
            <Label htmlFor="street" className="block text-sm font-medium text-gray-700">
              Street*
            </Label>
            <Input
              type="text"
              id="street"
              name="street"
              className="mt-1 block w-full"
              placeholder="Enter your street"
              value={formData.street}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="locality" className="block text-sm font-medium text-gray-700">
              Locality
            </Label>
            <Input
              type="text"
              id="locality"
              name="locality"
              className="mt-1 block w-full"
              value={formData.locality}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </Label>
            <Input
              type="text"
              id="state"
              name="state"
              className="mt-1 block w-full"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </Label>
            <Input
              type="text"
              id="country"
              name="country"
              className="mt-1 block w-full"
              value="Nigeria"
              readOnly
            />
          </div>
          <div className="mt-6 flex justify-between items-center sm:col-span-2">
            <Button className="text-blue-600">Privacy Policy</Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
