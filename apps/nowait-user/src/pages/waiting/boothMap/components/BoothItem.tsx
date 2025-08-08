import BookmarkIcon from "../../../../components/common/BookmarkIcon";
import DepartmentImage from "../../../../components/DepartmentImage";
import { useBookmarkState } from "../../../../hooks/useBookmarkState";
import defaultMenuImageLg from "../../../../assets/default-menu-image-lg.png";
import { useBookmarkMutation } from "../../../../hooks/mutate/useBookmark";

interface PropsType {
  bookmarkId?: number;
  bannerImages?: string;
  waitingCount: number;
  profileImage?: string;
  name: string;
  departmentName: string;
  storeId: number;
}

const BoothItem = ({
  bannerImages,
  waitingCount,
  profileImage,
  name,
  departmentName,
  storeId,
}: PropsType) => {
  const { createBookmarkMutate, deleteBookmarkMutate } = useBookmarkMutation({
    withInvalidate: true,
  });
  const { isBookmarked } = useBookmarkState(storeId);

  const handleBookmarkButton = async () => {
    try {
      if (isBookmarked) {
        await deleteBookmarkMutate.mutate(storeId);
      } else {
        await createBookmarkMutate.mutate(storeId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-6">
      <div className="relative top-0 right-0">
        <img
          className="w-full h-[195px] rounded-[14px] overflow-hidden object-cover"
          src={bannerImages || defaultMenuImageLg}
          alt="북마크한 주점 메인 이미지"
        />
        {waitingCount !== 0 && (
          <p className="absolute top-[12px] right-[12px] text-primary bg-[#ffe9df] px-2 py-[7px] font-bold text-[12px] rounded-[6px]">
            {waitingCount}
          </p>
        )}
      </div>
      <div className="flex items-start justify-between py-3">
        <div className="flex items-center gap-2.5">
          <DepartmentImage width="40px" height="40px" src={profileImage} />
          <div className="flex flex-col justify-between">
            <h1 className="text-title-16-bold text-black-90">{name}</h1>
            <h2 className="text-14-regular text-black-70">{departmentName}</h2>
          </div>
        </div>
        <button className="mr-[5px]" onClick={handleBookmarkButton}>
          <BookmarkIcon isBookmarked={isBookmarked} />
        </button>
      </div>
    </div>
  );
};

export default BoothItem;
