import { useQuery } from "@tanstack/react-query";
import {
  createReservation,
  getMyReservations,
  getStore,
} from "../../../../api/reservation";

const MAX_RESERVATIONS = 3;

export const useWaitingSummary = (storeId: string | undefined) => {
  const storeQuery = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId!),
    select: (data) => data?.response,
    enabled: !!storeId,
  });

  const myReservationsQuery = useQuery({
    queryKey: ["myReservations"],
    queryFn: getMyReservations,
    select: (data) => data?.response,
  });

  const canCreateReservation =
    (myReservationsQuery.data?.length ?? 0) < MAX_RESERVATIONS;

  const createWaiting = (partySize: number) => {
    return createReservation(Number(storeQuery.data?.storeId!), { partySize });
  };

  return {
    store: storeQuery.data,
    isStoreLoading: storeQuery.isLoading,
    myReservations: myReservationsQuery.data,
    canCreateReservation,
    createWaiting,
    MAX_RESERVATIONS,
  };
};
