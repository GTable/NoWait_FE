import BoothList from "./components/BoothList";
import { useEffect, useRef, useState } from "react";
import BoothDetail from "./components/BoothDetail";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../api/reservation";
import { motion } from "framer-motion";
import MapHeader from "./components/MapHeader";
import { boothPosition } from "./constants/boothPosition";
import type { StoreType } from "../../../types/wait/store";

interface BoothWithPosition extends StoreType {
  left: string;
  top: string;
}

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const { data: booths } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });

  // 부스 + 마커 좌표
  const boothsWithPosition: BoothWithPosition[] =
    booths?.map((booth) => ({
      ...booth,
      ...boothPosition[booth.storeId],
    })) || [];

  // 뷰포트 크기 계산
  const viewportRef = useRef<HTMLDivElement>(null);
  const viewportWidth = viewportRef.current?.clientWidth ?? 430;
  const viewportHeight = viewportRef.current?.clientHeight ?? 812;

  console.log(booths);
  useEffect(() => {
    if (!booths || booths.length === 0) return;
    console.log("실행");
    const positions = Object.values(boothPosition).map((booth) => ({
      top: parseFloat(booth.top),
      left: parseFloat(booth.left),
    }));
    const avgTop =
      positions.reduce((sum, booth) => sum + booth.top, 0) / positions.length;
    const avgLeft =
      positions.reduce((sum, booth) => sum + booth.left, 0) / positions.length;
    const initialX = -((avgLeft / 100) * 1100 - viewportWidth / 2);
    const initialY = -((avgTop / 100) * 1100 - viewportHeight / 2);
    setPositionX(initialX);
    setPositionY(initialY);
  }, [booths]);

  const openBoothButton = (id: number) => {
    if (selectedBooth === id) {
      setSelectedBooth(null);
    } else {
      setSelectedBooth(id);
    }
  };
  return (
    <div className="relative overflow-hidden">
      {/* 헤더 */}
      <MapHeader />
      {/* 축제 맵 */}
      <div className="relative top-0 left-0 min-h-dvh w-full">
        <div
          style={{
            width: "430px",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <motion.div
            drag
            dragElastic={false}
            dragTransition={{
              power: 0,
              timeConstant: 0,
            }}
            dragConstraints={{
              left: -(1100 - viewportWidth),
              right: 0,
              top: -(1100 - viewportHeight),
              bottom: 0,
            }}
            // 클릭, 드래그 구분
            onPointerDown={() => setIsDragging(false)}
            onDragStart={() => setIsDragging(true)}
            onPointerUp={(e) => {
              if (!isDragging) {
                if ((e.target as HTMLElement).closest("button")) return;
                setSelectedBooth(null);
              }
            }}
            style={{
              width: "1100px",
              height: "1100px",
              position: "relative",
              cursor: "grab",
              x: positionX,
              y: positionY,
            }}
          >
            {/* <img
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "none",
                userSelect: "none",
              }}
              src={BoothMap}
              alt="축제 맵 이미지"
            /> */}
            {/* 마커 */}
            <ul className="absolute top-0 left-0 w-full h-full">
              {boothsWithPosition?.map((booth) => (
                <li
                  key={booth.storeId}
                  className="absolute"
                  style={{
                    top: booth.top,
                    left: booth.left,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <button
                    className={`transition-transform origin-bottom duration-200 ${
                      selectedBooth === booth.storeId
                        ? "scale-120"
                        : "scale-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openBoothButton(booth.storeId);
                    }}
                  >
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      {/* 부스 리스트 */}
      {selectedBooth !== null ? (
        <BoothDetail
          booth={booths?.find((booth) => booth.storeId === selectedBooth)}
        />
      ) : (
        <BoothList booths={booths!} totalBooth={booths?.length} />
      )}
    </div>
  );
};

export default MapPage;
