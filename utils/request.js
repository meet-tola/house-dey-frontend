import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export const fetchRequests = async (query = {}) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await axios.get(`${API_URL}/api/request${queryString}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch posts");
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const fetchAllRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/request/all`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch user posts");
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

export const fetchRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/request/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch post");
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

export const fetchUserRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/user/request`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch user posts");
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

