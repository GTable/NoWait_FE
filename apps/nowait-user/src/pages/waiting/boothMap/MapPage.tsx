import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import BoothList from "./components/BoothList";
import useWindowHeight from "../../../hooks/useWindowHeight";
import { useState } from "react";
import BoothDetail from "./components/BoothDetail";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../api/reservation";
import { motion } from "framer-motion";
import MapHeader from "./components/MapHeader";

const boothPosition: Record<number, { top: string; left: string }> = {
  1: { top: "45%", left: "60%" },
  2: { top: "45%", left: "70%" },
  3: { top: "45%", left: "80%" },
  4: { top: "45%", left: "90%" },
  5: { top: "50%", left: "60%" },
  6: { top: "65%", left: "70%" },
  7: { top: "70%", left: "80%" },
  8: { top: "72%", left: "90%" },
  9: { top: "75%", left: "60%" },
  10: { top: "80%", left: "70%" },
  11: { top: "90%", left: "80%" },
  12: { top: "92%", left: "90%" },
  13: { top: "12%", left: "60%" },
  14: { top: "15%", left: "70%" },
  15: { top: "20%", left: "80%" },
  16: { top: "45%", left: "90%" },
};

const MapPage = () => {
  const height = useWindowHeight();
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const { data: storeMarkers } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });

  const booths = storeMarkers?.map((booth) => ({
    ...booth,
    ...boothPosition[booth.storeId],
  }));

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
    <div className="relative overflow-hidden" style={{ height }}>
      {/* 헤더 */}
      <MapHeader />
      {/* 축제 맵 */}
      <div className="relative top-0 left-0 h-screen-dvh w-full">
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
                  style={{ top: booth.top, left: booth.left }}
                >
                  <button
                    className={`transition-transform origin-bottom duration-200 ${
                      selectedBooth === booth.storeId
                        ? "scale-120"
                        : "scale-100"
                    }`}
                    onClick={() => openBoothButton(booth.storeId)}
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
        <BoothList />
      )}
    </div>
  );
};

export default MapPage;
