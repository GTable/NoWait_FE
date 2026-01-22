import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

interface LatLng {
  lat: number;
  lng: number;
}

export const useIsInsidePolygon = (paths: LatLng[][], location?: LatLng) => {
  const [isInside, setIsInside] = useState(true);

  useEffect(() => {
    if (!paths.length || !location) return;

    const check = () => {
      if (
        !window.naver?.maps?.geometry?.poly
      ) {
        // 🔥 geometry 아직이면 다시 시도
        setTimeout(check, 200);
        return;
      }

      const point = new window.naver.maps.LatLng(
        location.lat,
        location.lng
      );

      const insideAnyPolygon = paths.some((polygonPath) => {
        const naverPath = polygonPath.map(
          (p) => new window.naver.maps.LatLng(p.lat, p.lng)
        );

        return window.naver.maps.geometry.poly.containsPoint(
          naverPath,
          point
        );
      });

      setIsInside(insideAnyPolygon);
    };

    check();
  }, [paths, location]);

  return isInside;
};