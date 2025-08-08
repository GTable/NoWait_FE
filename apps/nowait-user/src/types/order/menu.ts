//음식 메뉴 타입
export interface MenuType {
  menuId: number;
  images: { id: string; imageUrl: string }[];
  name: string;
  description: string;
  price: number;
  isSoldOut: boolean;
  deleted: boolean;
}
