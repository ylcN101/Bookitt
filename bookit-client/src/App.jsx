import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Footer from './components/Footer';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Profile from './pages/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import LoginPhone from './pages/LoginPhone';
import MyMeetings from './components/MyMeetings';
import Loader from './components/Loader';
import Error from './pages/Error';
import AdminHome from './pages/Admin';
import Circular from './pages/Circular';
import AdminServices from './pages/AdminServices';
import { ModalProvider } from './context/modal';
import AddService from './pages/AddService';
import WorkingHours from './pages/WorkingHours';
import i18n from './i18n';

function App() {
  const { state, dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  i18n.changeLanguage('he');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <>
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <QueryClientProvider client={queryClient}>
            <Outlet />
            {state.isLoggedIn && <Footer />}
          </QueryClientProvider>
        )}
      </>
    );
  };

  const adminRoutes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element:
            state.isLoggedIn && state.user.isAdmin ? (
              <Navigate to={`/admin/${state.user.shopId}`} />
            ) : (
              <LoginPhone />
            ),
        },
        {
          path: '/admin/:shopId',
          element:
            state.isLoggedIn && state.user.isAdmin ? (
              <AdminHome />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
        {
          path: '/admin/circular/:shopId',
          element:
            state.isLoggedIn && state.user.isAdmin ? (
              <Circular />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
        {
          path: '/admin/services/:shopId',
          element:
            state.isLoggedIn && state.user.isAdmin ? (
              <AdminServices />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
        {
          path: `/admin/:shopId/addService`,
          element:
            state.isLoggedIn && state.user.isAdmin ? (
              <AddService />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
        {
          path: '/admin/working-hours/:shopId',
          element:
            state.isLoggedIn && state.user.isAdmin ? (
              <WorkingHours />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
      ],
    },
  ];

  const userRoutes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element:
            state.isLoggedIn && !state.user.isAdmin ? (
              <Navigate to={`/${state.user.shopId}`} />
            ) : (
              <LoginPhone />
            ),
        },
        {
          path: '/:shopId',
          element: <Home />,
        },
        {
          path: '/profile/:userId',
          element:
            state.isLoggedIn && !state.user.isAdmin ? (
              <Profile />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
        {
          path: '/:shopId/schedule',
          element:
            state.isLoggedIn && !state.user.isAdmin ? (
              <ScheduleMeeting />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
        {
          path: '/my-meetings/:userId',
          element:
            state.isLoggedIn && !state.user.isAdmin ? (
              <MyMeetings />
            ) : (
              <Navigate to="/" replace={true} />
            ),
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...userRoutes,
    ...adminRoutes,
    {
      path: '/error',
      element: <Error />,
    },
    {
      path: '*',
      element: <Navigate to="/error" />,
    },
  ]);

  return (
    <ModalProvider>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </ModalProvider>
  );
}

export default App;
