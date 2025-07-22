import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import SectionDivider from "../../../components/SectionDivider";
import { useRef, useState } from "react";
import { sumTotalPrice } from "../../../utils/sumUtils";
import PayerInput from "./components/PayerInput";
import OrderSummary from "./components/OrderSummary";
import RemitOptions from "./components/RemitOptions";
import ConfirmModal from "../../../components/order/ConfirmModal";
import useModal from "../../../hooks/useModal";
import Header from "../../../components/order/Header";

const RemittancePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const modal = useModal();
  const { cart } = useCartStore();
  const [payer, setPayer] = useState("");
  const [payerError, setPayerError] = useState(false);
  const [remitValue, setRemitValue] = useState("kakao");
  const totalPrice = sumTotalPrice(cart);
  const payerFocus = useRef<HTMLInputElement>(null);

  const orderHandleButton = () => {
    //입금자명을 입력하지 않고 이체 버튼 클릭 시 입금자명 input으로 포커스
    if (payer.trim() === "") {
      payerFocus?.current?.focus();
      //에러 메세지 띄우기
      setPayerError(true);
      return;
    }
    setPayerError(false);
    modal.open();
  };

  return (
    <div className="flex flex-col flex-grow pb-[124px] min-h-screen-dvh">
      <Header title="주문하기" />
      <section className="px-5">
        <OrderSummary cart={cart} />
        <SectionDivider />
        <PayerInput
          value={payer}
          setValue={setPayer}
          payerError={payerError}
          payerFocus={payerFocus}
        />
        <SectionDivider />
        <RemitOptions remitValue={remitValue} setRemitValue={setRemitValue} />
        <SectionDivider />
        <section>
          <div className="flex justify-between items-center pt-6 pb-5.5">
            <h1 className="text-title-18-semibold text-black-90">결제 금액</h1>
            <h2 className="text-title-18-semibold text-primary">
              {totalPrice.toLocaleString()}원
            </h2>
          </div>
        </section>
      </section>
      <PageFooterButton>
        <Button textColor="white" onClick={orderHandleButton}>
          <TotalButton variant="orderPage" actionText="이체하기" />
        </Button>
      </PageFooterButton>
      {modal.isOpen && (
        <ConfirmModal
          open={() => navigate(`/${storeId}/remittanceWait`, { state: payer })}
          close={modal.close}
          title={`${
            remitValue === "direct" ? "직접 " : ""
          }이체하신 후, 이 화면으로\n다시 돌아와주세요`}
          description={`화면으로 다시 돌아와 주문 과정을 끝마치셔야\n주문이 접수 돼요.`}
          positiveButton="확인했어요"
          negativeButton="다시 선택할게요"
        />
      )}
    </div>
  );
};

export default RemittancePage;
