import { useState } from "react";
import type { CartType } from "../../../../types/order/cart";
import ArrowDown from "../../../../assets/icon/order-arrow-down.svg?react";
import defaultMenuImageSm from "../../../../assets/default-menu-image-sm.png"
import SlideToggle from "./SlideToggle";

interface PropsType {
  cart: CartType[];
}
const OrderSummary = ({ cart }: PropsType) => {
  const [orderSummaryOpenToggle, setOrderSummaryOpenToggle] = useState(false);

  return (
    <section>
      <div className="py-5">
        <button
          className="w-full flex justify-between items-center"
          onClick={() => setOrderSummaryOpenToggle(!orderSummaryOpenToggle)}
        >
          <h1 className="text-title-18-semibold">주문 {cart.length}건</h1>
          <p
            className={
              orderSummaryOpenToggle
                ? "rotate-180 transition-transform"
                : "rotate-0 transition-transform"
            }
          >
            <ArrowDown />
          </p>
        </button>
      </div>
      <SlideToggle toggle={orderSummaryOpenToggle}>
        <ul>
          {cart.map((item: CartType) => {
            return (
              <li
                className="flex justify-between items-center pb-5"
                key={item.menuId}
              >
                <div className="max-w-[224px]">
                  <h1 className="text-16-medium text-black-80 mb-1 text-ellipsis line-clamp-2">
                    {item.name}
                  </h1>
                  <div className="flex gap-1">
                    <h2 className="text-16-semibold text-black-80">
                      {item.price.toLocaleString()}원
                    </h2>
                    <span className="text-16-medium text-black-60">·</span>
                    <p className="text-16-medium text-black-60">
                      {item.quantity}개
                    </p>
                  </div>
                </div>
                <img
                  className="w-[76px] h-[76px] rounded-[12px] object-cover"
                  src={`${item.image}` || defaultMenuImageSm}
                  alt="음식 메뉴 이미지"
                />
              </li>
            );
          })}
        </ul>
      </SlideToggle>
    </section>
  );
};

export default OrderSummary;
