import axios from "axios";
export const apiClient = axios.create({ 
    baseURL: 'https://localhost:44349',
    timeout: 1000 * 60 * 30 * 3, // 90 minutes
  });

export const apiImage = 'https://localhost:44349';
