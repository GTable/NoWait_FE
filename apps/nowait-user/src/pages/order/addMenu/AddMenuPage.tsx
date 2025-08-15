import { useState } from "react";
import QuantitySelector from "../../../components/common/QuantitySelector";
import { useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import type { CartType } from "../../../types/order/cart";
import { useCartStore } from "../../../stores/cartStore";
import NumberFlow from "@number-flow/react";
import defaultMenuImageLg from "../../../assets/default-menu-image-lg.png";
import { useQuery } from "@tanstack/react-query";
import { getStoreMenu } from "../../../api/menu";
import LoadingSpinner from "../../../assets/loading2_black.gif";

const AddMenuPage = () => {
  const navigate = useNavigate();
  const { storeId, menuId } = useParams();

  const { data: menu, isLoading } = useQuery({
    queryKey: ["menu", menuId],
    queryFn: () => getStoreMenu(Number(storeId!), Number(menuId!)),
    select: (data) => data?.response,
  });
  
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const addToCartButton = () => {
    const item: CartType = {
      menuId: menu!.menuId,
      image: menu!.images[0]?.imageUrl,
      name: menu!.name,
      quantity,
      originPrice: menu!.price,
      price: menu!.price * quantity,
    };
    addToCart(item);

    navigate(`/${storeId}`, {
      state: { added: true, addedPrice: menu!.price * quantity },
      replace: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src={LoadingSpinner}
          alt="로딩 중"
          className="w-[100px] h-[100px]"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex flex-col flex-grow px-5">
        <h1 className="-mx-5 h-[246px] object-cover">
          <img
            className="w-full h-full object-cover"
            src={menu!.images[0]?.imageUrl || defaultMenuImageLg}
            alt="음식 메뉴 이미지"
          />
        </h1>
        <div className="py-8">
          <h1 className="text-headline-22-bold mb-2">{menu!.name}</h1>
          <h2 className="text-16-regular text-black-70">{menu!.description}</h2>
        </div>
      </div>
      {/* 메뉴 가격 및 수량 컨트롤 */}
      <div className="fixed bottom-[112px] w-full max-w-[430px] min-w-[320px]  bg-white">
        <div className="w-full flex justify-between items-center px-5">
          <h1 className="text-[24px] font-semibold">
            <NumberFlow value={menu!.price * quantity} suffix="원" />
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
