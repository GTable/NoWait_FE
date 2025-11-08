import BoothList from "./components/BoothList";
import { useCallback, useEffect, useState } from "react";
import BoothDetail from "./components/BoothDetail";
import MapHeader from "./components/MapHeader";
import UniversityPolygon from "./components/UniversityPolygon";
import { useGeoPolygon } from "./hooks/useGeoPolygon";
import BoothMarkers from "./components/BoothMarkers";
import { useBooths } from "./hooks/useBooths";
import { useMyLocation } from "./hooks/useMyLocation";
import MapControlButtons from "./components/mapControls/MapControls";
import { Container as MapDiv, NaverMap, Marker } from "react-naver-maps";
declare global {
  interface Window {
    naver: any;
  }
}
const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [map, setMap] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  console.log(zoomLevel);
  // const { setIsCompassMode } = isCompassModeStore();
  // const isDraggingRef = useRef(false);
  //대학교 폴리곤(영역) 설정
  const paths = useGeoPolygon();
  //좌표를 포함한 부스들 가져오기
  const booths = useBooths();
  //내 위치 좌표 가져오기
  const myLocation = useMyLocation();

  useEffect(() => {
    if (!map) return;

    const listener = window.naver.maps.Event.addListener(
      map,
      "zoom_changed",
      () => {
        const currentZoom = map.getZoom();
        setZoomLevel(currentZoom);
      }
    );

    return () => {
      window.naver.maps.Event.removeListener(listener);
    };
  }, [map]);

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
          <NaverMap
            defaultCenter={myLocation.center}
            defaultZoom={16}
            ref={setMap}
          >
            <MapControlButtons center={myLocation.center} map={map} />
            <UniversityPolygon paths={paths} />

            {!myLocation.isLoading && <Marker position={myLocation.center} />}
            <BoothMarkers
              booths={booths}
              openBooth={openBooth}
              zoomLevel={zoomLevel}
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
    </div>
  );
};

export default MapPage;
