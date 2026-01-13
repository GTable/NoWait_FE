import BoothList from "./components/BoothList";
import { useCallback, useState } from "react";
import BoothDetail from "./components/BoothDetail";
import MapHeader from "./components/MapHeader";
import UniversityPolygon from "./components/UniversityPolygon";
import { useGeoPolygon } from "./hooks/useGeoPolygon";
import BoothMarkers from "./components/BoothMarkers";
import { useBooths } from "./hooks/useBooths";
import { useMyLocation } from "./hooks/useMyLocation";
import MapControlButtons from "./components/mapControls/MapControls";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
import { useMapZoom } from "./hooks/useMapZoom";
import { useMapEvents } from "./hooks/useMapEvents";
// import { useIsInsidePolygon } from "./hooks/useIsInsidePolyon";

declare global {
  interface Window {
    naver: any;
  }
}

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [map, setMap] = useState<any | null>(null);
  // const { setIsCompassMode } = isCompassModeStore();
  //대학교 폴리곤(영역) 설정
  const paths = useGeoPolygon();
  //좌표를 포함한 부스들 가져오기
  const booths = useBooths();
  //내 위치 좌표 가져오기
  const myLocation = useMyLocation();
  //줌레벨 가져오기
  const zoom = useMapZoom(map);
  // const isInsideServiceArea = useIsInsidePolygon(paths, myLocation.center);
  //맵 드래그, 클릭 컨트롤
  useMapEvents(map, () => setSelectedBooth(null));

  const openBooth = useCallback(
    (id: number) => {
      if (selectedBooth === id) {
        setSelectedBooth(null);
      } else {
        setSelectedBooth(id);
      }
    },
    [selectedBooth]
  );

  return (
    <div className="relative overflow-hidden">
      {/* 헤더 */}
      <MapHeader />
      {!myLocation.isLoading && (
        <MapDiv
          style={{
            width: "100%",
            height: "600px",
          }}
        >
          <NaverMap center={myLocation.center} zoom={16} ref={setMap}>
            <MapControlButtons center={myLocation.center} map={map} />
            <UniversityPolygon paths={paths} />
            {!myLocation.isLoading && <Marker position={myLocation.center} />}
            <BoothMarkers
              booths={booths}
              openBooth={openBooth}
              zoomLevel={zoom}
            />
          </NaverMap>
        </MapDiv>
      )}
      {/* 부스 리스트 */}
      {selectedBooth !== null ? (
        <BoothDetail
          booth={booths?.find((booth) => booth.storeId === selectedBooth)}
        />
      ) : (
        <BoothList booths={booths!} totalBooth={booths?.length} />
      )}
      {/* {!isInsideServiceArea && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 z-50
                  bg-black/80 text-white px-4 py-2 rounded-lg text-sm"
        >
          현재 위치는 서비스 지역이 아닙니다
        </div>
      )} */}
    </div>
  );
};

export default MapPage;
