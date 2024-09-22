"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import AuthContext from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    const backendURL =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SOCKET_URL
        : "http://localhost:4000";

    const socketInstance = io(backendURL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("newUser", user.id);

      // Listen for new notifications
      socket.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setNewNotification(true);
      });

      // Listen for new messages
      socket.on("getMessage", (message) => {
        setMessages((prev) => [message, ...prev]);
        setNewMessage(true);
      });
    }

    return () => {
      socket?.off("newNotification");
      socket?.off("getMessage");
    };
  }, [user, socket]);

  const markNotificationsRead = () => {
    setNewNotification(false);
  };

  const markMessagesRead = () => {
    setNewMessage(false);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        newNotification,
        markNotificationsRead,
        messages,
        newMessage,
        markMessagesRead,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
