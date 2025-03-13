import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './views/home/Home';
import UserDashboard from './views/userDashboard/UserDashboard';
import UserAccountDetail from './views/userAccountDetail/UserAccountDetail';
import SignIn from './views/signIn/SignIn';

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
                element: <SignIn />
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