import { SmallActionButton } from "../../../../components/SmallActionButton";
import { useNavigate } from "react-router-dom";
import Add from "../../../../assets/icon/Add.svg?react";

const BookmarkEmptyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-white mt-[216px]">
      <h1 className="whitespace-pre-line text-16-regular text-black-80 mb-5 text-center">
        아직 북마크한 부스가 없어요.
        <br />
        마음에 드는 부스를 찾아보세요!
      </h1>
      <SmallActionButton
        mode="default"
        type="button"
        ariaLabel="추가하기"
        onClick={() => navigate(`/`)}
      >
        <h1>추가하기</h1>
        <span>
          <Add className="w-4 h-4" fill="currentColor" />
        </span>
      </SmallActionButton>
    </div>
  );
};

export default BookmarkEmptyPage;
