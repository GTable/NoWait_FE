import BoothMarker from "../../../assets/icon/BoothMarker.svg?url";
import MyLocationMarker from "../../../assets/myLocationMarker.png?url";
import BoothList from "./components/BoothList";
import { useEffect, useMemo, useState } from "react";
import BoothDetail from "./components/BoothDetail";
import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../api/reservation";
import MapHeader from "./components/MapHeader";
import { boothPosition } from "./constants/boothPosition";
import type { StoreType } from "../../../types/wait/store";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  Polygon,
  useMap,
} from "react-kakao-maps-sdk";
import osmtogeojson from "osmtogeojson";
import axios from "axios";
import MyLocationButton from "./components/MyLocationButton";

interface BoothWithPosition extends StoreType {
  lat: number;
  lng: number;
}

const MapPage = () => {
  const [selectedBooth, setSelectedBooth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { data: booths } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });

  // 부스 + 마커 좌표
  const boothsWithPosition: BoothWithPosition[] =
    booths?.map((booth) => ({
      ...booth,
      ...boothPosition[booth.storeId],
    })) || [];

  console.log(boothsWithPosition);

  const [paths, setPaths] = useState<{ lat: number; lng: number }[][]>([]);
  console.log(paths);
  useEffect(() => {
    const fetchPolygons = async () => {
      try {
        const { data } = await axios.get("/geojson/university.geojson");
        // 좌표 변환
        const coords = data.features.map((feature: any) => {
          return feature.geometry.coordinates[0].map(
            ([lng, lat]: [number, number]) => ({
              lat,
              lng,
            })
          );
        });

        if (coords.length > 0) {
          setPaths(coords); // [외곽, 구멍]
        }
      } catch (err) {
        console.error("GeoJSON에 오류가 발생 했습니다.:", err);
      }
    };
    fetchPolygons();
  }, []);

  const openBoothButton = (id: number) => {
    if (selectedBooth === id) {
      setSelectedBooth(null);
    } else {
      setSelectedBooth(id);
    }
  };
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    // errMsg: null,
    isLoading: true,
  });

   useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos:any) => {
          setState({
            center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
            isLoading: false,
          });
        },
      );
    }
  }, []);

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    bounds.extend(new kakao.maps.LatLng(state.center.lat, state.center.lng));

    return bounds;
  }, [state]);
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
        minLevel={4}
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
        {paths.length > 0 && (
          <Polygon
            path={paths} // [outer, hole]
            strokeWeight={2}
            strokeColor="#ffffff"
            strokeOpacity={0.8}
            fillColor="#686868"
            fillOpacity={0.6}
          />
        )}
        <MyLocationButton center={state.center} />
        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: MyLocationMarker,
              size: {
                width: 44,
                height: 44,
              },
            }}
          ></MapMarker>
        )}
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={3} // 클러스터 할 최소 지도 레벨
        >
          {boothsWithPosition?.map((booth) => (
            <MapMarker
              key={booth.storeId}
              position={{ lat: booth.lat, lng: booth.lng }}
              image={{
                src: BoothMarker,
                size: {
                  width: 32,
                  height: 42,
                },
              }}
              onClick={() => openBoothButton(booth.storeId)}
            ></MapMarker>
          ))}
        </MarkerClusterer>
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
