import { useState, useMemo, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import HomeHeader from "../../components/Header";
import InfiniteStoreList from "./components/InfiniteStoreList";
import WaitingListModal from "./components/WaitingListModal";
import MyWaitingDetail from "./components/MyWaitingDetail";
import {
  MemoizedBannerMap,
  MemoizedUpIcon,
} from "../../components/icons/MemoizedIcons";
import { useMyWaitingList } from "../../hooks/useMyWaitingList";
import { useWaitingItems } from "../../hooks/useWaitingItems";
import SortWaitingCard from "./components/SortWaitingCard";
import MyWaitingSection from "./components/MyWaitingSection";
import MyWaitingCard from "./components/MyWaitingCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("대기 적은 순");
  const [isWaitingDetailOpen, setIsWaitingDetailOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // 슬라이드 상태를 로컬로 관리
  const [showUpButton, setShowUpButton] = useState(false); // upIcon 표시 여부

  // 정렬 옵션에 따른 order 설정
  const order: "asc" | "desc" = sortOption === "대기 적은 순" ? "asc" : "desc";

  // 홈페이지 마운트 시 캐시된 데이터 새로고침
  useEffect(() => {
    // stores 쿼리의 데이터를 백그라운드에서 새로 가져오기
    queryClient.invalidateQueries({ queryKey: ["stores"] });
  }, [queryClient]);

  // 내 대기 목록 가져오기
  const { myWaitingList, refetch: refetchMyWaitingList } = useMyWaitingList();

  // myWaitingList를 WaitingItem 형태로 변환 - 별도 훅 사용
  const waitingItems = useWaitingItems(myWaitingList);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
  }, []);

  const handleWaitingCardClick = useCallback(() => {
    setIsWaitingDetailOpen(true);
  }, []);

  const handleWaitingDetailClose = useCallback(() => {
    setIsWaitingDetailOpen(false);
  }, []);

  const handleNavigateToStore = useCallback(
    (publicCode: string) => {
      navigate(`/store/${publicCode}`);
    },
    [navigate]
  );

  // 슬라이드 변경 핸들러
  const handleSlideChange = useCallback((slide: number) => {
    setCurrentSlide(slide);
  }, []);

  // myWaitingList가 변경될 때 currentSlide를 리셋
  useEffect(() => {
    if (myWaitingList && myWaitingList.length > 0) {
      setCurrentSlide(0);
    }
  }, [myWaitingList]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      // 스크롤이 80% 이상일 때 upIcon 표시
      setShowUpButton(scrollPercentage > 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 화면 최상단으로 이동하는 함수
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // MyWaitingCard에 전달할 props를 메모이제이션
  const myWaitingCardProps = useMemo(
    () => ({
      waitingStores: myWaitingList,
      currentSlide,
      onSlideChange: handleSlideChange,
      onClick: handleWaitingCardClick,
      onRefresh: refetchMyWaitingList,
    }),
    [
      myWaitingList,
      currentSlide,
      handleSlideChange,
      handleWaitingCardClick,
      refetchMyWaitingList,
    ]
  );

  // SortWaitingCard에 전달할 props를 메모이제이션
  const sortWaitingCardProps = useMemo(
    () => ({
      order,
      onModalOpen: handleModalOpen,
      onNavigateToStore: handleNavigateToStore,
    }),
    [order, handleModalOpen, handleNavigateToStore]
  );

  // MyWaitingCard를 메모이제이션하여 props가 변경되지 않으면 리렌더링하지 않음
  const memoizedMyWaitingCard = useMemo(
    () => <MyWaitingCard {...myWaitingCardProps} />,
    [myWaitingCardProps]
  );

  return (
    <div className="relative">
      <HomeHeader />

      {/* 고정된 헤더 아래 여백 */}
      <div className="h-20"></div>

      {/* 내 대기 카드 섹션 - 내 대기 목록이 있을 때만 표시 */}
      {myWaitingList.length > 0 && (
        <MyWaitingSection>{memoizedMyWaitingCard}</MyWaitingSection>
      )}

      <div className="flex flex-col px-5 gap-10">
        {/* 바로 입장 가능한 주점 - 메모이제이션된 컴포넌트 사용 */}
        <SortWaitingCard {...sortWaitingCardProps} />

        {/* 축제 부스 찾기 안내 */}
        <div
          onClick={() => navigate("/map")}
          className="flex flex-row rounded-2xl bg-black-15 gap-3.75 justify-between pl-5 items-center"
        >
          <div className="flex flex-col py-5 gap-1.5">
            <div className="flex text-title-18-bold text-black-90 leading-[130%]">
              축제 부스 한눈에 찾기
            </div>
            <div className="flex text-sm font-[400] tracking-normal text-[#343434] leading-[130%]">
              지도로 부스의 위치를 확인해 보세요!
            </div>
          </div>
          <MemoizedBannerMap className="w-25 h-25" />
        </div>

        {/* 무한 스크롤 주점 목록 */}
        <InfiniteStoreList />
      </div>
      {/* 정렬 모달 */}
      <WaitingListModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedOption={sortOption}
        onSortChange={handleSortChange}
      />

      {/* 웨이팅 상세 모달 */}
      {isWaitingDetailOpen && (
        <MyWaitingDetail
          onClose={handleWaitingDetailClose}
          waitingItems={waitingItems}
        />
      )}

      {/* UpIcon - 스크롤이 80% 이상일 때 표시 */}
      {showUpButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-5 z-30 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
          aria-label="화면 최상단으로 이동"
        >
          <MemoizedUpIcon className="w-10 h-10" />
        </button>
      )}
    </div>
  );
};

export default HomePage;
