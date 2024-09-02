"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const token = Cookies.get("token");

    if (cookies.user && token) {
      try {
        const parsedUser = cookies.user;
        setUser(parsedUser);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
  }, [cookies.user]);

  const signup = async (username, email, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
        role,
      });
      if (response.status === 201) {
        console.log(
          "Signup successful. Please check your email to verify your account."
        );
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
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        if (!user.verified) {
          throw new Error("Please verify your email before logging in.");
        }
        Cookies.set("token", token);
        setUser(user);
        setCookie("user", user, { path: "/" });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
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
      const response = await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(null);
        Cookies.remove("token");
        removeCookie("user", { path: "/" });
        delete axios.defaults.headers.common["Authorization"];
        console.log("Logout successful.");
      }
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data || error.message
      );
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/verify/${token}`);
      if (response.status === 200) {
        const { token, user } = response.data;
        Cookies.set("token", token);
        setUser(user);
        setCookie("user", user, { path: "/" });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Error during email verification:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to verify email."
      );
    }
  };

  const updateUser = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
      setCookie("user", updatedUser, { path: "/" });
      console.log("User updated successfully.");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
