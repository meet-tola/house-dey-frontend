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
  MailIcon,
  ChevronDown,
  ChevronUp,
  ChevronLeftIcon,
  ChevronRightIcon,
  ZoomInIcon,
  XIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { fetchPost, savePost } from "@/utils/post";
import { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import toast from "react-hot-toast";

export default function PropertiesDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isDescriptionOpen, setDescriptionOpen] = useState(true);
  const [isFeaturesOpen, setFeaturesOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // State for image modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        const data = await fetchPost(id);
        if (data) {
          setPost(data);
        } else {
          setError("Failed to fetch post");
        }
      };

      getPost();
    }
  }, [id]);

  const handleSavePost = async () => {
    try {
      const response = await savePost(id);
      console.log(response);
      if (response) {
        setIsSaved((prev) => !prev);
        toast.success("This properties has been saved");

      } else {
        toast.error("Failed to save properties");
      }
    } catch (error) {
      console.error("Error saving the post:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <PageLoader />;
  }

  // Image Modal Handlers
  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
    );
  };

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
              <BreadcrumbPage>
                {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{post.address}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="text-lg font-medium mb-4">${post.address}</div>
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative flex-grow">
            <img
              src={post.images[0]}
              width={800}
              height={600}
              alt="Main property image"
              className="w-full h-full rounded-lg object-cover aspect-[4/3] cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {post.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg transition-all after:opacity-0 after:absolute after:inset-0 after:bg-black hover:after:opacity-20 focus:after:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                onClick={() => handleImageClick(index + 1)}
              >
                <img
                  src={image}
                  width={400}
                  height={300}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden w-full h-auto object-cover aspect-[4/3]">
          <Carousel>
            <CarouselContent>
              {post.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Link href="#">
                    <img
                      src={image}
                      width={400}
                      height={300}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </Link>
                </CarouselItem>
              ))}
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
                  {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                </Button>
                | <div>{post.property}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={handleSavePost}>
                  <HeartIcon
                    className={`w-5 h-5 ${isSaved ? "text-red-500" : ""}`}
                  />
                  <span className="sr-only">{isSaved ? "Unsave" : "Save"}</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <ShareIcon className="w-5 h-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-2xl font-bold">${post.price}</div>
                <p className="text-gray-500">{post.address}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {post.bedroom} beds · {post.bathroom} baths ·{" "}
                {post.postDetail.size} sq ft
              </div>
            </div>

            <Collapsible
              className="mb-4 rounded-lg border bg-background shadow-sm"
              open={isDescriptionOpen}
              onOpenChange={setDescriptionOpen}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-4">
                <h3 className="text-lg font-medium">Description</h3>
                {isDescriptionOpen ? <ChevronUp /> : <ChevronDown />}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-4 pt-2 text-muted-foreground">
                {post.postDetail.desc}
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              className="mb-4 rounded-lg border bg-background shadow-sm"
              open={isFeaturesOpen}
              onOpenChange={setFeaturesOpen}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-4">
                <h3 className="text-lg font-medium">Features</h3>
                {isFeaturesOpen ? <ChevronUp /> : <ChevronDown />}
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-4 pt-2 text-muted-foreground">
                <ul className="grid grid-cols-2 gap-2">
                  {post.postDetail.utilities
                    .split(", ")
                    .map((utility, index) => (
                      <li key={index}>
                        <CheckIcon className="w-4 h-4 mr-2 inline-block" />
                        {utility}
                      </li>
                    ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>

            <div>
              <p className="text-gray-500 mb-1">Contact</p>
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage
                    src={post.user.avatar}
                    alt={post.user.username}
                  />
                  <AvatarFallback>
                    {post.user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold">{post.user.username}</p>
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

      <div className="sticky inset-x-0 bottom-0 z-10 flex items-center justify-between bg-primary px-20 py-4">
        <div className="flex items-center">
          <img
            src={post.user.avatar}
            alt={post.user.username}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h1 className="text-white font-bold">{post.user.username}</h1>
            <p className="text-white">Real Estate Agent</p>
          </div>
        </div>
        <Button variant="outline" className="gap-3 text-primary">
          <MailIcon />
          Send a Message
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-black bg-opacity-80 p-4 sm:p-6 md:p-8 max-w-full w-full h-full">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-white bg-gray-800 rounded-full"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handlePrevious}
              className="absolute left-4 sm:left-8 p-2 text-white bg-gray-800 rounded-full"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <img
              src={post.images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              className="max-w-screen max-h-screen object-contain"
            />
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-2 text-white bg-gray-800 rounded-full"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
