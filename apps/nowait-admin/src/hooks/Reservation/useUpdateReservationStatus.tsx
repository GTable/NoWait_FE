import { useMutation } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface UpdateReservationParams {
  storeId: number;
  reservationNumber: number;
  status: "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW";
}

export const useUpdateReservationStatus = () => {
  return useMutation({
    mutationFn: async ({
      storeId,
      reservationNumber,
      status,
    }: UpdateReservationParams) => {
      const res = await AdminApi.patch(
        `/reservations/admin/update/${storeId}/${reservationNumber}`,
        { status }
      );
      return res.data;
    },
  });
};
