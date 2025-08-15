import axios from "axios";
import type { MenuType } from "../types/order/menu";

const API_URI = import.meta.env.VITE_SERVER_URI;

interface AllMenuServerResponse {
  success: boolean;
  response: {
    menuReadDto: MenuType[];
  };
  status: number;
}

interface MenuServerResponse {
  success: boolean;
  response: MenuType;
  status: number;
}

//주점에 해당하는 모든 메뉴 조회
export const getStoreMenus = async (storeId: number) => {
  try {
    const res = await axios.get<AllMenuServerResponse>(
      `${API_URI}/v1/menus/all-menus/stores/${storeId}`
    );
    if (res?.data.success) return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 단일 메뉴 조회
export const getStoreMenu = async (
  storeId: number,
  menuId: number
): Promise<MenuServerResponse> => {
  const res = await axios.get(`${API_URI}/v1/menus/${storeId}/${menuId}`);
  return res.data;
};
