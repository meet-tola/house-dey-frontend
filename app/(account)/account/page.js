"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Heart,
  Home,
  Bell,
  Settings,
  MessageCircle,
  Trash,
  Search
} from "lucide-react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const MyAccount = () => {
  const { user, deleteAccount } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await deleteAccount(user.id);
        alert("Your account has been deleted.");
        router.push("/"); // Redirect to homepage or login page after deletion
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete your account. Please try again.");
      }
    }
  };

  const renderCards = () => {
    if (role === "CLIENT") {
      return (
        <>
          <Card
            title="My Saved Properties"
            description="Saved buy and rental properties"
            icon={<Heart className="text-3xl" />}
            link="/saved-properties"
          />
          <Card
            title="Searches for Properties"
            description="Custom searches for properties"
            icon={<Bell className="text-3xl" />}
            link="/properties"
          />
           <Card
            title="Request"
            description="Manage request, create and view request"
            icon={<Bell className="text-3xl" />}
            link="/request"
          />
          <Card
            title="Messages"
            description="View all messages received from agent"
            icon={<MessageCircle className="text-3xl" />}
            link="/messages"
          />
          <Card
            title="Notifications"
            description="Manage your notifications and alerts"
            icon={<Search className="text-3xl" />}
            link="/notifications"
          />
          <DeleteAccountCard
            title="Delete Account"
            description="Permanently delete your account"
            icon={<Trash className="text-primary text-3xl" />}
            onDelete={handleDeleteAccount}
          />
        </>
      );
    } else if (role === "AGENT") {
      return (
        <>
          <Card
            title="My Listings"
            description="Manage your property listings"
            icon={<Home className="text-3xl" />}
            link="/my-listings"
          />
          <Card
            title="Messages"
            description="View all messages received for your properties"
            icon={<MessageCircle className="text-3xl" />}
            link="/messages"
          />
          <Card
            title="My Saved Properties"
            description="Saved buy and rental properties"
            icon={<Heart className="text-3xl" />}
            link="/saved-properties"
          />
          <Card
            title="Searches for Request"
            description="Custom searches for request"
            icon={<Bell className="text-3xl" />}
            link="/request"
          />
          <Card
            title="Notifications"
            description="Manage your notifications and alerts"
            icon={<Bell className="text-3xl" />}
            link="/notifications"
          />
          <DeleteAccountCard
            title="Delete Account"
            description="Permanently delete your account"
            icon={<Trash className="text-primary text-3xl" />}
            onDelete={handleDeleteAccount}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-6 px-4 md:px-16">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-blue-100 p-10 md:p-12 rounded-2xl mb-6">
          <h1 className="text-4xl lg:text-6xl font-bold">My Account</h1>
          <p className="text-lg mt-4">Manage your account and preferences</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="My Profile"
            description="Update your personal details and login details."
            icon={<User className="text-3xl" />}
            link="/profile"
          />
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

// Existing Card Component
const Card = ({ title, description, icon, link }) => {
  return (
    <Link href={link} passHref>
      <div className="bg-white p-8 rounded-lg h-[11rem] shadow-md cursor-pointer">
        <div className="flex flex-col items-start justify-center gap-4">
          <div>{icon}</div>
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const DeleteAccountCard = ({ title, description, icon, onDelete }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="bg-white p-8 rounded-lg h-[11rem] shadow-md cursor-pointer">
          <div className="flex flex-col items-start justify-center gap-4">
            <div>{icon}</div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete Account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MyAccount;
