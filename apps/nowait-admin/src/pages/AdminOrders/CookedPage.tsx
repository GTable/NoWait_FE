import { CookedCard } from "./OrderCard";

interface CookedPageProps {
  cookedOrders: Array<{
    id: number;
    tableNumber: number;
    menus: Array<{ name: string; quantity: number }>;
    totalAmount: number;
    createdAt: string;
  }>;
}

const CookedPage = ({ cookedOrders }: CookedPageProps) => {
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
          <div className="flex flex-row px-5 py-2.5 bg-[#E8EDF1] rounded-t-2xl">
            <div className="flex-1 text-14-medium text-[#949BA0]">테이블</div>
            <div className="flex-[2] text-14-medium text-[#949BA0]">메뉴명</div>
            <div className="flex-1 text-14-medium text-[#949BA0]">개수</div>
            <div className="flex-1 text-14-medium text-[#949BA0]">금액</div>
            <div className="flex-1 text-14-medium text-[#949BA0]">
              주문 시간
            </div>
            <div className="w-20"></div>
          </div>

          {cookedOrders.map((order) => (
            <CookedCard
              key={order.id}
              tableNumber={order.tableNumber}
              menus={order.menus}
              totalAmount={order.totalAmount}
              createdAt={order.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookedPage;
