import type { BookmarkResponse } from "../types/wait/bookmark";
import type { StoreResponse, StoreType } from "../types/wait/store";
import UserApi from "../utils/UserApi";

// 실제 서버 응답 구조
interface ServerResponse {
  success: boolean;
  response: {
    hasNext: boolean;
    storePageReadResponses: StoreType[];
  };
  error: null;
}

// 모든 주점 정보 가져오기
export const getAllStores = async () => {
  const response = await UserApi.get<ServerResponse>("/v1/stores", {
    params: {
      page: 0,
      size: 50,
    },
  });
  return response.data;
};

// 모든 주점 5개씩 정보 가져오기(무한스크롤)
export const getInfiniteAllStores = async (
  pageParam: number
): Promise<{ storePageReadResponses: StoreType[]; hasNext: boolean }> => {
  const response = await UserApi.get<ServerResponse>("/v1/stores", {
    params: {
      page: pageParam,
      size: 5,
    },
  });
  return response.data.response;
};

// 주점 상세 정보 가져오기
export const getStore = async (publicCode: string) => {
  try {
    const res = await UserApi.get<StoreResponse>(`/v1/stores/${publicCode}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 주점 예약하기
export const createReservation = async (
  storeId: number,
  payload: { partySize: number }
) => {
  const res = await UserApi.post(`/v1/users/me/waitings/${storeId}`, payload);
  return res.data;
};

export const getMyReservations = async () => {
  const res = await UserApi.get("/v1/users/me/waitings");
  return res.data;
};

// 북마크 조회
export const getBookmark = async (): Promise<BookmarkResponse> => {
  const res = await UserApi.get("/v1/users/me/bookmarks");
  return res.data;
};

// 북마크 생성
export const createBookmark = async (
  storeId: number | undefined,
  signal: AbortSignal
) => {
  await UserApi.post(`/v1/users/me/bookmarks/${storeId}`, null, { signal });
};

// 북마크 삭제
export const deleteBookmark = async (
  storeId: number | undefined,
  signal: AbortSignal
) => {
  const res = await UserApi.delete(`/v1/users/me/bookmarks/${storeId}`, {
    signal,
  });
  return res.data;
};
