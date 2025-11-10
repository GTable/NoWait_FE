import { useState } from "react";
import { useGetPopularMenu } from "../../hooks/analytics/useGetPopularMenu";
import { useGetSalesByDate } from "../../hooks/analytics/useGetSalesByDate";
import { useGetTopSales } from "../../hooks/analytics/useGetTopSalse";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import BoothSalesRankingCard from "./components/BoothSalesRankingCard ";
import HeaderStatus from "./components/HeaderStatus";

interface BoothRanking {
  rank: number;
  name: string;
  department: string;
  salesCount: number;
  rankChange: number;
  isCurrentBooth?: boolean;
  profileImageUrl: string;
}

const AdminAnalytics = () => {
  const today = new Date();
  const formatted = today.toISOString().slice(0, 10);
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });
  console.log(formatted, "오늘날짜");

  const width = useWindowWidth();
  const isTablet = width >= 768;
  const isMobile = width < 432;
  const { data: boothRank } = useGetTopSales();
  const { data: sales } = useGetSalesByDate(currentDate);
  const { data: popularMenu } = useGetPopularMenu();

  const boothDisabled = boothRank?.length === 0;
  const storeId = localStorage.getItem("storeId");
  const poupularMenuDisabled = popularMenu?.length === 0;

  const boothRankingData: BoothRanking[] =
    boothRank && boothRank.length > 0
      ? boothRank.map((item) => ({
          rank: item.currentRank,
          name: item.storeName,
          department: item.departmentName,
          salesCount: item.orderCount,
          rankChange: item.delta,
          isCurrentBooth: storeId == item.storeId.toString(),
          profileImageUrl: item.profileUrl,
        }))
      : [];

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate.toISOString().slice(0, 10));
  };

  console.log(popularMenu, "인기메뉴 원래데이터");
  console.log(sales, "날짜별 조회");

  return (
    <div
      className={`w-full flex flex-col items-center ${
        isMobile ? "min-h-[1020px] " : ""
      }`}
    >
      <HeaderStatus
        isTablet={isTablet}
        isMobile={isMobile}
        sales={sales}
        currentDate={currentDate}
        popularMenu={popularMenu}
        poupularMenuDisabled={poupularMenuDisabled}
        onDateChange={changeDate}
      />
      <BoothSalesRankingCard
        isTablet={isTablet}
        date={formatted}
        data={boothRankingData}
        disabled={boothDisabled}
      />
    </div>
  );
};

export default AdminAnalytics;
