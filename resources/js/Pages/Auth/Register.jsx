import { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Services';

const Register = () => {
    const isMounted = useRef(true);
    let navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            if (!isMounted.current) return;
            let res = await register(data);
            if (res.data) {
                setErrors({});
                navigate('/posts');
            }
        } catch (err) {
            setErrors(Object.entries(err.response.data.errors));
        }
    }, [data, errors])

    const handleChange = useCallback((event) => {
        setData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }, [data]);

    return (
        <div>
            {errors.length && <div>
                <div className="font-medium text-red-600">
                    Whoops! Something went wrong.
                </div>

                <ul className="mt-3 mb-4 list-disc list-inside text-sm text-red-600">
                    {errors.map((err, i) => {
                        return (
                            <li key={i}>{err[1][0]}</li>
                        )
                    })}
                </ul>
            </div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block font-medium text-sm text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        autoFocus
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="block font-medium text-sm text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <label htmlFor="password" className="block font-medium text-sm text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="mt-4">
                    <label htmlFor="password_confirmation" className="block font-medium text-sm text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register