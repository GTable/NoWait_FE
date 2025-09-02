import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ConfirmRemoveModal from "../components/ConfirmRemoveModal";

import { useGetOrderList } from "../hooks/useGetOrderList";
import { useDetectNewOrders } from "../hooks/useDetectNewOrders";
import NewOrderToast from "../components/NewOrderToast";

const AdminLayout = () => {
  const width = useWindowWidth();
  const navigate = useNavigate();
  const isCompact = width < 1024;
  const isMobile = width <= 767;

  const storeId = Number(localStorage.getItem("storeId"));
  const { data: orders = [] } = useGetOrderList(storeId);
  useDetectNewOrders(orders);

  const { pathname } = useLocation();
  const isBoothPage =
    pathname === "/admin/booth" || pathname === "/admin/booth/guides";
  const [logoutOpen, setLogoutOpen] = useState(false);
  const handleLogout = () => {
    setLogoutOpen(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("storeId");
    navigate("/");
  };

  // 로그아웃 버튼 클릭시 모달창 띄우기
  const handleClickLogout = () => {
    setLogoutOpen(true);
  };

  return (
    <div className={`${isMobile ? "flex flex-col" : "flex"} w-screen`}>
      {isMobile ? (
        <MobileMenuBar handleClickLogout={handleClickLogout} />
      ) : (
        <AdminSidebar handleClickLogout={handleClickLogout} />
      )}
      <main
        className={`
        flex bg-[#F2F6F9] min-h-screen
        ${isBoothPage ? "" : "py-5"}
        ${
          isMobile || width <= 768
            ? `w-full ${isBoothPage ? "" : "px-5"}`
            : isCompact
            ? `w-[calc(100vw-60px)] ml-[60px] ${isBoothPage ? "" : "px-7.5"}`
            : `w-[calc(100vw-210px)] ml-[210px] ${isBoothPage ? "" : "px-7.5"}`
        }
      `}
      >
        <Outlet />
      </main>
      {logoutOpen && (
        <ConfirmRemoveModal
          mode="logout"
          onCancel={() => setLogoutOpen(false)}
          onConfirm={handleLogout}
        />
      )}
      <NewOrderToast />
    </div>
  );
};

export default AdminLayout;
