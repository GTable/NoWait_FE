//주문 생성 payload 타입
export interface OrderType {
  depositorName: string;
  items: { menuId: string; quantity: number }[];
}

//주문 생성 요청 성공 시 오는 응답 타입
export interface CreateOrderServerResponse {
  success: boolean;
  response: {
    orderId: number;
    storeId: number;
    storeName: string;
    sessionId: string;
    depositorName: string;
    orderItems: { menuId: number; quantity: number }[];
    status: string;
    totalPrice: number;
  };
}

//주문 내역 타입
export interface OrderDetailsType {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
}

//주문 status 유니온 타입
export type OrderStatus = "WAITING_FOR_PAYMENT" | "COOKING" | "COOKED";

//주문 내역 조회 시 성공 시 응답 타입
export interface OrderDetailsServerResponse {
  success: boolean;
  response: {
    orderId: number;
    status: OrderStatus;
    createdAt: string;
    items: OrderDetailsType[];
    totalPrice: number;
  }[];
}

export interface StorePaymentsResponse {
  success: boolean;
  response: {
    paymentMethodId: number;
    storeId: number;
    tossUrl?: string;
    kakaoPayUrl?: string;
    naverPayUrl?: string;
    accountNumber?: string;
    createdAt: string;
  };
}
