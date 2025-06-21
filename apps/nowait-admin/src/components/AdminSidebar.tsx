import React from "react";
import { NavLink } from "react-router-dom";
import { Clock, Layers, BarChart2 } from "lucide-react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import nwIcon from "../assets/nwLogo.svg";
import nwTextIcon from "../assets/nw_text_logo.svg";
import profile from "../assets/profile.png";

const AdminSidebar = () => {
  const width = useWindowWidth();

  // 375px 이하에서는 사이드바 완전히 숨김
  if (width <= 375) return null;
  if (width < 768) return null;

  const isCompact = width < 1024;

  return (
    <aside
      className={`
        h-screen flex flex-col justify-between border-r border-gray-100 bg-white px-4 py-6
        ${isCompact ? "w-[60px] items-center" : "w-[220px]"}
      `}
    >
      {/* 상단: 로고 & 메뉴 */}
      <div>
        {/* 로고 */}
        <div className="mb-8">
          {isCompact ? (
            <div className="flex justify-center">
              <img src={nwIcon} />
            </div>
          ) : (
            <div className="flex">
              <img src={nwTextIcon} />
            </div>
          )}
        </div>

        {/* 메뉴 */}
        <nav className="flex flex-col gap-2">
          <NavItem
            to="/admin"
            icon={<Clock className="w-5 h-5" />}
            label="웨이팅"
            compact={isCompact}
          />
          <NavItem
            to="/admin/orders"
            icon={<Layers className="w-5 h-5" />}
            label="주문"
            compact={isCompact}
          />
          <NavItem
            to="/admin/analytics"
            icon={<BarChart2 className="w-5 h-5" />}
            label="관리 · 통계"
            compact={isCompact}
          />
        </nav>
      </div>

      {/* 하단: 프로필 */}
      <div className="flex items-center gap-2">
        <img
          src={profile}
          alt="프로필"
          className="w-8 h-8 rounded-full object-cover"
        />
        {!isCompact && (
          <span className="text-sm font-medium text-black">스페이시스 ▾</span>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  compact: boolean;
}

const NavItem = ({ to, icon, label, compact }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold justify-center ${
          isActive ? "bg-gray-100 text-black" : "text-gray-400"
        } ${compact ? "justify-center" : "justify-start"}`
      }
    >
      {icon}
      {!compact && label}
    </NavLink>
  );
};
