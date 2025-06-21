import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex [@media(max-width:431px)]:px-[15px]">
      <AdminSidebar />
      <main className="flex justify-between bg-[#F2F6F9 mx-auto min-h-screen py-6 md:px-[30px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
