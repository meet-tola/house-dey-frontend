'use client'

import React, { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { fetchFeaturedPosts } from "@/utils/post"
import Link from "next/link"
import { Button } from "./ui/button"
import { PropertySkeleton } from "./PropertySkeleton"

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const fetchedProperties = await fetchFeaturedPosts()
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
        Latest Properties
      </h2>
      {loading ? (
        <div className="flex gap-6 overflow-x-auto scrollbar-none">
          {Array.from({ length: 5 }).map((_, index) => (
            <PropertySkeleton key={index} />
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto scrollbar-none">
          {properties.map((property, index) => (
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
                        {property.property} for {property.type}
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
      ) : (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">No Featured Listings</h3>
          <p className="text-gray-600 mb-4">
            There are currently no featured properties available.
          </p>
          <Link href="/properties">
            <Button>Browse All Properties</Button>
          </Link>
        </div>
      )}
      {properties.length > 0 && (
        <div className="w-full flex justify-center mt-4">
          <Link href="/properties">
            <Button>See more properties</Button>
          </Link>
        </div>
      )}
    </div>
  )
}