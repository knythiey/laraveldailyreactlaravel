import { get, post, patch, destroy } from './ApiService';
import { getCategories } from './CategoryService';
import { getPosts, getPost, storePost, updatePost, deletePost } from './PostService';

export {
    get, post, patch, destroy,
    getCategories,
    getPosts, getPost, storePost, updatePost, deletePost
}