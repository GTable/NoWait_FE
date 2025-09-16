import type { BannerImages, ProfileImage } from "./store";

// 북마크 생성 시 응답 데이터 타입
export interface BookmarkResponse {
  success: boolean;
  response: {
    bannerImages: BannerImages[];
    bookmarkId: number;
    departmentId: number;
    departmentName: string;
    description: string;
    isActive: boolean;
    isBookmark: boolean;
    location: string;
    name: string;
    noticeTitle: string | null;
    noticeContent: string | null;
    openTime: string;
    profileImage: ProfileImage;
    storeId: number;
    publicCode: string;
    waitingCount: number;
  }[];
}
