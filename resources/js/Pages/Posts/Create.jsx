import { useState, useCallback, useEffect, useRef } from 'react'
import { getCategories, storePost } from '../../Services';
import { useNavigate } from 'react-router-dom';

const PostsCreate = () => {
    const isMounted = useRef(true);
    let navigate = useNavigate();
    const [post, setPost] = useState({
        title: '',
        content: '',
        category_id: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            if (!isMounted.current) return;
            let res = await getCategories();
            if (res.data.data) {
                setCategories(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleChange = useCallback((event) => {
        setPost(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            if (!isMounted.current) return;
            let res = await storePost(post);
            console.log(res);
            if (res.status >= 200) {
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log(error);
        }
    }, [post]);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title" className="block font-medium text-sm text-gray-700">
                    Title
                </label>
                <input value={post.title} onChange={handleChange} name="title" id="title" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div className="mt-4">
                <label htmlFor="content" className="block font-medium text-sm text-gray-700">
                    Content
                </label>
                <textarea value={post.content} onChange={handleChange} name="content" id="content" type="text" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
            <div className="mt-4">
                <label htmlFor="category" className="block font-medium text-sm text-gray-700">
                    Category
                </label>
                <select value={post.category_id} onChange={handleChange} name="category_id" id="category_id" className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="">-- Select category --</option>
                    {categories && categories.map(cat =>
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    )}
                </select>
            </div>
            <div className="mt-4">
                <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">
                    Save
                </button>
            </div>
        </form>
    )
}

export default PostsCreate