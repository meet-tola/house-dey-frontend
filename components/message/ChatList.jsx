import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import NotificationBadge from "./NotificationBadge";

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>All Chats</CardTitle>
          <NotificationBadge count={totalUnreadMessages} />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center space-x-4 py-2 px-2 cursor-pointer rounded ${
                selectedChatId === chat.id ? "bg-accent" : "hover:bg-accent/50"
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <Avatar>
                <AvatarImage
                  src={chat?.receiver?.avatar || ""}
                  alt={chat?.receiver?.username}
                />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{chat?.receiver?.username}</h3>
                <p className="text-sm text-muted-foreground">
                  {chat?.lastMessage || "No messages yet"}
                </p>
              </div>
              {unreadMessages[chat.id] > 0 && (
                <span className="ml-auto text-xs bg-red-500 text-white rounded-full px-2 py-1">
                  {unreadMessages[chat.id]}
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatList;
