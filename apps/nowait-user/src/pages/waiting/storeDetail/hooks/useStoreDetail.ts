import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStore } from "../../../../api/reservation";
import { useBookmarkState } from "../../../../hooks/useBookmarkState";
import { useBookmarkMutation } from "../../../../hooks/mutate/useBookmark";


export const useStoreDetail = () => {
  const { id: storeId } = useParams<string>();

  const storeQuery = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId!),
    select: (data) => data?.response,
    enabled: !!storeId,
  });

  const storeIdNumber = Number(storeQuery.data?.storeId);

  const { isBookmarked } = useBookmarkState(storeIdNumber);
  const { createBookmarkMutate, deleteBookmarkMutate } =
    useBookmarkMutation({ withInvalidate: true }, storeIdNumber);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await deleteBookmarkMutate.mutate();
    } else {
      await createBookmarkMutate.mutate();
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return {
    storeId,
    store: storeQuery.data,
    storeQuery,
    isBookmarked,
    toggleBookmark,
  };
};