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
} from "lucide-react";
import AuthContext from "@/context/AuthContext";

const MyAccount = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

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
            link="/searches-alerts"
          />
          <Card
            title="Messages"
            description="View all incoming/outgoing messages received for your properties"
            icon={<MessageCircle className="text-3xl" />}
            link="/messages"
          />
          <Card
            title="Notifications"
            description="Manage your notifications and alerts"
            icon={<Bell className="text-3xl" />}
            link="/notifications"
          />
          <Card
            title="Account Settings"
            description="Manage your login details and notification preferences"
            icon={<Settings className="text-primary text-3xl" />}
            link="/account-settings"
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
            description="View all incoming/outgoing messages received for your properties"
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
            title="Notifications"
            description="Manage your notifications and alerts"
            icon={<Bell className="text-3xl" />}
            link="/notifications"
          />
          <Card
            title="Account Settings"
            description="Manage your login details and notification preferences"
            icon={<Settings className="text-primary text-3xl" />}
            link="/account-settings"
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto mt-20">
        <div className="bg-blue-100 p-12 rounded-2xl mb-6">
          <h1 className="text-4xl lg:text-6xl font-bold">My Account</h1>
          <p className="text-lg mt-4">Manage your account and preferences</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="My Profile"
            description="Update your personal details and property goals"
            icon={<User className="text-3xl" />}
            link="/profile"
          />
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

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

export default MyAccount;
