import axios from "axios";
import type {
  CreateOrderServerResponse,
  OrderDetailsServerResponse,
  OrderType,
  StorePaymentsResponse,
} from "../types/order/order";

export const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

const API_URI = import.meta.env.VITE_SERVER_URI;

//주문 생성
export const createOrder = async (
  storeId: number,
  tableId: number,
  payload: OrderType
): Promise<CreateOrderServerResponse> => {
  const res = await api.post(`${API_URI}/orders/create/${storeId}/${tableId}`, payload);
  return res.data;
};

//주문 내역 조회
export const getOrderDetails = async (
  storeId: number | undefined,
  tableId: number
): Promise<OrderDetailsServerResponse> => {
  const res = await api.get(`/orders/items/${storeId}/${tableId}`);
  return res.data;
};

//주점 QR, 계좌번호 조회
export const getStorePayments = async (storeId: number) => {
  try {
    const res = await axios.get<StorePaymentsResponse>(
      `${API_URI}/v1/store-payments/${storeId}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
