import { Suspense, lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/components/layouts/dashboard-layout";

// Lazy load components
const AdminLoginPage = lazy(() => import("@/pages/auth/admin-login"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));
// const StudentPage = lazy(() => import('@/pages/students'));
// const StudentDetailPage = lazy(() => import('@/pages/students/StudentDetailPage'));

export default function AppRouter() {
  // Dashboard routes with lazy-loaded pages
  const dashboardRoutes = [
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <DashboardPage />
            </Suspense>
          ),
        },
      ],
    },
  ];

  // Public routes
  const publicRoutes = [
    {
      path: "/admin-login",
      element: (
        <Suspense fallback={<div>Loading Login...</div>}>
          <AdminLoginPage />
        </Suspense>
      ),
      index: true,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ];

  // Combine dashboard and public routes and pass them to `useRoutes`
  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
