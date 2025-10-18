import {
  Container as MapDiv,
  NaverMap,
  Overlay,
  useNavermaps,
  useMap,
} from "react-naver-maps";
import { useState } from "react";

// ✅ marker-tools.js의 MarkerClustering 사용
const makeMarkerClustering = (naver: any) => {
  return window.MarkerClustering || window.naver.maps.MarkerClustering;
};

export const MarkerCluster = () => {
  const navermaps = useNavermaps();
  const map = useMap();

  // ✅ 예시 데이터 (랜덤 마커 100개)
  const markersData = Array.from({ length: 100 }, () => ({
    lat: 37.5665 + (Math.random() - 0.5) * 0.05,
    lng: 126.978 + (Math.random() - 0.5) * 0.05,
  }));

  // ✅ 클러스터 생성
  const [cluster] = useState(() => {
    const MarkerClustering = makeMarkerClustering(window.naver);
    const markers: naver.maps.Marker[] = [];

    markersData.forEach(({ lat, lng }) => {
      const position = new navermaps.LatLng(lat, lng);
      const marker = new navermaps.Marker({ position });
      markers.push(marker);
    });

    const icon = {
      content:
        '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:12px;color:white;text-align:center;font-weight:bold;background-color:#1ec800;border-radius:50%;"></div>',
      size: new navermaps.Size(40, 40),
      anchor: new navermaps.Point(20, 20),
    };

    var cluster = new MarkerClustering({
      map,
      markers,
      minClusterSize: 2,
      maxZoom: 10,
      gridSize: 100,
      icons: [icon],
      indexGenerator: [0],
      stylingFunction: (clusterMarker: any, count: number) => {
        clusterMarker.getElement().querySelector("div").innerText = count;
      },
    });

    return cluster;
  });

  return <Overlay element={cluster} />;
};
