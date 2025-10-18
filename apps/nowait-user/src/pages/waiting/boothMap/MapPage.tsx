import MyLocationMarker from "../../../assets/myLocationMarker.png?url";
import BoothList from "./components/BoothList";
import { useCallback, useRef, useState } from "react";
import BoothDetail from "./components/BoothDetail";
import MapHeader from "./components/MapHeader";
import UniversityPolygon from "./components/UniversityPolygon";
import { useGeoPolygon } from "./hooks/useGeoPolygon";
import BoothMarkers from "./components/BoothMarkers";
import { useBooths } from "./hooks/useBooths";
import { useMyLocation } from "./hooks/useMyLocation";
import MapControlButtons from "./components/mapControls/MapControls";
import { isCompassModeStore } from "../../../stores/mapStore";
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Marker,
} from "react-naver-maps";

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const { setIsCompassMode } = isCompassModeStore();
  const navermaps = useNavermaps();
  const isNavermapsReady = !!navermaps;
  const isDraggingRef = useRef(false);
  //대학교 폴리곤(영역) 설정
  const paths = useGeoPolygon();
  //좌표를 포함한 부스들 가져오기
  const booths = useBooths();
  //내 위치 좌표 가져오기
  const myLocation = useMyLocation();

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
      <MapDiv
        style={{
          width: "100%",
          height: "600px",
        }}
      >
        {isNavermapsReady && (
          <NaverMap
            defaultMapTypeId="d5508790-7f17-4ffa-a67c-69900dc0b82d"
            defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
            defaultZoom={10}
          >
            {/* {!myLocation.isLoading && (
            <Marker position={myLocation.center}></Marker>
          )}
          <BoothMarkers booths={booths} openBooth={openBooth} /> */}
          </NaverMap>
        )}
      </MapDiv>

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
