"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, MessageCircleMore } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthContext from "@/context/AuthContext";
import Cookies from "js-cookie";
import { NotificationBell, MessageMore } from "./Notification";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const token = Cookies.get("token");

  const navLinks =
    user?.role === "AGENT"
      ? [
          {
            href: "/properties",
            label: "Properties",
          },
          {
            href: "/request",
            label: "Request",
          },
          {
            href: "#",
            label: "support",
          },
        ]
      : [
          {
            href: `/properties?${new URLSearchParams({
              city: "lagos",
              minPrice: "",
              maxPrice: "",
              bedrooms: "",
              bathrooms: "",
              type: "rent",
              property: "house",
            }).toString()}`,
            label: "House",
          },
          {
            href: `/properties?${new URLSearchParams({
              city: "",
              minPrice: "",
              maxPrice: "",
              bedrooms: "",
              bathrooms: "",
              type: "rent",
              property: "shop",
            }).toString()}`,
            label: "Shop",
          },
          {
            href: `/properties?${new URLSearchParams({
              city: "",
              minPrice: "",
              maxPrice: "",
              bedrooms: "",
              bathrooms: "",
              type: "rent",
              property: "hostel",
            }).toString()}`,
            label: "Hostel",
          },
          {
            href: "/create-request",
            label: "Request",
          },
          {
            href: "#",
            label: "Blogs",
          },
        ];

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm transition-all duration-300 data-[scrolled=true]:bg-background data-[scrolled=true]:shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-16">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(true)}
                >
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href="#"
                      className="flex items-center gap-2"
                      prefetch={false}
                    >
                      <Image
                        src="/logo.svg"
                        width={160}
                        height={40}
                        alt="house-dey-logo"
                        className="md:hidden"
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col mt-4">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-lg font-medium text-primary hover:bg-accent transition-colors py-4 px-5 border-b"
                      prefetch={false}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image
              src="/logo.svg"
              width={160}
              height={40}
              alt="house-dey-logo"
              className="hidden md:block"
            />
            <Image
              src="/logo2.svg"
              width={60}
              height={40}
              alt="house-dey-logo"
              className="md:hidden"
            />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-lg font-medium text-primary hover:bg-accent px-4 py-2 hover:rounded-sm"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {user && token ? (
            <>
              <MessageMore />
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.avatar || "/placeholder-user.jpg"}
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>User Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/account" prefetch={false}>
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="/login"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        window.location.href = "/";
                      }}
                      prefetch={false}
                    >
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost">
                <Link href="/login" prefetch={false}>
                  Login
                </Link>
              </Button>
              <Button>
                <Link href="/signup" prefetch={false}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
