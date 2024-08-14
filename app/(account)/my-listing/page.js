"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {

  return (
    <>
      <Toaster />
      <div className="max-w-7xl mx-auto p-6 mt-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/account">Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Listing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="bg-blue-100 p-12 rounded-2xl mb-6">
          <h1 className="text-4xl lg:text-6xl font-bold">My Properties Listing</h1>
        </div>
        <div className="p-6"></div>
      </div>
    </>
  );
};

export default Profile;
