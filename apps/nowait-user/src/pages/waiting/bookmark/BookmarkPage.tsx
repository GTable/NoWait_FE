import HomeHeader from "../../../components/Header";
import type { BookmarkListType } from "../../../types/wait/store";
import BookmarkEmptyPage from "./components/BookmarkEmptyPage";
import BookmarkListItem from "./components/BookmarkListItem";
import { getBookmark } from "../../../api/reservation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BookmarkListItemSkeleton from "./components/BookmarkListItemSkeleton";

const BookmarkPage = () => {
  const { id: storeId } = useParams();
  const {
    data: bookmarkList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmark", storeId],
    queryFn: getBookmark,
    select: (data) => data.response,
  });

  if (!bookmarkList && !isLoading && isError) return <div>에러....</div>;
  return (
    <div>
      <HomeHeader />
      <div className="px-5 mt-[76px]">
        <h1 className="mt-5 mb-4 text-title-20-bold text-black-90">
          북마크한 부스
        </h1>
        {isLoading ? (
          <ul>
            {Array.from({ length: 5 }).map((_, i) => (
              <BookmarkListItemSkeleton key={i} />
            ))}
          </ul>
        ) : !bookmarkList || bookmarkList.length < 1 ? (
          <BookmarkEmptyPage />
        ) : (
          <ul>
            {bookmarkList.map((data: BookmarkListType) => (
              <BookmarkListItem
                key={data.bookmarkId}
                bookmarkId={data.bookmarkId}
                bannerImages={data.bannerImages[0]?.imageUrl}
                waitingCount={data.waitingCount}
                profileImage={data.profileImage?.imageUrl}
                name={data.name}
                departmentName={data.departmentName}
                storeId={data.storeId}
                publicCode={data.publicCode}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
