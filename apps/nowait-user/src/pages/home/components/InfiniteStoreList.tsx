import { useEffect, memo, useRef, useCallback } from "react";
import MainCard from "./MainCard";
import { useInfiniteStores } from "../../../hooks/useInfiniteStores";
import { DropdownLoader } from "@repo/ui";

const InfiniteStoreList = memo(() => {
  const { stores, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteStores();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 다음 페이지 로딩 핸들러
  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Intersection Observer로 무한 스크롤 (모든 디바이스 지원)
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleFetchNextPage();
        }
      },
      {
        // iOS Safari 바운스 스크롤을 고려해 여유롭게 설정
        rootMargin: "150px",
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [handleFetchNextPage]);

  // 백업용 스크롤 이벤트 (극히 드문 구버전 대응)
  useEffect(() => {
    // Intersection Observer를 지원하는 경우 스킵
    const supportsIntersectionObserver = "IntersectionObserver" in window;
    if (supportsIntersectionObserver) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrolled = window.scrollY + window.innerHeight;
        const total = document.documentElement.scrollHeight;

        if (scrolled / total > 0.8 && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <div className="mb-0.25 text-start text-title-20-bold text-black-90">
        모든 주점
      </div>

      {/* 초기 로딩 */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-black-20 border-t-black-60 rounded-full animate-spin" />
            <div className="text-black-50 text-16-regular">
              주점 정보를 불러오는 중...
            </div>
          </div>
        </div>
      )}

      {/* 데이터 없음 */}
      {!isLoading && stores.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-black-50 text-16-regular mb-2">
            주점이 아직 준비되지 않았어요.
          </div>
          <div className="text-black-40 text-14-regular">
            곧 다양한 주점들이 추가될 예정입니다!
          </div>
        </div>
      )}

      {/* 주점 리스트 */}
      {!isLoading && stores.length > 0 && (
        <div className="flex flex-col gap-3">
          {stores.map((store) => (
            <MainCard
              key={store.storeId}
              type="store"
              storeId={store.storeId}
              publicCode={store.publicCode}
              name={store.name}
              departmentName={store.departmentName}
              profileImageUrl={store.profileImage?.imageUrl || ""}
              isActive={store.isActive}
              deleted={store.deleted}
              waitingCount={store.waitingCount}
            />
          ))}

          {/* 무한스크롤 트리거 영역 */}
          {hasNextPage && (
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center"
              aria-label="더 많은 주점을 로딩하는 중..."
            >
              {isFetchingNextPage ? (
                <DropdownLoader />
              ) : (
                <div className="text-black-40 text-14-regular">
                  스크롤하여 더 많은 주점 보기
                </div>
              )}
            </div>
          )}

          {/* 로딩 완료 메시지 */}
          {!hasNextPage && (
            <div className="flex justify-center pb-4">
              <div className="text-black-40 text-14-regular">
                모든 주점을 확인했습니다
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

InfiniteStoreList.displayName = "InfiniteStoreList";

export default InfiniteStoreList;
