import { post, get } from './';

export const login = async (payload) => {
    try {
        const response = await post('/login', payload);
        return response;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await post('/logout');
        return response;
    } catch (error) {
        throw error;
    }
}

export const isLoggedIn = async () => {
    try {
        const response = await get('/api/user');
        return response;
    } catch (error) {
        throw error;
    }
}

export const register = async (payload) => {
    try {
        const response = await post('/register', payload);
        return response;
    } catch (error) {
        throw error;
    }
}