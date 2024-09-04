import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from 'next/link'
import { HouseIcon } from "lucide-react"

export default function CreateRequestPage() {
  return (
    <div className="container mx-auto px-4 md:px-16 mt-20">
      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl mb-6">
        <div className="flex items-center justify-between gap-3 font-bold text-xl">
          <div className="p-2 bg-white rounded-full">
            <HouseIcon />
          </div>
          Create Request
        </div>
        <Link href="/create-request">
        <Button variant="outline">Back to Requests</Button>
        </Link>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="property">Property</Label>
            <Input id="property" placeholder="Property Title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select id="type">
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="requestType">For Rent or Sale</Label>
            <Select id="requestType">
              <SelectTrigger>
                <SelectValue placeholder="Select Request Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedroom">Bedroom</Label>
            <Input id="bedroom" type="number" placeholder="Number of Bedrooms" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input id="budget" placeholder="Budget" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Your Email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Your Phone Number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select id="role">
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea id="comment" placeholder="Add any additional comments or requirements" />
        </div>
        <Button type="submit" className="w-full">Submit Request</Button>
      </form>
    </div>
  )
}