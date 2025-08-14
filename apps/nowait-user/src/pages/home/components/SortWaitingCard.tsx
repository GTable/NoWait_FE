import { memo } from "react";
import ArrowDown from "../../../assets/icon/arrow_down.svg?react";
import MainCard from "./MainCard";
import { useWaitingStores } from "../../../hooks/useWaitingStores";

// SortWaitingCard Props
interface SortWaitingCardProps {
  order: "asc" | "desc";
  onModalOpen: () => void;
  onNavigateToStore: (storeId: number) => void;
}

// 바로 입장 가능한 주점 섹션 컴포넌트
const SortWaitingCard = memo(
  ({ order, onModalOpen, onNavigateToStore }: SortWaitingCardProps) => {
    // order에 따른 주점 데이터 가져오기
    const { waitingStores, isLoading, error } = useWaitingStores(order);

    if (isLoading || error || waitingStores.length === 0) return null;

    const getSectionTitle = () => {
      return order === "asc" ? "대기가 가장 적어요" : "인기가 가장 많아요";
    };

    return (
      <div className="flex flex-col">
        <div className="flex flex-row gap-1.5 items-center mb-3.5">
          <div className="flex text-start text-title-20-bold text-black-90">
            {getSectionTitle()}
          </div>
          <div
            onClick={onModalOpen}
            className="flex w-6 h-6 bg-black-15 rounded-full items-center justify-center cursor-pointer"
          >
            <ArrowDown className="text-black-60 icon-s" />
          </div>
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {waitingStores.map((store) => (
            <div key={store.storeId} className="flex-shrink-0">
              <MainCard
                type="homeCard"
                imageUrl={store.bannerImageUrl || ""}
                storeName={store.storeName}
                departmentName={store.departmentName}
                waitingCount={store.waitingCount}
                onClick={() => onNavigateToStore(Number(store.storeId))}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default SortWaitingCard;
