import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageFooterButton from "../../../components/order/PageFooterButton";
import FullPageLoader from "../../../components/FullPageLoader";
import { Button } from "@repo/ui";
import { getStoreMenu } from "../../../api/menu";
import { useCartStore } from "../../../stores/cartStore";
import type { CartType } from "../../../types/order/cart";
import MenuInfoSection from "./components/MenuInfoSection";
import MenuOrderSection from "./components/MenuOrderSection";


const AddMenuPage = () => {
  const navigate = useNavigate();
  const { storeId, menuId } = useParams<{ storeId: string; menuId: string }>();

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const { data: menu, isLoading } = useQuery({
    queryKey: ["menu", storeId, menuId],
    queryFn: () => getStoreMenu(storeId!, Number(menuId)),
    select: (data) => data.response,
    enabled: !!storeId && !!menuId,
  });

  const totalPrice = useMemo(
    () => (menu ? menu.price * quantity : 0),
    [menu, quantity]
  );

  const handleAddToCart = () => {
    if (!menu) return;

    const item: CartType = {
      menuId: menu.menuId,
      image: menu.images?.[0]?.imageUrl,
      name: menu.name,
      quantity,
      originPrice: menu.price,
      price: totalPrice,
    };

    addToCart(item);

    navigate(`/${storeId}`, {
      state: {
        added: true,
        addedPrice: totalPrice,
        isBack: true,
      },
    });
  };

  if (isLoading || !menu) return <FullPageLoader />;

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <MenuInfoSection menu={menu} />

      <MenuOrderSection
        price={menu.price}
        quantity={quantity}
        onChangeQuantity={setQuantity}
      />

      <PageFooterButton>
        <Button textColor="white" onClick={handleAddToCart}>
          추가하기
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default AddMenuPage;