import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ReserveSuccessPage from "../pages/reserve/ReserveSuccessPage";
import MapPage from "../pages/reserve/MapPage";
import StoreDetailPage from "../pages/reserve/StoreDetailPage";
import RedirectToStorePage from "../pages/order/RedirectToStorePage";
import StorePage from "../pages/order/StorePage";
import AddMenuPage from "../pages/order/AddMenuPage";
import OrderListPage from "../pages/order/OrderListPage";
import OrderSuccessPage from "../pages/order/OrderSuccessPage";
import RemittanceRequestPage from "../pages/order/RemittanceRequestPage";
import StoreReservePage from "../pages/reserve/StoreReservePage";
import LoginPage from "../pages/login/LoginPage";
import KakaoRedirectHandler from "../pages/login/KakaoRedirectHandler";
import AuthGuard from "../components/AuthGuard";

// AuthGuard로 래핑하는 헬퍼 함수
const withAuth = (Component: React.ComponentType) => (
  <AuthGuard>
    <Component />
  </AuthGuard>
);

const Router = () => {
  return (
    <Routes>
      {/* 공개 라우트 - 인증 불필요 */}
      <Route path="/login/success" element={<KakaoRedirectHandler />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 보호된 라우트 - 인증 필요 (구체적인 경로 먼저) */}
      <Route
        path="/store/:id/reserve/success"
        element={withAuth(ReserveSuccessPage)}
      />
      <Route path="/store/:id/reserve" element={withAuth(StoreReservePage)} />
      <Route path="/store/:id" element={withAuth(StoreDetailPage)} />
      <Route path="/map" element={withAuth(MapPage)} />
      <Route path="/" element={withAuth(HomePage)} />

      {/* QR 코드 접속 페이지 - 인증 불필요 (일반적인 경로 나중에) */}
      <Route path="/:storeId/:tableId" element={<RedirectToStorePage />} />
      <Route path="/:storeId/menu/:menuId" element={<AddMenuPage />} />
      <Route path="/:storeId/order/success" element={<OrderSuccessPage />} />
      <Route path="/:storeId/order" element={<OrderListPage />} />
      <Route
        path="/:storeId/remittance/request"
        element={<RemittanceRequestPage />}
      />
      <Route path="/:storeId" element={<StorePage />} />
    </Routes>
  );
};

export default Router;
