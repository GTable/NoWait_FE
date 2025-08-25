import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "../../../stores/cartStore";
import { sumTotalPrice } from "../../../utils/sumUtils";
import { createOrder } from "../../../api/order";
import { useState } from "react";
import remittanceWait from "../../../assets/remittanceWait.webp";
import CenteredContentLayout from "../../../components/layout/CenteredContentLayout";
import BackOnlyHeader from "../../../components/BackOnlyHeader";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useToastStore } from "../../../stores/toastStore";

const RemittanceWaitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const payer = location.state as string;
  const { storeId } = useParams();
  const tableId = localStorage.getItem("tableId");
  const { cart, clearCart } = useCartStore();
  const { showToast } = useToastStore();
  const totalPrice = sumTotalPrice(cart);
  const [isLoading, setIsLoading] = useState(false);

  const orderButton = async () => {
    try {
      setIsLoading(true);
      const payload = {
        depositorName: payer,
        items: cart.map((item) => ({
          menuId: item.menuId,
          quantity: item.quantity,
        })),
        totalPrice,
      };
      const res = await createOrder(
        Number(storeId!),
        Number(tableId!),
        payload
      );
      console.log(res, "주문 생성");
      if (res?.success) {
        //입금자명 로컬스토리지 저장
        localStorage.setItem("depositorName", res.response.depositorName);
        //장바구니 비우기
        clearCart();
        navigate(`/${storeId}/order/success`, { replace: true });
      } else {
        // 서버가 success:false 반환한 경우
        console.error("주문 실패:", res);
        showToast("주문에 실패했습니다. 다시 시도해 주세요");
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
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
          src={remittanceWait}
          width="150px"
          height="150px"
          alt="이체 대기중인 이미지"
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
