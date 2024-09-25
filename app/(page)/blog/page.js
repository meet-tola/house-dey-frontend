import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from '@/components/ui/breadcrumb';
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Home Buyers in Today's Competitive Market",
    excerpt: "Navigating the real estate market as a first-time buyer can be daunting. Here are 10 essential tips to help you make informed decisions and secure your dream home.",
    image: "https://via.placeholder.com/200x300",
    date: "2024-02-15",
    author: "Jane Doe"
  },
  {
    id: 2,
    title: "The Future of Smart Homes: What to Expect in the Next Decade of Real Estate Technology",
    excerpt: "Explore the latest trends in smart home technology and how they're shaping the future of real estate. From AI-powered energy management to advanced security systems, discover what's next.",
    image: "https://via.placeholder.com/200x300",
    date: "2024-02-10",
    author: "John Smith"
  },
  {
    id: 3,
    title: "5 Landscaping Ideas to Boost Your Property Value and Create a Stunning Outdoor Oasis",
    excerpt: "Discover how strategic landscaping can significantly increase your home's market value and curb appeal. Learn about low-maintenance designs and eco-friendly options.",
    image: "https://via.placeholder.com/200x300",
    date: "2024-02-05",
    author: "Emily Johnson"
  },
  {
    id: 4,
    title: "Understanding Property Taxes: A Comprehensive Guide for Homeowners and Investors",
    excerpt: "Demystify property taxes with our comprehensive guide. Learn how they're calculated, what affects your tax bill, and strategies for potential savings.",
    image: "https://via.placeholder.com/200x300",
    date: "2024-01-30",
    author: "Michael Brown"
  },
  {
    id: 5,
    title: "The Pros and Cons of Open Floor Plans in Modern Home Design and Real Estate Trends",
    excerpt: "Open floor plans have dominated modern home design. We weigh the advantages and disadvantages to help you decide if it's right for you and your lifestyle.",
    image: "https://via.placeholder.com/200x300",
    date: "2024-01-25",
    author: "Sarah Lee"
  },
  {
    id: 6,
    title: "Investing in Real Estate: Comparing Residential and Commercial Properties for Maximum Returns",
    excerpt: "Explore the differences between residential and commercial real estate investments to determine which strategy aligns with your financial goals and risk tolerance.",
    image: "https://via.placeholder.com/200x300",
    date: "2024-01-20",
    author: "David Wilson"
  }
]

export default function BlogList() {
  return (
    <div className="container mx-auto p-4 mt-16 px-4 md:px-16">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Blogs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">Blogs</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <CardHeader className="p-0">
              <img
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="object-cover w-full h-48 rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2" title={post.title}>
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{post.excerpt}</p>
              <p className="text-sm text-muted-foreground">
                By {post.author} | {post.date}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full">
                <Link href={`/blog/${post.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}