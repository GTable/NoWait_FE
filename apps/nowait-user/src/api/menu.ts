import axios from "axios";
import type { MenuType } from "../types/order/menu";

const API_URI = import.meta.env.VITE_SERVER_URI;

interface AllMenuServerResponse {
  success: boolean;

  response: {
    storeName: string;
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
export const getStoreMenus = async (publicCode: string) => {
  try {
    const res = await axios.get<AllMenuServerResponse>(
      `${API_URI}/v1/stores/${publicCode}/menus`
    );
    if (res?.data.success) return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 단일 메뉴 조회
export const getStoreMenu = async (
  publicCode: string,
  menuId: number
): Promise<MenuServerResponse> => {
  const res = await axios.get(`${API_URI}/v1/stores/${publicCode}/menus/${menuId}`);
  return res.data;
};
