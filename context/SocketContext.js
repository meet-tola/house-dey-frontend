"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import AuthContext from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backendURL = process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SOCKET_URL
      : "http://localhost:4000";  // Fallback to localhost in development
  
    setSocket(io(backendURL));
  }, []);
  

  useEffect(() => {
    if (user && socket) {
      socket.emit("newUser", user.id);
    }

    return () => {
      socket?.off("newUser");
    };
  }, [user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
