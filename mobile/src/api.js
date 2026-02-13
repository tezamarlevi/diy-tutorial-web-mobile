import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Use your Mac's local IP so physical devices can connect
// Both your phone and Mac must be on the same Wi-Fi network
const API_URL = 'https://diy-tutorial-web-mobile.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add JWT token to every request
api.interceptors.request.use(async (config) => {
    try {
        const token = await SecureStore.getItemAsync('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (e) {
        // SecureStore not available (e.g. on web)
    }
    return config;
});

export default api;
