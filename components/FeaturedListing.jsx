import React from 'react';
import { Button } from './ui/button';

const properties = [
  {
    id: 1,
    image: 'house.png',
    price: '$2,120,000',
    address: '103 High Street, Glen Iris, VIC 3146',
    agency: 'Marshall White',
  },
  {
    id: 2,
    image: 'house.png',
    price: '$6,595,000',
    address: '11 Tivoli Place, South Yarra, VIC 3141',
    agency: 'Marshall White',
  },
  {
    id: 3,
    image: 'house.png',
    price: '$2,200,000 - $2,400,000',
    address: '12A Lowe Street, Mount Eliza, VIC 3930',
    agency: 'Marshall White',
  },
  {
    id: 4,
    image: 'house.png',
    price: '$2,900,000 - $3,100,000',
    address: '208 Pigdon Street, Princes Hill, VIC 3054',
    agency: 'Z Real Estate',
  },
];

const PropertyCard = ({ property }) => (
  <div className="max-w-[20rem] rounded-2xl shadow-lg m-4">
    <img className="w-full rounded-2xl p-2" src={property.image} alt="Property" />
    <div className="px-6 py-4">
      <div className="flex justify-between w-full font-bold text-xl mb-2">{property.agency} <Button variant="outline">Rent</Button> </div>
      <p className="text-gray-700 text-base">{property.price}</p>
      <p className="text-gray-700 text-base">{property.address}</p>
    </div>
  </div>
);

const FeaturedProperties = () => (
  <div className="flex flex-wrap justify-center">
    {properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
);

export default FeaturedProperties;
