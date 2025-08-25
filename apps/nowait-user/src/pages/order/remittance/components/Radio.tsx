import React from "react";

interface PropsType {
  children: React.ReactNode;
  logo?: React.ReactNode;
  remitValue: string;
  value: string;
  name: string;
  defaultChecked?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({
  children,
  logo,
  remitValue,
  value,
  name,
  defaultChecked,
  onChange,
}: PropsType) => {
  return (
    <label className="flex justify-between items-center">
      <h1
        className={`flex items-center ${
          logo ? "gap-2" : ""
        } text-15-semibold text-black-80`}
      >
        {logo}
        {children}
      </h1>
      {/* 커스텀 라디오 버튼 */}
      <div className="relative left-0 top-0">
        <input
          type="radio"
          name={name}
          value={value}
          checked={remitValue === value}
          defaultChecked={defaultChecked}
          onChange={onChange}
          className="peer sr-only"
        />
        <div className="w-[18px] h-[18px] rounded-full border border-[#CCCCCC] flex items-center justify-center peer-checked:border-black transition" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[10px] h-[10px] rounded-full bg-transparent peer-checked:bg-black transition" />
      </div>
    </label>
  );
};

export default Radio;
