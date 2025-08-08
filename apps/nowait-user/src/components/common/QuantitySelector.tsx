import React from "react";
import Minus from "../../assets/icon/minus.svg?react";
import Plus from "../../assets/icon/plus.svg?react";
import NumberFlow from "@number-flow/react";

interface stateProps {
  mode: "state";
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

interface storeProps {
  mode: "store";
  id: number;
  quantity: number;
  price: number;
  increaseQuantity: (id: number, price: number) => void;
  decreaseQuantity: (id: number, price: number) => void;
}

type PropsType = stateProps | storeProps;

const QuantitySelector = (props: PropsType) => {
  const isQuantityMin = props.quantity === 1;
  const isQuantityMax = props.quantity === 99;

  const increaseQuantityButton = () => {
    // 전체 주문 페이지에서 수량 컨트롤(로컬 스토리지에 바로 반영)
    if (props.mode === "store") {
      props.increaseQuantity(props.id, props.price);
      // 메뉴 추가 페이지에서 수량 컨트롤(메뉴 추가 페이지에서 추가하기 클릭 전까지 로컬 스토리지에 반영x)
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
        className={`${
          isQuantityMin ? "bg-black-10" : "bg-black-20"
        } rounded-[7px] w-[28px] h-[28px] flex items-center justify-center`}
        disabled={isQuantityMin}
        onClick={decreaseQuantityButton}
      >
        <Minus fill={`${isQuantityMin ? "#E6E6E6" : "#888888"}`} />
      </button>
      <p
        className={`w-[30px] text-center ${
          props.mode === "state"
            ? "text-[20px] font-semibold"
            : "text-16-semibold"
        } text-balck-80`}
      >
        <NumberFlow value={props.quantity}/>
      </p>
      <button
        className={`${
          isQuantityMax ? "bg-black-10" : "bg-black-20"
        } rounded-[7px] w-[28px] h-[28px] flex items-center justify-center`}
        disabled={isQuantityMax}
        onClick={increaseQuantityButton}
      >
        <Plus fill={`${isQuantityMax ? "#E6E6E6" : "#888888"}`} />
      </button>
    </div>
  );
};

export default QuantitySelector;
