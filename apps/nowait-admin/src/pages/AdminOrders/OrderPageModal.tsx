import { useUpdateOrderStatus } from "../../hooks/useUpdateOrderStatus";
import { getTableBackgroundColor } from "../../utils/tableColors";
import { DropdownLoader } from "@repo/ui";
import { cancelOrder } from "../../utils/AdminApi";

// Payment Check Modal
interface PaymentCheckModalProps {
  orderId: number;
  tableNumber: number;
  depositorName: string;
  totalAmount: number;
  timeText: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const PaymentCheckModal = ({
  orderId,
  tableNumber,
  depositorName,
  totalAmount,
  timeText,
  onClose,
  onSuccess,
}: PaymentCheckModalProps) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const handleConfirm = async () => {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        status: "COOKING",
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("주문 상태 업데이트 실패:", error);
      // 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white rounded-[20px] max-w-sm w-full px-5.5 pt-7.5 pb-5.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col text-center justify-center items-center gap-2.5">
        <div className="flex text-title-20-bold text-black-85">
          입금 확인 하셨나요?
        </div>
        <div className="flex flex-col justify-center items-center text-14-regular text-black-60">
          <div className="flex">입금이 되었는지 다시 한번 확인해주세요.</div>
          <div className="flex">
            입금 확인 후에는 주문 상태가 조리중으로 변경돼요.
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-7.5 bg-black-15 rounded-[14px] px-3.5 py-3.5 w-70 gap-2.5 max-[450px]:w-60">
        <div
          className="flex rounded-full w-9 h-9 items-center justify-center text-title-18-semibold text-white-100"
          style={{ backgroundColor: getTableBackgroundColor(tableNumber) }}
        >
          {tableNumber}
        </div>
        <div className="flex flex-col">
          <div className="flex text-14-medium text-black-60 items-center">
            {timeText}
          </div>
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

      <div className="flex flex-row w-full mt-7.5 gap-2">
        <div
          className="flex flex-1 bg-black-20 rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-black-65 cursor-pointer"
          onClick={onClose}
        >
          취소
        </div>
        <div
          className={`flex flex-1 bg-cool-black rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-white cursor-pointer ${
            updateOrderStatus.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={updateOrderStatus.isPending ? undefined : handleConfirm}
        >
          {updateOrderStatus.isPending ? <DropdownLoader /> : "확인"}
        </div>
      </div>
    </div>
  );
};

// Order Status Update Modal
interface OrderStatusModalProps {
  orderId: number;
  title: string;
  description: string;
  targetStatus: "COOKING" | "COOKED";
  onClose: () => void;
  onSuccess?: () => void;
}

const OrderStatusModal = ({
  orderId,
  title,
  description,
  targetStatus,
  onClose,
  onSuccess,
}: OrderStatusModalProps) => {
  const updateOrderStatus = useUpdateOrderStatus();

  const handleConfirm = async () => {
    try {
      await updateOrderStatus.mutateAsync({
        orderId,
        status: targetStatus,
      });
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("주문 상태 업데이트 실패:", error);
      // 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white rounded-[20px] max-w-sm w-full px-5.5 pt-7.5 pb-5.5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col text-center justify-center items-center gap-2.5">
        <div className="flex text-title-20-bold text-black-85">{title}</div>
        <div className="flex flex-col justify-center items-center text-14-regular text-black-60">
          <div className="flex">{description}</div>
        </div>
      </div>

      <div className="flex flex-row w-full mt-5 gap-2">
        <div
          className="flex flex-1 bg-black-20 rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-black-65 cursor-pointer"
          onClick={onClose}
        >
          취소
        </div>
        <div
          className={`flex flex-1 bg-cool-black rounded-[10px] px-3 py-2.5 items-center justify-center text-16-semibold text-white cursor-pointer ${
            updateOrderStatus.isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={updateOrderStatus.isPending ? undefined : handleConfirm}
        >
          {updateOrderStatus.isPending ? <DropdownLoader /> : "확인"}
        </div>
      </div>
    </div>
  );
};

interface CookedModalProps {
  orderId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

const CookedModal = ({ orderId, onClose, onSuccess }: CookedModalProps) => (
  <OrderStatusModal
    orderId={orderId}
    title="주문을 복구할까요?"
    description="주문 상태가 조리 중으로 변경됩니다."
    targetStatus="COOKING"
    onClose={onClose}
    onSuccess={onSuccess}
  />
);

const CookCompleteModal = ({
  orderId,
  onClose,
  onSuccess,
}: CookedModalProps) => (
  <OrderStatusModal
    orderId={orderId}
    title="조리가 완료되었나요?"
    description="주문 상태가 주문 완료로 변경됩니다."
    targetStatus="COOKED"
    onClose={onClose}
    onSuccess={onSuccess}
  />
);

// Order Cancel Modal
interface OrderCancelModalProps {
  orderId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

const OrderCancelModal = ({
  orderId,
  onClose,
  onSuccess,
}: OrderCancelModalProps) => {
  const cancelReasons = [
    { id: "SOLD_OUT", label: "메뉴 품절" },
    { id: "SIMPLE_CANCEL", label: "단순 취소" },
    { id: "ETC", label: "기타" },
  ];

  const handleReasonSelect = async (reason: string) => {
    try {
      await cancelOrder(orderId, reason);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("주문 취소 실패:", error);
      // 에러 처리 (예: 토스트 메시지 표시)
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white rounded-[20px] max-w-sm w-full p-5.5 px-5.5 gap-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col text-center justify-center items-center gap-2.5">
        <div className="flex text-title-20-bold text-black-90">
          주문 취소 사유를 선택해주세요
        </div>
        <div className="flex text-14-regular text-black-60">
          선택 즉시 주문이 취소됩니다.
        </div>
      </div>

      <div className="flex flex-col w-full gap-2">
        {cancelReasons.map((reason) => (
          <div
            key={reason.id}
            className="flex w-full bg-black-20 rounded-[10px] px-4 py-[13px] items-center justify-center text-16-semibold text-black-70 cursor-pointer"
            onClick={() => handleReasonSelect(reason.id)}
          >
            {reason.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export {
  PaymentCheckModal,
  CookedModal,
  CookCompleteModal,
  OrderStatusModal,
  OrderCancelModal,
};
export type {
  PaymentCheckModalProps,
  CookedModalProps,
  OrderStatusModalProps,
  OrderCancelModalProps,
};
