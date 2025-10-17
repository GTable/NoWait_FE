import MyLocationMarker from "../../../assets/myLocationMarker.png?url";
import BoothList from "./components/BoothList";
import { useCallback, useRef, useState,useEffect } from "react";
import BoothDetail from "./components/BoothDetail";
import MapHeader from "./components/MapHeader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import UniversityPolygon from "./components/UniversityPolygon";
import { useGeoPolygon } from "./hooks/useGeoPolygon";
import BoothMarkers from "./components/BoothMarkers";
import { useBooths } from "./hooks/useBooths";
import { useMyLocation } from "./hooks/useMyLocation";
import MapControlButtons from "./components/mapControls/MapControls";
import { isCompassModeStore } from "../../../stores/mapStore";
import mapboxgl from "mapbox-gl"

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const { setIsCompassMode } = isCompassModeStore();
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<any>(null)
   useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtN3NlcyIsImEiOiJjbWd1cGZtOGcwaTYwMmxwdHo4b211NXJyIn0.LorgQ07844HwnGHNT9pZ5A'
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.0242, 40.6941],
      zoom: 10.12
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      // 3. 지도 중심 이동
      mapRef.current.setCenter([lng, lat]);

      // 4. 마커 추가
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new mapboxgl.Popup().setText("여기가 내 위치"))
        .addTo(mapRef.current);
    },
    (error) => {
      console.error("위치 정보를 가져올 수 없습니다.", error);
    }
  );
} else {
  console.error("브라우저가 Geolocation API를 지원하지 않습니다.");
}
  const isDraggingRef = useRef(false);
  //대학교 폴리곤(영역) 설정
  const paths = useGeoPolygon();
  //좌표를 포함한 부스들 가져오기
  const booths = useBooths();
  //내 위치 좌표 가져오기
  const myLocation = useMyLocation();


  const openBooth = useCallback((id: number) => {
    if (selectedBooth === id) {
      setSelectedBooth(null);
    } else {
      setSelectedBooth(id);
    }
  }, [selectedBooth]);
  
  return (
    <div className="relative overflow-hidden">
      {/* 헤더 */}
      <MapHeader />
      <div className="w-full h-[100vh]" id='map-container' ref={mapContainerRef}/>
      <Map
        center={myLocation.center}
        style={{ width: "100%", height: "100vh" }}
        level={4}
        minLevel={4}
        onDragStart={() => {
          isDraggingRef.current = true;
          setIsCompassMode(false);
        }}
        onDragEnd={(map) => {
          isDraggingRef.current = false;
          const latlng = map.getCenter();
          console.log(`지도 중심: ${latlng.getLat()}, ${latlng.getLng()}`);
        }}
        onClick={() => {
          if (!isDraggingRef.current) {
            setSelectedBooth(null);
          }
        }}
      >
        <UniversityPolygon paths={paths} />
        <MapControlButtons center={myLocation.center} />
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
        <BoothMarkers booths={booths} openBooth={openBooth} />
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
