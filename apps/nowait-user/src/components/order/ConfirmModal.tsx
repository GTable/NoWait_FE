import { Button } from "@repo/ui";
import Portal from "../common/modal/Portal";

interface PropsType {
  open: () => void;
  close: () => void;
}

const ConfirmModal = ({ open, close }: PropsType) => {
  return (
    <Portal>
      <div onClick={close} className="fixed inset-0 z-50 bg-black/30">
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 w-[calc(100%-20px)] max-w-[430px] bg-white rounded-[20px] px-5 pt-9">
          <h1 className="text-headline-22-bold mb-2">이체 완료 하셨나요?</h1>
          <h2 className="text-16-regular text-black-70 mb-12">
            아직 이체하지 않으셨다면 주문이
            <br /> 정상적으로 접수되지 않을 수 있어요.
            <br />
            계좌로 송금을 마치셨다면 버튼을 눌러주세요.
          </h2>
          <Button fullWidth={true} textColor="#ffffff" onClick={open}>
            이체했어요
          </Button>
          <Button
            fullWidth={true}
            backgroundColor="transparent"
            textColor="#888888"
            onClick={close}
          >
            아직 안했어요
          </Button>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmModal;
