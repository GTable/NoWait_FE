import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../../stores/cartStore";
import useModal from "../../../../hooks/useModal";
import { useStoreMenuList } from "../../../../hooks/order/useStoreMenus";
import type { CartType } from "../../../../types/order/cart";
import { getSoldOutMenusInCart } from "../../../../utils/checkSoldOutMenus";

export const useOrderListLogic = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { cart, removeFromCart } = useCartStore();
  const modal = useModal();

  const { data: menus } = useStoreMenuList(storeId);

  const [soldOutMenus, setSoldOutMenus] = useState<CartType[]>();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // 스크롤 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // EmptyCart 애니메이션 타이밍 제어
  useEffect(() => {
    let timer: number | undefined;

    if (cart.length === 0 && !isAnimatingOut) {
      timer = window.setTimeout(() => setIsAnimatingOut(true), 350);
    }

    if (cart.length > 0 && isAnimatingOut) {
      setIsAnimatingOut(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cart, isAnimatingOut]);

  const handleOrder = () => {
    if (!menus) return;

    const soldOut = getSoldOutMenusInCart(cart, menus);

    if (soldOut.length > 0) {
      setSoldOutMenus(soldOut);
      modal.open();
      return;
    }

    navigate(`/${storeId}/remittance`);
  };
  
  const handleRemoveSoldOutMenus = () => {
    soldOutMenus?.forEach((menu) => removeFromCart(menu.menuId));
    modal.close();
  };

  return {
    cart,
    storeId,
    isAnimatingOut,
    modal,
    soldOutMenus,
    handleOrder,
    handleRemoveSoldOutMenus,
  };
};
