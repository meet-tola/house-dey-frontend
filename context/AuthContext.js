"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, []);

  const signup = async (username, email, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        const { userId } = response.data;
        localStorage.setItem("userId", userId);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to signup.");
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        if (!user.verified) {
          throw new Error("Please verify your email before logging in.");
        }
        Cookies.set("token", token);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to login.");
    }
  };

  const logout = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found, cannot logout.");
      return;
    }

    try {
      setUser(null);
      Cookies.remove("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
    }
  };

  const verifyEmail = async (code) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No userId found for verification.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify`, {
        code,
        userId,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        Cookies.set("token", token);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
        throw new Error(errorMessage);
    }
  };

  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      console.error("Invalid user data:", updatedUser);
    }
  };

  const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/request-password-reset`,
        { email }
      );
      if (response.status === 200) {
        console.log("Password reset link has been sent to your email.");
      }
    } catch (error) {
      console.error(
        "Error during password reset request:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to request password reset."
      );
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });
      if (response.status === 200) {
        console.log("Password has been reset successfully.");
      }
    } catch (error) {
      console.error(
        "Error during password reset:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  };

  const deleteAccount = async (id) => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found, cannot delete account.");
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(null);
        Cookies.remove("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
      }
    } catch (error) {
      console.error(
        "Error during account deletion:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to delete account."
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        verifyEmail,
        updateUser,
        requestPasswordReset,
        resetPassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
