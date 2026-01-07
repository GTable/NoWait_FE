import UserApi from "../utils/UserApi";
import type {
  CreateOrderServerResponse,
  OrderDetailsServerResponse,
  OrderType,
  StorePaymentsResponse,
} from "../types/order/order";

//주문 생성
export const createOrder = async (
  publicCode: string,
  tableId: number,
  payload: OrderType
): Promise<CreateOrderServerResponse> => {
  const res = await UserApi.post(
    `/stores/${publicCode}/tables/${tableId}/orders`,
    payload
  );
  return res.data;
};

//주문 내역 조회
export const getOrderDetails = async (
  publicCode: string,
  tableId: number
): Promise<OrderDetailsServerResponse> => {
  const res = await UserApi.get(`/stores/${publicCode}/tables/${tableId}/orders`);
  return res.data;
};

//주점 QR, 계좌번호 조회
export const getStorePayments = async (publicCode: string) => {
  try {
    const res = await UserApi.get<StorePaymentsResponse>(
      `/stores/${publicCode}/payments`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
