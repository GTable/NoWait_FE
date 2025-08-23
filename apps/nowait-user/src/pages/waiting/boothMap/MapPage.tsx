import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import BoothList from "./components/BoothList";
import { useState } from "react";
import BoothDetail from "./components/BoothDetail";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../api/reservation";
import { motion } from "framer-motion";
import MapHeader from "./components/MapHeader";
import { boothPosition } from "./constants/boothPosition";

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { data: storeMarkers } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });

  // 부스 + 마커 좌표
  const booths = storeMarkers?.map((booth) => ({
    ...booth,
    ...boothPosition[booth.storeId],
  }));

  // 마커 클릭시 나오는 부스 정보
  const detailBooth = booths?.find((booth) => booth.storeId === selectedBooth);

  const openBoothButton = (id: number) => {
    console.log(id);
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
              left: -(1100 - 430),
              right: 0,
              top: -(1100 - 812),
              bottom: 0,
            }}
            // 클릭, 드래그 구분
            onPointerDown={() => setIsDragging(false)}
            onDragStart={() => setIsDragging(true)}
            onPointerUp={() => {
              if (!isDragging) {
                setSelectedBooth(null);
              }
            }}
            style={{
              width: "1100px",
              height: "1100px",
              position: "relative",
              cursor: "grab",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "none",
                userSelect: "none",
              }}
              // src={boothMap}
              src="/test-map.png"
              alt="축제 맵 이미지"
            />
            {/* 마커 */}
            <ul className="absolute top-0 left-0 w-full h-full">
              {booths?.map((booth) => (
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
                    <BoothMarker />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      {/* 부스 리스트 */}
      {selectedBooth !== null ? (
        <BoothDetail booth={detailBooth} />
      ) : (
        <BoothList totalBooth={storeMarkers?.length} />
      )}
    </div>
  );
};

export default MapPage;
