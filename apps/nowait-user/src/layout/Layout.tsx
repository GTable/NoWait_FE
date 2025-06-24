import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-[100dvh] user-container">
      <Outlet />
    </div>
  );
};

export default Layout;
