import { useCallback, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Services';

const Login = () => {
    const isMounted = useRef(true);
    let navigate = useNavigate();
    const [creds, setCreds] = useState({
        email: '',
        password: ''
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
            let res = await login(creds);
            if (res.data) {
                setErrors({});
                navigate('/posts');
            }
        } catch (err) {
            setErrors(Object.entries(err.response.data.errors));
        }
    }, [creds, errors])

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
                    <label htmlFor="email" className="block font-medium text-sm text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={creds.email}
                        onChange={(e) => { setCreds(prev => ({ ...prev, email: e.target.value })) }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                        autoFocus
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
                        value={creds.password}
                        onChange={(e) => { setCreds(prev => ({ ...prev, password: e.target.value })) }}
                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button type="submit" className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3">
                        Log in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login