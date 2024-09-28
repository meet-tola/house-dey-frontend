'use client'

import React, { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { fetchAllPosts } from "@/utils/post"
import Link from "next/link"
import { Button } from "./ui/button"
import PropertySkeleton from "./PropertySkeleton"

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const fetchedProperties = await fetchAllPosts()
      if (fetchedProperties) {
        setProperties(fetchedProperties)
      }
      setLoading(false)
    }

    fetchAndSetPosts()
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="py-10 px-4 md:px-16">
      <h2 className="text-2xl font-semibold mb-4">
        Sponsored Properties for Rent
      </h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-none">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))
          : properties.map((property, index) => (
              <div
                key={index}
                className="min-w-[300px] lg:min-w-[250px] w-[300px] rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative"
              >
                <Link href={`/properties/${property.id}`}>
                  <img
                    className="w-full h-48 object-cover"
                    src={
                      property.images?.[0] ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={property.address}
                  />
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex gap-2">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                          {property.property}
                        </div>
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm truncate">
                          {property.type}
                        </div>
                      </div>
                      <div className="text-lg font-semibold mt-2 truncate">
                        {property.title}
                      </div>
                      <div className="text-gray-600 flex items-center mb-2 truncate">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="truncate">{property.address}</span>
                      </div>
                      <div className="text-xl font-semibold truncate">
                        {formatPrice(property.price)}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>
      <div className="w-full flex justify-center mt-4">
        <Link href="/properties">
          <Button>See more properties</Button>
        </Link>
      </div>
    </div>
  )
}