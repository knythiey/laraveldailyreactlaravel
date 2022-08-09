import { useState, useEffect, useRef, useCallback } from 'react';
import { getPosts } from '../../services/PostService';

const PostsIndex = () => {
    const isMounted = useRef(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const fetchPosts = useCallback(async (page = 1) => {
        try {
            if (!isMounted.current) return;
            let res = await getPosts(page);
            if (res.data) {
                setPosts(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const pageChanged = useCallback((url) => {
        if (!url) return;
        const fullUrl = new URL(url),
            page = fullUrl.searchParams.get('page')

        fetchPosts(page)
    }, [posts]);

    const renderPosts = useCallback(() => {
        return (
            posts.data ?
                posts.data.map(post => {
                    return (
                        <tr key={`post-${post.id}`}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.created_at}</td>
                        </tr>
                    );
                })
                : (<tr key={`post-0`}><td className='text-center' rowSpan={4}>No Posts</td></tr>)
        )
    }, [posts])

    const renderPaginatorLinks = useCallback(() => {
        console.log(posts);
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

    // if (!posts.data) return;
    return (
        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
            <div className="min-w-full align-middle">
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