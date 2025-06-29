import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileMenuBar from "../components/MobileMenuBar";
import { useWindowWidth } from "../hooks/useWindowWidth";

const AdminLayout = () => {
  const width = useWindowWidth();

  const isCompact = width < 1024;
  const isMobile = width <= 431;
  return (
    <div className="flex [@media(max-width:431px)]:flex-col">
      {width <= 431 ? <MobileMenuBar /> : <AdminSidebar />}
      <main className="flex bg-[#F2F6F9] min-h-screen py-5 md:px-7.5 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
