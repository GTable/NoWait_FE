import { useQuery } from "@tanstack/react-query";
import { getAllStores } from "../../../../api/reservation";
import type { StoreType } from "../../../../types/wait/store";
import { BOOTHPOSITION } from "../constants/boothPosition";

interface BoothWithPosition extends StoreType {
  lat: number;
  lng: number;
}

export const useBooths = () => {
  const { data: booths } = useQuery({
    queryKey: ["storesMarkers"],
    queryFn: getAllStores,
    select: (data) => data?.response?.storePageReadResponses,
  });

  // 부스 + 마커 좌표
  const boothsWithPosition: BoothWithPosition[] =
    booths?.map((booth) => ({
      ...booth,
      ...BOOTHPOSITION[booth.storeId],
    })) || [];
  return boothsWithPosition;
};
