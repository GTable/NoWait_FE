import axios from "axios";
import { useEffect, useState } from "react";

export const useGeoPolygon = () => {
  const [paths, setPaths] = useState<{ lat: number; lng: number }[][]>([]);
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
  return paths;
};
