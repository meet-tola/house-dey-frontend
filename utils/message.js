import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export const fetchChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/chats`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch chats");
  } catch (error) {
    console.error("Error fetching chats:", error);
    return null;
  }
};

export const fetchChat = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/api/chats/${chatId}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch chat");
  } catch (error) {
    console.error("Error fetching chat:", error);
    return null;
  }
};

export const addChat = async (receiverId, postId) => {
  try {
    const response = await axios.post(`${API_URL}/api/chats`, { receiverId, postId });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to add chat");
  } catch (error) {
    console.error("Error adding chat:", error);
    return null;
  }
};

export const addMessage = async (chatId, text, postId) => {
  try {
    const response = await axios.post(`${API_URL}/api/messages/${chatId}`, {
      text,
      postId,
    });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to add message");
  } catch (error) {
    console.error("Error adding message:", error);
    return null;
  }
};

export const readChat = async (chatId) => {
  try {
    const response = await axios.post(`${API_URL}/api/chats/read/${chatId}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to mark chat as read");
  } catch (error) {
    console.error("Error marking chat as read:", error);
    return null;
  }
};
