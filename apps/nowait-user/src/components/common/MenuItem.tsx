import { useNavigate, useParams } from "react-router-dom";
import type { MenuType } from "../../types/order/menu";
import defaultMenuImageSm from "../../assets/default-menu-image-sm.png";

interface PropsType {
  data: MenuType;
  mode: string;
}

const MenuItem = ({ data, mode }: PropsType) => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  const handleMenuClick = () => {
    if (mode === "order") {
      navigate(`/${storeId}/menu/${data.menuId}`, { state: data });
    }
  };

  return (
    <li className="mb-5 last:mb-0">
      <button
        disabled={data.isSoldOut}
        onClick={handleMenuClick}
        className={`w-full flex justify-between ${
          mode === "order" && "cursor-pointer"
        } text-left`}
      >
        <div className="max-w-[224px]">
          <div className="flex justify-center items-center gap-1.5 mb-1">
            <h2 className="text-title-16-bold text-black-90 text-ellipsis line-clamp-2">
              {data.name}
            </h2>
            {data.isSoldOut && (
              <span className="text-[12px] font-bold text-primary bg-[#FFE9DF] rounded-[6px] px-2 py-1">
                품절
              </span>
            )}
          </div>
          <h2 className="text-black-70">{data.price.toLocaleString()}원</h2>
        </div>
        <img
          className={`w-[80px] h-[80px] bg-black-25 rounded-[12px] object-cover ${
            data.isSoldOut && "opacity-40"
          }`}
          src={`${data.image}` || defaultMenuImageSm}
          alt="음식 메뉴 이미지"
        />
      </button>
    </li>
  );
};

export default MenuItem;
