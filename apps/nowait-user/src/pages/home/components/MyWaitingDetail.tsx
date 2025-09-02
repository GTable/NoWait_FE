import ArrowBack from "../../../assets/icon/arrow_back.svg?react";
import { useState, useRef, useEffect } from "react";
import type { WaitingItem } from "../../../types/WaitingItem";
import MainCard from "./MainCard";
import CancelWaitingModal from "./CancelWaitingModal";
import { useCancelWaiting } from "../../../hooks/useCancelWaiting";
import Close from "../../../assets/icon/close.svg?react";

interface MyWaitingDetailProps {
  onClose?: () => void;
  waitingItems?: WaitingItem[];
}

const MyWaitingDetail = ({
  onClose,
  waitingItems = [],
}: MyWaitingDetailProps) => {
  const items = waitingItems;

  // 현재 활성 카드 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<
    "up" | "down" | null
  >(null);

  // 대기 취소 모달 상태
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // 대기 취소 mutation
  const cancelWaitingMutation = useCancelWaiting();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef(0);

  // 대기 취소 버튼 클릭 핸들러
  const handleCancelWaitingClick = () => {
    setIsCancelModalOpen(true);
  };

  // 대기 취소 확인 핸들러
  const handleCancelConfirm = () => {
    const currentStoreId = items[currentIndex]?.id;
    if (currentStoreId) {
      cancelWaitingMutation.mutate(currentStoreId, {
        onSuccess: () => {
          setIsCancelModalOpen(false);
          onClose?.(); // 성공 시 모달 닫기
        },
      });
    }
  };

  // 대기 취소 모달 닫기
  const handleCancelModalClose = () => {
    setIsCancelModalOpen(false);
  };

  // 숫자 애니메이션 효과
  useEffect(() => {
    if (currentIndex !== prevIndexRef.current) {
      // 슬라이드 방향 판단
      const isRightSlide = currentIndex > prevIndexRef.current;

      // 애니메이션 방향 설정
      setAnimationDirection(isRightSlide ? "up" : "down");

      // 강제 리렌더링을 위한 키 변경
      setAnimationKey((prev) => prev + 1);

      // 애니메이션 완료 후 방향 리셋
      const timer = setTimeout(() => {
        setAnimationDirection(null);
      }, 600);

      prevIndexRef.current = currentIndex;

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // 상하 스크롤만 방지 (좌우 스크롤은 허용)
  useEffect(() => {
    // 터치 시작 위치를 저장할 변수
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;

        const deltaY = Math.abs(touchY - touchStartY);
        const deltaX = Math.abs(touchX - touchStartX);

        // 상하 움직임이 좌우 움직임보다 클 때만 스크롤 방지
        if (deltaY > deltaX && deltaY > 10) {
          e.preventDefault();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // 상하 스크롤만 방지 (deltaY가 0이 아닌 경우)
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
      }
    };

    // 터치 이벤트 리스너
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // 휠 이벤트 리스너
    document.addEventListener("wheel", handleWheel, { passive: false });

    // 키보드 이벤트로 인한 상하 스크롤 방지
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "PageUp" ||
        e.key === "PageDown" ||
        e.key === "Home" ||
        e.key === "End"
      ) {
        e.preventDefault();
      }
    });

    // body 스크롤 방지
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = 288 + 24; // w-72 (288px) + gap-6 (24px)
      const newIndex = Math.round(scrollLeft / cardWidth);
      const boundedIndex = Math.max(0, Math.min(newIndex, items.length - 1));

      // 스크롤 오프셋 계산 (현재 카드 위치 대비 얼마나 벗어났는지)
      const exactPosition = scrollLeft / cardWidth;
      const offset = exactPosition - boundedIndex;
      setScrollOffset(offset);

      if (boundedIndex !== currentIndex) {
        setCurrentIndex(boundedIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items.length, currentIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-[#222] flex items-center justify-center">
      <div className="max-w-[430px] min-w-[360px] w-full h-full bg-white flex flex-col mx-auto">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 bg-white">
          <button onClick={onClose} className="p-2">
            <ArrowBack className="icon-m" />
          </button>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex flex-col flex-1 items-center pt-2.5">
          {/* 상태 텍스트 */}
          <div className="text-center mb-7.5 px-14">
            <div className="text-16-medium text-black-100 mb-0.75">
              입장 대기 중
            </div>
            <div className="text-headline-22-bold text-black-90 flex items-baseline justify-center gap-1">
              <span>내 앞 대기</span>
              <span className="text-primary flex items-baseline">
                <span className="relative inline-block overflow-hidden">
                  <span
                    key={animationKey}
                    className={`text-22-bold inline-block ${
                      animationDirection === "up"
                        ? "animate-number-slide-up"
                        : animationDirection === "down"
                        ? "animate-number-slide-down"
                        : ""
                    }`}
                  >
                    {items[currentIndex]?.waitingCount || 0}
                  </span>
                </span>
                <span>팀</span>
              </span>
            </div>
          </div>

          {/* 카드 영역 */}
          <div className="w-full flex-1 flex flex-col mb-7.5">
            {/* 가로 스크롤 카드 컨테이너 */}
            <div className="flex-1 flex overflow-visible">
              <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide w-full snap-x snap-mandatory"
                style={{
                  paddingLeft: "calc((100% - 288px) / 2)",
                  paddingRight: "calc((100% - 288px) / 2)",
                  paddingTop: "20px",
                  paddingBottom: "40px",
                }}
              >
                {items.map((item, index) => {
                  // 현재 스크롤 위치를 고려한 정확한 카드 위치 계산
                  const cardPosition = index - currentIndex - scrollOffset;

                  // 카드가 중앙에서 얼마나 떨어져 있는지에 따라 점진적으로 회전 각도 계산
                  let rotation = 0;
                  let translateX = 0;
                  let translateY = 0;

                  if (cardPosition !== 0) {
                    // 거리에 따른 최대 회전 각도와 이동 거리
                    const maxRotation = 3;
                    const maxTranslateX = 8;
                    const maxTranslateY = 8;

                    // 거리에 따른 비율 계산 (최대 1.0으로 제한)
                    const distance = Math.abs(cardPosition);
                    const ratio = Math.min(distance, 1.0);

                    // 점진적인 변화 적용
                    rotation =
                      cardPosition > 0
                        ? maxRotation * ratio
                        : -maxRotation * ratio;
                    translateX =
                      cardPosition > 0
                        ? maxTranslateX * ratio
                        : -maxTranslateX * ratio;
                    translateY = maxTranslateY * ratio;
                  }

                  return (
                    <div
                      key={item.id}
                      className="transition-transform duration-150 ease-out"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotation}deg)`,
                        transformOrigin: "center center",
                      }}
                    >
                      <MainCard type="waiting" item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex w-full px-5 py-8 items-center justify-center">
            <button
              className="flex justify-center items-center gap-1"
              onClick={handleCancelWaitingClick}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <Close className="text-black-70" />
              </div>
              <div className="flex text-[16px] font-semibold tracking-normal text-black-70">
                대기 취소
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 대기 취소 확인 모달 */}
      <CancelWaitingModal
        isOpen={isCancelModalOpen}
        onClose={handleCancelModalClose}
        onConfirm={handleCancelConfirm}
        isLoading={cancelWaitingMutation.isPending}
      />
    </div>
  );
};

export default MyWaitingDetail;
