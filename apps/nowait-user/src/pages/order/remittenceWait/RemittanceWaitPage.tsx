import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../stores/cartStore";
import { sumTotalPrice } from "../../../utils/sumUtils";
import { createOrder } from "../../../api/order";
import { useState } from "react";
import remittanceWait from "../../../assets/remittanceWait.webp";
import remittanceWaitFallback from "../../../assets/remittanceWaitFallback.webp";
import CenteredContentLayout from "../../../components/layout/CenteredContentLayout";
import BackOnlyHeader from "../../../components/BackOnlyHeader";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useToastStore } from "../../../stores/toastStore";
import { useFallbackImage } from "../../../hooks/useFallbackImage";

const RemittanceWaitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeId } = useParams();

  const tableId = localStorage.getItem("tableId");
  const payer = location.state as string;

  const { cart, clearCart } = useCartStore();
  const { showToast } = useToastStore();

  const [isLoading, setIsLoading] = useState(false); // 중복 요청 방지
  const { isLoaded, loadedSrc } = useFallbackImage(remittanceWait);

  const totalPrice = sumTotalPrice(cart);

  const payload = {
    depositorName: payer,
    items: cart.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity,
    })),
    totalPrice,
  };

  const orderButton = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const res = await createOrder(storeId!, Number(tableId!), payload);
      if (!res?.success) {
        showToast("주문에 실패했습니다. 다시 시도해 주세요");
        return;
      }

      //입금자명 로컬스토리지 저장
      localStorage.setItem("depositorName", res.response.depositorName);
      //장바구니 비우기
      clearCart();
      navigate(`/${storeId}/order/success`, { replace: true });
    } catch (error) {
      console.log(error);
      showToast("주문 처리 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackOnlyHeader />
      <CenteredContentLayout
        onClick={orderButton}
        buttonText={
          isLoading ? <LoadingSpinner loadingType="dotsWhite" /> : "이체했어요"
        }
      >
        <img
          src={isLoaded ? loadedSrc : remittanceWaitFallback}
          alt="입금 대기중인 이미지"
          width={"150px"}
          height={"150px"}
        />
        <h1 className="text-headline-24-bold mb-2">이체가 진행되고 있어요</h1>
        <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-3.5">
          아직 주문이 완료되지 않았어요
          <br />
          이체를 완료하셨다면 버튼을 눌러주세요
        </h2>
      </CenteredContentLayout>
    </>
  );
};

export default RemittanceWaitPage;
