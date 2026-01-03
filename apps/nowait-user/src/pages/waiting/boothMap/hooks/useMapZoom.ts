import { useEffect, useState } from "react";

export const useMapZoom = (map: any) => {
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    if (!map) return;

    const listener = window.naver.maps.Event.addListener(
      map,
      "zoom_changed",
      () => setZoom(map.getZoom())
    );

    return () => window.naver.maps.Event.removeListener(listener);
  }, [map]);

  return zoom;
};
