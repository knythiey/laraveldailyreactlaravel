import './bootstrap';

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PostsIndex from './Pages/Posts/Index';
import PostsCreate from './Pages/Posts/Create';
import PostsEdit from './Pages/Posts/Edit';
import App from './Layouts/App';
import Guest from './Layouts/Guest';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

ReactDOM.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path="posts" element={<App />}>
                <Route index element={<PostsIndex />}></Route>
                <Route path="/posts/create" element={<PostsCreate />}></Route>
                <Route path="/posts/edit/:id" element={<PostsEdit />}></Route>
            </Route>
            <Route path="login" element={<Guest />}>
                <Route index element={<Login />}></Route>
            </Route>
            <Route path="register" element={<Guest />}>
                <Route index element={<Register />}></Route>
            </Route>
            <Route path="*" element={<Navigate to="/posts" replace />} />
        </Routes>
    </BrowserRouter>
);
