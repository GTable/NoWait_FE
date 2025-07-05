import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";

const AdminLayout = () => {
  const width = useWindowWidth();

  const isCompact = width < 1024;
  const isMobile = width <= 431;

  const getSidebarWidth = () => {
    if (isMobile || width <= 768) return 0;
    return isCompact ? 60 : 210;
  };

  return (
    <div className="flex w-screen">
      {isMobile ? <MobileMenuBar /> : <AdminSidebar />}
      <main
        className={`
          flex bg-[#F2F6F9] min-h-screen py-5
          ${
            isMobile || width <= 768
              ? "w-full px-5"
              : isCompact
              ? "w-[calc(100vw-60px)] ml-[60px] px-7.5"
              : "w-[calc(100vw-210px)] ml-[210px] px-7.5"
          }
        `}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
