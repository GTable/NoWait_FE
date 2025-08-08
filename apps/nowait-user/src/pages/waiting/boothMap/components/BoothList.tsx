import { motion, useMotionValue, animate } from "framer-motion";
import BoothItem from "./BoothItem";
import { useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getInfiniteAllStores } from "../../../../api/reservation";

const snapPoints = [0, -400]; // 0: 닫힘, -400: 열림

const BoothList = () => {
  const y = useMotionValue(0);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["boothList"],
      queryFn: ({ pageParam = 1 }) => getInfiniteAllStores(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // 서버에서 받은 hasNext를 기준으로 다음 페이지 여부 결정
        if (!lastPage.hasNext) {
          return undefined;
        }
        return allPages?.length;
      },
    });

  const stores =
    data?.pages.flatMap((page) => page.storePageReadResponses) ?? [];

  // 가상 스크롤을 위한 ref
  const parentRef = useRef<HTMLDivElement>(null);

  // 가상 스크롤 설정
  const rowVirtualizer = useVirtualizer({
    count: stores.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 285,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    if (virtualItems.length === 0) return;

    const lastVirtualItem = virtualItems[virtualItems.length - 1];

    // 마지막으로 보이는 index가 현재 데이터의 마지막 index 이상이면 fetch
    if (lastVirtualItem.index >= stores.length - 1) {
      fetchNextPage();
    }
  }, [virtualItems, hasNextPage, isFetchingNextPage, stores.length]);

  const handleDragEnd = () => {
    const currentY = y.get();
    // 가장 가까운 스냅 지점으로 스냅
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - currentY) < Math.abs(prev - currentY) ? curr : prev
    );
    animate(y, closest);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 400 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 400 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ y }}
      drag="y"
      dragConstraints={{ top: -400, bottom: 0 }}
      onDragEnd={handleDragEnd}
      onClick={(e) => e.stopPropagation()}
      className="fixed -bottom-[615px] left-0 w-full bg-white rounded-t-[36px] z-30"
    >
      <div>
        <p className="w-[40px] h-[4px] rounded-full bg-black-30 mx-auto mt-2.5 mb-[26px]"></p>
        <div className="px-5">
          <div className="mb-[30px]">
            <h1 className="text-title-20-semibold mb-1">부스 리스트</h1>
            <h2 className="text-14-regular text-[#8F8F8F]">
              {stores.length}개의 부스
            </h2>
          </div>
          {!isLoading && stores.length > 0 && (
            <div
              ref={parentRef}
              style={{
                height: "610px",
                overflow: "auto",
                paddingBottom: "215px",
              }}
              className="scrollbar-hide"
            >
              <ul
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  position: "relative",
                }}
                className="overflow-y-scroll"
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const store = stores[virtualRow.index];
                  if (!store) return null;

                  return (
                    <li
                      key={store?.storeId}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <BoothItem
                        bannerImages={store?.bannerImages[0]?.imageUrl}
                        waitingCount={store?.waitingCount}
                        profileImage={store?.profileImage?.imageUrl}
                        name={store?.name}
                        departmentName={store?.departmentName}
                        storeId={String(store?.storeId)}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BoothList;
