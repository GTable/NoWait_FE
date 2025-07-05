import { useQuery } from "@tanstack/react-query";
import adminApi from "../utils/AdminApi";

// 주문 데이터 인터페이스
export interface Order {
  id: number;
  tableId: number;
  depositorName: string;
  totalPrice: number | null;
  status: "WAITING_FOR_PAYMENT" | "COOKING" | "COOKED";
  createdAt: string;
}

interface OrderResponse {
  success: boolean;
  response: Order[];
  error: null;
}

// 주문 목록을 가져오는 함수
const fetchOrders = async (): Promise<Order[]> => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await adminApi.get<OrderResponse>(`/admin/orders/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 응답 데이터가 유효한지 확인
    if (res.data && res.data.success && Array.isArray(res.data.response)) {
      return res.data.response;
    }

    // 응답이 유효하지 않으면 빈 배열 반환
    return [];
  } catch (error) {
    console.error("주문 목록 조회 실패:", error);
    // 에러가 발생해도 빈 배열을 반환하여 undefined 방지
    return [];
  }
};

// 주문 목록을 가져오는 hook
export const useGetOrderList = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchInterval: 30000, // 30초마다 자동 새로고침
  });
};
