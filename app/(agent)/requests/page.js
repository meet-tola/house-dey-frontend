"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Filter, HouseIcon, HomeIcon } from "lucide-react";
import { fetchRequests } from "@/utils/request";
import { useRouter } from "next/navigation";
import CityAutocomplete from "@/components/map/CityAutoComplete";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyRequestPage() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    property: "",
    minBudget: "",
    maxBudget: "",
    city: "",
    state: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 8; // Show 8 requests per page
  const router = useRouter();

  useEffect(() => {
    async function getFilteredRequests() {
      setIsLoading(true);
      try {
        const queryString = buildQueryString(filters);
        const response = await fetchRequests(queryString);

        const uniqueRequests = Array.from(
          new Set(response.map((request) => request.id))
        ).map((id) => response.find((request) => request.id === id));

        setFilteredRequests(uniqueRequests || []);
      } catch (error) {
        console.error("Error fetching filtered requests:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getFilteredRequests();
  }, [filters]);

  function buildQueryString(filters) {
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.type) params.append("type", filters.type);
    if (filters.property) params.append("property", filters.property);
    if (filters.minBudget) params.append("minBudget", filters.minBudget);
    if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);
    if (filters.state) params.append("state", filters.state);
    return `?${params.toString()}`;
  }

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;

  const currentRequests = (filteredRequests || []).slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(
    (filteredRequests || []).length / requestsPerPage
  );

  const handleListProperty = () => {
    router.push(`/create-post?requestId=${selectedRequest.id}`);
  };

  const handleCitySelect = (city) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      city: city,
    }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto px-4 md:px-16 mt-20">
      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl mb-4">
        <div className="flex items-center justify-between gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          Property Requests
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <CityAutocomplete onCitySelect={handleCitySelect} />
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Requests</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Filter form fields */}
              <div className="space-y-2">
                <Label htmlFor="filterType">Property Type</Label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger id="filterType">
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

              {/* Request type and Budget filters */}
              <div className="space-y-2">
                <Label htmlFor="filterRequestType">Request Type</Label>
                <Select
                  value={filters.property}
                  onValueChange={(value) =>
                    handleFilterChange("property", value)
                  }
                >
                  <SelectTrigger id="filterRequestType">
                    <SelectValue placeholder="Select Request Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">For Rent</SelectItem>
                    <SelectItem value="buy">For Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterMinBudget">Min Budget</Label>
                <Input
                  id="filterMinBudget"
                  type="number"
                  placeholder="Min Budget"
                  value={filters.minBudget}
                  onChange={(e) =>
                    handleFilterChange("minBudget", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterMaxBudget">Max Budget</Label>
                <Input
                  id="filterMaxBudget"
                  type="number"
                  placeholder="Max Budget"
                  value={filters.maxBudget}
                  onChange={(e) =>
                    handleFilterChange("maxBudget", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="filterState">State</Label>
                <Input
                  id="filterState"
                  placeholder="State"
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                />
              </div>
              <Button
                className="w-full"
                onClick={() => setIsFilterDialogOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* No requests found */}
      {isLoading ? (
        // Skeleton loading state
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="flex-grow">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="w-full max-w-md mx-auto h-[400px]">
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
            <div className="rounded-full bg-muted p-3">
              <HomeIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              No property requests found
            </h2>
            <p className="text-sm text-muted-foreground">
              Check back later or search for a different property.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Display current requests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentRequests.map((request) => (
              <Card key={request.id} className="flex flex-col">
                <CardContent className="flex-grow">
                  <h3 className="font-semibold mt-4 mb-2">{request.title}</h3>
                  <p>Type: {request.type}</p>
                  <p>Request Type: {request.property}</p>
                  <p>Budget: {formatPrice(request.budget)}</p>
                  <p>Location: {request?.requestDetail?.city}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination UI */}
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}

      {selectedRequest && (
        <Dialog open={true} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedRequest.title}</DialogTitle>
            </DialogHeader>
            <div>
              <p>
                <strong>Type:</strong> {selectedRequest.type}
              </p>
              <p>
                <strong>Request Type:</strong> {selectedRequest.property}
              </p>
              <p>
                <strong>Bedrooms:</strong> {selectedRequest.bedroom}
              </p>
              <p>
                <strong>Budget:</strong> {formatPrice(selectedRequest.budget)}
              </p>
              <p>
                <strong>Other:</strong>
                {selectedRequest.requestDetail.state}
              </p>
              <p>
                <strong>Comment:</strong>{" "}
                {selectedRequest.requestDetail.comment}
              </p>
            </div>
            <CardFooter className="flex justify-end">
              <Button className="w-full mt-4" onClick={handleListProperty}>
                List This Property
              </Button>{" "}
            </CardFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
