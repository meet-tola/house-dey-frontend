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

export const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.clear();
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
