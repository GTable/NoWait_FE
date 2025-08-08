import { useQuery } from "@tanstack/react-query";
import AdminApi from "../../../utils/AdminApi";

export interface StoreResponse {
  storeId: number;
  departmentId: number;
  departmentName: string;
  name: string;
  location: string;
  description: string;
  noticeTitle: string | null;
  noticeContent: string | null;
  openTime: string;
  profileImage: {
    id: number;
    imageUrl: string;
    imageType: "PROFILE";
  } | null;
  bannerImages: {
    id: number;
    imageUrl: string;
    imageType: "BANNER";
  }[];
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
}

export const useGetStore = (storeId: number) => {
  return useQuery<StoreResponse>({
    queryKey: ["store", storeId],
    queryFn: async () => {
      const res = await AdminApi.get(`/admin/stores/${storeId}`);
      return res.data.response;
    },
    enabled: !!storeId,
  });
};
