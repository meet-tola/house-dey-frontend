"use client";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftIcon, SendIcon, UserIcon } from "lucide-react";
import { SocketContext } from "@/context/SocketContext";

const MessageUI = ({
  chatId,
  messages,
  onSendMessage,
  onBack,
  chatReceiver,
  currentUser,
  onlineUsers,
}) => {
  const [messageText, setMessageText] = useState("");
  const { socket } = useContext(SocketContext);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const messageData = {
      chatId,
      userId: currentUser.id,
      text: messageText,
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", {
      receiverId: chatReceiver.id,
      message: messageData,
    });

    await onSendMessage(messageText);
    setMessageText("");
  };

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (message) => {
        if (message.chatId === chatId) {
          onSendMessage(message.text);
        }
      });
    }
    return () => socket?.off("getMessage");
  }, [socket, chatId]);

  const isOnline =
    chatReceiver && onlineUsers.some((user) => user.userId === chatReceiver.id);

  return (
    <div className="flex flex-col h-[600px] border-[1.5px] rounded-lg border-gray-200">
      <div className="p-4 border-b flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="md:hidden"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        {chatReceiver && (
          <Avatar>
            <AvatarImage
              src={chatReceiver.avatar || ""}
              alt={chatReceiver.username || "User"}
            />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        )}
        <h2 className="text-xl font-semibold">
          {chatReceiver?.username || "Unknown User"}
          {isOnline && (
            <span className="ml-2 text-sm text-green-500">(Online)</span>
          )}
        </h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {messages && messages.length > 0 ? (
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
                        src={chatReceiver.avatar || ""}
                        alt={chatReceiver.username || "User"}
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
                          {chatReceiver.username}
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
};

export default MessageUI;
