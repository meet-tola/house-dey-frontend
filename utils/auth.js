import axios from 'axios';

const API_URL = "http://localhost:8800" || process.env.NEXT_PUBLIC_API_URL;

export const checkAuth = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/api/auth/checkAuth`,
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

