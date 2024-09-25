import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8800";

export const fetchReviewsByAgent = async (agentId) => {
  try {
    const response = await axios.get(`${API_URL}/api/reviews/agent/${agentId}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch reviews");
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export const fetchReviewsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/reviews/user/${userId}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch reviews");
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};

export const addReview = async ({ message, rating, userId, agentId }) => {
  try {
    const response = await axios.post(`${API_URL}/api/reviews`, {
      message,
      rating,
      userId,
      agentId,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error adding reviews:", error);
    throw new Error("Failed to add reviews");
    return null;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/reviews/${reviewId}`);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to delete reviews");
  } catch (error) {
    console.error("Error deleting reviews:", error);
    return null;
  }
};
