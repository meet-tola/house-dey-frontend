import axios from 'axios';
import cookie from 'js-cookie'; 

const API_URL = process.env.NODE_ENV === "production"
  ? process.env.NEXT_PUBLIC_API_URL
  : "http://localhost:8800";

const getToken = () => {
  return cookie.get('token');
};

export const checkAuth = async () => {
  const token = getToken();
  
  if (!token) {
    console.error("No token found in cookies");
    return false;
  }

  console.log("token", token)
  
  try {
    const response = await axios.get(
      `${API_URL}/api/auth/checkAuth`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, 
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
};
