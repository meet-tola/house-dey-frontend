import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export const fetchPosts = async (query = {}) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const response = await axios.get(`${API_URL}/api/posts?${queryString}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch posts");
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/all`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch user posts");
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

export const fetchPost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch post");
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

export const fetchUserPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/user/posts`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch user posts");
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return null;
  }
};

export const savePost = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/api/posts/save`, { postId });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to save post");
  } catch (error) {
    console.error(`Error saving post with ID ${postId}:`, error);
    return null;
  }
};

export const fetchSavedPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/posts/saved`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch saved posts");
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    return null;
  }
};
