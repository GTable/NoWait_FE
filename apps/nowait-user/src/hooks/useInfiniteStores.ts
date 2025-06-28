import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// 실제 서버 API 응답 타입 (StoreCard에서 직접 사용)
interface Store {
  storeId: number;
  departmentId: number;
  name: string;
  location: string;
  description: string;
  images: string[];
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
  waitingCount?: number; // 대기인원 API 연동 시 추가 예정
}

// 실제 서버 응답 구조
interface ServerResponse {
  success: boolean;
  response: {
    hasNext: boolean;
    storeReadDtos: Store[];
  };
}

// 서버에서 주점 데이터를 가져오는 함수
const fetchStores = async ({ pageParam = 0 }): Promise<Store[]> => {
  try {
    const SERVER_URI = import.meta.env.VITE_SERVER_URI;
    const response = await axios.get<ServerResponse>(
      `${SERVER_URI}/admin/stores/all-stores`,
      {
        params: {
          page: pageParam,
          size: 20,
        },
      }
    );

    console.log("서버 응답 전체:", response.data);

    // 서버 응답 구조에 맞게 데이터 추출
    if (response.data.success && response.data.response?.storeReadDtos) {
      const storeArray = response.data.response.storeReadDtos;
      console.log("추출된 주점 배열:", storeArray);

      // 삭제된 주점 필터링하고 실제 서버 데이터 그대로 반환
      const stores: Store[] = storeArray
        .filter((store) => store && !store.deleted)
        .map((store) => ({
          ...store,
          waitingCount: undefined, // 대기인원 API 연동 시 추가 예정
        }));

      console.log("필터링된 주점 데이터:", stores);
      return stores;
    } else {
      console.warn(
        "서버 응답이 성공하지 못했거나 데이터가 없습니다:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("주점 데이터 로딩 실패:", error);
    if (axios.isAxiosError(error)) {
      console.error("응답 상태:", error.response?.status);
      console.error("응답 데이터:", error.response?.data);
    }
    return [];
  }
};

export const useInfiniteStores = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 서버에서 hasNext를 제공하지만, 일단 기존 로직 유지
      // 더 이상 데이터가 없으면 undefined 반환
      if (lastPage.length < 20) {
        return undefined;
      }
      return allPages.length;
    },
    retry: 3, // 실패 시 3번 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // 모든 페이지의 stores를 하나의 배열로 합치기
  const stores = data?.pages.flat() ?? [];

  // 에러 로깅
  useEffect(() => {
    if (error) {
      console.error("주점 데이터 로딩 에러:", error);
    }
  }, [error]);

  return {
    stores,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};

// Store 타입도 export
export type { Store };
