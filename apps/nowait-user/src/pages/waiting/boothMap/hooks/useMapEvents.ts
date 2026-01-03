import { useEffect, useRef } from "react";

export const useMapEvents = (
  map: any,
  onMapClick: () => void
) => {
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!map) return;

    const dragStart = window.naver.maps.Event.addListener(
      map,
      "dragstart",
      () => (isDraggingRef.current = true)
    );

    const dragEnd = window.naver.maps.Event.addListener(
      map,
      "dragend",
      () => (isDraggingRef.current = false)
    );

    const click = window.naver.maps.Event.addListener(map, "click", () => {
      if (!isDraggingRef.current) onMapClick();
    });

    return () => {
      window.naver.maps.Event.removeListener(dragStart);
      window.naver.maps.Event.removeListener(dragEnd);
      window.naver.maps.Event.removeListener(click);
    };
  }, [map, onMapClick]);
};
