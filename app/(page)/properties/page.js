"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  BedIcon,
  DollarSignIcon,
  FilterIcon,
  ShowerHeadIcon,
  HomeIcon,
  Loader,
  Heart,
  Bed,
  Bath,
  Home,
  SearchIcon,
  Search,
  Map,
  Locate,
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
import { fetchPosts, savePost } from "@/utils/post";
import { toast } from "react-hot-toast";
import NoPropertiesFound from "@/components/NoPropertiesFound";
import GoogleMapComponent from "@/components/map/GoogleMap";
import AddressAutocomplete from "@/components/map/AddressAutoComplete";
import Link from "next/link";
import CityAutocomplete from "@/components/map/CityAutoComplete";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState({});
  const [filters, setFilters] = useState({
    address: searchParams.get("address") || "",
    city: searchParams.get("city") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    type: searchParams.get("type") || "",
    property: searchParams.get("property") || "",
  });

  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    setLoading(true);
    fetchPosts(filters)
      .then((data) => {
        setProperties(data);
        setIsFilterOpen(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await fetchPosts(filters);
        if (!Array.isArray(data)) {
          const propertiesArray = Object.values(data);
          setProperties(propertiesArray);
        } else {
          setProperties(data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleSavePost = async (postId) => {
    try {
      const response = await savePost(postId);
      if (response) {
        setSavedProperties((prevSavedProperties) => ({
          ...prevSavedProperties,
          [postId]: !prevSavedProperties[postId],
        }));

        toast.success(
          savedProperties[postId]
            ? "This property has been removed from saved list"
            : "This property has been saved"
        );
      } else {
        toast.error("Failed to save/unsave property");
      }
    } catch (error) {
      console.error("Error saving/removing the post:", error);
      toast.error("An error occurred while saving/removing the property.");
    }
  };

  const handleViewMap = (address) => {
    setSelectedAddress(address);
    setIsMapOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getHeaderText = () => {
    if (filters.type && filters.city) {
      return `Properties for ${filters.type} in ${filters.city}`;
    }
    return "Properties";
  };

  const handleAddressSelect = (address) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      address: address,
    }));
  };
  const handleCitySelect = (city) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      city: city,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen mt-16">
      {/* Header with Search and Filters */}
      <div className="sticky top-16 z-10 py-4 px-4 md:px-16 bg-white shadow-md w-full">
        {/* Visible Filters on Large Screens */}
        <div className="max-w-full mx-auto">
          <div className="w-full flex justify-center">
            <div className="hidden md:flex gap-2 justify-center items-center w-full">
              <div className="relative flex-grow max-w-[300px]">
                <CityAutocomplete onCitySelect={handleCitySelect} />
              </div>
              <div className="relative w-32">
                <AddressAutocomplete onAddressSelect={handleAddressSelect} />
              </div>

              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  ₦
                </span>
                <Input
                  name="minPrice"
                  placeholder="Min Price"
                  className="pl-7 pr-3 py-2 w-full"
                  value={filters.minPrice}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>

              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                  ₦
                </span>
                <Input
                  name="maxPrice"
                  placeholder="Max Price"
                  className="pl-7 pr-3 py-2 w-full"
                  value={filters.maxPrice}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>

              <div className="relative w-32">
                <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  name="bedrooms"
                  placeholder="Bedrooms"
                  className="pl-9 pr-3 py-2 w-full"
                  value={filters.bedrooms}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>

              <div className="relative w-32">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                  <SelectTrigger className="pl-9 pr-3 py-2 w-full">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative w-32">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                  <SelectTrigger className="pl-9 pr-3 py-2 w-full">
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

              <Button
                onClick={handleSearch}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2 h-4 w-4" /> Searching
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" /> Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Button for Small Screens */}
        <div className="md:hidden flex justify-between gap-2 w-full">
          <CityAutocomplete onCitySelect={handleCitySelect} />

          <div className="flex gap-2">
            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="h-10 bg-primary flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" />
                </>
              ) : (
                <>
                  <SearchIcon className="h-4 w-4 text-white" />
                </>
              )}
            </Button>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Search Filters</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Address Input */}
                  <AddressAutocomplete onAddressSelect={handleAddressSelect} />

                  {/* Min Price Input */}
                  <div className="flex items-center border rounded-lg px-2 py-1 h-10">
                    <span className="text-gray-400 text-sm mr-3">₦</span>
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
                    <span className="text-gray-400 text-sm mr-3">₦</span>
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
                <DialogFooter className="gap-2">
                  <Button onClick={handleSearch} disabled={loading}>
                    {loading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      "Apply Filters"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Cancel
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
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {properties.length ? (
              properties.map((property) => (
                <div
                  key={property.id}
                  className="border rounded-lg p-4 shadow-sm relative"
                >
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleSavePost(property.id)}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          savedProperties[property.id]
                            ? "fill-red-500"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="sr-only">
                        {savedProperties[property.id] ? "Unsave" : "Save"}
                      </span>
                    </Button>
                  </div>

                  {property.images && property.images.length > 0 ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  <Link
                    className="space-y-1"
                    href={`/properties/${property.id}`}
                  >
                    <h3 className="text-lg font-semibold mb-2 truncate">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      {property.address}
                    </p>
                    <div className="flex space-x-4">
                      <span className="flex items-center">
                        <Bed className="mr-1 h-4 w-4" /> {property.bedrooms}
                      </span>
                      <span className="flex items-center">
                        <Bath className="mr-1 h-4 w-4" /> {property.bathrooms}
                      </span>
                      <span className="flex items-center">
                        <Home className="mr-1 h-4 w-4" /> {property.size} sqft
                      </span>
                    </div>
                    <p className="font-bold text-xl">
                      {formatPrice(property.price)}
                    </p>
                  </Link>
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleViewMap(property.address)}
                    >
                      <Map className="mr-2 h-4 w-4" />
                      View Map
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full">
                <NoPropertiesFound />
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        <div className=" hidden md:block md:w-1/2 relative mt-4">
          <div className="absolute inset-0">
            {selectedAddress ? (
              <GoogleMapComponent address={selectedAddress} />
            ) : (
              <div className="w-[100%] h-[100%] bg-slate-300 flex justify-center items-center">
                <p>Select a property to view the map</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Dialog Popup for Smaller Screens */}
        {isSmallScreen && (
          <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Property Location</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                {selectedAddress && (
                  <GoogleMapComponent address={selectedAddress} />
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setIsMapOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
