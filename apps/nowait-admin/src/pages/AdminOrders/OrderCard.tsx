import { useState } from "react";
import {
  PaymentCheckModal,
  CookedModal,
  CookCompleteModal,
} from "./OrderPageModal";
import type { MenuDetails } from "../../types/order";
import { getTableBackgroundColor } from "../../utils/tableColors";
import { useWindowWidth } from "../../hooks/useWindowWidth";

interface PaymentCardProps {
  orderId: number;
  tableNumber: number;
  timeText: string;
  depositorName: string;
  totalAmount: number;
  onClick?: () => void;
  onSuccess?: () => void;
}

const PaymentCard = ({
  orderId,
  tableNumber,
  timeText,
  depositorName,
  totalAmount,
  onClick,
  onSuccess,
}: PaymentCardProps) => {
  const [showPaymentCheckModal, setShowPaymentCheckModal] = useState(false);

  const handlePaymentCheckClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 onClick 이벤트 방지
    setShowPaymentCheckModal(true);
  };

  const handleClosePaymentCheckModal = () => {
    setShowPaymentCheckModal(false);
  };

  return (
    <>
      <div
        className="flex flex-row justify-between items-center w-full cursor-pointer"
        onClick={onClick}
      >
        <div className="flex flex-row items-center">
          <div
            className="flex rounded-full w-9 h-9 items-center justify-center text-title-18-semibold text-white-100"
            style={{ backgroundColor: getTableBackgroundColor(tableNumber) }}
          >
            {tableNumber}
          </div>

          <div className="flex flex-col ml-2.5">
            <div className="flex text-14-medium text-black-60">{timeText}</div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex text-16-semibold text-black-80">
                {depositorName}
              </div>
              <div className="flex w-[1.5px] bg-[#D5D5D5] h-3.5" />
              <div className="flex text-16-semibold text-black-80">
                {totalAmount.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <div
            className="flex px-2.5 py-1.25 bg-black-20 rounded-lg text-14-semibold text-black-70 cursor-pointer hover:bg-black-30"
            onClick={handlePaymentCheckClick}
          >
            입금 확인
          </div>
        </div>
      </div>

      {/* PaymentCheckModal 오버레이 */}
      {showPaymentCheckModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 max-[450px]:px-8.75"
          onClick={handleClosePaymentCheckModal}
        >
          <PaymentCheckModal
            orderId={orderId}
            tableNumber={tableNumber}
            depositorName={depositorName}
            totalAmount={totalAmount}
            timeText={timeText}
            onClose={handleClosePaymentCheckModal}
            onSuccess={onSuccess}
          />
        </div>
      )}
    </>
  );
};

interface CookCardProps {
  orderId: number;
  tableNumber: number;
  menuDetails?: MenuDetails;
  onSuccess?: () => void;
}

const CookCard = ({
  orderId,
  tableNumber,
  menuDetails,
  onSuccess,
}: CookCardProps) => {
  const [showCookCompleteModal, setShowCookCompleteModal] = useState(false);
  const windowWidth = useWindowWidth();

  const menuEntries = menuDetails ? Object.entries(menuDetails) : [];
  const isOneMenu = menuEntries.length === 1;

  // 화면 크기에 따른 글자 수 제한
  const getMaxLength = () => {
    if (windowWidth >= 1024) return 10; // lg
    if (windowWidth >= 768) return 7; // md
    return 7; // sm
  };

  const handleCookCompleteClick = () => {
    setShowCookCompleteModal(true);
  };

  const handleCloseCookCompleteModal = () => {
    setShowCookCompleteModal(false);
  };

  return (
    <>
      <div
        className={`flex flex-row justify-between ${
          isOneMenu ? "items-center" : ""
        }`}
      >
        <div className="flex flex-row gap-2.5">
          <div
            className="flex w-9 h-9 items-center justify-center rounded-full text-title-18-semibold text-white-100"
            style={{ backgroundColor: getTableBackgroundColor(tableNumber) }}
          >
            {tableNumber}
          </div>
          <div
            className={`flex flex-col gap-2.5 text-16-semibold text-black-80 ${
              isOneMenu ? "justify-center" : ""
            }`}
          >
            {menuEntries.map(([menuName, menuInfo], index) => (
              <div
                key={index}
                className="flex flex-row gap-2.5 justify-between"
              >
                <div className="flex w-40 md:w-33.5 lg:w-40 max-[376px]:w-33.5 truncate">
                  {menuName.length > getMaxLength()
                    ? menuName.substring(0, getMaxLength()) + "..."
                    : menuName}
                </div>
                <div className="flex">{menuInfo.quantity}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`flex rounded-lg lg bg-black-20 px-2.5 py-1.25 items-center justify-center text-14-semibold text-black-70 cursor-pointer hover:bg-black-30 ${
            isOneMenu ? "" : "self-start"
          }`}
          onClick={handleCookCompleteClick}
        >
          조리 완료
        </div>
      </div>

      {/* CookCompleteModal 오버레이 */}
      {showCookCompleteModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 max-[450px]:px-8.75"
          onClick={handleCloseCookCompleteModal}
        >
          <CookCompleteModal
            orderId={orderId}
            onClose={handleCloseCookCompleteModal}
            onSuccess={onSuccess}
          />
        </div>
      )}
    </>
  );
};

const CookedDetail = ({
  orderId,
  tableNumber,
  timeText,
  depositorName,
  totalAmount,
  menuNamesAndQuantities,
  onClose,
  onSuccess,
}: CookedDetailProps) => {
  const [showCookedModal, setShowCookedModal] = useState(false);

  const menuEntries = menuNamesAndQuantities
    ? Object.entries(menuNamesAndQuantities)
    : [];

  const handleRestoreClick = () => {
    setShowCookedModal(true);
  };

  const handleCloseCookedModal = () => {
    setShowCookedModal(false);
  };

  return (
    <>
      <div className="absolute inset-0 bg-white z-50 flex flex-col px-5.5 py-4 justify-between">
        <div className="flex flex-col">
          {/* 헤더 */}
          <div className="flex flex-row cursor-pointer" onClick={onClose}>
            <ArrowRight className="flex icon-s" />
            <div className="flex text-16-semibold text-black-50">이전으로</div>
          </div>

          <div className="flex flex-row mt-6 gap-2.5">
            <div
              className="flex rounded-full w-9 h-9 items-center justify-center text-title-18-semibold text-white-100"
              style={{ backgroundColor: getTableBackgroundColor(tableNumber) }}
            >
              {tableNumber}
            </div>
            <div className="flex text-title-18-semibold text-black-90 items-center">
              {tableNumber}번 테이블
            </div>
          </div>

          <div className="flex mt-6 text-title-18-semibold text-black-90">
            입금 내역
          </div>

          <div className="flex flex-col mt-4 gap-2.5">
            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">입금자</div>
              <div className="flex text-16-semibold text-black-80">
                {depositorName}
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">입금 금액</div>
              <div className="flex text-16-semibold text-black-80">
                {totalAmount.toLocaleString()}원
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">주문 시간</div>
              <div className="flex text-16-semibold text-black-80">
                {timeText}
              </div>
            </div>
          </div>

          <div className="flex mt-6 mb-6 border-t border-black-25" />

          <div className="flex text-title-18-semibold text-black-90">
            주문 메뉴 {menuEntries.length}
          </div>

          <div className="flex flex-col mt-4 gap-2.5 text-16-semibold text-black-80">
            {menuEntries.map(([menuName, quantity], index) => (
              <div key={index} className="flex flex-row justify-between">
                <div className="flex flex-[0.3]">{menuName}</div>
                <div className="flex flex-1 justify-between">
                  <div className="flex">{quantity}</div>
                  <div className="flex">
                    {(12000 * quantity).toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex items-center justify-center h-12 bg-white rounded-lg border border-black-30 text-14-semibold text-black-70"
          onClick={handleRestoreClick}
        >
          주문 복구
        </div>
      </div>

      {/* CookedModal 오버레이 */}
      {showCookedModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={handleCloseCookedModal}
        >
          <CookedModal
            orderId={orderId}
            onClose={handleCloseCookedModal}
            onSuccess={onSuccess}
          />
        </div>
      )}
    </>
  );
};

interface CookedDetailProps {
  orderId: number;
  tableNumber: number;
  timeText: string;
  depositorName: string;
  totalAmount: number;
  menuNamesAndQuantities?: MenuNamesAndQuantities;
  onClose: () => void;
  onSuccess?: () => void;
}

interface CookedCardProps {
  orderId: number;
  tableNumber: number;
  depositorName: string;
  menuDetails?: MenuDetails;
  totalAmount: number;
  createdAt: string;
  onSuccess?: () => void;
  onClick?: () => void;
}

const CookedCard = ({
  orderId,
  tableNumber,
  depositorName,
  menuDetails,
  totalAmount,
  createdAt,
  onSuccess,
  onClick,
}: CookedCardProps) => {
  const [showCookedModal, setShowCookedModal] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 450;

  // 첫 번째 메뉴 이름과 나머지 메뉴 개수 계산
  const menuEntries = menuDetails ? Object.entries(menuDetails) : [];
  const firstMenuName = menuEntries[0]?.[0] || "";
  const remainingMenuCount = menuEntries.length - 1;
  const menuDisplayText =
    menuEntries.length > 1
      ? `${firstMenuName} 외 ${remainingMenuCount}개`
      : firstMenuName;

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleRestoreClick = () => {
    setShowCookedModal(true);
  };

  const handleCloseCookedModal = () => {
    setShowCookedModal(false);
  };

  return (
    <>
      {/* 모바일 버전 */}
      {isMobile ? (
        <div
          className="flex flex-row gap-5 px-5.5 py-3.5 justify-between border-b border-black-25 items-center text-16-regular leading-[136%] tracking-[-0.02em] text-black-70 cursor-pointer"
          onClick={onClick}
        >
          <div className="flex flex-row gap-2.5">
            <div className="flex w-8.5">{tableNumber}번</div>
            <div className="flex max-[376px]:w-20 w-30">
              {totalAmount.toLocaleString()}원
            </div>
            <div className="flex">{createdAt}</div>
          </div>
          <div
            className="flex rounded-lg border border-black-30 px-2.5 py-1.25 text-14-semibold text-black-70 flex-shrink-0 cursor-pointer hover:bg-black-10"
            onClick={(e) => {
              e.stopPropagation();
              handleRestoreClick();
            }}
          >
            주문 복구
          </div>
        </div>
      ) : (
        /* 데스크톱 버전 */
        <div
          className="flex flex-row gap-2.5 px-5 py-4 border-b border-black-20 items-center cursor-pointer"
          onClick={onClick}
        >
          <div className="flex flex-[0.7] text-16-regular text-black-70">
            {tableNumber}번
          </div>
          <div className="flex flex-[1] text-16-regular text-black-70">
            {depositorName}
          </div>
          <div className="flex flex-[2.5] text-16-regular text-black-70 truncate overflow-hidden whitespace-nowrap">
            {menuDisplayText}
          </div>
          <div className="flex flex-[1.5] text-16-regular text-black-70">
            {totalAmount.toLocaleString()}원
          </div>
          <div className="flex flex-[1.5] text-16-regular text-black-70">
            {createdAt}
          </div>
          <div className="flex-1 flex justify-end">
            <div
              className="rounded-lg border border-black-30 px-2.5 py-1.25 text-14-semibold text-black-70 flex-shrink-0 cursor-pointer hover:bg-black-10"
              onClick={(e) => {
                e.stopPropagation();
                handleRestoreClick();
              }}
            >
              주문 복구
            </div>
          </div>
        </div>
      )}

      {/* CookedModal 오버레이 */}
      {showCookedModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 max-[450px]:px-8.75"
          onClick={handleCloseCookedModal}
        >
          <CookedModal
            orderId={orderId}
            onClose={handleCloseCookedModal}
            onSuccess={onSuccess}
          />
        </div>
      )}
    </>
  );
};

export { PaymentCard, CookCard, CookedCard };
