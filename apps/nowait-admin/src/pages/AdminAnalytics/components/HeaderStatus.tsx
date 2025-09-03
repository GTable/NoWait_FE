import SalesCard from "./SalesCard";
import TotalSalesCard from "./TotalSalesCard";

interface HeaderStatusProps {
  sales?: {
    storeId: number;
    date: string;
    todaySalesSum: number;
    yesterdaySalesSum: number;
    cumulativeSalesBeforeYesterday: number;
    ObjectallZero: boolean;
  };
  popularMenu?: {
    menuId: number;
    menuName: string;
    soldCount: number;
    imageUrl?: string;
  }[];
  saleDisabled: boolean;
  poupularMenuDisabled: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const HeaderStatus: React.FC<HeaderStatusProps> = ({
  sales,
  popularMenu,
  saleDisabled,
  poupularMenuDisabled,
  isTablet,
  isMobile,
}) => {
  const todayAmount = sales?.todaySalesSum ?? 0;
  const yesterdayAmount = sales?.yesterdaySalesSum ?? 0;
  const totalAmount =
    (sales?.cumulativeSalesBeforeYesterday ?? 0) + todayAmount;
  const diffAmount = todayAmount - yesterdayAmount;
  const percent = yesterdayAmount
    ? parseFloat(((diffAmount / yesterdayAmount) * 100).toFixed(1))
    : 0;

  const formatDate = (date: Date | string): string => {
    if (typeof date === "string") {
      // sales.date가 "2025-08-02" 형식일 경우
      return `2${date.replace(/-/g, ".")}`;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 오늘, 어제 날짜 계산
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayDate = formatDate(today);
  const yesterdayDate = formatDate(yesterday);

  console.log(popularMenu, "인기 메뉴");

  return (
    <div
      className={`${
        isTablet
          ? "grid grid-cols-1 lg:grid-cols-2 gap-[10px] w-full h-[50%]"
          : "flex flex-col gap-[10px]"
      } ${isMobile ? "min-h-[227px]" : ""}`}
    >
      <div className="flex flex-col gap-[10px]">
        <SalesCard
          today={{
            date: todayDate,
            amount: todayAmount,
            diffAmount,
            percent,
          }}
          previous={{
            date: yesterdayDate,
            amount: yesterdayAmount,
          }}
          disabled={saleDisabled}
          isTablet={isTablet}
        />

        <TotalSalesCard
          title="누적매출"
          date={`${todayDate} 기준`}
          amount={totalAmount}
          disabled={saleDisabled}
          isTablet={isTablet}
        />
      </div>

      <div
        className={`flex flex-col bg-white rounded-[16px] ${
          poupularMenuDisabled ? "justify-center items-center relative" : ""
        } ${
          isTablet
            ? "p-6"
            : isMobile
            ? "p-[22px]"
            : "p-[22px] w-[335px] h-[227px]"
        }`}
      >
        <div className={`flex flex-col `}>
          <p
            className={`text-title-18-bold text-navy-80 ${
              poupularMenuDisabled ? "absolute top-6 left-6" : ""
            }`}
          >
            인기 메뉴 TOP 5
          </p>
          <span className="text-13-regular text-black-60">
            {poupularMenuDisabled ? "" : todayDate}
          </span>
          {poupularMenuDisabled ? (
            <div className="flex flex-col justify-center items-center text-center text-black-60 text-13-regular">
              <p>집계된 데이터가 없어요</p>
              <p>아직 매출이 집계되지 않았을 수 있어요</p>
            </div>
          ) : (
            ""
          )}
        </div>

        <ul className="mt-[25px]">
          {!poupularMenuDisabled &&
            (popularMenu ?? []).slice(0, 5).map((menu, i) => (
              <li key={menu.menuId} className="flex  justify-between h-[52px]">
                <span className="flex text-16-bold items-center gap-[10px]">
                  {i + 1}{" "}
                  <div
                    className={`h-9 w-9 rounded-[8px] overflow-hidden ${
                      menu.imageUrl ?? "bg-[#788FB6]"
                    }`}
                  >
                    <img src={menu.imageUrl} className="object-cover" />
                  </div>
                  <p
                    className={`text-16-semibold ${
                      isMobile ? "truncate w-[100px]" : ""
                    }`}
                  >
                    {menu.menuName}
                  </p>
                </span>
                <span className="text-16-medium">{menu.soldCount}개</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default HeaderStatus;
