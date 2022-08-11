import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getCategories, deletePost } from '../../Services';
import Swal from 'sweetalert2';
import { useDebounce } from '../../Hooks';

const PostsIndex = () => {
    const isMounted = useRef(true);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState({
        page: 1,
        id: '',
        title: '',
        category_id: '',
        content: '',
        order_column: 'id',
        order_direction: 'desc',
        global: ''
    });
    const debouncedState = useDebounce(query, 500);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (debouncedState) fetchPosts(debouncedState);
    }, [debouncedState]);


    const fetchPosts = useCallback(async (q) => {
        try {
            if (!isMounted.current) return;
            let res = await getPosts(q);
            if (res.data) {
                setPosts(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }, [query]);

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

    const handleFilter = useCallback((event) => {
        if (!event) return;
        setQuery(prev => ({
            ...prev,
            page: 1,
            [event.target.name]: event.target.value
        }));
    }, [query]);

    const orderChanged = useCallback((col) => {
        if (!col) return;
        let dir = 'asc';
        if (col === query.order_column) {
            dir = query.order_direction === 'asc' ? 'desc' : 'asc'
        }

        setQuery(prev => ({
            ...prev,
            page: 1,
            order_column: col,
            order_direction: dir
        }));
    }, [query]);

    const handleDelete = useCallback(async (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Delete this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#EF4444',
            cancelButtonText: 'No',
            cancelButtonColor: '#A3A3A3',
            reverseButtons: true,
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (!isMounted.current) return;
                    let res = await deletePost(event.target.value);
                    if (res.status >= 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Successfully Deleted Post',
                            text: 'message will close in 2 secs',
                            timer: 2000
                        });
                        fetchPosts();
                    }
                } catch (err) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Something went wrong'
                    });
                }
            }
        })
    }, []);

    const renderPosts = useMemo(() => {
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
                            <td className='flex justify-between items-center'>
                                <Link to={`posts/edit/${post.id}`}>Edit</Link>
                                <button type="button" value={post.id} onClick={handleDelete} className="bg-red-500 rounded-full text-white mx-3 px-3 py-1 font-bold">Delete</button>
                            </td>
                        </tr>
                    );
                })
                : (<tr><td className="text-center" rowSpan={6}>No Posts</td></tr>)
        )
    }, [posts])

    const renderPaginatorLinks = useMemo(() => {
        return (posts?.meta?.links?.map((link, index) =>
            <button
                key={index}
                onClick={() => pageChanged(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                disabled={link.active || !link.url}
                className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"
            />
        ));
    }, [posts]);

    const renderPaginator = useMemo(() => {
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
                                {renderPaginatorLinks}
                            </span>
                        </div>
                    </div>
                </nav>
            );
    }, [posts]);

    const renderCategoryFilter = useMemo(() => {
        if (!categories) return;

        const catEle = categories.map(cat =>
            <option key={cat.id} value={cat.id}>{cat.name}</option>
        );

        return (
            <div className="m-2">
                <select name="category_id" onChange={handleFilter} className="mt-1 block w-full sm:mt-0 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value=''>-- all categories --</option>
                    {catEle}
                </select>
            </div>

        );
    }, [categories]);

    const orderColumnIcon = useCallback((col) => {
        let icon = 'fa-sort';
        if (query.order_column === col) {
            icon = (query.order_direction === 'asc') ? 'fa-sort-up' : 'fa-sort-down'
        }
        return (
            <i className={`fa-solid ${icon}`}></i>
        );
    }, [query]);

    const renderTextInputFilter = useCallback((column) => {
        return (
            <div className="m-2">
                <input type="text" placeholder={`Search ${column}. . .`} onChange={handleFilter} name={column} value={query[column]} className="block w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
        )
    }, [query]);

    const renderFiltersRow = useMemo(() => {
        return (
            <tr className="bg-gray-50">
                <th>
                    {renderTextInputFilter('id')}
                </th>
                <th>
                    {renderTextInputFilter('title')}
                </th>
                <th>
                    {renderCategoryFilter}
                </th>
                <th>
                    {renderTextInputFilter('content')}
                </th>
                <th>
                    {renderTextInputFilter('created_at')}
                </th>
                <th></th>
            </tr>
        )
    }, [categories, query]);

    // if (!posts.data) return;
    return (
        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
            <div className="min-w-full align-middle">
                <div className="mb-4">
                    {renderTextInputFilter('global')}
                </div>
                <table className="table">
                    <thead className="table-header">
                        <tr>
                            <th>
                                <div>
                                    <span>ID</span>
                                    <button onClick={() => orderChanged('id')} type='button' className='column-soft'>
                                        {orderColumnIcon('id')}
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Title</span>
                                    <button onClick={() => orderChanged('title')} type='button' className='column-soft'>
                                        {orderColumnIcon('title')}
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Category</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Content</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>Created at</span>
                                </div>
                            </th>
                            <th></th>
                        </tr>

                        {renderFiltersRow}
                    </thead>
                    <tbody className="table-body">
                        {renderPosts}
                    </tbody>
                </table>
                <div className="mt-4">
                    {renderPaginator}
                </div>
            </div>
        </div>
    )
}

export default PostsIndex