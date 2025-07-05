import { CookedCard } from "./OrderCard";

interface CookedPageProps {
  cookedOrders: Array<{
    id: number;
    tableNumber: number;
    depositorName: string;
    menus: Array<{ name: string; quantity: number }>;
    totalAmount: number;
    createdAt: string;
  }>;
  isLoading?: boolean;
  error?: unknown;
}

const CookedPage = ({ cookedOrders, isLoading, error }: CookedPageProps) => {
  return (
    <div className="flex flex-row mt-7.5 h-full w-full">
      {/* 조리 완료 블럭 */}
      <div className="flex flex-1 flex-col gap-3.5">
        <div className="flex flex-row ml-1.5 gap-1.5">
          <div className="text-title-20-bold text-[#363D4A]">조리 완료</div>
          <div className="text-title-20-bold text-[#363D4A]">
            {cookedOrders.length}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-black-30 h-full bg-white">
          {/* 조리 완료 헤더 */}
          <div className="flex flex-row gap-2.5 px-5 py-4 bg-[#E8EDF1] rounded-t-2xl items-center">
            <div className="flex flex-[0.7] text-14-medium text-navy-35">
              테이블
            </div>
            <div className="flex flex-[1] text-14-medium text-navy-35">
              입금자
            </div>
            <div className="flex flex-[2.5] text-14-medium text-navy-35">
              메뉴
            </div>
            <div className="flex flex-[1.5] text-14-medium text-navy-35">
              금액
            </div>
            <div className="flex flex-[1.5] text-14-medium text-navy-35">
              주문 시간
            </div>
            <div className="flex-1"></div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="text-16-medium text-black-60">로딩 중...</div>
            </div>
          ) : cookedOrders.length > 0 ? (
            cookedOrders.map((order) => (
              <CookedCard
                key={order.id}
                tableNumber={order.tableNumber}
                depositorName={order.depositorName}
                menus={order.menus}
                totalAmount={order.totalAmount}
                createdAt={order.createdAt}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="text-16-medium text-black-60">
                {error
                  ? "데이터를 불러오지 못했습니다."
                  : "조리 완료된 주문이 없어요!"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookedPage;
