import axios from 'axios';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch posts');
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
};

export const fetchPost = async (id) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to fetch post');
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

export const savePost = async (postId) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/save`, { postId });
    if (response.status === 200) {
      return response.data;
    }
    throw new Error('Failed to save post');
  } catch (error) {
    console.error(`Error saving post with ID ${postId}:`, error);
    return null;
  }
};