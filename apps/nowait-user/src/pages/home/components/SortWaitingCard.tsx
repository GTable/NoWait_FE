import { memo, useRef } from "react";
import ArrowDown from "../../../assets/icon/arrow_down.svg?react";
import MainCard from "./MainCard";
import { useWaitingStores } from "../../../hooks/useWaitingStores";
import { useInView } from "framer-motion";

// SortWaitingCard Props
interface SortWaitingCardProps {
  order: "asc" | "desc";
  onModalOpen: () => void;
  onNavigateToStore: (publicCode: string) => void;
}

// 바로 입장 가능한 주점 섹션 컴포넌트
const SortWaitingCard = memo(
  ({ order, onModalOpen, onNavigateToStore }: SortWaitingCardProps) => {
    // ⬇️ 추가: 가로 스크롤의 양 끝 감지용 센티널/루트 ref
    const rootRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    // order에 따른 주점 데이터 가져오기
    const { waitingStores, isLoading, error } = useWaitingStores(order);

    // 수평 컨테이너(rootRef)를 기준으로 왼쪽/오른쪽 센티널이 완전히 보이면 true
    const atLeft = useInView(leftRef, {
      root: rootRef,
      amount: 1,
      margin: "0px 0px 0px -1px", // 왼쪽 센티널이 조금이라도 보이면 감지
    });
    const atRight = useInView(rightRef, {
      root: rootRef,
      amount: 1,
      margin: "0px -1px 0px 0px", // 오른쪽 센티널이 조금이라도 보이면 감지
    });

    // 초기 상태와 스크롤 상태를 구분
    const isInitialState = atLeft && atRight; // 초기 상태: 양쪽 모두 보임
    const isScrolledLeft = !atLeft && atRight; // 왼쪽으로 스크롤됨
    const isScrolledRight = atLeft && !atRight; // 오른쪽으로 스크롤됨
    const isScrolling = !atLeft && !atRight; // 중간 스크롤 중

    // Tailwind JIT를 위해 세 클래스 문자열이 소스에 "그대로" 있어야 함
    const edgeClass = isInitialState
      ? "" // 초기 상태: 마진 없음
      : isScrolledLeft
      ? "ml-[-20px]" // 왼쪽으로 스크롤됨: 왼쪽 마진
      : isScrolledRight
      ? "mr-[-20px]" // 오른쪽으로 스크롤됨: 오른쪽 마진
      : "mx-[-20px]"; // 중간 스크롤 중: 양쪽 마진

    // 디버깅용 로그 (개발 중에만 사용)
    console.log("Scroll detection:", {
      atLeft,
      atRight,
      isInitialState,
      isScrolledLeft,
      isScrolledRight,
      isScrolling,
      edgeClass,
    });

    const getSectionTitle = () => {
      return order === "asc" ? "대기가 가장 적어요" : "인기가 가장 많아요";
    };

    // 데이터가 없거나 로딩 중이거나 에러가 있을 때는 빈 컨테이너만 렌더링
    if (isLoading || error || waitingStores.length === 0) {
      return (
        <div className="flex flex-col">
          <div className="flex flex-row gap-1.5 items-center mb-3.5">
            <div className="flex text-start text-title-20-bold text-black-90">
              {getSectionTitle()}
            </div>
            <div
              onClick={onModalOpen}
              className="flex w-6 h-6 bg-black-15 rounded-full items-center justify-center cursor-pointer"
            >
              <ArrowDown className="text-black-60 icon-s" />
            </div>
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {/* 로딩 중이거나 데이터가 없을 때는 빈 공간만 표시 */}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="flex flex-row gap-1.5 items-center mb-3.5">
          <div className="flex text-start text-title-20-bold text-black-90">
            {getSectionTitle()}
          </div>
          <div
            onClick={onModalOpen}
            className="flex w-6 h-6 bg-black-15 rounded-full items-center justify-center cursor-pointer"
          >
            <ArrowDown className="text-black-60 icon-s" />
          </div>
        </div>

        {/* ⬇️ 여기만 변경: ref/센티널/마진 전환 */}
        <div
          ref={rootRef}
          className={`flex overflow-x-auto scrollbar-hide transition-[margin] duration-200 ${edgeClass}`}
        >
          {/* 왼쪽 끝 판정용 센티널 */}
          <div ref={leftRef} aria-hidden className="shrink-0 w-4 h-4" />

          {waitingStores.map((store, index) => (
            <div
              key={store.storeId}
              className={`flex-shrink-0 ${index > 0 ? "ml-1.5" : ""}`}
            >
              <MainCard
                type="homeCard"
                imageUrl={store.bannerImageUrl || ""}
                storeName={store.storeName}
                departmentName={store.departmentName}
                waitingCount={store.waitingCount}
                onClick={() => {onNavigateToStore(store.publicCode)}}
              />
            </div>
          ))}

          {/* 오른쪽 끝 판정용 센티널 */}
          <div ref={rightRef} aria-hidden className="shrink-0 w-4 h-4" />
        </div>
      </div>
    );
  }
);

export default SortWaitingCard;
