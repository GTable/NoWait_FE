import React, { useState } from "react";
import QuantitySelector from "../../components/common/QuantitySelector";
import { useLocation, useNavigate } from "react-router-dom";
import PageFooterButton from "../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import type { CartItem } from "../../types/order/cart";
import { useCartStore } from "../../stores/cartStore";

const AddMenuPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, image, name, description, price } = location.state;
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart } = useCartStore();

  const addToCartButton = () => {
    const item: CartItem = {
      id,
      name,
      quantity,
      price: price * quantity,
    };
    addToCart(item);
    navigate(-1);
  };
  return (
    <div>
      <div className="px-5 h-[100dvh]">
        <h1 className="-mx-5 h-[375px] bg-amber-400">
          <img className="w-full" src={image} alt="음식 메뉴 이미지" />
        </h1>
        <div className="py-8">
          <h1 className="text-[24px] font-semibold">{name}</h1>
          <h2>{description}</h2>
        </div>
        <div className="flex justify-between items-center -mx-5 sticky left-0 bottom-[124px] bg-white px-5">
          <h1 className="text-[24px] font-semibold">
            {(price * quantity).toLocaleString()}원
          </h1>
          <QuantitySelector
            mode="state"
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      <PageFooterButton>
        <Button textColor="white" onClick={addToCartButton}>
          추가하기
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default AddMenuPage;
