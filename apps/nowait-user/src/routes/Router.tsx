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

const Router = () => {
  return (
    <Routes>
      {/* 공개 라우트 - 인증 불필요 */}
      {/* 로그인 페이지 */}
      <Route path="/login/success" element={<KakaoRedirectHandler />} />
      <Route path="/login" element={<LoginPage />} />

      {/* QR 코드 접속 페이지 */}
      <Route path="/:storeId/:tableId" element={<RedirectToStorePage />} />
      <Route path="/:storeId" element={<StorePage />} />
      <Route path="/:storeId/menu/add" element={<AddMenuPage />} />
      <Route path="/:storeId/order" element={<OrderListPage />} />
      <Route path="/:storeId/order/success" element={<OrderSuccessPage />} />
      <Route
        path="/:storeId/remittance/request"
        element={<RemittanceRequestPage />}
      />

      {/* 보호된 라우트 - 인증 필요 */}
      <Route
        path="/*"
        element={
          <AuthGuard>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store/:id" element={<StoreDetailPage />} />
              <Route path="/store/:id/reserve" element={<StoreReservePage />} />
              <Route
                path="/store/:id/reserve/success"
                element={<ReserveSuccessPage />}
              />
              <Route path="/map" element={<MapPage />} />
            </Routes>
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default Router;
