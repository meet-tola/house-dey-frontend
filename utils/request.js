import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export const fetchRequests = async (query = {}) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await axios.get(`${API_URL}/api/requests?${queryString}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch requests");
  } catch (error) {
    console.error("Error fetching requests:", error);
    return null;
  }
};

export const fetchAllRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/requests/all`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch all requests");
  } catch (error) {
    console.error("Error fetching all requests:", error);
    return null;
  }
};

export const fetchRequest = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/requests/${id}`);
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
    const response = await axios.get(`${API_URL}/api/requests/user/requests`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch user requests");
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return null;
  }
};

