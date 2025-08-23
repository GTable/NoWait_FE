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

    // 실제 지도 크기
    const MAP_WIDTH = 1100;
    const MAP_HEIGHT = 1100;

    // 비율로 변환
    const left = ((x / rect.width) * 100 * (rect.width / MAP_WIDTH)).toFixed(3);
    const top = ((y / rect.height) * 100 * (rect.height / MAP_HEIGHT)).toFixed(
      3
    );

    const newMarker = {
      storeId: Number(inputId),
      top: `${top}%`,
      left: `${left}%`,
    };

    setMarkers((prev) => [...prev, newMarker]);
  };

  return (
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
          <ul className="absolute top-0 left-0 w-full h-full">
            {markers.map((marker) => (
              <li
                key={marker.storeId}
                className="absolute"
                style={{
                  top: marker.top,
                  left: marker.left,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <BoothMarker />
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="flex gap-1 fixed left-1/2 bottom-0 -translate-x-1/2 w-full">
        <Button onClick={() => setStatus(true)}>시작</Button>
        <Button onClick={() => setStatus(false)}>중지</Button>
        <Button
          onClick={() => {
            setMarkers((prev) => prev.slice(0, -1));
          }}
        >
          뒤로가기
        </Button>
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
            alert("복사 완료");
          }}
        >
          복사
        </Button>
      </div>
    </div>
  );
};

export default MapManagePage;
