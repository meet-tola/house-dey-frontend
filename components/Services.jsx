import { Home, MapPin, User, DollarSign, MessageCircle, PlusCircle, Newspaper } from "lucide-react"

const services = [
  { icon: Home, text: "Show properties" },
  { icon: User, text: "Find a real estate agent" },
  { icon: MapPin, text: "View location results" },
  { icon: DollarSign, text: "Find a desire home property" },
  { icon: MessageCircle, text: "Message communication" },
  { icon: PlusCircle, text: "Post a house request" },
  { icon: Newspaper, text: "Blog" },
]

export default function Services() {
  return (
    <div className="container py-10 px-4 md:px-16">
      <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-none">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center min-w-[100px]">
            <service.icon className="text-primary mb-2" size={24} />
            <p className="text-sm text-center text-muted-foreground">{service.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}