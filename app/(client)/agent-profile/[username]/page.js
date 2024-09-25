'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, UserX, Star, X } from "lucide-react"
import { fetchAgent } from "@/utils/user"
import { useParams } from "next/navigation"
import PageLoader from "@/components/PageLoader"
import NoPropertiesFound from "@/components/NoPropertiesFound"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AgentProfile() {
  const { username } = useParams()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState([])
  const [userReviews, setUserReviews] = useState([])

  useEffect(() => {
    const getAgentData = async () => {
      try {
        const agentData = await fetchAgent(username)
        setAgent(agentData)
        // Simulating fetched reviews
        setReviews([
          { id: 1, user: "John Doe", rating: 4, text: "Great agent!" },
          { id: 2, user: "Jane Smith", rating: 5, text: "Very professional." },
        ])
        setUserReviews([
          { id: 3, user: "Current User", rating: 3, text: "Good experience overall." },
        ])
      } catch (error) {
        console.error("Error fetching agent data:", error)
      } finally {
        setLoading(false)
      }
    }

    getAgentData()
  }, [username])

  if (loading) {
    return <PageLoader />
  }

  if (!agent) {
    return (
      <div className="w-full max-w-md mx-auto h-[400px]">
        <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
          <div className="rounded-full bg-muted p-3">
            <UserX className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">Agent Not Found</h2>
          <p className="text-sm text-muted-foreground">
            We couldn't find the agent you're looking for. They may have moved or no longer be with our agency.
          </p>
        </div>
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleReviewSubmit = () => {
    // Here you would typically send the review to your backend
    console.log("Submitting review:", { rating, reviewText })
    setReviewText("")
    setRating(0)
  }

  const handleDeleteReview = (reviewId) => {
    // Here you would typically send a delete request to your backend
    setUserReviews(userReviews.filter(review => review.id !== reviewId))
  }

  return (
    <div className="container mx-auto p-4 mt-16 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Agent Info Section */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={agent.avatar || "/placeholder.svg?height=150&width=150"}
                  alt={agent.fullName}
                  className="rounded-full w-32 h-32 object-cover mb-4"
                />
                <h1 className="text-2xl font-bold mb-1">
                  {agent.fullName}
                </h1>
                <p className="text-muted-foreground mb-4">@{agent.username}</p>
                <Badge className="mb-4">Verified Agent</Badge>
                <Button className="w-full mb-4">Contact Agent</Button>
    
                <div className="w-full space-y-2">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{agent.mobile || "Not available"}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{agent.locality || "Location not specified"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews and Listings Section */}
        <div className="md:col-span-2">
          {/* Review Input Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleReviewSubmit}>Submit Review</Button>
            </CardContent>
          </Card>

          {/* View All Reviews Button and Popup */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-8">View All Reviews</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reviews</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Reviews</TabsTrigger>
                  <TabsTrigger value="user">My Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  {reviews.map((review) => (
                    <Card key={review.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold">{review.user}</span>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p>{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="user">
                  {userReviews.map((review) => (
                    <Card key={review.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold">{review.user}</span>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p>{review.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* Listings Section */}
          <h2 className="text-2xl font-bold mb-4">Current Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agent.post && agent.post.length > 0 ? (
              agent.post.map((property, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg shadow-sm overflow-hidden flex flex-col justify-between border-2 border-gray-100 bg-white relative"
                >
                  <Link href={`/properties/${property.id}`}>
                    <img
                      className="w-full h-48 object-cover"
                      src={
                        property.images?.[0] || "https://via.placeholder.com/300x200"
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
              ))
            ) : (
              <NoPropertiesFound />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}