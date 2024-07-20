"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SearchIcon, MapPinIcon, DollarSignIcon } from "lucide-react";

export default function Search() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <div className="flex flex-col items-start">
      <div className="flex space-x-2 bg-white p-4 rounded-t-xl border-b-2 border-gray-200">
        <Button variant={activeTab === "buy" ? "default" : "outline"} onClick={() => setActiveTab("buy")}>
          Buy
        </Button>
        <Button variant={activeTab === "rent" ? "default" : "outline"} onClick={() => setActiveTab("rent")}>
          Rent
        </Button>
      </div>
      <div className="bg-white p-6 rounded-b-xl rounded-tr-xl shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center w-full md:w-auto border rounded-lg px-3 py-2">
            <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
            <Input placeholder="Type your Search" className="w-full border-none focus:ring-0" />
          </div>
          <div className="flex items-center w-full md:w-auto border rounded-lg px-3 py-2">
            <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
            <Input placeholder="Apapa, Lagos" className="w-full border-none focus:ring-0" />
          </div>
          <div className="flex items-center w-full md:w-auto border rounded-lg px-3 py-2">
            <DollarSignIcon className="h-5 w-5 text-gray-400 mr-2" />
            <Select>
              <SelectTrigger className="w-full border-none focus:ring-0">
                <SelectValue placeholder="$ 100,000 - $150,000" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="$ 100,000 - $150,000">$ 100,000 - $150,000</SelectItem>
                <SelectItem value="$ 150,000 - $200,000">$ 150,000 - $200,000</SelectItem>
                <SelectItem value="$ 200,000 - $250,000">$ 200,000 - $250,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto h-auto">Search</Button>
        </div>
      </div>
    </div>
  );
}
