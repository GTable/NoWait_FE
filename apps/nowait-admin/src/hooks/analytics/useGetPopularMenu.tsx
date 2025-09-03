import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../utils/AdminApi";

interface PopularMenuItem {
  menuId: number;
  menuName: string;
  totalSalesCount: number;
  boothName: string;
  soldCount: number;
  imageUrl: string;
}

interface PopularMenuResponse {
  success: boolean;
  response: PopularMenuItem[];
}

const fetchPopularMenu = async (): Promise<PopularMenuItem[]> => {
  const res = await AdminApi.get<PopularMenuResponse>(
    "/admin/statistics/popular-menu"
  );
  return res.data.response;
};

export const useGetPopularMenu = () => {
  return useQuery({
    queryKey: ["popular-menu"],
    queryFn: fetchPopularMenu,
    staleTime: 1000 * 60 * 5,
  });
};
