import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "../utils/UserApi";
import { useApiErrorHandler } from "./useApiErrorHandler";

// 대기 취소 API 호출 함수
const cancelWaiting = async (storeId: number): Promise<void> => {
  try {
    const response = await UserApi.delete(
      `/users/me/waitings/${storeId}`
    );

    console.log("대기 취소 성공:", response.data);

    if (response.status !== 200) {
      throw new Error("대기 취소에 실패했습니다.");
    }
  } catch (error) {
    console.error("대기 취소 실패:", error);
    if (error && typeof error === "object" && "response" in error) {
      console.error("응답 상태:", (error as any).response?.status);
      console.error("응답 데이터:", (error as any).response?.data);
    }
    throw error;
  }
};

export const useCancelWaiting = () => {
  const queryClient = useQueryClient();
  const { handleApiError } = useApiErrorHandler();

  return useMutation({
    mutationFn: cancelWaiting,
    onSuccess: () => {
      // 성공 시 내 대기 목록 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["myWaitingList"] });
      console.log("대기 취소가 완료되었습니다.");
    },
    onError: (error) => {
      console.error("대기 취소 중 오류 발생:", error);
      handleApiError(error);
    },
  });
};
