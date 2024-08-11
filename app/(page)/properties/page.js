"use client";
import React, { useState, useEffect } from "react";
import {
  MapPinIcon,
  BedIcon,
  DollarSignIcon,
  FilterIcon,
  ShowerHeadIcon,
  HomeIcon,
  Loader,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchPosts } from "@/utils/post";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await fetchPosts(filters);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []); // Only fetch properties on component mount, not on filter change

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const query = new URLSearchParams(filters).toString();
    router.push(`/properties?${query}`);

    // Fetch properties based on new filters
    setLoading(true);
    fetchPosts(filters)
      .then((data) => {
        setProperties(data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getHeaderText = () => {
    if (filters.type && filters.city) {
      return `Properties for ${filters.type} in ${filters.city}`;
    }
    return "Properties";
  };

  return (
    <div className="flex flex-col min-h-screen mt-16">
      {/* Header with Search and Filters */}
      <div className="sticky inset-x-0 top-16 z-10 flex justify-between items-center py-4 px-8 bg-white shadow-md">
        {/* Visible Filters on Large Screens */}
        <div className="hidden md:flex gap-2 justify-between items-center w-full">
          {/* City Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              name="city"
              placeholder="City"
              className="border-none focus:ring-0 text-sm h-8 w-40"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>

          {/* Min Price Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <DollarSignIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              name="minPrice"
              placeholder="Min Price"
              className="border-none focus:ring-0 text-sm h-8 w-28"
              value={filters.minPrice}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          {/* Max Price Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <DollarSignIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              name="maxPrice"
              placeholder="Max Price"
              className="border-none focus:ring-0 text-sm h-8 w-28"
              value={filters.maxPrice}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          {/* Bedrooms Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <BedIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              name="bedrooms"
              placeholder="Bedrooms"
              className="border-none focus:ring-0 text-sm h-8 w-28"
              value={filters.bedrooms}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          {/* Bathrooms Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <ShowerHeadIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              name="bathrooms"
              placeholder="Bathrooms"
              className="border-none focus:ring-0 text-sm h-8 w-28"
              value={filters.bathrooms}
              onChange={handleInputChange}
              type="number"
            />
          </div>

          {/* Type Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <HomeIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Select
              name="type"
              value={filters.type}
              onValueChange={(value) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  type: value,
                }))
              }
            >
              <SelectTrigger className="w-28 border-none focus:ring-0 h-8">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Category Input */}
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <HomeIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Select
              name="property"
              value={filters.property}
              onValueChange={(value) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  property: value,
                }))
              }
            >
              <SelectTrigger className="w-28 border-none focus:ring-0 h-8">
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

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="h-10 bg-primary flex items-center"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <FilterIcon className="h-4 w-4 text-white mr-2" />
                Search
              </>
            )}
          </Button>
        </div>

        {/* Filter Button for Small Screens */}
        <div className="md:hidden flex items-center justify-between w-full file:placeholder:backdrop:before:after:first:last:">
          
          <div className="flex items-center border rounded-lg px-2 py-1 h-10">
            <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              name="city"
              placeholder="City"
              className="border-none focus:ring-0 text-sm h-8 w-full"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2">
            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="h-10 bg-primary flex items-center"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <FilterIcon className="h-4 w-4 text-white mr-2" />
                  Search
                </>
              )}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Search Filters</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* City Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <MapPinIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      name="city"
                      placeholder="City"
                      className="border-none focus:ring-0 text-sm h-8 w-full"
                      value={filters.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Min Price Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <DollarSignIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      name="minPrice"
                      placeholder="Min Price"
                      className="border-none focus:ring-0 text-sm h-8 w-full"
                      value={filters.minPrice}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>

                  {/* Max Price Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <DollarSignIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      name="maxPrice"
                      placeholder="Max Price"
                      className="border-none focustext-sm h-8 w-full"
                      value={filters.maxPrice}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>
                  {/* Bedrooms Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <BedIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      name="bedrooms"
                      placeholder="Bedrooms"
                      className="border-none focus:ring-0 text-sm h-8 w-full"
                      value={filters.bedrooms}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>

                  {/* Bathrooms Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <ShowerHeadIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      name="bathrooms"
                      placeholder="Bathrooms"
                      className="border-none focus:ring-0 text-sm h-8 w-full"
                      value={filters.bathrooms}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>

                  {/* Type Input */}
                  <div className="flex items-center border rounded-lg px-2 py py-1 h-10">
                    <HomeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Select
                      name="type"
                      value={filters.type}
                      onValueChange={(value) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          type: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full border-none focus:ring-0 h-8">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="buy">Buy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Property Category Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <HomeIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Select
                      name="property"
                      value={filters.property}
                      onValueChange={(value) =>
                        setFilters((prevFilters) => ({
                          ...prevFilters,
                          property: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full border-none focus:ring-0 h-8">
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
                </div>
                <DialogFooter>
                  <Button onClick={handleSearch} disabled={loading}>
                    {loading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Apply Filters"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </div>
        </div>
      </div>

      {/* Main Content - Split into List and Map */}
      <div className="flex-1 flex">
        {/* Properties List */}
        <div className="w-full md:w-1/2 p-4 mt-4">
          <h2 className="text-xl font-semibold mb-4">{getHeaderText()}</h2>{" "}
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border rounded-lg p-4 shadow-sm"
              >
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="text-gray-600">{property.address}</p>
                <p className="text-blue-600">${property.price}</p>
                <p>
                  {property.bedroom} Bedrooms | {property.bathroom} Bathrooms
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 bg-gray-200">
            <p>Map Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
