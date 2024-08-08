"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  CheckIcon,
  ShareIcon,
  MessageCircle,
  MessageSquareIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import { fetchPost } from '@/utils/post';


export default function Component() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        const data = await fetchPost(id);
        if (data) {
          setPost(data);
          console.log(data)
        } else {
          setError('Failed to fetch post');
        }
      };

      getPost();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/properties">Properties</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cozy Mountain Retreat</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative flex-grow">
            <img
              src="https://via.placeholder.com/800x600"
              width={800}
              height={600}
              alt="Main property image"
              className="w-full h-full rounded-lg object-cover aspect-[4/3]"
            />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <Link
              href="#"
              className="relative overflow-hidden rounded-lg transition-all after:opacity-0 after:absolute after:inset-0 after:bg-black hover:after:opacity-20 focus:after:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              prefetch={false}
            >
              <img
                src="https://via.placeholder.com/400x300"
                width={400}
                height={300}
                alt="Property image"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </Link>
            <Link
              href="#"
              className="relative overflow-hidden rounded-lg transition-all after:opacity-0 after:absolute after:inset-0 after:bg-black hover:after:opacity-20 focus:after:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              prefetch={false}
            >
              <img
                src="https://via.placeholder.com/400x300"
                width={400}
                height={300}
                alt="Property image"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </Link>
            <Link
              href="#"
              className="relative overflow-hidden rounded-lg transition-all after:opacity-0 after:absolute after:inset-0 after:bg-black hover:after:opacity-20 focus:after:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              prefetch={false}
            >
              <img
                src="https://via.placeholder.com/400x300"
                width={400}
                height={300}
                alt="Property image"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </Link>
            <Link
              href="#"
              className="relative overflow-hidden rounded-lg transition-all after:opacity-0 after:absolute after:inset-0 after:bg-black hover:after:opacity-20 focus:after:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              prefetch={false}
            >
              <img
                src="https://via.placeholder.com/400x300"
                width={400}
                height={300}
                alt="Property image"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </Link>
          </div>
        </div>

        <div className="md:hidden w-full h-auto object-cover aspect-[4/3]">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <Link href="#">
                  <img
                    src="https://via.placeholder.com/400x300"
                    width={400}
                    height={300}
                    alt="Property image"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </Link>
              </CarouselItem>
              <CarouselItem>
                <Link href="#">
                  <img
                    src="https://via.placeholder.com/400x300"
                    width={400}
                    height={300}
                    alt="Property image"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </Link>
              </CarouselItem>
              <CarouselItem>
                <Link href="#">
                  <img
                    src="https://via.placeholder.com/400x300"
                    width={400}
                    height={300}
                    alt="Property image"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          <div className="bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Buy
                </Button>
                | <div>Apartment</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="w-5 h-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">$500,000</h1>
                <p className="text-gray-500">123 Main St, Anytown USA</p>
                <p className="text-gray-500">3 bed, 2 bath, 1,500 sq ft</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 mb-1">Description</p>
              <p>
                This beautiful 3 bedroom, 2 bathroom home is located in the
                heart of Anytown USA. It features a spacious living room, a
                modern kitchen, and a large backyard perfect for entertaining.
                The home has been recently renovated and is move-in ready.
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-500 mb-1">Features</p>
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                  Hardwood floors
                </li>
                <li>
                  <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                  Stainless steel appliances
                </li>
                <li>
                  <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                  Finished basement
                </li>
                <li>
                  <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                  Fenced backyard
                </li>
              </ul>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Contact</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="text-gray-500">Real Estate Agent</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="w-full h-[400px] rounded-lg" />
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 z-10 flex items-center justify-between bg-primary px-20 py-1">
        <div className="flex items-center">
          <img
            src="/path/to/your/profile.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-white font-bold">Stuart Evans</h1>
            <p className="text-white">Marshall White Boroondara</p>
          </div>
        </div>
        <Button variant="outline">
          <MessageSquareIcon />
          Enquire now
        </Button>
      </div>
    </>
  );
}
