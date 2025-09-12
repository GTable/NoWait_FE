import axios from "axios";

const API_URL = import.meta.env.VITE_ADMIN_API_URL;
// 자유게시판 전체 데이터
const AdminApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AdminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 디버깅용 코드
AdminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn("403 Forbidden - 인증 에러 발생");
    }
    return Promise.reject(error);
  }
);

// 주문 취소 API
export const cancelOrder = async (orderId: number, reason: string) => {
  try {
    // 1. 주문 취소 사유 전송 (DELETE)
    await AdminApi.delete(`/admin/orders/${orderId}`, {
      data: { reason },
    });

    // 2. 주문 상태를 CANCEL로 변경 (PATCH)
    await AdminApi.patch(`/admin/orders/status/${orderId}`, {
      orderStatus: "CANCELLED",
    });

    return { success: true };
  } catch (error) {
    console.error("주문 취소 실패:", error);
    throw error;
  }
};

export default AdminApi;
