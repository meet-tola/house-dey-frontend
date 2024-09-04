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

export default function PropertyRequestPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    requestType: "",
    minBudget: "",
    maxBudget: "",
    location: "",
  });
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 8;

  // Mock data for property requests
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "2 Bedroom Apartment",
        type: "Apartment",
        requestType: "For Rent",
        budget: "$2000/month",
        location: "New York, NY",
        date: "2023-07-01",
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        role: "Individual",
      },
      {
        id: 2,
        title: "3 Bedroom House",
        type: "House",
        requestType: "For Sale",
        budget: "$500,000",
        location: "Los Angeles, CA",
        date: "2023-06-28",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        role: "Agent",
      },
      {
        id: 3,
        title: "Studio Apartment",
        type: "Apartment",
        requestType: "For Rent",
        budget: "$1200/month",
        location: "Boston, MA",
        date: "2023-06-25",
        name: "Bob Johnson",
        email: "bob@example.com",
        phone: "456-789-0123",
        role: "Individual",
      },
      {
        id: 4,
        title: "1 Bedroom Condo",
        type: "Condo",
        requestType: "For Sale",
        budget: "$300,000",
        location: "Miami, FL",
        date: "2023-07-02",
        name: "Alice Brown",
        email: "alice@example.com",
        phone: "789-012-3456",
        role: "Agent",
      },
      {
        id: 5,
        title: "4 Bedroom Villa",
        type: "House",
        requestType: "For Rent",
        budget: "$5000/month",
        location: "San Francisco, CA",
        date: "2023-07-05",
        name: "Charlie Davis",
        email: "charlie@example.com",
        phone: "234-567-8901",
        role: "Individual",
      },
      {
        id: 6,
        title: "2 Bedroom Townhouse",
        type: "Townhouse",
        requestType: "For Sale",
        budget: "$400,000",
        location: "Chicago, IL",
        date: "2023-07-03",
        name: "Eva Wilson",
        email: "eva@example.com",
        phone: "345-678-9012",
        role: "Agent",
      },
      {
        id: 7,
        title: "Luxury Penthouse",
        type: "Apartment",
        requestType: "For Rent",
        budget: "$10000/month",
        location: "Las Vegas, NV",
        date: "2023-07-06",
        name: "Frank Miller",
        email: "frank@example.com",
        phone: "456-789-0123",
        role: "Individual",
      },
      {
        id: 8,
        title: "Beachfront Cottage",
        type: "House",
        requestType: "For Sale",
        budget: "$750,000",
        location: "Malibu, CA",
        date: "2023-07-04",
        name: "Grace Taylor",
        email: "grace@example.com",
        phone: "567-890-1234",
        role: "Agent",
      },
      {
        id: 9,
        title: "Modern Loft",
        type: "Apartment",
        requestType: "For Rent",
        budget: "$3000/month",
        location: "Seattle, WA",
        date: "2023-07-07",
        name: "Henry Clark",
        email: "henry@example.com",
        phone: "678-901-2345",
        role: "Individual",
      },
      {
        id: 10,
        title: "Mountain Cabin",
        type: "House",
        requestType: "For Sale",
        budget: "$350,000",
        location: "Denver, CO",
        date: "2023-07-08",
        name: "Ivy Anderson",
        email: "ivy@example.com",
        phone: "789-012-3456",
        role: "Agent",
      },
    ];
    setPropertyRequests(mockData);
    setFilteredRequests(mockData);
  }, []);

  useEffect(() => {
    const filtered = propertyRequests.filter((request) => {
      return (
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filters.type === "" || request.type === filters.type) &&
        (filters.requestType === "" ||
          request.requestType === filters.requestType) &&
        (filters.minBudget === "" ||
          parseBudget(request.budget) >= parseBudget(filters.minBudget)) &&
        (filters.maxBudget === "" ||
          parseBudget(request.budget) <= parseBudget(filters.maxBudget)) &&
        (filters.location === "" ||
          request.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()))
      );
    });
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [searchQuery, filters, propertyRequests]);

  function parseBudget(budget) {
    return parseInt(budget.replace(/[^0-9]/g, ""));
  }

  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="container mx-auto px-4 md:px-16 mt-20">
      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl mb-4">
        <div className="flex items-center justify-between gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          Property Requests
        </div>
        <Link href="/create-request">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Request
          </Button>
        </Link>
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
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Requests</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="filterType">Property Type</Label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger id="filterType">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterRequestType">Request Type</Label>
                <Select value={filters.requestType} onValueChange={(value) => handleFilterChange('requestType', value)}>
                  <SelectTrigger id="filterRequestType">
                    <SelectValue placeholder="Select Request Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
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
                  onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterMaxBudget">Max Budget</Label>
                <Input
                  id="filterMaxBudget"
                  type="number"
                  placeholder="Max Budget"
                  value={filters.maxBudget}
                  onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterLocation">Location</Label>
                <Input
                  id="filterLocation"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={() => setIsFilterDialogOpen(false)}>Apply Filters</Button>
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
              <p>Request Type: {request.requestType}</p>
              <p>Budget: {request.budget}</p>
              <p>Location: {request.location}</p>
              <p>Date: {request.date}</p>
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
                <strong>Request Type:</strong> {selectedRequest.requestType}
              </p>
              <p>
                <strong>Budget:</strong> {selectedRequest.budget}
              </p>
              <p>
                <strong>Location:</strong> {selectedRequest.location}
              </p>
              <p>
                <strong>Date:</strong> {selectedRequest.date}
              </p>
              <p>
                <strong>Name:</strong> {selectedRequest.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRequest.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRequest.phone}
              </p>
              <p>
                <strong>Role:</strong> {selectedRequest.role}
              </p>
            </div>
            <CardFooter className="flex justify-end">
            <Button className="w-full">Send User Message</Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
