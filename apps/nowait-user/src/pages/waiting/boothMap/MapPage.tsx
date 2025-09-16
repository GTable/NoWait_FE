import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Polygon,
  OverlayView,
  MarkerF,
} from "@react-google-maps/api";
import boothMarker from "../../../assets/icon/BoothMarker.svg";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../api/reservation";
import type { StoreType } from "../../../types/wait/store";
import { boothPosition } from "./constants/boothPosition";
import { mapStyle } from "./constants/mapStyle";
import BoothDetail from "./components/BoothDetail";
import BoothList from "./components/BoothList";

interface BoothWithPosition extends StoreType {
  lat: number;
  lng: number;
}

const outerCoords = [
  { lat: 38.526241, lng: 124.733136 },
  { lat: 32.46642053948427, lng: 125.2172585268403 },
  { lat: 35.05971, lng: 130.461921 },
  { lat: 39.13384240860686, lng: 129.17092743948996 },
];

// 2️⃣ 가천대 캠퍼스 좌표 (hole)
const gachonCoords = [
  { lat: 37.448004, lng: 127.126886 },
  { lat: 37.452842, lng: 127.126768 },
  { lat: 37.451624, lng: 127.132154 },
  { lat: 37.449333, lng: 127.13268 },
];

const containerStyle = {
  width: "100%",
  height: "100dvh",
};

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);

  const [map, setMap] = useState<null>(null);

  const { data: booths } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });
  console.log(booths)
  // 부스 + 마커 좌표
  const boothsWithPosition: any[] =
    booths?.map((booth) => ({
      ...booth,
      ...boothPosition[booth.storeId],
    })) || [];

  const onLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
    // 한국 영역 제한
    // mapInstance.setOptions({
    //   restriction: {
    //     latLngBounds: koreaBounds,
    //     strictBounds: true,
    //   },
    //   // minZoom: 15,
    //   // maxZoom: 19,
    // });
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const openBoothButton = (id: number) => {
    if (selectedBooth === id) {
      setSelectedBooth(null);
    } else {
      setSelectedBooth(id);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 37.4507128, lng: 127.1288495 }}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyle,
            gestureHandling: "greedy",
            disableDefaultUI: true,
          }}
        >
          {/* 캠퍼스 경계 */}
          <Polygon
            paths={[outerCoords, gachonCoords]}
            options={{
              fillColor: "#333333",
              fillOpacity: 0.5, // 바깥만 어둡게
              strokeColor: "#555555",
              strokeWeight: 1,
            }}
          />

          {/* 주점 마커 */}
          {boothsWithPosition.map((booth, i) => (
            // <OverlayView
            //   key={i}
            //   position={{ lat: booth.lat, lng: booth.lng }}
            //   mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            // >
            //   <div
            //     onClick={(e) => {
            //       e.stopPropagation();
            //       openBoothButton(booth.storeId);
            //     }}
            //     className={`cursor-pointer transition-transform duration-200 ${
            //       selectedBooth === booth.storeId ? "scale-125" : "scale-100"
            //     }`}
            //   >
            //     <img src={boothMarker} alt="booth marker" />
            //   </div>
            // </OverlayView>
            <MarkerF
              key={booth.storeId}
              position={{ lat: Number(booth.lat), lng: Number(booth.lng) }}
              icon={{ url: boothMarker }}
              onClick={(e) => {
                // e.stopPropagation();
                openBoothButton(booth.storeId);
              }}
            />
          ))}
        </GoogleMap>
      ) : (
        <></>
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
