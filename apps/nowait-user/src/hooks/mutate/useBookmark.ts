import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark, deleteBookmark } from "../../api/reservation";


export const useBookmarkMutation = (
  { withInvalidate = true } = {},
  storeId?: number
) => {
  const queryClient = useQueryClient();
  const bookmarkKey = ["bookmark", storeId];

  const createBookmarkMutate = useMutation({
    mutationFn: async () => {
      const controller = new AbortController();
      return createBookmark(storeId!, controller.signal);
    },
    // mutation 전에 작업 실행(UI 먼저 업데이트하기)
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: bookmarkKey });
      const prevData = queryClient.getQueryData<boolean>(bookmarkKey);
      queryClient.setQueryData(bookmarkKey, true);

      return { prevData };
    },
    // 실패 시 이전 값으로 롤백
    onError: (_err, _vars, context) => {
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(bookmarkKey, context.prevData);
      }
    },
    // mutation의 성공, 실패 여부와 관계없이 mutation 무효화
    onSettled: () => {
      if (withInvalidate) {
        queryClient.invalidateQueries({ queryKey: bookmarkKey });
      }
    },
  });

  const deleteBookmarkMutate = useMutation({
    mutationFn: async () => {
      const controller = new AbortController();
      return deleteBookmark(storeId!, controller.signal);
    },
    // mutation 전에 작업 실행(UI 먼저 업데이트하기)
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: bookmarkKey });
      const prevData = queryClient.getQueryData<boolean>(bookmarkKey);
      queryClient.setQueryData(bookmarkKey, false);

      return { prevData };
    },
    // 실패 시 이전 값으로 롤백
    onError: (_err, _vars, context) => {
      console.log("onError 발생, 롤백!", context?.prevData);
      if (context?.prevData !== undefined) {
        queryClient.setQueryData(bookmarkKey, context.prevData);
      }
    },
    // mutation의 성공, 실패 여부와 관계없이 mutation 무효화
    onSettled: () => {
      if (withInvalidate) {
        queryClient.invalidateQueries({ queryKey: bookmarkKey });
      }
    },
  });

  return { createBookmarkMutate, deleteBookmarkMutate };
};
