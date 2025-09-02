import ArrowLeft from "../../../assets/icon/arrow_back.svg?react";

interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ViewModal = ({ isOpen, onClose, title, children }: ViewModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-full h-[100dvh] bg-white-100 inset-0 z-50 flex flex-col gap-[20px]">
      <div className="flex w-full justify-between items-center py-2.5">
        <div
          className="flex w-12 h-12 p-2.5 items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <div className="flex w-7 h-7 items-center justify-center">
            <ArrowLeft className="text-black-100" />
          </div>
        </div>
        <div className="flex items-center justify-center text-title-18-semibold text-black-90">
          {title}
        </div>
        <div className="flex w-12 h-12 p-2.5 items-center justify-center" />
      </div>

      {children}
    </div>
  );
};

export default ViewModal;
