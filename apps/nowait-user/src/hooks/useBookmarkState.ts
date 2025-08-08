import { useQuery } from "@tanstack/react-query";
import { getBookmark } from "../api/reservation";
import type { BookmarkListType } from "../types/wait/store";

export const useBookmarkState = (storeId?: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ["bookmark", storeId],
    queryFn: getBookmark,
    select: (data) => data.response,
  });

  const isBookmarked = data?.find(
    (bookmark: BookmarkListType) => bookmark.storeId === storeId
  );

  return {
    isBookmarked: isBookmarked !== undefined,
    bookmarkList: data,
    isLoading,
  };
};
