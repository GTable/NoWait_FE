import ArrowRight from "../../assets/arrow_back.svg?react";
import { useState } from "react";
import { PaymentCheckModal, CookedModal } from "./OrderPageModal";
import type { MenuDetails } from "../../types/order";
import { getTableBackgroundColor } from "../../utils/tableColors";

type DetailType = "payment" | "cooked";

interface DetailCardProps {
  type: DetailType;
  orderId: number;
  tableNumber: number;
  timeText: string;
  depositorName: string;
  totalAmount: number;
  menuDetails?: MenuDetails;
  onClose: () => void;
  onSuccess?: () => void;
}

const DetailCard = ({
  type,
  orderId,
  tableNumber,
  timeText,
  depositorName,
  totalAmount,
  menuDetails,
  onClose,
  onSuccess,
}: DetailCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const menuEntries = menuDetails ? Object.entries(menuDetails) : [];

  const handleActionClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 타입에 따른 설정
  const getConfig = () => {
    if (type === "payment") {
      return {
        title: "입금 내역",
        depositorLabel: "입금자",
        amountLabel: "입금 금액",
        actionText: "입금 확인",
        modalComponent: PaymentCheckModal,
        buttonStyle:
          "flex px-2.5 py-1.25 bg-black-20 items-center justify-center rounded-lg w-full h-12 text-14-semibold text-black-70 cursor-pointer",
      };
    } else {
      return {
        title: "주문 내역",
        depositorLabel: "주문자",
        amountLabel: "주문 금액",
        actionText: "주문 복구",
        modalComponent: CookedModal,
        buttonStyle:
          "flex px-2.5 py-1.25 bg-white border border-black-30 items-center justify-center rounded-lg w-full h-12 text-14-semibold text-black-70 cursor-pointer",
      };
    }
  };

  const config = getConfig();
  const ModalComponent = config.modalComponent;

  return (
    <>
      <div className="absolute inset-0 bg-white z-50 flex flex-col px-5.5 py-4 justify-between overflow-hidden">
        <div className="flex flex-col">
          {/* 헤더 */}
          <div className="flex flex-row cursor-pointer" onClick={onClose}>
            <ArrowRight className="flex icon-s text-black-50" />
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
            {config.title}
          </div>

          <div className="flex flex-col mt-4 gap-2.5">
            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">
                {config.depositorLabel}
              </div>
              <div className="flex text-16-semibold text-black-80">
                {depositorName}
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex text-16-medium text-black-60">
                {config.amountLabel}
              </div>
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
            {menuEntries.map(([menuName, menuInfo], index) => (
              <div key={index} className="flex flex-row justify-between">
                <div className="flex flex-[0.6]">{menuName}</div>
                <div className="flex flex-[0.4] justify-between">
                  <div className="flex">{menuInfo.quantity}</div>
                  <div className="flex">
                    {(menuInfo.quantity * menuInfo.price).toLocaleString()}원
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={config.buttonStyle} onClick={handleActionClick}>
          {config.actionText}
        </div>
      </div>

      {/* Modal 오버레이 */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <ModalComponent
            orderId={orderId}
            tableNumber={tableNumber}
            depositorName={depositorName}
            totalAmount={totalAmount}
            timeText={timeText}
            onClose={handleCloseModal}
            onSuccess={onSuccess}
          />
        </div>
      )}
    </>
  );
};

export { DetailCard };
export type { DetailType };
