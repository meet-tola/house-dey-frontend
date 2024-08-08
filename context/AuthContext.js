"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
          "token"
        )}`;
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  const signup = async (username, email, password, role) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        { username, email, password, role }
      );
      if (response.status === 201) {
        console.log("Signup successful. Please login to continue.");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { username, password }
      );
      if (response.status === 200) {
        const { token, user } = response.data;
        Cookies.set("token", token);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      const errorMessage = "You're not a registered user. Sign up";
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`
      );
      if (response.status === 200) {
        setUser(null);
        Cookies.remove("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
      }
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
    }
  };

  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("User updated successfully.");
    } else {
      console.error("Invalid user data:", updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
