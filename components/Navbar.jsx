"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useContext, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, ChevronDown } from "lucide-react";
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
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const token = Cookies.get("token");
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const propertyTypes = [
    {
      href: `/properties?${new URLSearchParams({
        city: "lagos",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
        type: "rent",
        property: "apartment",
      }).toString()}`,
      label: "Apartment",
    },
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
      label: "House",
    },
    {
      href: `/properties?${new URLSearchParams({
        city: "lagos",
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
        city: "lagos",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathrooms: "",
        type: "rent",
        property: "hostel",
      }).toString()}`,
      label: "Hostel",
    },
  ];

  const navLinks = [
    { href: "/", label: "Home" },
    {
      href: "#",
      label: "Properties",
      dropdown: propertyTypes,
    },
    { href: "/Requests", label: "Requests" },
    { href: "/blog", label: "Blogs" },
    { href: "/support", label: "Support" },
  ];

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  const togglePropertiesDropdown = () => {
    setIsPropertiesOpen(!isPropertiesOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPropertiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-sm transition-all duration-300 data-[scrolled=true]:bg-background data-[scrolled=true]:shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-16">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-4">
                <div>
                  <div>
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      prefetch={false}
                    >
                      <Image
                        src="/logo.png"
                        width={160}
                        height={40}
                        alt="house-dey-logo"
                        className="md:hidden"
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col mt-4">
                  {navLinks.map((link, index) =>
                    link.dropdown ? (
                      <div>
                        <button
                          onClick={togglePropertiesDropdown}
                          className="text-lg font-medium text-primary hover:bg-accent transition-colors py-4 px-5 border-b flex items-center justify-between w-full"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-4 w-4 ml-2 transition-transform duration-200 ${
                              isPropertiesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isPropertiesOpen ? "max-h-48" : "max-h-0"
                          }`}
                        >
                          {link.dropdown.map((subLink, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subLink.href}
                              className="block py-2 px-8 text-primary hover:bg-accent"
                              prefetch={false}
                              onClick={handleNavLinkClick}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={index}
                        href={link.href}
                        className={`text-lg font-medium text-primary hover:bg-accent transition-colors py-4 px-5 border-b ${
                          pathname === link.href ? "bg-accent" : ""
                        }`}
                        prefetch={false}
                        onClick={handleNavLinkClick}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image
              src="/logo.png"
              width={160}
              height={40}
              alt="house-dey-logo"
              className="hidden md:block"
            />
            <Image
              src="/logo2.png"
              width={60}
              height={40}
              alt="house-dey-logo"
              className="md:hidden"
            />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link, index) =>
            link.dropdown ? (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger className="text-lg font-medium text-primary hover:bg-accent px-4 py-2 hover:rounded-sm flex items-center">
                  {link.label}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {link.dropdown.map((subLink, subIndex) => (
                    <DropdownMenuItem key={subIndex}>
                      <Link
                        href={subLink.href}
                        className="w-full"
                        prefetch={false}
                      >
                        {subLink.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={`text-lg font-medium text-primary hover:bg-accent px-4 py-2 hover:rounded-sm relative ${
                  pathname === link.href ? "active" : ""
                }`}
                prefetch={false}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                )}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-4">
          {user && token ? (
            <>
              <MessageMore />
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.avatar} alt="User Avatar" />
                    <AvatarFallback>
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>User Profile</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      window.location.href = "/account";
                    }}
                  >
                    My Account
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
