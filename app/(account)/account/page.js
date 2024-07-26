import Link from 'next/link';
import React from 'react';
import { User, Heart, Home, FileText, Bell, Settings } from 'lucide-react';

const MyAccount = () => {
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
          <Card
            title="My Shortlisted Properties"
            description="Saved buy and rental properties"
            icon={<Heart className="text-3xl" />}
            link="/shortlisted-properties"
          />
          <Card
            title="Follow Locations"
            description="Following off-market properties, streets or suburbs"
            icon={<Home className="text-3xl" />}
            link="/follow-locations"
          />
          <Card
            title="My Enquiries and Offers"
            description="View all property enquiries & offers you have made"
            icon={<FileText className="text-3xl" />}
            link="/enquiries-offers"
          />
          <Card
            title="Searches and Alerts"
            description="Custom searches and auction alerts"
            icon={<Bell className="text-3xl" />}
            link="/searches-alerts"
          />
          <Card
            title="Account Settings"
            description="Manage your login details and notification preferences"
            icon={<Settings className="text-primary text-3xl" />}
            link="/account-settings"
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, description, icon, link }) => {
  return (
    <Link href={link} passHref className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-start justify-center gap-4">
        <div>{icon}</div>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default MyAccount;
