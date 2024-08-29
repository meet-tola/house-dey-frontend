"use client";
import { useState, useEffect, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { UserIcon, SearchIcon, MessageSquare } from "lucide-react";
import { fetchAgents } from "@/utils/user";
import { fetchChats, fetchChat, addChat, addMessage, readChat } from "@/utils/message";
import AuthContext from "@/context/AuthContext";
import { SocketContext } from "@/context/SocketContext";
import ChatList from "@/components/message/ChatList";
import MessageUI from "@/components/message/MessageUI";

export default function Messages() {
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [agents, setAgents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [chatReceiver, setChatReceiver] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  useEffect(() => {
    if (socket) {
      socket.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
    }
    return () => socket?.off("getUsers");
  }, [socket]);

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

    setDialogOpen(false);
    window.location.reload();
  };

  const handleSelectChat = async (chatId) => {
    setSelectedChatId(chatId);

    await readChat(chatId)

    const chatData = await fetchChat(chatId);
    const { message, receiver } = chatData;

    setMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: message,
    }));

    
    setChatReceiver(receiver);
  };

  const handleSendMessage = async (chatId, body) => {
    const newMessage = await addMessage(chatId, body);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), newMessage],
    }));
    if (socket) {
      socket.emit("sendMessage", {
        receiverId: chatReceiver?.id,
        message: newMessage,
      });
    }
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-20 min-h-200vh">
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
          <div className="p-2 bg-white rounded-full">
            <MessageSquare />
          </div>
          Start a chat
        </div>
        {user.role !== "AGENT" && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <SearchIcon className="mr-2 h-4 w-4" />
                Search Agents
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
        )}
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
            <div className="h-[600px] flex items-center justify-center text-center border-[1.5px] rounded-lg px-5 border-gray-200">
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
              onSendMessage={(messageText) =>
                handleSendMessage(selectedChatId, messageText)
              }
              onBack={handleBack}
              chatReceiver={chatReceiver}
              currentUser={user}
              onlineUsers={onlineUsers}
            />
          ) : (
            <div className="h-[600px] flex items-center justify-center border-[1.5px] rounded-lg px-5 border-gray-200">
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
