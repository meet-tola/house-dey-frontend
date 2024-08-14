import React from "react";
import { Button } from "./ui/button";
import { Bed, Bath, Car, Home, MapPin } from "lucide-react";

const properties = [
  {
    image: "https://via.placeholder.com/300x200",
    title: "Luxury Shop in VI",
    price: "₦155,000/month",
    address: "1/498 Toorak Road, Toorak, VI",
    type: "Shop",
  },
  {
    image: "https://via.placeholder.com/300x200",
    title: "Modern House in Apapa",
    price: "₦650,000/month",
    address: "39 Albert Street, Apapa Port",
    type: "House",
  },
  {
    image: "https://via.placeholder.com/300x200",
    title: "Spacious Apartment in New Road",
    price: "₦200,000/month",
    address: "13 Watersedge Terrace, New Road",
    type: "Apartment",
  },
  {
    image: "https://via.placeholder.com/300x200",
    title: "Affordable Hostel in Camberwell",
    price: "₦355,000/month",
    address: "22 Lockhart Street, Camberwell",
    type: "Hostel",
  },
];

const PropertyCard = ({ image, title, price, address, type }) => {
  return (
    <div className="min-w-[300px] lg:min-w-[250px] w-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={address} />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex gap-2">
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
              Rent
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
              {type}
            </div>
          </div>
          <div className="text-lg font-semibold mt-2 truncate">{title}</div>
          <div className="text-gray-600 flex items-center mb-2 truncate">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{address}</span>
          </div>
          <div className="text-xl font-semibold truncate">{price}</div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  return (
    <div className="py-10 px-4 md:px-16">
      <h2 className="text-2xl font-semibold mb-4">
        Featured Properties for Rent
      </h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-none">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
