import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../stores/cartStore";

const RedirectToStorePage = () => {
  const { storeId, tableId } = useParams();
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  useEffect(() => {
    if (storeId && tableId) {
      //장바구니에 메뉴를 담고 다른 주점이나 테이블로 이동했을 때 장바구니 초기화
      const prevStoreId = localStorage.getItem("storeId");
      const prevTableId = localStorage.getItem("tableId");
      //이전 storeId, tableId랑 비교
      const isDifferentStore = prevStoreId && prevStoreId !== storeId;
      const isDifferentTable = prevTableId && prevTableId !== tableId;
      //이전 storeId 또는 tableId가 변경 되었고, 장바구니에 메뉴가 담겨있을 시 장바구니 비우기
      if ((isDifferentStore || isDifferentTable) && cart.length > 0) {
        clearCart();
      }
      //테이블 아이디 로컬스토리지 저장
      localStorage.setItem("storeId", storeId);
      localStorage.setItem("tableId", tableId);
      navigate(`/${storeId}`, { replace: true });
    }
  }, [storeId, tableId, navigate]);

  return null;
};

export default RedirectToStorePage;
