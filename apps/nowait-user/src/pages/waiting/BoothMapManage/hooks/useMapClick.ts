import { useEffect } from "react";

interface PropsType  {
  map: any | null;
  enabled: boolean;
  onClick: (lat: number, lng: number) => void;
};

export const useMapClick = ({ map, enabled, onClick }: PropsType) => {
  useEffect(() => {
    if (!map) return;

    const listener = window.naver.maps.Event.addListener(
      map,
      "click",
      (e: any) => {
        if (!enabled) return;
        onClick(e.coord.lat(), e.coord.lng());
      }
    );

    return () => {
      window.naver.maps.Event.removeListener(listener);
    };
  }, [map, enabled, onClick]);
};