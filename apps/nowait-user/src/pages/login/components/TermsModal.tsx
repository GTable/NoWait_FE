import { useState } from "react";
import Checkbox from "./Checkbox";
import TermsItem from "./TermsItem";
import { useNavigate } from "react-router-dom";

interface TermsModalProps {
  onOpenViewModal: (termType: "service" | "privacy" | "marketing") => void;
}

const TermsModal = ({ onOpenViewModal }: TermsModalProps) => {
  // onClose는 나중에 모달 닫기 기능에서 사용될 예정 (현재는 사용하지 않음)
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isServiceAgreed, setIsServiceAgreed] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);
  const [isMarketingAgreed, setIsMarketingAgreed] = useState(false);

  const navigate = useNavigate();

  // 전체 동의 체크박스 핸들러
  const handleAllAgreedChange = (checked: boolean) => {
    setIsAllAgreed(checked);
    setIsServiceAgreed(checked);
    setIsPrivacyAgreed(checked);
    setIsMarketingAgreed(checked);
  };

  // 개별 체크박스 변경 시 전체 동의 상태 업데이트
  const updateAllAgreedState = () => {
    const allChecked = isServiceAgreed && isPrivacyAgreed && isMarketingAgreed;
    setIsAllAgreed(allChecked);
  };

  // 개별 체크박스 핸들러들
  const handleServiceAgreedChange = (checked: boolean) => {
    setIsServiceAgreed(checked);
    if (!checked) {
      setIsAllAgreed(false);
    } else {
      updateAllAgreedState();
    }
  };

  const handlePrivacyAgreedChange = (checked: boolean) => {
    setIsPrivacyAgreed(checked);
    if (!checked) {
      setIsAllAgreed(false);
    } else {
      updateAllAgreedState();
    }
  };

  const handleMarketingAgreedChange = (checked: boolean) => {
    setIsMarketingAgreed(checked);
    if (!checked) {
      setIsAllAgreed(false);
    } else {
      updateAllAgreedState();
    }
  };

  const signupHandler = () => {
    navigate("/onboarding/success");
  };

  // 필수 약관이 모두 체크되었는지 확인
  const isRequiredTermsAgreed = isServiceAgreed && isPrivacyAgreed;
  return (
    <div className="flex flex-col w-full h-full px-5 pt-3 rounded-t-[20px]">
      <div className="flex w-full flex-col gap-[30px]">
        <div className="flex w-full items-center justify-center">
          <div className="flex bg-[#d8d8d8] h-1 w-[38px]" />
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex text-20-bold text-black-90">
            서비스 이용약관에 동의해주세요
          </div>

          <div className="flex w-full flex-col">
            <div className="flex w-full px-3 py-3.5 rounded-[10px] border-black-25 bg-black-5 items-center">
              <div className="flex items-center gap-[10px]">
                <Checkbox
                  checked={isAllAgreed}
                  onChange={handleAllAgreedChange}
                />
                <div className="flex text-15-semibold text-black-90">
                  약관 전체동의
                </div>
              </div>
            </div>

            <TermsItem
              title="서비스 이용약관"
              isRequired={true}
              checked={isServiceAgreed}
              onChange={handleServiceAgreedChange}
              onOpenViewModal={onOpenViewModal}
              termType="service"
            />
            <TermsItem
              title="개인정보 수집 및 이용 동의"
              isRequired={true}
              checked={isPrivacyAgreed}
              onChange={handlePrivacyAgreedChange}
              onOpenViewModal={onOpenViewModal}
              termType="privacy"
            />
            <TermsItem
              title="개인정보 마케팅 활용 동의"
              isRequired={false}
              checked={isMarketingAgreed}
              onChange={handleMarketingAgreedChange}
              onOpenViewModal={onOpenViewModal}
              termType="marketing"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full px-5 py-8 items-center justify-center">
        <button
          className={`flex w-full py-4.5 items-center justify-center rounded-[12px] text-17-semibold leading-[144%] ${
            isRequiredTermsAgreed
              ? "bg-black-100 text-black-30"
              : "bg-black-25 text-black-50"
          }`}
          disabled={!isRequiredTermsAgreed}
          onClick={signupHandler}
        >
          확인하기
        </button>
      </div>
    </div>
  );
};

export default TermsModal;
