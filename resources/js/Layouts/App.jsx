import { useCallback, useRef, useEffect } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import { logout, isLoggedIn } from '../Services';

const App = () => {
  const isMounted = useRef(true);
  const navigate = useNavigate();
  const isNavLinkActive = (isActive) => {
    return (
      isActive ? 'inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
        : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
    )
  }

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        if (!isMounted.current) return;
        let res = await isLoggedIn();
        if (res.status === 401) {
          navigate('/login');
        }
      } catch (err) {
        if (err.response.status === 401) {
          navigate('/login');
        }
      }
    }

    checkIsAuth();
  });

  const handleLogout = useCallback(async () => {
    try {
      if (!isMounted.current) return;
      let res = await logout();
      if (res.status >= 200) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link to="/posts">
                  React Course
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink to="/"
                  className={({ isActive }) => isNavLinkActive(isActive)}>
                  Posts
                </NavLink>
                <NavLink to="/posts/create"
                  className={({ isActive }) => isNavLinkActive(isActive)}>
                  Add post
                </NavLink>
              </div>
            </div>

            <div className="flex items-center ml-6">
              <div className="ml-3 relative">
                <button type="button" onClick={handleLogout}>Log out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            Dashboard
          </h2>
        </div>
      </header>

      <main>
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App