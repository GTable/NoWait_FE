import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import SectionDivider from "../../../components/SectionDivider";
import { useEffect, useRef, useState } from "react";
import { sumTotalPrice } from "../../../utils/sumUtils";
import PayerInput from "./components/PayerInput";
import OrderSummary from "./components/OrderSummary";
import RemitOptions from "./components/remitOptions/RemitOptions";
import ConfirmModal from "../../../components/order/ConfirmModal";
import useModal from "../../../hooks/useModal";
import BackHeader from "../../../components/BackHeader";
import { useQuery } from "@tanstack/react-query";
import { getStorePayments } from "../../../api/order";
import { AnimatePresence } from "framer-motion";

const REMIT_TYPE = {
  KAKAO: "kakao",
  TOSS: "toss",
  NAVER: "naver",
  DIRECT: "direct",
} as const;

type RemitType = (typeof REMIT_TYPE)[keyof typeof REMIT_TYPE];

const getDefaultRemitValue = (remittance: any): RemitType | "" => {
  if (remittance.kakaoPayUrl) return REMIT_TYPE.KAKAO;
  if (remittance.tossUrl) return REMIT_TYPE.TOSS;
  if (remittance.naverPayUrl) return REMIT_TYPE.NAVER;
  if (remittance.accountNumber) return REMIT_TYPE.DIRECT;
  return "";
};

const RemittancePage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const modal = useModal();
  const { cart } = useCartStore();
  const [payer, setPayer] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [remitValue, setRemitValue] = useState<string>("");
  const totalPrice = sumTotalPrice(cart);
  const payerFocus = useRef<HTMLInputElement>(null);

  const { data: remittance, isLoading } = useQuery({
    queryKey: ["remittance", storeId],
    queryFn: () => getStorePayments(storeId!),
    enabled: !!storeId,
    select: (data) => data?.response,
  });

  //맨위로 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 정보 없으면 홈으로 이동
  useEffect(() => {
    if (cart.length === 0) {
      navigate(`/${storeId}`, { replace: true });
    }
  }, []);

  // 기본 선택 값 지정하기
  useEffect(() => {
    if (!remittance) return;
    setRemitValue(getDefaultRemitValue(remittance));
  }, [remittance]);

  const validatePayer = () => {
    //입금자명을 입력하지 않고 이체 버튼 클릭 시 입금자명 input으로 포커스
    if (payer.trim() === "") {
      setErrorMessage("입금자명을 입력해주세요");
      payerFocus?.current?.focus();
      return false;
    }

    if (payer.length > 10) {
      setErrorMessage("입금자명은 10자 이하로 입력해주세요");
      payerFocus?.current?.focus();
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleOrderClick = () => {
    if (!validatePayer()) return;
    modal.open();
  };

  const handleConfirm = () => {
    if (!remittance) return;

    const urlMap: Record<RemitType, string | undefined> = {
      kakao: remittance.kakaoPayUrl,
      toss: remittance.tossUrl,
      naver: remittance.naverPayUrl,
      direct: undefined,
    };

    const url = urlMap[remitValue as RemitType];
    if (url) window.open(url, "_blank");

    navigate(`/${storeId}/remittanceWait`, { state: payer });
  };

  return (
    <div className="flex flex-col grow mt-12 mb-[116px]">
      <BackHeader title="주문하기" />
      <section className="px-5">
        <OrderSummary cart={cart} />
        <SectionDivider />
        <PayerInput
          value={payer}
          setValue={setPayer}
          errorMessage={errorMessage}
          payerFocus={payerFocus}
        />
        <SectionDivider />
        <RemitOptions
          remitValue={remitValue}
          setRemitValue={setRemitValue}
          totalPrice={totalPrice}
          kakao={remittance?.kakaoPayUrl}
          toss={remittance?.tossUrl}
          naver={remittance?.naverPayUrl}
          account={remittance?.accountNumber}
          isLoading={isLoading}
        />
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
      <PageFooterButton background="gradient">
        <Button textColor="white" onClick={handleOrderClick}>
          <TotalButton variant="orderPage" actionText="이체하기" />
        </Button>
      </PageFooterButton>
      <AnimatePresence>
        {modal.isOpen && (
          <ConfirmModal
            open={handleConfirm}
            close={modal.close}
            title={`${
              remitValue === "direct" ? "직접 " : ""
            }이체하신 후, 이 화면으로\n다시 돌아와주세요`}
            description={`화면으로 다시 돌아와 주문 과정을 끝마치셔야\n주문이 접수 돼요.`}
            positiveButton="확인했어요"
            negativeButton="다시 선택할게요"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RemittancePage;
