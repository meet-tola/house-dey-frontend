"use client";

import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { HouseIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
import AddressAutocomplete from "@/components/map/AddressAutoComplete";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export default function CreateRequestPage() {
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    property: "",
    type: "",
    requestType: "",
    address: "",
    city: "",
    state: "",
    bedroom: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
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

    const requestDetail = {
      comment: formData.comment || "",
      budget: formData.budget || "",
      phoneNumber: formData.phone || "",
      email: formData.email || "",
    };

    const requestPayload = { 
      title: formData.property || "",
      address: formData.address || "",
      city: formData.city || "",
      state: formData.state || "",
      bedroom: formData.bedroom || "",
      role: formData.role || "",
      type: formData.type || "",
      property: formData.property || "",
      userId: userId || "",
      requestDetail,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/requests`,
        requestPayload
      );
      if (response.status === 200) {
        toast.success("Request created successfully!");
        setFormData({
          title: "",
          property: "",
          type: "",
          address: "",
          city: "",
          state: "",
          bedroom: "",
          budget: "",
          name: "",
          email: "",
          phone: "",
          role: "",
          comment: "",
        });
      } else {
        toast.error("Failed to create request.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the request.");
      console.error("Error creating request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-16 mt-20">
      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl mb-6">
        <div className="flex items-center justify-between gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          Create Request
        </div>
        <Link href="/create-request">
          <Button variant="outline">Back to Requests</Button>
        </Link>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="property">Property Title</Label>
            <Input
              id="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
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
                <SelectValue placeholder="Select Type" />
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
            <Label htmlFor="requestType">For Rent or Sale</Label>
            <Select
              id="type"
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
                <SelectValue placeholder="Select Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="buy">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">City</Label>
            <Input
              id="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedroom">Bedroom</Label>
            <Input
              id="bedroom"
              type="number"
              placeholder="Number of Bedrooms"
              value={formData.bedroom}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              id="role"
              value={formData.role}
              onValueChange={(value) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  role: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            placeholder="Add any additional comments or requirements"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className="w-full">
          {loading ? (
            <div>
              <Loader className="animate-spin" />
            </div>
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>
    </div>
  );
}
