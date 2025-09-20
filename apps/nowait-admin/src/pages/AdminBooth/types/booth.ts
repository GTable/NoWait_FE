export type BannerImage =
  | File
  | {
      id: number;
      imageUrl: string;
      imageType?: string; // 서버에서 없을 수도 있으니 optional
    }
  | null;

export type ProfileImage =
  | File
  | {
      id: number;
      imageUrl: string;
      imageType: "PROFILE";
    }
  | null;
