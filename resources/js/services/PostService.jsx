import { post, get, patch, destroy } from './';

export const getPosts = async (payload) => {
    try {
        const response = await get('api/posts', payload);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getPost = async (id) => {
    try {
        const response = await get(`api/posts/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const storePost = async (payload) => {
    try {
        const response = await post(`api/posts`, payload);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (id, payload) => {
    try {
        const response = await patch(`api/posts/${id}`, payload);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (id) => {
    try {
        const response = await destroy(`api/posts/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};