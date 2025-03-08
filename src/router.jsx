import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './views/home/Home';
import LogIn from './views/logIn/LogIn';
import UserDashboard from './views/userDashboard/UserDashboard';
import UserAccountDetail from './views/userAccountDetail/UserAccountDetail';

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
                path: 'log-in',
                element: <LogIn />
            },
            {
                path: '/user-dashboard',
                element: <UserDashboard />,
            },
            {
                path: '/user-account-detail',
                element: <UserAccountDetail />,
            },
        ],
    },
]);