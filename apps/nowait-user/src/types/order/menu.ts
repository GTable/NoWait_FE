//음식 메뉴 타입
export interface MenuType {
  menuId: number;
  storeId: number;
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  deleted: boolean;
  sortOrder: number;
  images: {
    id: number;
    imageUrl: string;
  }[];
}
