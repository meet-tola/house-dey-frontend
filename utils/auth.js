import axios from 'axios';

export const checkAuth = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkAuth`,
      { withCredentials: true }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

