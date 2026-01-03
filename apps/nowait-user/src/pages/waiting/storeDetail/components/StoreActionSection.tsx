import { Button } from "@repo/ui";
import { useNavigate } from "react-router-dom";
import PageFooterButton from "../../../../components/order/PageFooterButton";
import BookmarkIcon from "../../../../components/common/BookmarkIcon";

interface Props {
  storeId: string;
  storeName?: string;
  isActive?: boolean;
  isWaiting?: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

const StoreActionSection = ({
  storeId,
  storeName,
  isActive,
  isWaiting,
  isBookmarked,
  onToggleBookmark,
}: Props) => {
  const navigate = useNavigate();

  return (
    <PageFooterButton background="gradient" className="gap-2">
      <Button
        className="border"
        buttonType="icon"
        backgroundColor="white"
        borderColor="#ececec"
        onClick={onToggleBookmark}
      >
        <BookmarkIcon isBookmarked={isBookmarked} />
      </Button>

      {!isActive ? (
        <Button disabled>지금은 대기할 수 없어요</Button>
      ) : (
        <Button
          disabled={isWaiting}
          onClick={() =>
            navigate(`/store/${storeId}/partysize`, {
              state: storeName,
            })
          }
        >
          {isWaiting ? "대기 중이에요" : "대기하기"}
        </Button>
      )}
    </PageFooterButton>
  );
};

export default StoreActionSection;
