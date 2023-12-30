// api.ts

import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
