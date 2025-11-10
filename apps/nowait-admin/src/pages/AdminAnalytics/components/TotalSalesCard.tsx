import React from "react";

interface TotalSalesCardProps {
  title: string; // 예: "누적매출"
  date: string; // 예: "2025. 07.18 - 07.19"
  amount: number; // 예: 1800000
  isTablet: boolean;
}

const TotalSalesCard: React.FC<TotalSalesCardProps> = ({
  title,
  date,
  amount,
  isTablet,
}) => {
  return (
    <div
      className={`bg-white rounded-[16px]  flex flex-col justify-between ${
        isTablet ? "p-6 w-full h-full" : "p-5 w-[335px] min-h-[150px]"
      }`}
    >
      {/* 상단 제목 + 날짜 */}
      <div>
        <p className="text-title-18-bold text-black">{title}</p>
        <p className="text-13-regular text-gray-400 mt-1">{date}</p>
      </div>

      {/* 금액 + 퍼센트 변화 */}
      <div className="flex items-baseline gap-2 mt-4">
        <p className="text-headline-22-bold text-[#1C1C1C]">
          {amount.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default TotalSalesCard;
