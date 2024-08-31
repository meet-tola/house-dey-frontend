import axios from "axios";

const API_URL = "http://localhost:8800" || process.env.NEXT_PUBLIC_API_URL;

export const fetchAgents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user/agents`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch agents');
  } catch (error) {
    console.error('Error fetching agents:', error);
    return null;
  }
}