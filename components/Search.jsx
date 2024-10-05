"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HomeIcon, MapPinIcon, DollarSignIcon, Loader2 } from "lucide-react";
import CityAutocomplete from "./map/CityAutoComplete";

export default function Search() {
  const [activeTab, setActiveTab] = useState("buy");
  const [property, setProperty] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };
  const handleSearch = () => {
    setLoading(true);

    const query = {
      city: city || undefined,
      type: activeTab,
      property: property || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    };

    const queryString = Object.keys(query)
      .filter((key) => query[key] !== undefined)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
      )
      .join("&");

    router.push(`/properties?${queryString}`);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex space-x-2 bg-white p-4 rounded-t-xl border-b-2 border-gray-200">
        <Button
          variant={activeTab === "buy" ? "default" : "outline"}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </Button>
        <Button
          variant={activeTab === "rent" ? "default" : "outline"}
          onClick={() => setActiveTab("rent")}
        >
          Rent
        </Button>
      </div>
      <div className="bg-white p-4 rounded-b-xl rounded-tr-xl shadow-lg">
        <div className="flex flex-wrap gap-2">
          <div className="flex w-full md:w-auto">
            <CityAutocomplete onCitySelect={handleCitySelect} />
          </div>
          <div className="flex items-center w-full md:w-auto border rounded-lg px-2 py-1">
            <HomeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <Select
              name="property"
              onValueChange={(value) => setProperty(value)}
            >
              <SelectTrigger className="w-full border-none focus:ring-0">
                <SelectValue placeholder="Property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <div className="flex items-center w-full md:w-auto border rounded-lg px-2 py-1">
              <div className="h-5 w-5 text-gray-400 mr-2">₦</div>
              <Select onValueChange={(value) => setMinPrice(value)}>
                <SelectTrigger className="w-full border-none focus:ring-0">
                  <SelectValue placeholder="Min Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50000">₦50,000</SelectItem>
                  <SelectItem value="100000">₦100,000</SelectItem>
                  <SelectItem value="200000">₦200,000</SelectItem>
                  <SelectItem value="300000">₦300,000</SelectItem>
                  <SelectItem value="400000">₦400,000</SelectItem>
                  <SelectItem value="500000">₦500,000</SelectItem>
                  <SelectItem value="600000">₦600,000</SelectItem>
                  <SelectItem value="700000">₦700,000</SelectItem>
                  <SelectItem value="800000">₦800,000</SelectItem>
                  <SelectItem value="800000">₦900,000</SelectItem>
                  <SelectItem value="1000000">₦1,000,000</SelectItem>
                  <SelectItem value="2000000">₦2,000,000</SelectItem>
                  <SelectItem value="3000000">₦3,000,000</SelectItem>
                  <SelectItem value="4000000">₦4,000,000</SelectItem>
                  <SelectItem value="5000000">₦5,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center w-full md:w-auto border rounded-lg px-2 py-1">
              <div className="h-5 w-5 text-gray-400 mr-2">₦</div>
              <Select onValueChange={(value) => setMaxPrice(value)}>
                <SelectTrigger className="w-full border-none focus:ring-0">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100000">₦100,000</SelectItem>
                  <SelectItem value="200000">₦200,000</SelectItem>
                  <SelectItem value="300000">₦300,000</SelectItem>
                  <SelectItem value="400000">₦400,000</SelectItem>
                  <SelectItem value="500000">₦500,000</SelectItem>
                  <SelectItem value="600000">₦600,000</SelectItem>
                  <SelectItem value="700000">₦700,000</SelectItem>
                  <SelectItem value="800000">₦800,000</SelectItem>
                  <SelectItem value="800000">₦900,000</SelectItem>
                  <SelectItem value="1000000">₦1,000,000</SelectItem>
                  <SelectItem value="2000000">₦2,000,000</SelectItem>
                  <SelectItem value="3000000">₦3,000,000</SelectItem>
                  <SelectItem value="4000000">₦4,000,000</SelectItem>
                  <SelectItem value="5000000">₦5,000,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            className="w-full md:w-auto h-auto"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
