// src/components/CardBox.tsx
import React from "react";
import checkIcon from "../../../assets/circle_check.svg";

interface CardBoxProps {
  title: string; // 상단 작은 텍스트
  count: number; // 중앙 숫자
  bottomLabel: string; // 하단 텍스트
}

const CardBox: React.FC<CardBoxProps> = ({ title, count, bottomLabel }) => {
  return (
    <div className="w-[220px] h-[119px] rounded-[16px] bg-white border border-gray-200 shadow p-4 flex flex-col justify-between">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-semibold">{count}팀</span>
      <span className="text-sm text-gray-400 flex items-center gap-1">
        <span>
          <img src={checkIcon} />
        </span>
        {bottomLabel}
      </span>
    </div>
  );
};

export default CardBox;
