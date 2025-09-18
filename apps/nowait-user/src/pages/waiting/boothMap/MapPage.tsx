import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapHeader from "./components/MapHeader";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import BankImage from "../../../assets/bankImage.png?url";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../api/reservation";
import type { StoreType } from "../../../types/wait/store";
import { boothPosition } from "./constants/boothPosition";
import { mapStyle } from "./constants/mapStyle";
import BoothDetail from "./components/BoothDetail";
import BoothList from "./components/BoothList";
import {
  GoogleMap,
  MarkerClustererF,
  MarkerF,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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

const center = { lat: 37.4507128, lng: 127.1288495 };

const containerStyle = {
  width: "100%",
  height: "calc(100dvh - 80px)",
};

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { data: booths } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });
  console.log(booths);
  // 부스 + 마커 좌표
  const boothsWithPosition: BoothWithPosition[] =
    booths?.map((booth) => ({
      ...booth,
      ...boothPosition[booth.storeId],
    })) || [];

  const openBoothButton = (id: number) => {
    if (selectedBooth === id) {
      setSelectedBooth(null);
    } else {
      setSelectedBooth(id);
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    language: "ko",
    region: "KR",
  });

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(
    map: google.maps.Map | null
  ) {
    setMap(null);
  },
  []);

  const isDragging = useRef(false);

  const handleDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleDragEnd = useCallback(() => {
    // 드래그 끝나면 다시 false
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  }, []);

  const handleClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (isDragging.current) {
      // 드래그 중에는 클릭 무시
      return;
    }
    setSelectedBooth(null);
  }, []);

  useEffect(() => {
    if (!map || !boothsWithPosition.length) return;

    const markers = boothsWithPosition.map(
      (booth) =>
        new google.maps.Marker({
          position: { lat: booth.lat, lng: booth.lng },
          icon: {
            url: BankImage, // 문자열 URL
            scaledSize: new google.maps.Size(38, 38),
          },
        })
    );

    const clusterer = new MarkerClusterer({
      map,
      markers,
      renderer: {
        render: ({ count, position }) => {
          const svg = `
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="22" fill="#ff5722" stroke="white" stroke-width="3"/>
            <text x="25" y="30" text-anchor="middle" font-size="14" fill="white">${count}</text>
          </svg>
        `;
          return new google.maps.Marker({
            position,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                svg
              )}`,
              scaledSize: new google.maps.Size(50, 50),
            },
            label: { text: String(count), color: "transparent" },
          });
        },
      },
    });

    return () => clusterer.clearMarkers();
  }, [map, boothsWithPosition]);

  return (
    <div>
      <MapHeader />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            styles: mapStyle,
            gestureHandling: "greedy",
            disableDefaultUI: true,
            minZoom: 17,
            maxZoom: 22,
          }}
          onClick={handleClick}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {/* 캠퍼스 경계 */}
          <Polygon
            paths={[outerCoords, gachonCoords]}
            options={{
              fillColor: "#333333",
              fillOpacity: 0.5,
              strokeColor: "#fff",
              strokeWeight: 1,
            }}
          />

          {/* 주점 마커 */}

          {/* <MarkerClustererF
            options={
              {
                renderer: {
                  render: ({
                    count,
                    position,
                  }: {
                    count: number;
                    position: any;
                  }) =>
                    new google.maps.Marker({
                      position,
                      icon: {
                        url: BankImage, // public 폴더 안의 SVG
                        scaledSize: new google.maps.Size(50, 50),
                      },
                      label: {
                        text: String(count), // 숫자 표시
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                      },
                    }),
                },
                gridSize: 40,
                maxZoom: 19,
              } as any
            }
          >
            {(clusterer) => (
              <> */}
          {boothsWithPosition.map((booth) => (
            <MarkerF
              key={booth.storeId}
              position={{ lat: booth.lat, lng: booth.lng }}
              // clusterer={clusterer}
              icon={{
                url: BankImage,
                scaledSize: new window.google.maps.Size(
                  selectedBooth === booth.storeId ? 48 : 38,
                  selectedBooth === booth.storeId ? 48 : 38
                ),
              }}
              onClick={() => openBoothButton(booth.storeId)}
            />
          ))}

          {/* )}
          </MarkerClustererF> */}
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
      {/* 내 위치 확인 */}
      <button
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position: GeolocationPosition) => {
                const infoWindow = new google.maps.InfoWindow();
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map?.panTo(pos);
              }
            );
          }
        }}
        className="absolute left-0 top-0"
      >
        내위치
      </button>
    </div>
  );
};

export default MapPage;
