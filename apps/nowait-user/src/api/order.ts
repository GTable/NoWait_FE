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

//주문 생성
export const createOrder = async (
  storeId: number,
  tableId: number,
  payload: OrderType
): Promise<CreateOrderServerResponse> => {
  const res = await api.post(`/orders/create/${storeId}/${tableId}`, payload);
  return res.data;
};

//주문 내역 조회
export const getOrderDetails = async (
  storeId: string | undefined,
  tableId: string
): Promise<OrderDetailsServerResponse> => {
  const res = await api.get(`/orders/items/${storeId}/${tableId}`);
  return res.data;
};

//주점 QR, 계좌번호 조회
export const getStorePayments = async (
  storeId: string | undefined
): Promise<StorePaymentsResponse> => {
  try {
    const res = await api.get(`/v1/store-payments/${storeId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
