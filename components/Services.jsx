import {
  Home,
  MapPin,
  User,
  DollarSign,
  MessageCircle,
  PlusCircle,
  Newspaper,
} from "lucide-react";

const services = [
  { icon: Home, text: "Find properties" },
  { icon: User, text: "Find a real estate agent" },
  { icon: MapPin, text: "View location results" },
  { icon: DollarSign, text: "Find your budget properties." },
  { icon: MessageCircle, text: "Agent & Client Messaging." },
  { icon: PlusCircle, text: "Request for a property." },
  { icon: Newspaper, text: "Blog about properties." },
];

export default function Services() {
  return (
    <div className="container py-10 px-4 md:px-16">
      <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
      <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-none">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center min-w-[100px]">
            <service.icon className="text-primary mb-2" size={24} />
            <p className="text-sm text-center text-muted-foreground">
              {service.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
