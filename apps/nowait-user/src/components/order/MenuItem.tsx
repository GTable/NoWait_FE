import React, { useState } from "react";
import QuantitySelector from "../common/QuantitySelector";
import close from "../../assets/icon/close.svg";
import { useCartStore } from "../../stores/cartStore";

interface PropsType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const MenuItem = ({ id, name, price, quantity }: PropsType) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  return (
    <li className="-mx-5 border-b border-[#ececec]">
      <div className="w-full p-5">
        <div className="flex justify-between items-start">
          <div className="max-w-[12.5rem]">
            <h1 className="text-title-18-medium text-ellipsis line-clamp-2">
              {name}
            </h1>
            <h2 className="text-title-18-bold">{price.toLocaleString()}원</h2>
          </div>
          <button onClick={() => removeFromCart(id)}>
            <img className="text-black-50" src={close} alt="메뉴 삭제 아이콘" />
          </button>
        </div>
        <QuantitySelector
          mode="store"
          id={id}
          quantity={quantity}
          price={price / quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
    </li>
  );
};

export default MenuItem;
