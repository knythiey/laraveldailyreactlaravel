import { get, post, patch, destroy } from './ApiService';
import { getCategories } from './CategoryService';
import { getPosts, getPost, storePost, updatePost, deletePost } from './PostService';
import { login, logout, isLoggedIn } from './AuthService';

export {
    get, post, patch, destroy,
    getCategories,
    getPosts, getPost, storePost, updatePost, deletePost,
    login, logout, isLoggedIn
}