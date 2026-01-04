import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RequireAdminAuth from "./components/RequireAdminAuth";

const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics/AdminAnalytics"));
const AdminHome = lazy(() => import("./pages/AdminHome/AdminHome"));
const AdminOrders = lazy(() => import("./pages/AdminOrders/AdminOrders"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const LoginPage = lazy(() => import("./pages/LoingPage/LoginPage"));
const AdminAuth = lazy(() => import("./pages/AdminAuth/AdminAuth"));
const AdminBooth = lazy(() => import("./pages/AdminBooth/AdminBooth"));
const QrGuides = lazy(() => import("./pages/AdminBooth/components/QrGuides"));

const withSuspense = (node: React.ReactNode) => (
  <Suspense fallback={null}>{node}</Suspense>
);

const router = createBrowserRouter([
  {
    element: <RequireAdminAuth />,
    children: [
      {
        path: "/admin",
        element: withSuspense(<AdminLayout />),
        children: [
          { index: true, element: withSuspense(<AdminHome />) },
          { path: "booth", element: withSuspense(<AdminBooth />) },
          { path: "booth/guides", element: withSuspense(<QrGuides />) },
          { path: "orders/:storeId", element: withSuspense(<AdminOrders />) },
          { path: "analytics", element: withSuspense(<AdminAnalytics />) },
          { path: "*", element: withSuspense(<NotFound />) },
        ],
      },
    ],
  },
  { path: "/", element: withSuspense(<AdminAuth />) },
  { path: "/login", element: withSuspense(<LoginPage />) },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
