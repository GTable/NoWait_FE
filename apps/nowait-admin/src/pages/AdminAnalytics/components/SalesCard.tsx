import backIcon from "../../../assets/analytics/arrow_back.svg";
import forwardIcon from "../../../assets/analytics/arrow_forward.svg";
import activeBackIcon from "../../../assets/analytics/arrow_back_active.svg";
import activeForwardIcon from "../../../assets/analytics/arrow_forward_active.svg";
import { useState } from "react";

interface SalesCardProps {
  today: {
    date: string;
    amount: number;
    diffAmount: number;
    percent: number;
  };
  previous: {
    date: string;
    amount: number;
  };
  disabled: boolean;
  isTablet: boolean;
}

const SalesCard: React.FC<SalesCardProps> = ({
  today,
  previous,
  disabled,
  isTablet,
}) => {
  const [showToday, setShowToday] = useState(true);

  const formatDate = (date: String) => {
    if (!date) return "";
    return `${date.replace(/-/g, ".")}`;
  };

  return (
    <div
      className={`bg-white rounded-[16px] flex flex-col justify-between ${
        isTablet ? "p-6 w-full h-full" : "p-5 w-[335px] min-h-[150px]"
      }`}
    >
      <div className="flex justify-between">
        <span>
          <p className="text-title-18-bold text-navy-80">
            {showToday ? "오늘 매출" : "이전 매출"}
          </p>
          <p className="text-13-regular text-black-60 mt-1">
            {showToday ? formatDate(today.date) : formatDate(previous.date)}
          </p>
        </span>

        <span className="flex">
          {/* 이전 버튼 */}
          <button
            className={`h-5 w-5 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => showToday && setShowToday(false)}
          >
            <img
              src={
                showToday ? (disabled ? backIcon : activeBackIcon) : backIcon
              }
            />
          </button>
          {/* 다음 버튼 */}
          <button
            className={`h-5 w-5 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !showToday && setShowToday(true)}
          >
            <img
              src={
                !showToday
                  ? disabled
                    ? forwardIcon
                    : activeForwardIcon
                  : forwardIcon
              }
            />
          </button>
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline">
          <p className="text-headline-22-bold text-navy-80">
            {showToday
              ? today.amount.toLocaleString()
              : previous.amount.toLocaleString()}
            원
          </p>

          {!disabled && showToday && (
            <span className="text-[#FF4103]">
              {today.percent > 0 ? `+${today.percent}%` : ""}
            </span>
          )}
        </div>

        {!disabled && showToday && (
          <p className="text-13-regular text-black-80">
            {today.diffAmount > 0
              ? `어제보다 ${today.diffAmount.toLocaleString()}원 더 벌었어요!`
              : ""}
          </p>
        )}
        {disabled && showToday && <></>}
      </div>
    </div>
  );
};

export default SalesCard;
