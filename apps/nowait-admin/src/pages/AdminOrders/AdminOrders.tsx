import { useState } from "react";
import { PaymentCard, CookCard } from "./OrderCard";
import RefreshIcon from "../../assets/refresh.svg?react";
import CookedPage from "./CookedPage";

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState<"전체" | "조리 완료">("전체");

  // 통합 주문 데이터
  const ordersData = [
    {
      id: 1,
      tableNumber: 5,
      minutesAgo: 10,
      status: "payment_waiting", // 입금 대기
      menus: [
        { name: "김치찌개", quantity: 2 },
        { name: "된장찌개", quantity: 1 },
      ],
      totalAmount: 26000,
      createdAt: "오후 6:50",
    },
    {
      id: 2,
      tableNumber: 2,
      minutesAgo: 5,
      status: "payment_waiting", // 입금 대기
      menus: [
        { name: "비빔밥", quantity: 1 },
        { name: "된장국", quantity: 1 },
      ],
      totalAmount: 18000,
      createdAt: "오후 6:55",
    },
    {
      id: 3,
      tableNumber: 7,
      minutesAgo: 15,
      status: "payment_waiting", // 입금 대기
      menus: [
        { name: "불고기", quantity: 2 },
        { name: "냉면", quantity: 1 },
        { name: "공기밥", quantity: 1 },
      ],
      totalAmount: 35000,
      createdAt: "오후 6:45",
    },
    {
      id: 4,
      tableNumber: 3,
      minutesAgo: 20,
      status: "cooking", // 조리 중
      menus: [
        { name: "매뉴명한줄로떨어져야야야야피피피피", quantity: 1 },
        { name: "된장된장찌개", quantity: 1 },
        { name: "계란후라이", quantity: 1 },
        { name: "달달한 쏘야볶음", quantity: 1 },
      ],
      totalAmount: 28000,
      createdAt: "오후 7:24",
    },
    {
      id: 5,
      tableNumber: 6,
      minutesAgo: 30,
      status: "cooked", // 조리 완료
      menus: [
        { name: "묵은지 삼겹 김치 말이찜", quantity: 2 },
        { name: "공기밥", quantity: 2 },
        { name: "된장국", quantity: 1 },
      ],
      totalAmount: 23000,
      createdAt: "오후 7:24",
    },
    {
      id: 6,
      tableNumber: 1,
      minutesAgo: 25,
      status: "cooked", // 조리 완료
      menus: [{ name: "김치볶음밥", quantity: 1 }],
      totalAmount: 8000,
      createdAt: "오후 19:24",
    },
  ];

  // 상태별 데이터 필터링
  const paymentWaitingData = ordersData.filter(
    (order) => order.status === "payment_waiting"
  );
  const cookingData = ordersData.filter((order) => order.status === "cooking");
  const cookedData = ordersData.filter((order) => order.status === "cooked");

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
            전체
          </div>
          <div
            className={`rounded-full px-4 py-2 cursor-pointer ${
              activeTab === "조리 완료"
                ? "bg-cool-black text-14-semibold text-white"
                : "border-[#E7E7E7] border bg-white text-14-semibold text-black-60"
            }`}
            onClick={() => setActiveTab("조리 완료")}
          >
            조리 완료
          </div>
        </div>

        <div className="flex icon-m items-center justify-center">
          <RefreshIcon />
        </div>
      </div>

      {activeTab === "전체" ? (
        <div className="flex flex-row mt-7.5 gap-2.5 h-full w-full">
          {/* 입금 대기 블럭 */}
          <div className="flex flex-1 flex-col gap-3.5">
            <div className="flex flex-row ml-1.5 gap-1.5">
              <div className="text-title-20-bold text-[#363D4A]">입금 대기</div>
              <div className="text-title-20-bold text-primary">5</div>
            </div>

            <div className="flex flex-col gap-7.5 rounded-2xl border border-black-30 h-full bg-white px-6 py-5.5">
              {paymentWaitingData.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  tableNumber={payment.tableNumber}
                  minutesAgo={payment.minutesAgo}
                  menuCount={payment.menus.reduce(
                    (total, menu) => total + menu.quantity,
                    0
                  )}
                  totalAmount={payment.totalAmount}
                />
              ))}
            </div>
          </div>

          {/* 조리 중 블럭 */}
          <div className="flex flex-1 flex-col gap-3.5">
            <div className="flex flex-row ml-1.5 gap-1.5">
              <div className="text-title-20-bold text-[#363D4A]">조리 중</div>
              <div className="text-title-20-bold text-[#363D4A]">3</div>
            </div>

            <div className="flex flex-col gap-7.5 rounded-2xl border border-black-30 h-full bg-white px-6 py-5.5">
              {cookingData.map((cooking) => (
                <CookCard
                  key={cooking.id}
                  tableNumber={cooking.tableNumber}
                  menus={cooking.menus}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CookedPage cookedOrders={cookedData} />
      )}
    </div>
  );
};

export default AdminOrders;
