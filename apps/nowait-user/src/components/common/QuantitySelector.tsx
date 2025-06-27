import React from "react";
import minus from "../../assets/icon/minus.svg";
import plus from "../../assets/icon/plus.svg";

interface stateProps {
  mode: "state";
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
interface storeProps {
  mode: "store";
  id: string;
  quantity: number;
  price: number;
  increaseQuantity: (id: string, price: number) => void;
  decreaseQuantity: (id: string, price: number) => void;
}
type PropsType = stateProps | storeProps;

const QuantitySelector = (props: PropsType) => {
  const increaseQuantityButton = () => {
    if (props.mode === "store") {
      props.increaseQuantity(props.id, props.price);
    } else if (props.mode === "state") {
      props.setQuantity(props.quantity + 1);
    }
  };
  const decreaseQuantityButton = () => {
    if (props.mode === "store") {
      props.decreaseQuantity(props.id, props.price);
    } else if (props.mode === "state") {
      props.setQuantity(props.quantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-end gap-0.5">
      <button
        className={`bg-[#F2F6F9] rounded-[7px] w-[28px] h-[28px] flex items-center justify-center ${
          props.quantity === 1 ? "bg-[#e6e8eb]" : "bg-[#F2F6F9]"
        }`}
        disabled={props.quantity === 1}
        onClick={decreaseQuantityButton}
      >
        <img src={minus} alt="수량 마이너스 아이콘" />
      </button>
      <p
        className={`w-[30px] text-center ${
          props.mode === "state"
            ? "text-[20px] font-semibold"
            : "text-16-semibold"
        } text-balck-80`}
      >
        {props.quantity}
      </p>

      <button
        className="bg-[#F2F6F9] rounded-[7px] w-[28px] h-[28px]  flex items-center justify-center"
        onClick={increaseQuantityButton}
      >
        <img src={plus} alt="수량 마이너스 아이콘" />
      </button>
    </div>
  );
};

export default QuantitySelector;
