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

export const deleteTask = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/tasks/${id}`);
        getTasks()
        return response.data;
    } catch (error) {
        console.error('Error deleting tasks:', error);
        throw error;
    }
};
