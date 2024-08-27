import React from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";

const NotificationBadge = ({ count }) => {
  return (
    <div className="relative">
      <Button>
        <MessageCircle /> 
      </Button>
      {count > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
          {count} 
        </span>
      )}
    </div>
  );
};

export default NotificationBadge;
