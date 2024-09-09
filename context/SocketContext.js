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

  useEffect(() => {
    const backendURL =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SOCKET_URL
        : "http://localhost:4001";

    const socketInstance = io(backendURL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user && socket) {
      socket.emit("newUser", user.id);

      socket.on("newNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setNewNotification(true);
      });
    }

    return () => {
      socket?.off("newNotification");
    };
  }, [user, socket]);

  const markNotificationsRead = () => {
    setNewNotification(false);
  };

  return (
    <SocketContext.Provider
      value={{ socket, notifications, newNotification, markNotificationsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
