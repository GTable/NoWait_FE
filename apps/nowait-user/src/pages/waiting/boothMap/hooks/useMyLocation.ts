import { useEffect, useState } from "react";

export const useMyLocation = () => {
  const [location, setLocation] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    isLoading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        isLoading: false,
      });
    });
  }, []);

  return location;
};