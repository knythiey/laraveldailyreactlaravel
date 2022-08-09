import { useState, useEffect, useRef, useCallback } from 'react';
import { getPosts } from '../../services/PostService';
import { getCategories } from '../../services/CategoryService';

const PostsIndex = () => {
    const isMounted = useRef(true);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState({ page: 1, category_id: '' });

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        console.log(posts);
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [query])

    const fetchPosts = useCallback(async () => {
        try {
            if (!isMounted.current) return;
            let res = await getPosts(query);
            if (res.data) {
                setPosts(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    });

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

    const pageChanged = useCallback((url) => {
        if (!url) return;
        const fullUrl = new URL(url);
        setQuery((prev) => ({
            ...prev, page: fullUrl.searchParams.get('page')
        }));
    }, []);

    const categoryChanged = useCallback((event) => {
        if (!event) return;

        setQuery({
            page: 1,
            category_id: event.target.value
        });
    }, []);

    const renderPosts = useCallback(() => {
        return (
            posts.data ?
                posts.data.map(post => {
                    return (
                        <tr key={`post-${post.id}`}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.category.name}</td>
                            <td>{post.content}</td>
                            <td>{post.created_at}</td>
                        </tr>
                    );
                })
                : (<tr key={`post-0`}><td className='text-center' rowSpan={4}>No Posts</td></tr>)
        )
    }, [posts])

    const renderPaginatorLinks = useCallback(() => {
        return posts.meta.links.map((link, index) =>
            <button
                key={index}
                onClick={() => pageChanged(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                disabled={link.active || !link.url}
                className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"
            />
        );
    }, [posts]);

    const renderPaginator = useCallback(() => {
        if (!posts.meta) return;
        else
            return (
                <nav role="navigation" aria-label="Pagination Navigation" className="flex items-center justify-between">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700 leading-5">
                                Showing
                                <span>
                                    <span className="font-medium"> {posts.meta.from} </span>
                                    to
                                    <span className="font-medium"> {posts.meta.to} </span>
                                </span>
                                of
                                <span className="font-medium"> {posts.meta.total} </span>
                                results
                            </p>
                        </div>

                        <div>
                            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                                {renderPaginatorLinks()}
                            </span>
                        </div>
                    </div>
                </nav>
            );
    }, [posts]);

    const renderCategoryFilter = useCallback(() => {
        if (!categories) return;

        const catEle = categories.map(cat =>
            <option key={cat.id} value={cat.id}>{cat.name}</option>
        );

        return (
            <select onChange={categoryChanged} className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value=''>-- all categories --</option>
                {catEle}
            </select>
        );
    }, [categories]);

    // if (!posts.data) return;
    return (
        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
            <div className="min-w-full align-middle">
                <div className="mb-4">
                    {renderCategoryFilter()}
                </div>

                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>
                                <span>ID</span>
                            </th>
                            <th>
                                <span>Title</span>
                            </th>
                            <th>
                                <span>Category</span>
                            </th>
                            <th>
                                <span>Content</span>
                            </th>
                            <th>
                                <span>Created at</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {renderPosts()}
                    </tbody>
                </table>
                <div className="mt-4">
                    {renderPaginator()}
                </div>
            </div>
        </div>
    )
}

export default PostsIndex