// import backIcon from "../../../assets/analytics/arrow_back.svg";
import forwardIcon from "../../../assets/analytics/arrow_forward.svg";
import activeBackIcon from "../../../assets/analytics/arrow_back_active.svg";
import activeForwardIcon from "../../../assets/analytics/arrow_forward_active.svg";

interface SalesCardProps {
  sales?: {
    date: string;
    amount: number;
    diffAmount: number;
    percent: number;
  };
  isTablet: boolean;
  onDateChange: (days: number) => void;
  currentDate: string;
}

const SalesCard: React.FC<SalesCardProps> = ({
  sales,
  isTablet,
  onDateChange,
  currentDate,
}) => {
  const todayISO = new Date().toISOString().slice(0, 10);
  const isFuture = currentDate > todayISO; // 오늘보다 미래인지 확인
  const isToday = currentDate === todayISO;
  console.log(sales, "오늘 판배 목록");

  return (
    <div
      className={`bg-white rounded-[16px] flex flex-col justify-between ${
        isTablet ? "p-6 w-full h-full" : "p-5 w-[335px] min-h-[150px]"
      }`}
    >
      {/* 상단 헤더 */}
      <div className="flex justify-between">
        <span>
          <p className="text-title-18-bold text-navy-80">
            {isToday ? "오늘 매출" : "이전 매출"}
          </p>
          <p className="text-13-regular text-black-60 mt-1">{currentDate}</p>
        </span>

        <span className="flex">
          {/* 왼쪽(과거) 버튼 */}
          <button
            className={`h-5 w-5 ${
              isFuture ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => onDateChange(-1)}
          >
            <img src={activeBackIcon} />
          </button>

          {/* 오른쪽(미래) 버튼 */}
          <button
            className={`h-5 w-5 ${
              isFuture || isToday ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              if (!isFuture && !isToday) onDateChange(1);
            }}
          >
            <img src={isFuture || isToday ? forwardIcon : activeForwardIcon} />
          </button>
        </span>
      </div>

      {/* 하단 내용 */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <p className="text-headline-22-bold text-navy-80">
            {`${(sales?.amount ?? 0).toLocaleString()}원`}
          </p>
          {!!sales?.percent && sales.percent > 0 && (
            <span className="text-[#FF4103] ml-1">{`+${sales?.percent}%`}</span>
          )}
        </div>

        {!!sales?.diffAmount && sales.diffAmount > 0 && (
          <p className="text-13-regular text-black-80">
            {`어제보다 ${sales.diffAmount.toLocaleString()}원 더 벌었어요!`}
          </p>
        )}
      </div>
    </div>
  );
};

export default SalesCard;
