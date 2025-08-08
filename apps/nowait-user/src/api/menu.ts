import axios from "axios";

const API_URI = import.meta.env.VITE_SERVER_URI;

interface MenuServerResponse {
  success: boolean;
  response: {
    menuId: string;
    storeId: string;
    name: string;
    description: string;
    price: number;
    isSoldOut: boolean;
    deleted: boolean;
    images: {
      id: string;
      imageUrl: string;
    }[];
  };
}

//주점에 해당하는 모든 메뉴 조회
export const getStoreMenus = async (storeId: string | undefined | null) => {
  const res = await axios.get(
    `${API_URI}/v1/menus/all-menus/stores/${storeId}`
  );
  return res.data;
};

// 단일 메뉴 조회
export const getStoreMenu = async (
  storeId: string,
  menuId: string
): Promise<MenuServerResponse> => {
  const res = await axios.get(
    `${API_URI}/v1/menus/${storeId}/${menuId}`
  );
  return res.data;
};
