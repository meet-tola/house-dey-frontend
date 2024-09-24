"use client";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftIcon, SendIcon, UserIcon } from "lucide-react";
import { SocketContext } from "@/context/SocketContext";
import { fetchChat, addMessage, readChat } from "@/utils/message";

export default function MessageUI({
  chatId,
  onBack,
  chatReceiver,
  currentUser,
  onlineUsers,
}) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (chatId) {
        setIsLoading(true);
        await readChat(chatId);
        const chatData = await fetchChat(chatId);
        setMessages(chatData.message);
        setIsLoading(false);
      }
    };

    fetchChatMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    if (!chatReceiver?.id) {
      console.error("Cannot send message, chatReceiver is not set.");
      return;
    }

    const messageData = {
      chatId,
      userId: currentUser.id,
      text: messageText,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", {
      receiverId: chatReceiver?.id,
      message: messageData,
    });

    const newMessage = await addMessage(chatId, messageText);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessageText("");
  };

  useEffect(() => {
    if (socket && chatId) {
      socket.on("getMessage", (message) => {
        console.log("Received message:", message);
        if (message.chatId === chatId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }

    return () => socket?.off("getMessage");
  }, [socket, chatId]);

  const isOnline =
    chatReceiver && onlineUsers.some((user) => user.userId === chatReceiver.id);

  return (
    <div className="flex flex-col h-full md:h-[600px] border-[1.5px] rounded-lg border-gray-200">
      {/* Header */}
      <div className="p-4 border-b flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="md:hidden"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          chatReceiver && (
            <Avatar>
              <AvatarImage
                src={chatReceiver.avatar || ""}
                alt={chatReceiver.username || "User"}
              />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          )
        )}
        <h2 className="text-xl font-semibold">
          {isLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <>
              {chatReceiver?.username || "Unknown User"}
              {isOnline && (
                <span className="ml-2 text-sm text-green-500">(Online)</span>
              )}
            </>
          )}
        </h2>
      </div>

      {/* Message List (Scroll Area) */}
      <ScrollArea className="flex-1 p-4 overflow-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col items-start mb-6">
                <div className="flex flex-row items-end">
                  <Skeleton className="h-10 w-10 rounded-full mr-2" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-16 w-64 rounded-lg" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((message) => {
            const isSender = message.userId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex flex-col ${
                  isSender ? "items-end" : "items-start"
                } mb-6`}
              >
                <div
                  className={`flex ${
                    isSender ? "flex-row-reverse" : "flex-row"
                  } items-end`}
                >
                  {!isSender && (
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={chatReceiver?.avatar || ""}
                        alt={chatReceiver?.username || "User"}
                      />
                      <AvatarFallback>
                        <UserIcon />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col gap-2 ">
                    <div
                      className={`p-3 rounded-lg ${
                        isSender
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent"
                      }`}
                    >
                      {!isSender && (
                        <p className="font-semibold text-sm mb-1">
                          {chatReceiver?.username}
                        </p>
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mb-1">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center text-center">
            No messages available.
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t flex space-x-2">
        <Input
          className="flex-1"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <SendIcon className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}
