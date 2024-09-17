"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
import { Pagination } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Search, Plus, Filter, HouseIcon } from "lucide-react";
import { fetchRequests, fetchAllRequests } from "@/utils/request";
import { useRouter } from "next/navigation";

export default function PropertyRequestPage() {
  const [searchQuery, setSearchQuery] = useState("");
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
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 8;
  const router = useRouter();

  // Fetch all property requests
  useEffect(() => {
    async function getAllRequests() {
      try {
        const response = await fetchAllRequests();
        setPropertyRequests(response || []);
        setFilteredRequests(response || []);
      } catch (error) {
        console.error("Error fetching all requests:", error);
      }
    }
    getAllRequests();
  }, []);

  // Fetch filtered property requests
  useEffect(() => {
    async function getFilteredRequests() {
      try {
        const queryString = buildQueryString(filters, searchQuery);
        const response = await fetchRequests(queryString);
        console.log("response", response);
        setFilteredRequests(response || []);
      } catch (error) {
        console.error("Error fetching filtered requests:", error);
      }
    }
    getFilteredRequests();
  }, [searchQuery, filters]);

  function buildQueryString(filters, searchQuery) {
    const params = new URLSearchParams();

    if (searchQuery) params.append("searchQuery", searchQuery);
    if (filters.type) params.append("type", filters.type);
    if (filters.property) params.append("property", filters.property);
    if (filters.minBudget) params.append("minBudget", filters.minBudget);
    if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);
    if (filters.city) params.append("city", filters.city);
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
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="For Sale">For Sale</SelectItem>
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
                <Label htmlFor="filterCity">City</Label>
                <Input
                  id="filterCity"
                  placeholder="City"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentRequests.map((request) => (
          <Card key={request.id} className="flex flex-col">
            <CardContent className="flex-grow">
              <h3 className="font-semibold mt-4 mb-2">{request.title}</h3>
              <p>Type: {request.type}</p>
              <p>Request Type: {request.property}</p>
              <p>Budget: {request.budget}</p>
              <p>Location: {request.address}</p>
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

      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

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
                <strong>Budget:</strong> {selectedRequest.budget}
              </p>
              <p>
                <strong>Location:</strong> {selectedRequest.address}
              </p>
              <p>
                <strong>Other:</strong> {selectedRequest.requestDetail.city},{" "}
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
