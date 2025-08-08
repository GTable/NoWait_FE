import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import WaitingSuccessPage from "../pages/waiting/waitingSuccess/WaitingSuccessPage";
import MapPage from "../pages/waiting/boothMap/MapPage";
import StoreDetailPage from "../pages/waiting/storeDetail/StoreDetailPage";
import RedirectToStorePage from "../pages/order/home/RedirectToStorePage";
import StorePage from "../pages/order/home/StorePage";
import OrderListPage from "../pages/order/orderList/OrderListPage";
import OrderSuccessPage from "../pages/order/orderSuccess/OrderSuccessPage";
import LoginPage from "../pages/login/LoginPage";
import KakaoRedirectHandler from "../pages/login/KakaoRedirectHandler";
import AuthGuard from "../components/AuthGuard";
import PageTransitionWrapper from "../components/layout/PageTransitionWrapper";
import WaitingPartySizeForm from "../pages/waiting/waitingPartysize/WaitingPartySizeForm";
import AddMenuPage from "../pages/order/addMenu/AddMenuPage";
import RemittanceWaitPage from "../pages/order/remittenceWait/RemittanceWaitPage";
import OrderDetailsPage from "../pages/order/orderDetails/OrderDetailsPage";
import RemittancePage from "../pages/order/remittance/RemittancePage";
import BookmarkPage from "../pages/waiting/bookmark/BookmarkPage";
import StoreNoticePage from "../pages/waiting/storeNotice/StoreNoticePage";
import WaitingSummaryPage from "../pages/waiting/waitingSummary/WaitingSummaryPage";
import MapManagePage from "../pages/waiting/boothMap/MapManagePage";

// AuthGuard로 래핑하는 헬퍼 함수
const withAuth = (Component: React.ComponentType) => (
  <AuthGuard>
    <Component />
  </AuthGuard>
);
const withTransition = (Component: React.ComponentType) => (
  <PageTransitionWrapper>
    <Component />
  </PageTransitionWrapper>
);
const Router = () => {
  return (
    // <PageTransitionWrapper>
    <>
      <Routes>
        {/* 공개 라우트 - 인증 불필요 */}
        <Route path="/login/success" element={<KakaoRedirectHandler />} />
        <Route path="/login" element={<LoginPage />} />

      {/* 보호된 라우트 - 인증 필요 (구체적인 경로 먼저) */}
      <Route
        path="/store/:id/reserve/success"
        element={withAuth(WaitingSuccessPage)}
      />
      {/* <Route path="/store/:id/reserve" element={withAuth(StoreReservePage)} /> */}
      <Route path="/store/:id" element={withAuth(StoreDetailPage)} />
      <Route path="/map" element={withAuth(MapPage)} />
      <Route path="/mapManage" element={withAuth(MapManagePage)} />
      <Route path="/bookmark" element={withAuth(BookmarkPage)} />
      <Route path="/store/:id/notice" element={withAuth(StoreNoticePage)} />
      <Route
        path="/store/:id/partysize"
        element={withAuth(WaitingPartySizeForm)}
      />
      <Route
        path="/store/:id/waiting/summary"
        element={withAuth(WaitingSummaryPage)}
      />
      <Route
        path="/store/:id/waiting/success"
        element={withAuth(WaitingSuccessPage)}
      />
      <Route path="/" element={withAuth(HomePage)} />

        {/* QR 코드 접속 페이지 - 인증 불필요 (일반적인 경로 나중에) */}
        <Route path="/:storeId/:tableId" element={<RedirectToStorePage />} />
        <Route path="/:storeId" element={withTransition(StorePage)} />
        <Route
          path="/:storeId/menu/:menuId"
          element={withTransition(AddMenuPage)}
        />
        <Route path="/:storeId/order" element={withTransition(OrderListPage)} />
        <Route
          path="/:storeId/remittance"
          element={withTransition(RemittancePage)}
        />
        <Route
          path="/:storeId/remittanceWait"
          element={withTransition(RemittanceWaitPage)}
        />
        <Route
          path="/:storeId/order/success"
          element={withTransition(OrderSuccessPage)}
        />

        <Route
          path="/:storeId/orderDetails"
          element={withTransition(OrderDetailsPage)}
        />
      </Routes>
      {/* {background && (
        <Routes>
          <Route
            path="/:storeId/menu/:menuId"
            element={withTransition(AddMenuPage)}
          />
        </Routes>
      )} */}
    </>
  );
};

export default Router;
