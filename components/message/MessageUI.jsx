"use client";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeftIcon, SendIcon, UserIcon } from 'lucide-react';
import { SocketContext } from "@/context/SocketContext";
import { fetchChat, addMessage, readChat } from "@/utils/message";
import { format, isToday, isYesterday } from "date-fns";

export default function MessageUI({
  chatId,
  onBack,
  chatReceiver,
  currentUser,
  onlineUsers,
  postDetails,
}) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostDetailsLoading, setIsPostDetailsLoading] = useState(true);
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

  useEffect(() => {
    if (postDetails) {
      setMessageText("Is this property still available? If it is, let's talk about it.");
      setIsPostDetailsLoading(false);
    } else {
      setIsPostDetailsLoading(false);
    }
  }, [postDetails]);

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
      postId: postDetails?.id || null,
    };
  
    socket.emit("sendMessage", {
      receiverId: chatReceiver?.id,
      message: messageData,
    });
  
    const newMessage = await addMessage(chatId, messageText, postDetails?.id || null);
  
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

  const getDateDisplay = (date) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d");
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = new Date(message.createdAt);
      const dateKey = getDateDisplay(date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full md:h-[600px] border-[1.5px] rounded-lg border-gray-200 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-white flex items-center space-x-4">
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
                src={
                  chatReceiver.avatar || "https://via.placeholder.com/200x200"
                }
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

      {/* Display post details if available */}
      {isPostDetailsLoading ? (
        <div className="border-b p-4 bg-white flex items-center space-x-4">
          <Skeleton className="w-[3rem] h-[3rem] rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ) : postDetails ? (
        <div className="border-b p-4 bg-white flex items-center space-x-4">
          <img
            src={postDetails.images[0] || "/placeholder.jpg"}
            alt="Post"
            className="w-[3rem] h-[3rem] object-cover rounded-md"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{postDetails.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {postDetails.postDetail.desc}
            </p>
          </div>
          <div className="text-lg font-bold text-primary">
            ${postDetails.price}
          </div>
        </div>
      ) : null}

      {/* Message List (Scroll Area) */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
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
            Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                <div className="flex justify-center my-4">
                  <span className="px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full">
                    {date}
                  </span>
                </div>
                {dateMessages.map((message) => {
                  const isSender = message?.userId === currentUser?.id;
                
                  return (
                    <div
                      key={message?.id}
                      className={`flex ${
                        isSender ? "justify-end" : "justify-start"
                      } mb-4`}
                    >
                      <div className={`flex items-end ${isSender ? "flex-row-reverse" : "flex-row"} max-w-[70%]`}>
                        {!isSender && (
                          <Avatar className={`${isSender ? 'ml-2' : 'mr-2'} flex-shrink-0`}>
                            <AvatarImage
                              src={chatReceiver?.avatar || ""}
                              alt={chatReceiver?.username || "User"}
                            />
                            <AvatarFallback>
                              <UserIcon />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <div
                            className={`p-3 rounded-lg ${
                              isSender
                                ? "bg-primary text-primary-foreground"
                                : "bg-white shadow"
                            }`}
                          >
                            {!isSender && (
                              <p className="font-semibold text-sm mb-1">
                                {chatReceiver?.username}
                              </p>
                            )}
                            <p className="text-sm break-words">{message?.text}</p>
                            {message?.postId && (
                              <div className="mt-2 pt-2 border-t border-primary-foreground/20 flex items-center">
                                <a
                                  href={`/properties/${message?.postId}`}
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  View related post
                                </a>
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground mt-1 self-end">
                            {format(new Date(message?.createdAt), "h:mm a")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              No messages available.
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-white flex space-x-2">
        <Input
          className="flex-1"
          placeholder="Type a message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <SendIcon className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}