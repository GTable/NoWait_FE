import waitIcon from "../assets/Waiting.svg"; // 대기 아이콘 등
import orderIcon from "../assets/Order.svg";
import statIcon from "../assets/Statistics.svg";
import boothIcon from "../assets/Tent.svg";
import profileImg from "../assets/profile.png"; // 사용자 이미지
import cancelIcon from "../assets/Cancel.svg";
import { useLocation, useNavigate } from "react-router";

const menuItems = [
  { label: "대기", icon: waitIcon, path: "/admin" },
  { label: "주문", icon: orderIcon, path: "/admin/orders" },
  { label: "통계", icon: statIcon, path: "/admin/analytics" },
  { label: "부스 관리", icon: boothIcon, path: "/admin/booth" },
];

const MobileAdminNav = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div className="w-[250px] h-full bg-white flex flex-col px-4 py-6 shadow-lg fixed top-0 right-0 z-50">
      {/* 상단 - 닫기 버튼 */}
      <div className="flex justify-end mb-4">
        <button onClick={onClose}>
          <img src={cancelIcon} alt={"닫기"} className="w-6" />
        </button>
      </div>

      {/* 메뉴 목록 */}
      <div className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-2">
          {menuItems.map(({ label, icon, path }) => {
            const isActive = pathname === path;
            return (
              <li
                key={label}
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive
                    ? "bg-[#f5f5f5] text-black font-semibold"
                    : "text-gray-400"
                }`}
                onClick={() => navigate(path)}
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>

        {/* 하단 - 로그아웃 */}
        <div className="flex items-center gap-2 px-3 mt-8">
          <img
            src={profileImg}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <button className="text-red-500 font-medium text-sm">
            계정 로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminNav;
