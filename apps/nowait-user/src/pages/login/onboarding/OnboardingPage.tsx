// 전화번호 입력 페이지 입니다.
import { useState } from "react";
import PhoneNumberInput from "../components/PhoneNumberInput";
import TermsModal from "../components/TermsModal";
import AnimatedModal from "../components/AnimatedModal";
import ViewModal from "../components/ViewModal";
import TermsContent from "../components/TermsContent";

const OnboardingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTermType, setSelectedTermType] = useState<
    "service" | "privacy" | "marketing"
  >("service");

  // 전화번호가 11자리 모두 입력되었는지 확인 (하이픈 제외)
  const isPhoneNumberComplete = phoneNumber.replace(/[^\d]/g, "").length === 11;

  // 전화번호가 010으로 시작하는지 확인
  const isValidPhoneNumber = phoneNumber
    .replace(/[^\d]/g, "")
    .startsWith("010");

  const handleNextClick = () => {
    if (isPhoneNumberComplete && isValidPhoneNumber) {
      setIsModalOpen(true);
      setShowError(false);
    } else if (isPhoneNumberComplete && !isValidPhoneNumber) {
      setShowError(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenViewModal = (
    termType: "service" | "privacy" | "marketing"
  ) => {
    setSelectedTermType(termType);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    // 전화번호가 변경되면 에러 메시지 숨기기
    if (showError) {
      setShowError(false);
    }
  };

  return (
    <div className="flex w-full h-[100dvh] flex-col justify-between px-5 overflow-hidden">
      <div className="flex flex-col mt-[54px]">
        <div className="flex text-headline-24-bold text-black-100 mb-[29px]">
          전화번호를 알려주세요 <br />
          호출 시에 필요해요
        </div>

        <PhoneNumberInput
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="전화번호 입력"
        />

        {/* 에러 메시지 */}
        {showError && (
          <div className="ml-3.5 text-16-regular text-error mt-2">
            유효하지 않은 번호입니다.
          </div>
        )}
      </div>

      <div className="flex justify-center items-center w-full py-8">
        <button
          onClick={handleNextClick}
          disabled={!isPhoneNumberComplete}
          className={`flex w-full h-[60px] rounded-[12px] px-5 py-5 items-center justify-center text-button-17-semibold ${
            isPhoneNumberComplete
              ? "bg-cool-black text-white-100"
              : "bg-black-25 text-black-50"
          }`}
        >
          다음으로
        </button>
      </div>

      {/* TermsModal 오버레이 */}
      <AnimatedModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TermsModal
          onOpenViewModal={handleOpenViewModal}
          phoneNumber={phoneNumber}
        />
      </AnimatedModal>

      {/* ViewModal 오버레이 */}
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        title={
          selectedTermType === "service"
            ? "서비스 이용약관"
            : selectedTermType === "privacy"
            ? "개인정보 수집 및 이용 동의"
            : "개인정보 마케팅 활용 동의"
        }
      >
        <TermsContent termType={selectedTermType} />
      </ViewModal>
    </div>
  );
};

export default OnboardingPage;
