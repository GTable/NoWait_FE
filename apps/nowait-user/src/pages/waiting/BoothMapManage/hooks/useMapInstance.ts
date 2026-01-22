import { useCallback, useState } from "react";

export const useMapInstance = () => {
  const [map, setMap] = useState<any | null>(null);

  const mapRef = useCallback((instance: any | null) => {
    if (instance) setMap(instance);
  }, []);

  return { map, mapRef };
};