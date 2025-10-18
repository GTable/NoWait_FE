import MyLocationMarker from "../../../assets/myLocationMarker.png?url";
import BoothList from "./components/BoothList";
import { useCallback, useEffect, useRef, useState } from "react";
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
  Marker,
  useNavermaps,
} from "react-naver-maps";
import { MarkerCluster } from "./components/MarkerCluster";
declare global {
  interface Window {
    naver: any;
  }
}
const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [map, setMap] = useState(null);

  const { setIsCompassMode } = isCompassModeStore();
  const isDraggingRef = useRef(false);
  //대학교 폴리곤(영역) 설정
  const paths = useGeoPolygon();
  //좌표를 포함한 부스들 가져오기
  const booths = useBooths();
  //내 위치 좌표 가져오기
  const myLocation = useMyLocation();
  const navermaps = useNavermaps();

  // new window.naver.maps.Map("map", {
  //   gl: true,
  //   center: new window.naver.maps.LatLng(38.3595704, 127.105399),
  //   zoom: 16,
  //   customStyleId: "d5508790-7f17-4ffa-a67c-69900dc0b82d",
  // });

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
        <NaverMap
          defaultCenter={myLocation.center}
          defaultZoom={16}
          ref={setMap}

          // defaultMapTypeId="d5508790-7f17-4ffa-a67c-69900dc0b82d"
        >
          <MapControlButtons
            center={myLocation.center}
            map={map}
          />
          <UniversityPolygon paths={paths} />

          {!myLocation.isLoading && <Marker position={myLocation.center} />}
          <MarkerCluster />
          <BoothMarkers booths={booths} openBooth={openBooth} />
        </NaverMap>
      </MapDiv>
      {/* <div id="map" style={{ width: "100%", height: "100vh" }}>
        <BoothMarkers booths={booths} openBooth={openBooth} />
      </div> */}
      {/* <MapDiv
        style={{
          width: "100%",
          height: "600px",
        }}
      >

          <NaverMap
            defaultMapTypeId="d5508790-7f17-4ffa-a67c-69900dc0b82d"
            defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
            defaultZoom={10}
          >
            {!myLocation.isLoading && (
            <Marker position={myLocation.center}></Marker>
          )}
          <BoothMarkers booths={booths} openBooth={openBooth} />
          </NaverMap>
        
      </MapDiv> */}

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
