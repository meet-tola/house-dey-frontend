import React from 'react';
import { Home, MapPin, Gavel, User, DollarSign, Shield, Newspaper } from 'lucide-react';

const services = [
  { icon: Home, text: 'Estimate your property value' },
  { icon: MapPin, text: 'Explore location profiles' },
  { icon: Gavel, text: 'View auction results' },
  { icon: User, text: 'Find a real estate agent' },
  { icon: DollarSign, text: 'Find a home loan' },
  { icon: Shield, text: 'Get home insurance' },
  { icon: Newspaper, text: 'Latest property news' }
];

const Services = () => {
  return (
    <div className="container py-10 px-4 md:px-16">
      <div className="flex gap-16 overflow-x-auto scrollbar-none pb-10 border-b-2 border-gray-200">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <div className="bg-blue-100 p-6 rounded-full mb-2">
              <service.icon className="font-light text-blue-600" size={32} absoluteStrokeWidth={true} />
            </div>
            <p className="text-center">{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
