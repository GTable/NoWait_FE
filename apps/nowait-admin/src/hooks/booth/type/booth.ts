// types/booth.ts
export type ServerBannerImage = {
  id: number;
  imageUrl: string;
  imageType: "BANNER";
};
export type ServerProfileImage = {
  id: number;
  imageUrl: string;
  imageType: "PROFILE";
};

export type BannerImage = File | ServerBannerImage;
export type BannerImageSlot = BannerImage | null;
export type ProfileImage = File | ServerProfileImage | null;

// 타입 가드(있으면 편해요)
export const isServerBanner = (v: BannerImage | null): v is ServerBannerImage =>
  !!v && !(v instanceof File);
