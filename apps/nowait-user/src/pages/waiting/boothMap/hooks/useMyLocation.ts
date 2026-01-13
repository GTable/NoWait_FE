import { useEffect, useState } from "react";

export const useMyLocation = () => {
  const [location, setLocation] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    isLoading: true,
    error: null as string | null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: "Geolocation not supported",
      }));
      return;
    }

    // 최초 위치
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          isLoading: false,
          error: null,
        });
      },
      () => {
        setLocation((prev) => ({
          ...prev,
          isLoading: false,
          error: "위치 정보를 가져올 수 없습니다",
        }));
      }
    );

    // 위치 변경 감지
    const watchId = navigator.geolocation.watchPosition((pos) => {
      setLocation((prev) => ({
        ...prev,
        center: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      }));
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};