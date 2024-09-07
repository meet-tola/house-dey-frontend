"use client";
import React, { useEffect, useState } from "react";
import { Bell, Home, AlertTriangle, CheckCircle, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export default function Component() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case "listing":
        return <Home className="h-5 w-5 text-blue-500" />;
      case "profile":
        return <User className="h-5 w-5 text-green-500" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4 mt-16 px-4 md:px-16">
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
            <BreadcrumbPage>My Notifications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">My Notifications</h1>
      </div>

      <h1 className="text-2xl font-bold mb-4">All Notifications</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  {renderIcon(notification.type)}
                  <div className="flex flex-col gap-1">
                    <CardTitle>{notification.message}</CardTitle>
                    <CardDescription>
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{notification.description || "No additional details."}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex justify-center">
                  <Bell className="h-12 w-12 text-gray-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">No notifications</p>
                <p className="text-sm text-gray-500 mt-2">
                  You're all caught up! Check back later for new notifications.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
