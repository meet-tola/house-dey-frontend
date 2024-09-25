import Image from 'next/image'
import { CalendarIcon, UserIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


export default function BlogDetail({ post }) {
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl mt-20">
      <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-4">
        <ChevronLeftIcon className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>
      <img
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-muted-foreground mb-6">
        <UserIcon className="w-4 h-4 mr-2" />
        <span className="mr-4">{post.author}</span>
        <CalendarIcon className="w-4 h-4 mr-2" />
        <span>{post.date}</span>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Share this article</h2>
        <div className="flex space-x-4">
          <Button variant="outline">Facebook</Button>
          <Button variant="outline">Twitter</Button>
          <Button variant="outline">LinkedIn</Button>
        </div>
      </div>
    </article>
  )
}