import axios from 'axios';

const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL
  : "http://localhost:8800";

export const checkAuth = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/auth/checkAuth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies are sent for cross-site requests
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};
