import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './views/home/Home';
import UserDashboard from './views/userDashboard/UserDashboard';
import SignIn from './views/signIn/SignIn';
import PrivateRoute from './routes/PrivateRoute';
import PageNotFound from './views/error/PageNotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'sign-in',
                element: <SignIn />,
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: 'user-dashboard',
                        element: <UserDashboard />,
                    },
                ],
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
]);
