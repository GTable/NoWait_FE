import { useState } from "react";
import XCircle from "../../../assets/icon/x-circle.svg?react";

interface PhoneNumberInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const PhoneNumberInput = ({
  value: controlledValue,
  onChange,
}: PhoneNumberInputProps) => {
  const [internalValue, setInternalValue] = useState("");

  // controlled 또는 uncontrolled 모드 지원
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, "");

    // 길이에 따라 포맷팅
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);

    if (isControlled) {
      onChange?.(formatted);
    } else {
      setInternalValue(formatted);
      onChange?.(formatted);
    }
  };

  const handleClearPhoneNumber = () => {
    if (isControlled) {
      onChange?.("");
    } else {
      setInternalValue("");
      onChange?.("");
    }
  };

  return (
    <div className="relative flex w-full items-center px-3.5 py-5 rounded-[12px] border-black-25 bg-black-15">
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        value={currentValue}
        onChange={handlePhoneNumberChange}
        placeholder="전화번호 입력"
        className="w-full text-title-20-semibold text-black-90 leading-[144%] tracking-[-0.01em] placeholder:text-black-50 outline-none focus:outline-none"
      />
      <div
        className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 cursor-pointer"
        onClick={handleClearPhoneNumber}
      >
        <XCircle className="icons-m" />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
