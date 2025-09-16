import { motion, useMotionValue, animate } from "framer-motion";
import BoothListItem from "./BoothListItem";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { StoreType } from "../../../../types/wait/store";

interface PanInfo {
  offset: { x: number; y: number };
}

const BoothList = ({
  booths,
  totalBooth,
}: {
  booths: StoreType[];
  totalBooth: number | undefined;
}) => {
  const y = useMotionValue(0);
  console.log(y);

  // 가상 스크롤을 위한 ref
  const parentRef = useRef<HTMLDivElement>(null);

  // 가상 스크롤 설정
  const rowVirtualizer = useVirtualizer({
    count: booths?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 285,
  });

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.y; // 드래그 이동 거리
    const currentY = y.get();
    let closest = 0;
    if (offset < -30) {
      closest = -400;
    } else if (offset > 30) {
      closest = 0;
    } else {
      closest = Math.abs(currentY - 0) < Math.abs(currentY - -400) ? 0 : -400;
    }
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
              {totalBooth}개의 부스
            </h2>
          </div>
          {booths?.length > 0 && (
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
                  const store = booths[virtualRow.index];
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
                      <BoothListItem
                        bannerImages={store?.bannerImages[0]?.imageUrl}
                        waitingCount={store?.waitingCount}
                        profileImage={store?.profileImage?.imageUrl}
                        name={store?.name}
                        departmentName={store?.departmentName}
                        storeId={store?.storeId || 0}
                        publicCode={store?.publicCode}
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
