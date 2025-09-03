export interface ProfileImage {
  id: number;
  storeId: number;
  imageUrl: string;
  imageType: string;
}

export interface SearchStore {
  storeId: number;
  publicCode: string;
  departmentId: number;
  departmentName: string;
  name: string;
  openTime: string;
  profileImage: ProfileImage | null;
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
  waitingCount: number;
}

export interface SearchResponse {
  success: boolean;
  response: SearchStore[];
}
