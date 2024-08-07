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
import { MenuIcon, BellIcon, MessageCircleMore } from "lucide-react";
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

const navLinks = [
  { href: "#", label: "House" },
  { href: "#", label: "Shop" },
  { href: "#", label: "Hostel" },
  { href: "#", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

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
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircleMore className="h-5 w-5" />
                <span className="sr-only">Messages</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.avatar || "/placeholder-user.jpg"}
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {user.email[0]}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/account" prefetch={false}>
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account" onClick={logout} prefetch={false}>
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
