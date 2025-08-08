import { Routes, Route } from "react-router";
import AdminLayout from "./layout/AdminLayout";
import AdminAnalytics from "./pages/AdminAnalytics/AdminAnalytics";
import AdminHome from "./pages/AdminHome/AdminHome";
import AdminOrders from "./pages/AdminOrders/AdminOrders";
import NotFound from "./pages/NotFound/NotFound";
import LoginPage from "./pages/LoingPage/LoginPage";
import AdminAuth from "./pages/AdminAuth/AdminAuth";
import AdminBooth from "./pages/AdminBooth/AdminBooth";
import QrGuides from "./pages/AdminBooth/components/QrGuides";

function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          // <RequireAdminAuth>
          <AdminLayout />
          // </RequireAdminAuth>
        }
      >
        {/* 대기인원 */}
        <Route index element={<AdminHome />} />
        {/* 주문현황 */}
        <Route path="booth" element={<AdminBooth />} />
        <Route path="booth/guides" element={<QrGuides />} />
        <Route path="orders" element={<AdminOrders />} />
        {/* 관리 & 통계 페이지 */}
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<AdminAuth />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
