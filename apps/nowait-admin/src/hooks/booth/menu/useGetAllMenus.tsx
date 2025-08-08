import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

interface MenuImage {
  id: number;
  imageUrl: string;
}

interface RawMenuItem {
  menuId: number;
  storeId: number;
  name: string;
  adminDisplayName: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  deleted: boolean;
  images: MenuImage[];
}

export const useGetAllMenus = (storeId: number) => {
  return useQuery<RawMenuItem[]>({
    queryKey: ["all-menus", storeId],
    queryFn: async () => {
      const res = await AdminApi.get(
        `/admin/menus/all-menus/stores/${storeId}`
      );
      return res.data.response.menuReadDto; // ✅ 여기만 추출
    },
    enabled: !!storeId,
    staleTime: 1000 * 60,
  });
};
