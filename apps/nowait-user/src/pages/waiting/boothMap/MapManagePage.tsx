import { useState } from "react";
import { Button } from "@repo/ui";
import MapHeader from "./components/MapHeader";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import UniversityPolygon from "./components/UniversityPolygon";
import { useGeoPolygon } from "./hooks/useGeoPolygon";
import { useMyLocation } from "./hooks/useMyLocation";
import MapControlButtons from "./components/mapControls/MapControls";
import MyLocationMarker from "../../../assets/myLocationMarker.png?url";
const MapManagePage = () => {
  const [markers, setMarkers] = useState<
    { storeId: number; lat: number; lng: number }[]
  >([]);
  const [status, setStatus] = useState(false);
  const paths = useGeoPolygon();
  const myLocation = useMyLocation();
  console.log(markers);

  return (
    <div className="relative top-0 left-0 min-h-dvh w-full">
      <MapHeader />
      <Map
        center={myLocation.center}
        style={{ width: "100%", height: "100vh" }}
        level={4}
        minLevel={4}
        onClick={(_, mouseEvent) => {
          // 맵 이동과 마커 생성 기능 충돌로 상태에 따라 기능 분리
          if (!status) return;
          // 마커에 해당하는 아이디 생성 prompt
          const inputId = prompt("스토어 아이디를 입력하세요");
          // prompt 공백 및 취소 버튼 클릭 시 무효화
          if (inputId === null || inputId.trim() === "") return;
          const latlng = mouseEvent.latLng;

          const newMarker = {
            storeId: Number(inputId),
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          };
          setMarkers((prev) => [...prev, newMarker]);
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
        {markers.map((marker) => {
          return (
            <MapMarker
              key={marker.storeId}
              position={{ lat: marker.lat, lng: marker.lng }}
            ></MapMarker>
          );
        })}
      </Map>
      <div className="flex gap-1 fixed left-1/2 bottom-[10px] -translate-x-1/2 w-full z-50 px-[10px]">
        <Button className="text-15-medium" onClick={() => setStatus(true)}>
          시작
        </Button>
        <Button className="text-15-medium" onClick={() => setStatus(false)}>
          중지
        </Button>
        <Button
          className="text-15-medium"
          onClick={() => {
            setMarkers((prev) => prev.slice(0, -1));
          }}
        >
          뒤로가기
        </Button>
        <Button
          className="text-15-medium"
          onClick={() => {
            setMarkers([]);
          }}
        >
          초기화
        </Button>
        <Button
          className="text-15-medium"
          onClick={() => {
            // 좌표를 문자열로 변환 후 복사
            const formattedMarkers = markers
              .map((marker) => {
                return `${marker.storeId} : {lat:${marker.lat},lng:${marker.lng}}`;
              })
              .join(",\n");
            navigator.clipboard.writeText(`${formattedMarkers}\n`);
            alert("복사가 완료 되었습니다.");
          }}
        >
          복사
        </Button>
      </div>
    </div>
  );
};

export default MapManagePage;
