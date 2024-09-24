import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, CheckCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { readChat } from "@/utils/message";

export default function ChatList({
  chats,
  onSelectChat,
  selectedChatId,
  isLoading,
}) {
  const handleChatSelect = async (chatId) => {
    onSelectChat(chatId);
    if (chats.find((chat) => chat.id === chatId)?.unread) {
      await readChat(chatId);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>All Chats</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px]">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 py-2 px-2"
                >
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              ))
            : chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center space-x-4 py-2 px-2 cursor-pointer rounded ${
                    selectedChatId === chat.id
                      ? "bg-accent"
                      : chat.unread
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <Avatar>
                    <AvatarImage
                      src={chat.receiver.avatar || ""}
                      alt={chat.receiver.username}
                    />
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="font-medium">{chat.receiver.username}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {chat.lastMessage || "No messages yet"}
                      </p>
                      {!chat.unread && (
                        <CheckCheck className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
