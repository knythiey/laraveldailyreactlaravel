import { post, get } from './';

export const getCategories = async (payload) => {
    try {
        const response = await get('api/categories', payload);
        return response;
    } catch (error) {
        throw error;
    }
};