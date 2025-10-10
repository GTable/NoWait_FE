import MyLocationMarker from "../../../assets/myLocationMarker.png?url";
import BoothList from "./components/BoothList";
import { useEffect, useState } from "react";
import BoothDetail from "./components/BoothDetail";

import MapHeader from "./components/MapHeader";

import {
  Map,
  MapMarker,

} from "react-kakao-maps-sdk";
import osmtogeojson from "osmtogeojson";
import MyLocationButton from "./components/MyLocationButton";
import UniversityPolygon from "./components/UniversityPolygon";
import { useGeoPolygon } from "./hooks/useGeoPolygon";
import BoothMarkers from "./components/BoothMarkers";
import { useBooths } from "./hooks/useBooths";
import { useMyLocation } from "./hooks/useMyLocation";



const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  //대학교 폴리곤(영역) 설정
  const paths = useGeoPolygon();
  //좌표를 포함한 부스들 가져오기
  const booths = useBooths()
  //내 위치 좌표 가져오기
  const myLocation = useMyLocation()

  const openBooth = (id: number) => {
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
      <Map
        center={{ lat: 37.45258899044431, lng: 127.13144579047594 }}
        // center={state.center}
        style={{ width: "100%", height: "100vh" }}
        level={4}
        // maxLevel={5}
        // minLevel={4}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(map) => {
          setIsDragging(false);
          const latlng = map.getCenter();
          console.log(
            `변경된 지도 중심좌표는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`
          );
        }}
        onClick={() => {
          if (!isDragging) {
            setSelectedBooth(null);
          }
        }}
      >
        <UniversityPolygon paths={paths} />
        <MyLocationButton center={myLocation.center} />
        {!myLocation.isLoading && (
          <MapMarker
            position={myLocation.center}
            image={{
              src: MyLocationMarker,
              size: {
                width: 44,
                height: 44,
              },
            }}
          ></MapMarker>
        )}
        <BoothMarkers booths={booths} openBooth={openBooth}/>
      </Map>

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
