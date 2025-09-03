// 주문 상태 타입
export type OrderStatus = "WAITING_FOR_PAYMENT" | "COOKING" | "COOKED";

// 메뉴 상세 정보 타입
export interface MenuDetail {
  quantity: number;
  price: number;
}

export type MenuDetails = Record<string, MenuDetail>;

// 주문 데이터 타입
export interface Order {
  id: number;
  tableId: number;
  depositorName: string;
  totalPrice: number | null;
  status: OrderStatus;
  menuDetails?: MenuDetails;
  createdAt: string;
}
