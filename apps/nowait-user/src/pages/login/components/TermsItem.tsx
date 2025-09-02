import Checkbox from "./Checkbox";
import ArrowRight from "../../../assets/icon/arrow-right.svg?react";

interface TermsItemProps {
  title: string;
  isRequired: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onOpenViewModal: (termType: "service" | "privacy" | "marketing") => void;
  termType: "service" | "privacy" | "marketing";
}

const TermsItem = ({
  title,
  isRequired,
  checked,
  onChange,
  onOpenViewModal,
  termType,
}: TermsItemProps) => {
  return (
    <div
      className="flex w-full px-3 py-3.5 bg-white-100 items-center justify-between"
      onClick={() => onOpenViewModal(termType)}
    >
      <div className="flex items-center gap-[10px]">
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={checked} onChange={onChange} />
        </div>
        <div className="flex text-15-regular text-black-70">
          ({isRequired ? "필수" : "선택"}) {title}
        </div>
      </div>

      <div className="flex w-6 h-6 items-center justify-end cursor-pointer">
        <ArrowRight className="w-4 h-4 text-black-50" />
      </div>
    </div>
  );
};

export default TermsItem;
