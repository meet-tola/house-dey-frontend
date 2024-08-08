import React from "react";
import { Button } from "./ui/button";
import { Bed, Bath, Car, Home } from "lucide-react";

const properties = [
  {
    image: "/path/to/image.jpg",
    title: "Listing Title",
    price: "₦155,000",
    address: "1/498 Toorak Road, Toorak, VI",
    beds: 3,
    baths: 3,
    cars: 3,
    type: "Shop",
  },
  {
    image: "/path/to/image.jpg",
    title: "Listing Title",
    price: "₦650,000",
    address: "39 Albert Street, Apapa Port",
    beds: 3,
    baths: 2,
    cars: 2,
    type: "House",
  },
  {
    image: "/path/to/image.jpg",
    title: "Listing Title",
    price: "₦200,000",
    address: "13 Watersedge Terrace, New road",
    beds: 5,
    baths: 2,
    type: "Apartment",
  },
  {
    image: "/path/to/image.jpg",
    title: "Listing Title",
    price: "₦355,000",
    address: "22 Lockhart Street, Camberwell,",
    beds: 3,
    baths: 2,
    cars: 2,
    type: "Hostel",
  },
];

const PropertyCard = ({ image, title, price, address, beds, baths, cars, type }) => {
  return (
    <div className="min-w-[300px] lg:min-w-[250px] w-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={address} />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="text-lg font-semibold mb-2 flex items-center justify-between">
            {title}
            <Button className="ml-2 bg-blue-100 text-blue-700 px-2" variant="outline">
              Rent
            </Button>
          </div>
          <div className="text-gray-600 mb-2">{address}</div>
          <div className="text-xl font-semibold mb-4">{price}</div>
        </div>
        <div className="flex items-center text-gray-600 mt-auto bg-gray-100 p-2 rounded-md">
          <span className="flex items-center mr-4">
            <Bed className="h-5 w-5 mr-1" />
            {beds}
          </span>
          <span className="flex items-center mr-4">
            <Bath className="h-5 w-5 mr-1" />
            {baths}
          </span>
          <span className="flex items-center mr-4">
            <Car className="h-5 w-5 mr-1" />
            {cars}
          </span>
          <span className="flex items-center">
            <Home className="h-5 w-5 mr-1" />
            {type}
          </span>
        </div>
      </div>
    </div>
  );
};

const FeaturedProperties = () => {
  return (
    <div className="py-10 px-4 md:px-16">
      <h2 className="text-2xl font-semibold mb-4">Featured Properties for Rent</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-none">
        {properties.map((property, index) => (
          <PropertyCard key={index} {...property} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
