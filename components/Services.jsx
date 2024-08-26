import React from 'react';
import { Home, MapPin, Gavel, User, DollarSign, MessageCircle, Newspaper, PlusCircle } from 'lucide-react';

const services = [
  { icon: Home, text: 'Show properties' },
  { icon: User, text: 'Find a real estate agent' },
  { icon: MapPin, text: 'View location results' },
  { icon: DollarSign, text: 'Find a desire home property' },
  { icon: MessageCircle, text: 'Message communication' },
  { icon: PlusCircle, text: 'Post a house request' },
  { icon: Newspaper, text: 'Blog' },
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
