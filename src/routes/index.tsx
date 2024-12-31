// import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

// const DashboardLayout = lazy(
//   () => import('@/components/layout/dashboard-layout')
// );
const AdminLoginPage = lazy(() => import('@/pages/auth/admin-login'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
// const StudentPage = lazy(() => import('@/pages/students'));
// const StudentDetailPage = lazy(
//   () => import('@/pages/students/StudentDetailPage')
// );

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
      ]
    }
  ];

const publicRoutes = [
    {
        path: '/admin-login',
        element: <AdminLoginPage />,
        index: true,
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);
  // const routes = useRoutes([ ...publicRoutes]);

  return routes;
}