import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/reserve/HomePage";
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

const Router = () => {
  return (
    <Routes>
      {/* ==== 주점 예약 페이지 (reserve) ==== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/store/:id" element={<StoreDetailPage />} />
      <Route path="/store/:id/reserve" element={<StoreReservePage />} />
      <Route
        path="/store/:id/reserve/success"
        element={<ReserveSuccessPage />}
      />
      <Route path="/map" element={<MapPage />} />

      {/* ==== QR 링크용 리다이렉트 (order) ==== */}
      <Route path="/:storeId/:tableId" element={<RedirectToStorePage />} />

      {/* ==== 메뉴 주문 페이지 (order) ==== */}
      <Route path="/:storeId" element={<StorePage />} />
      <Route path="/:storeId/menu/add" element={<AddMenuPage />} />
      <Route path="/:storeId/order" element={<OrderListPage />} />
      <Route path="/:storeId/order/success" element={<OrderSuccessPage />} />
      <Route
        path="/:storeId/remittance/request"
        element={<RemittanceRequestPage />}
      />
    </Routes>
  );
};

export default Router;
