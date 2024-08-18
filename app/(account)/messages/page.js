"use client";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeftIcon,
  MessageCircle,
  SendIcon,
  UserIcon,
  SearchIcon,
} from "lucide-react";
import { fetchAgents } from "@/utils/user";
import { fetchChats, fetchChat, addChat, addMessage } from "@/utils/message";
import AuthContext from "@/context/AuthContext";

const ChatList = ({ chats, onSelectChat, selectedChatId }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Chats</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[calc(100vh-120px)]">
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
                {chat?.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

const MessageUI = ({
  chatId,
  messages,
  onSendMessage,
  onBack,
  chatReceiver,
  currentUser,
}) => {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    await onSendMessage(messageText);
    setMessageText("");
  };

  return (
    <div className="flex flex-col h-full border-2 rounded-lg">
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
          <p>No messages available.</p>
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

export default function ResponsiveMessagingApp() {
  const { user } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [chatReceiver, setChatReceiver] = useState(null);

  useEffect(() => {
    const fetchAgentsAndChats = async () => {
      const fetchedAgents = await fetchAgents();
      setAgents(fetchedAgents);
      setSearchResults(fetchedAgents);

      const fetchedChats = await fetchChats();
      setChats(fetchedChats);
    };

    fetchAgentsAndChats();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (query) => {
    const filteredAgents = agents.filter((agent) =>
      agent.username.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredAgents);
  };

  const handleAgentClick = async (agentId) => {
    let newChat = chats.find((chat) => chat.receiver.id === agentId);

    if (!newChat) {
      newChat = await addChat(agentId);
      setChats((prevChats) => [...prevChats, newChat]);
    }
    setSelectedChatId(newChat.id);
    await handleSelectChat(newChat.id);
  };

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);

    const chatData = await fetchChat(chatId);
    const { message, receiver } = chatData;

    setMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: message,
    }));

    setChatReceiver(receiver);
  };

  const handleSendMessage = async (chatId, body) => {
    if (!chatId) return;
  
    const newMessage = await addMessage(chatId, body);  
    setMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), newMessage],
    }));
  };
  

  const handleBack = () => {
    setSelectedChatId(null);
  };
  return (
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
            <BreadcrumbPage>Messages</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="bg-blue-100 p-12 rounded-2xl mb-6 mt-4">
        <h1 className="text-4xl lg:text-6xl font-bold">My Messages</h1>
      </div>
      <div className="p-6 flex justify-between items-center bg-gray-100 rounded-2xl">
        <div className="flex items-center gap-3 font-semiBold text-xl">
          <div>
            <MessageCircle />
          </div>
          Chat with an Agent
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <SearchIcon className="mr-2 h-4 w-4" />
              Search Users
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Search Agents</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter user name..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[400px]">
              {searchResults.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center space-x-4 py-2 px-2 cursor-pointer rounded hover:bg-accent/50"
                  onClick={() => handleAgentClick(agent.id)}
                >
                  <Avatar>
                    <AvatarImage src={agent.avatar} alt={agent.username} />
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{agent.username}</h3>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-6">
        <div
          className={`${
            isMobile && selectedChatId ? "hidden" : "col-span-12 md:col-span-4"
          }`}
        >
          {chats.length > 0 ? (
            <ChatList
              chats={chats}
              onSelectChat={handleSelectChat}
              selectedChatId={selectedChatId}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <p className="text-muted-foreground">
                No chats yet, find a nearby agent to start a conversation
              </p>
            </div>
          )}
        </div>
        <div
          className={`${
            isMobile && !selectedChatId
              ? "hidden"
              : "col-span-12 md:col-span-8 h-[500px]"
          }`}
        >
          {selectedChatId ? (
            <MessageUI
            chatId={selectedChatId}
            messages={messages[selectedChatId] || []}
            onSendMessage={(body) => handleSendMessage(selectedChatId, body)}
            onBack={handleBack}
            chatReceiver={chatReceiver}
            currentUser={user}
          />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-muted-foreground">
                Select a chat to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
