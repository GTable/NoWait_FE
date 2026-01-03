import Portal from "../../../../components/common/modal/Portal";
import { Button } from "@repo/ui";

interface Props {
  isOpen: boolean;
  max: number;
  onClose: () => void;
  onGoHome: () => void;
}

const MaxReservationModal = ({ isOpen, max, onClose, onGoHome }: Props) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          min-w-[calc(100%-40px)] max-w-[430px] bg-white rounded-[20px]
          px-[22px] pt-[30px] pb-[22px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-title-20-bold text-black-90 text-center mb-5">
            주점 웨이팅은 <br />
            {max}개까지 가능 합니다
          </h1>

          <Button backgroundColor="#F4F4F4" textColor="#666666" onClick={onGoHome}>
            홈으로 가기
          </Button>
        </div>
      </div>
    </Portal>
  );
};

export default MaxReservationModal;
