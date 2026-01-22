import { useCallback, useState } from "react";

export const useMarkerManager = () => {
  const [markers, setMarkers] = useState<{ storeId: string; lat: number; lng: number }[]>([]);
  const [isActive, setIsActive] = useState(false);

  //마커 추가
  const addMarker = useCallback(
    (lat: number, lng: number) => {
      const storeId = prompt("스토어 아이디를 입력하세요");
      if (!storeId?.trim()) return;

      const isExist = markers.some(
        (marker) => marker.storeId === storeId
      );

      if (isExist) {
        alert("이미 존재하는 주점입니다.");
        return;
      }

      setMarkers((prev) => [...prev, { storeId, lat, lng }]);
    },
    [markers]
  );

  //마커 뒤로가기
  const undoMarker = () =>
    setMarkers((prev) => prev.slice(0, -1));

  //마커 초기화
  const resetMarkers = () => setMarkers([]);

  //전체 마커 복사
  const copyMarkers = () => {
    const text = markers
      .map(
        ({ storeId, lat, lng }) =>
          `${storeId} : { lat: ${lat}, lng: ${lng} }`
      )
      .join(",\n");

    navigator.clipboard.writeText(text);
    alert("복사가 완료 되었습니다.");
  };

  return {
    markers,
    isActive,
    setIsActive,
    addMarker,
    undoMarker,
    resetMarkers,
    copyMarkers,
  };
};