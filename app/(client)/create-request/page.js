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
import { HouseIcon, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import CityAutocomplete from "@/components/map/CityAutoComplete";

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
    city: "",
    state: "",
    bedroom: "",
    budget: "",
    comment: "",
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
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

    const requestDetail = {
      comment: formData.comment || "",
      city: formData.city || "",
      state: formData.state || "",
      bedroom: formData.bedroom ? parseInt(formData.bedroom, 10) : null,
    };

    const requestPayload = {
      title: formData.property || "",
      budget: parseInt(formData.budget, 100000000) || null,
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
          city: "",
          state: "",
          bedroom: "",
          budget: "",
          comment: "",
        });

        router.refresh("/my-requests");
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
          Create a Requests
        </div>
        <Link href="/my-requests">
          <Button variant="outline">My Requests</Button>
        </Link>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">Request for a Property</h1>
        <p className="text-muted-foreground text-md">
          Fill out the form below to create your desire property.
        </p>
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
            <Label htmlFor="state">City</Label>
            <CityAutocomplete onCitySelect={handleCitySelect} />
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
            <Label htmlFor="bedroom">Bedroom(Optional)</Label>
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
              placeholder="number"
              value={formData.budget}
              onChange={handleInputChange}
              required
            />
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
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>
    </div>
  );
}
