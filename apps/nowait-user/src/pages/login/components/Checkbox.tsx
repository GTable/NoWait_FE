import { useState } from "react";
import Check from "../../../assets/icon/check.svg?react";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox = ({
  checked: controlledChecked,
  onChange,
  className = "",
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(false);

  // controlled 또는 uncontrolled 모드 지원
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleClick = () => {
    const newChecked = !isChecked;

    if (isControlled) {
      onChange?.(newChecked);
    } else {
      setInternalChecked(newChecked);
      onChange?.(newChecked);
    }
  };

  return (
    <div
      className={`flex w-[22px] h-[22px] rounded-[5.5px] items-center justify-center cursor-pointer ${
        isChecked ? "bg-black-100" : "border border-black-25"
      } ${className}`}
      onClick={handleClick}
    >
      {isChecked && <Check className="text-white" />}
    </div>
  );
};

export default Checkbox;
