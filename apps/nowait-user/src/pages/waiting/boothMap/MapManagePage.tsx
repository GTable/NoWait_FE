// pages/map/manage.tsx
import { useState } from "react";
import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui";

const MapManagePage = () => {
  const [markers, setMarkers] = useState<
    { storeId: number; top: string; left: string }[]
  >([]);
  const [status, setStatus] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // 맵 이동과 마커 생성 기능 충돌로 상태에 따라 기능 분리
    if (!status) return;
    // 마커에 해당하는 아이디 생성 prompt
    const inputId = prompt("스토어 아이디를 입력하세요");
    // prompt 공백 및 취소 버튼 클릭 시 무효화
    if (inputId === null || inputId.trim() === "") return;
    const rect = e.currentTarget.getBoundingClientRect();

    // = offsetX, offsetY
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // = offsetWidth, offsetHeight
    const width = rect.width;
    const height = rect.height;

    // 비율로 변환
    const left = ((x / width) * 100).toFixed(1);
    const top = ((y / height) * 100).toFixed(1);

    const newMarker = {
      storeId: Number(inputId),
      top: `${top}%`,
      left: `${left}%`,
    };

    setMarkers((prev) => [...prev, newMarker]);
  };

  return (
    <div className="relative left-0 top-0">
      <div
        className="mx-auto border border-gray-300"
        style={{
          width: "430px",
          height: "100dvh",
          overflow: "hidden",
          WebkitOverflowScrolling: "touch",
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
          onClick={handleMapClick}
        >
          <img
            src="/test-map.png"
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              pointerEvents: "none",
              userSelect: "none",
            }}
            alt="맵 생성"
          />

          {markers.map((marker) => (
            <div
              key={marker.storeId}
              className="absolute"
              style={{
                top: marker.top,
                left: marker.left,
                transform: "translate(-50%, -100%)",
              }}
            >
              <BoothMarker />
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex gap-1 fixed left-1/2 bottom-0 -translate-x-1/2 w-full">
        <Button onClick={() => setStatus(true)}>시작</Button>
        <Button onClick={() => setStatus(false)}>중지</Button>
        <Button
          onClick={() => {
            setMarkers([]);
          }}
        >
          초기화
        </Button>
        <Button
          onClick={() => {
            // 좌표를 문자열로 변환 후 복사
            const formattedMarkers = markers
              .map((marker) => {
                return `${marker.storeId} : {top:"${marker.top}",left:"${marker.left}"}`;
              })
              .join(",\n");
            navigator.clipboard.writeText(`${formattedMarkers}\n`);
          }}
        >
          복사
        </Button>
      </div>
    </div>
  );
};

export default MapManagePage;
