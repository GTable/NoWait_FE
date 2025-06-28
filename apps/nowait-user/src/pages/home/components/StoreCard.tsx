import { NotOpenIcon, WaitingIcon } from "./HomeIcon";
import { useNavigate } from "react-router-dom";
import { getDepartmentName } from "../../../constants/departments";

interface StoreCardProps {
  storeId: number;
  name: string;
  departmentId: number;
  images: string[];
  isActive: boolean;
  deleted: boolean;
  waitingCount?: number; // 대기인원 API 연동 시 추가 예정
}

const StoreCard = ({
  storeId,
  name,
  departmentId,
  images,
  isActive,
  deleted,
  waitingCount,
}: StoreCardProps) => {
  const navigate = useNavigate();

  // 삭제된 주점은 렌더링하지 않음
  if (deleted) {
    return null;
  }

  const departmentName = getDepartmentName(departmentId);
  const mainImage = images.length > 0 ? images[0] : undefined;
  const status = isActive ? "open" : "closed";

  // 스토어 클릭 핸들러
  const handleStoreClick = () => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div
      className="flex flex-row py-3 gap-3 w-full min-w-0 items-center cursor-pointer"
      onClick={handleStoreClick}
    >
      <div className="rounded-full w-11 h-11 bg-gray-200 flex-shrink-0">
        <img
          alt={`${name} 주점 이미지`}
          src={mainImage}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-row gap-2 items-center min-w-0">
          <div className="text-title-16-bold text-black-90 text-start truncate flex-shrink min-w-0">
            {name}
          </div>
          <div className="flex-shrink-0">
            {status === "open" ? (
              <WaitingIcon waitingCount={waitingCount} />
            ) : (
              <NotOpenIcon />
            )}
          </div>
        </div>
        <div className="flex text-13-regular text-black-70 text-start">
          {departmentName}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
