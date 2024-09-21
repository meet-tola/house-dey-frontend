'use client'

import React, { useEffect, useState } from "react"
import { Bell, Home, AlertTriangle, CheckCircle, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"

const API_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:8800"

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/notifications`)
        setNotifications(response.data)
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const renderIcon = (type) => {
    switch (type) {
      case "listing":
        return <Home className="h-5 w-5 text-blue-500" />
      case "profile":
        return <User className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const renderLink = (notification) => {
    switch (notification.type) {
      case "listing":
        return notification.postId ? `/properties/${notification.postId}` : "#"
      case "profile":
        return "/profile"
      default:
        return "#"
    }
  }

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

      <div className="w-full mx-auto bg-white rounded-lg shadow-md border-2 border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 p-4 sm:p-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">All Notifications</h2>
            <p className="text-sm text-muted-foreground">You have {notifications.length} notifications</p>
          </div>
        </div>
        <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px]">
          {loading ? (
            <div className="space-y-4 p-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-start space-x-4 rounded-lg p-3 sm:p-4 transition-colors hover:bg-accent">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <Link href={renderLink(notification)} key={notification.id} className="block">
                <div className="flex items-start space-x-4 rounded-lg p-3 sm:p-4 transition-colors hover:bg-accent">
                  {renderIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-base sm:text-lg font-semibold">{notification.message}</p>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description || "No additional details."}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-sm text-muted-foreground mt-2">
                You're all caught up! Check back later for new notifications.
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}