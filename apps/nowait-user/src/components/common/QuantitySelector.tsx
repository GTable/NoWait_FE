import minus from "../../assets/icon/minus.svg";
import plus from "../../assets/icon/plus.svg";

const QuantitySelector = () => {
  const decreaseQuantity = () => {};
  const increaseQuantity = () => {};
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        className="bg-[#F2F6F9] rounded-[7px] w-[28px] h-[28px] flex items-center justify-center"
        onClick={decreaseQuantity}
      >
        <img src={minus} alt="수량 마이너스 아이콘" />
      </button>
      <p className="text-16-semibold text-balck-80">1</p>
      <button
        className="bg-[#F2F6F9] rounded-[7px] w-[28px] h-[28px]  flex items-center justify-center"
        onClick={increaseQuantity}
      >
        <img src={plus} alt="수량 마이너스 아이콘" />
      </button>
    </div>
  );
};

export default QuantitySelector;
