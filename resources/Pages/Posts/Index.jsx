import { useState, useEffect, useRef } from 'react';
import { getPosts } from '../../services/PostService';

const PostsIndex = () => {
    const isMounted = useRef(true);
    const [posts, setPosts] = useState([]);

    // const fetchPosts = axios.get('api/posts')
    //     .then(response => setPosts(response.data));

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (!isMounted.current) return;
                let res = await getPosts();
                if (res.data.data) {
                    setPosts(res.data.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

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
                        {posts.length ?
                            posts.map(post => {
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
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PostsIndex