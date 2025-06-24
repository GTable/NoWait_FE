import QuantitySelector from "../common/QuantitySelector";
import close from "../../assets/icon/close.svg";

const MenuItem = () => {
  return (
    <li className="-mx-5 border-b border-[#ececec]">
      <div className="w-full p-5">
        <div className="flex justify-between items-start">
          <div className="max-w-[12.5rem]">
            <h1 className="text-title-20-semibold text-ellipsis line-clamp-2">
              메뉴명메뉴명메뉴명메뉴명메뉴명메뉴명메뉴명메뉴명메뉴명
            </h1>
            <h2 className="text-16-regular text-black-70">12,000원</h2>
          </div>
          <button onClick={() => alert("삭제")}>
            <img
              className="text-black-50"
              src={close}
              alt="수량 마이너스 아이콘"
            />
          </button>
        </div>
        <QuantitySelector />
      </div>
    </li>
  );
};

export default MenuItem;
