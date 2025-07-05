import { useState } from "react";
import { PaymentCard, CookCard } from "./OrderCard";
import RefreshIcon from "../../assets/refresh.svg?react";
import CookedPage from "./CookedPage";
import { useGetOrderList } from "../../hooks/useGetOrderList";

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState<"전체" | "조리 완료">("전체");

  // API에서 주문 데이터 가져오기
  const { data: orders = [], isLoading, error, refetch } = useGetOrderList();

  // 시간 포맷팅 함수 (17:30 형식)
  const getFormattedTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 시간 포맷팅 함수
  const formatTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "오후" : "오전";
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, "0")}`;
  };

  // 테스트를 위해 일부 주문을 다른 상태로 변경
  const testOrders = orders.map((order, index) => {
    if (index % 3 === 1) {
      return { ...order, status: "COOKING" as const };
    } else if (index % 3 === 2) {
      return { ...order, status: "COOKED" as const };
    }
    return order;
  });

  // 상태별 데이터 필터링
  const paymentWaitingData = testOrders.filter(
    (order) => order.status === "WAITING_FOR_PAYMENT"
  );
  const cookingData = testOrders.filter((order) => order.status === "COOKING");
  const cookedData = testOrders.filter((order) => order.status === "COOKED");

  // 새로고침 핸들러
  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-start gap-2">
          {/* 최상단 버튼 */}
          <div
            className={`rounded-full px-4 py-2 cursor-pointer ${
              activeTab === "전체"
                ? "bg-cool-black text-14-semibold text-white"
                : "border-[#E7E7E7] border bg-white text-14-semibold text-black-60"
            }`}
            onClick={() => setActiveTab("전체")}
          >
            진행 중
          </div>
          <div
            className={`rounded-full px-4 py-2 cursor-pointer ${
              activeTab === "조리 완료"
                ? "bg-cool-black text-14-semibold text-white"
                : "border-[#E7E7E7] border bg-white text-14-semibold text-black-60"
            }`}
            onClick={() => setActiveTab("조리 완료")}
          >
            완료된 주문 {cookedData.length}
          </div>
        </div>

        <div
          className="flex icon-m items-center justify-center cursor-pointer"
          onClick={handleRefresh}
        >
          <RefreshIcon />
        </div>
      </div>

      {activeTab === "전체" ? (
        <div className="flex flex-row mt-7.5 gap-2.5 h-full w-full">
          {/* 입금 대기 블럭 */}
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row ml-1.5 gap-1.5">
              <div className="text-title-20-bold text-[#363D4A]">입금 대기</div>
              <div className="text-title-20-bold text-primary">
                {paymentWaitingData.length}
              </div>
            </div>

            <div className="flex flex-row mt-3.5 border border-black-30 rounded-t-2xl px-5 py-2.5 gap-2.5 bg-[#E7ECF0]">
              <div className="flex text-14-medium text-black-60">테이블</div>
              <div className="flex text-14-medium text-black-60">입금 내역</div>
            </div>
            <div className="flex flex-col gap-7.5 rounded-b-2xl border border-t-0 border-black-30 h-full bg-white px-6 py-5.5">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="text-16-medium text-black-60">로딩 중...</div>
                </div>
              ) : paymentWaitingData.length > 0 ? (
                paymentWaitingData.map((payment) => (
                  <PaymentCard
                    key={payment.id}
                    tableNumber={payment.tableId}
                    timeText={getFormattedTime(payment.createdAt)}
                    depositorName={payment.depositorName}
                    totalAmount={payment.totalPrice || 0}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="text-16-medium text-black-60">
                    {error
                      ? "데이터를 불러오지 못했습니다."
                      : "아직 입금 대기 중인 주문이 없어요!"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 조리 중 블럭 */}
          <div className="flex flex-1 flex-col">
            <div className="flex flex-row ml-1.5 gap-1.5">
              <div className="text-title-20-bold text-[#363D4A]">조리 중</div>
              <div className="text-title-20-bold text-[#363D4A]">
                {cookingData.length}
              </div>
            </div>

            <div className="flex flex-row mt-3.5 border border-black-30 rounded-t-2xl px-5 py-2.5 gap-2.5 bg-[#E7ECF0]">
              <div className="flex text-14-medium text-black-60">테이블</div>
              <div className="flex text-14-medium text-black-60 mr-[15ch]">
                메뉴
              </div>
              <div className="flex text-14-medium text-black-60">수량</div>
            </div>
            <div className="flex flex-col gap-7.5 rounded-b-2xl border border-t-0 border-black-30 h-full bg-white px-6 py-5.5">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="text-16-medium text-black-60">로딩 중...</div>
                </div>
              ) : cookingData.length > 0 ? (
                cookingData.map((cooking) => (
                  <CookCard
                    key={cooking.id}
                    tableNumber={cooking.tableId}
                    menus={[{ name: cooking.depositorName, quantity: 1 }]} // API에서 메뉴 정보가 없으므로 depositorName 사용
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="text-16-medium text-black-60">
                    {error
                      ? "데이터를 불러오지 못했습니다."
                      : "조리 중인 주문이 없어요!"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <CookedPage
          cookedOrders={cookedData.map((order, index) => ({
            id: order.id,
            tableNumber: order.tableId,
            depositorName: order.depositorName,
            menus:
              index % 2 === 0
                ? [{ name: "김치찌개", quantity: 1 }]
                : [
                    { name: "김치찌개", quantity: 1 },
                    { name: "된장찌개", quantity: 2 },
                    { name: "불고기", quantity: 1 },
                  ],
            totalAmount: order.totalPrice || 0,
            createdAt: getFormattedTime(order.createdAt),
          }))}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
};

export default AdminOrders;
