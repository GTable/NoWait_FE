import { useQuery } from "@tanstack/react-query";
import { getStoreMenus } from "../../api/menu";

export const storeMenusQuery = (storeId?: string) => ({
  queryKey: ["storeMenus", storeId],
  queryFn: () => getStoreMenus(storeId!),
});

export const useStoreMenus = (storeId?: string) => {
  return useQuery({
    ...storeMenusQuery(storeId!),
    enabled: !!storeId,
    select: (data) => data?.response,
  });
};

export const useStoreMenuList = (storeId?: string) => {
  return useQuery({
    ...storeMenusQuery(storeId!),
    enabled: !!storeId,
    select: (data) => data?.response?.menuReadDto,
  });
};
