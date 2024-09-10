import { useContext } from "react";
import { SocketContext } from "@/context/SocketContext";
import { Bell, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function NotificationBell() {
  const { newNotification, markNotificationsRead } = useContext(SocketContext);

  return (
    <Link href="/notifications" onClick={markNotificationsRead}>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {newNotification && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </Button>
    </Link>
  );
}

export function MessageMore() {
  const { newMessage, markMessagesRead } = useContext(SocketContext);

  return (
    <Link href="/messages" onClick={markMessagesRead}>
      <Button variant="ghost" size="icon" className="relative">
        <MessageCircleMore
         className="h-5 w-5" />
        {newMessage && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </Button>
    </Link>
  );
}
