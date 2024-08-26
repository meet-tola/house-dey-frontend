import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";

const ChatList = ({ chats, onSelectChat, selectedChatId }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>All Chats</CardTitle>
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
                {chat?.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

export default ChatList;
