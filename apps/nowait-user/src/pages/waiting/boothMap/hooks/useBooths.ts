import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../../api/reservation";
import { BOOTHPOSITION } from "../constants/boothPosition";
import { useMemo } from "react";

export const useBooths = () => {
  const { data: booths } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: false,
  });

  // 부스 + 마커 좌표
  const boothsWithPosition = useMemo(() => {
    if (!booths) return [];
    return booths?.map((booth) => ({
      ...booth,
      ...BOOTHPOSITION[booth.storeId],
    }));
  }, [booths]);
  return boothsWithPosition;
};
