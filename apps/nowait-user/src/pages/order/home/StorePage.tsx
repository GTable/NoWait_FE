import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import { useEffect } from "react";
import { useToastStore } from "../../../stores/toastStore";
import StoreHeader from "./components/StoreHeader";
import MenuList from "../../../components/common/MenuList";
import SectionDivider from "../../../components/SectionDivider";
import { useStoreMenus } from "../../../hooks/order/useStoreMenus";

const StorePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const location = useLocation();
  const added = (location.state as { added?: boolean } | null)?.added;
  const addedPrice = (location.state as { addedPrice?: number } | null)
    ?.addedPrice;
  const { cart } = useCartStore();
  const { showToast } = useToastStore();
  const { data: menus, isLoading } = useStoreMenus(storeId);

  //메뉴 추가 시 toast 띄우기
  useEffect(() => {
    if (added) {
      showToast("메뉴를 담았습니다");
      navigate(location.pathname, { replace: true });
    }
  }, [added]);

  const hasCartItems = cart.length > 0;
  const pagePaddingBottom = hasCartItems ? "pb-[116px]" : "";
  return (
    <div>
      <div
        className={`flex flex-col grow min-h-dvh pt-7.5 ${pagePaddingBottom} px-5`}
      >
        <div className="grow">
          <StoreHeader storeName={menus?.storeName} isLoading={isLoading} />
          <SectionDivider />
          <MenuList
            mode="order"
            menus={menus?.menuReadDto}
            isLoading={isLoading}
          />
        </div>
      </div>
      {hasCartItems && (
        <PageFooterButton background="gradient">
          <Button
            textColor="white"
            onClick={() => navigate(`/${storeId}/order`)}
          >
            <TotalButton
              addedPrice={addedPrice}
              actionText="주문하기"
            />
          </Button>
        </PageFooterButton>
      )}
    </div>
  );
};

export default StorePage;
