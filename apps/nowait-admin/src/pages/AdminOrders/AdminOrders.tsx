import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { PaymentCard, CookCard, CookedCard } from "./OrderCard";
import { DetailCard } from "./DetailCard";
import refreshIcon from "../../assets/refresh.svg";
import CookedPage from "./CookedPage";
import { useGetOrderList } from "../../hooks/useGetOrderList";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import type { Order } from "../../types/order";
import { DropdownLoader } from "@repo/ui";
import { useNewOrderToastStore } from "../../hooks/useNewOrderToastStore";

const AdminOrders = () => {
  const { storeId: storeIdParam } = useParams<{ storeId: string }>();
  const [activeTab, setActiveTab] = useState<"전체" | "조리 완료">("전체");
  const [mobileActiveTab, setMobileActiveTab] = useState<
    "입금 대기" | "조리 중" | "조리 완료"
  >("입금 대기");
  const [selectedPayment, setSelectedPayment] = useState<Order | null>(null);
  const [selectedCooking, setSelectedCooking] = useState<Order | null>(null);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);
  const [
    savedDesktopCookedScrollPosition,
    setSavedDesktopCookedScrollPosition,
  ] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const desktopCookedScrollContainerRef = useRef<HTMLDivElement>(null);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 450;
  const storeId = Number(storeIdParam);
  const { search } = useLocation();
  const qs = new URLSearchParams(search); // ← 추가\
  const navigate = useNavigate();
  const queryOrderId = qs.get("order"); // ← 추가
  const queryStatus = qs.get("status") as
    | "WAITING_FOR_PAYMENT"
    | "COOKING"
    | "COOKED"
    | null;

  // API에서 주문 데이터 가져오기
  const {
    data: orders = [],
    isLoading,
    error,
    refetch,
  } = useGetOrderList(storeId);
  const purgeNonWaiting = useNewOrderToastStore((s) => s.purgeNonWaiting);

  const getFormattedTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // 날짜와 시간 포맷팅 함수 (2025년 6월 2일 08:02 형식) - Detail에서만 사용
  const getFormattedDateTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  // 상태별 데이터 필터링
  const paymentWaitingData = orders.filter(
    (order) => order.status === "WAITING_FOR_PAYMENT"
  );
  const cookingData = orders.filter((order) => order.status === "COOKING");
  const cookedData = orders.filter((order) => order.status === "COOKED");

  // 새로고침 핸들러
  const handleRefresh = () => {
    if (isRefreshing) return; // 중복 클릭 방지
    setIsRefreshing(true);
    try {
      refetch();
    } finally {
      // 살짝 딜레이를 주면 회전이 끊기지 않고 보여짐 (선택)
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  // PaymentCard 클릭 핸들러
  const handlePaymentCardClick = (payment: Order) => {
    if (scrollContainerRef.current) {
      // 현재 스크롤 위치 저장
      setSavedScrollPosition(scrollContainerRef.current.scrollTop);
      // 스크롤을 맨 위로 올리기
      scrollContainerRef.current.scrollTop = 0;
    }
    setSelectedPayment(payment);
  };

  // PaymentDetail 닫기 핸들러
  const handleClosePaymentDetail = () => {
    setSelectedPayment(null);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = savedScrollPosition;
      }
    }, 0);
    const p = new URLSearchParams(location.search);
    p.delete("order");
    // status는 유지하고 싶으면 남겨도 됨. 지우고 싶다면 다음 줄도 활성화:
    // p.delete("status");
    navigate({ search: p.toString() }, { replace: true });
  };

  // CookingDetail 닫기 핸들러
  const handleCloseCookingDetail = () => {
    setSelectedCooking(null);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = savedScrollPosition;
      }
    }, 0);
  };
  // CookedCard 클릭 핸들러
  const handleCookedCardClick = (cooked: Order) => {
    if (scrollContainerRef.current) {
      // 현재 스크롤 위치 저장
      setSavedScrollPosition(scrollContainerRef.current.scrollTop);
      // 스크롤을 맨 위로 올리기
      scrollContainerRef.current.scrollTop = 0;
    }
    setSelectedPayment(cooked);
  };

  // CookingCard 클릭 핸들러
  const handleCookingCardClick = (cooking: Order) => {
    if (scrollContainerRef.current) {
      // 현재 스크롤 위치 저장
      setSavedScrollPosition(scrollContainerRef.current.scrollTop);
      // 스크롤을 맨 위로 올리기
      scrollContainerRef.current.scrollTop = 0;
    }
    setSelectedCooking(cooking);
  };

  const openDetail = (order: Order) => {
    if (scrollContainerRef.current) {
      setSavedScrollPosition(scrollContainerRef.current.scrollTop);
      scrollContainerRef.current.scrollTop = 0;
    }
    setSelectedPayment(order);

    const p = new URLSearchParams(location.search);
    p.set("order", String(order.id));
    p.set("status", order.status); // 상태 동기화
    navigate({ search: p.toString() }, { replace: true });
  };

  useEffect(() => {
    if (!queryStatus) return;

    // 데스크톱 탭
    if (queryStatus === "COOKED") {
      setActiveTab("조리 완료");
    } else {
      setActiveTab("전체");
    }

    // 모바일 탭
    if (queryStatus === "WAITING_FOR_PAYMENT") setMobileActiveTab("입금 대기");
    else if (queryStatus === "COOKING") setMobileActiveTab("조리 중");
    else if (queryStatus === "COOKED") setMobileActiveTab("조리 완료");
  }, [queryStatus]);

  useEffect(() => {
    if (!orders?.length || !queryOrderId) return;

    const found = orders.find((o) => String(o.id) === queryOrderId);
    if (!found) return;

    openDetail(found);
  }, [orders, queryOrderId]);

  // 탭 변경 시 Detail 닫기
  useEffect(() => {
    if (queryOrderId) return;
    setSelectedPayment(null);
    setSelectedCooking(null);
  }, [activeTab, mobileActiveTab, queryOrderId]);
  useEffect(() => {
    if (orders?.length) purgeNonWaiting(orders);
  }, [orders, purgeNonWaiting]);

  return (
    <div
      className="w-full flex flex-col items-center mx-auto overflow-hidden"
      style={{ height: "calc(100vh - 2.5rem)" }}
    >
      {/* 헤더 영역 - 고정 높이 */}
      <div
        className={`flex flex-row relative w-full justify-between items-center flex-shrink-0 ${
          isMobile ? "mb-5" : "mb-7.5"
        }`}
      >
        {/* 데스크톱 탭 버튼 (425px 초과에서만 표시) */}
        {!isMobile && (
          <div className="flex items-start gap-2">
            <div
              className={`rounded-full px-4 py-2 cursor-pointer ${
                activeTab === "전체"
                  ? "bg-cool-black text-14-semibold text-white"
                  : "border-[#E7E7E7] border bg-white text-14-semibold text-black-60"
              }`}
              onClick={() => setActiveTab("전체")}
            >
              진행 중 {paymentWaitingData.length + cookingData.length}
            </div>
            <div
              className={`rounded-full px-4 py-2 cursor-pointer ${
                activeTab === "조리 완료"
                  ? "bg-cool-black text-14-semibold text-white"
                  : "border-[#E7E7E7] border bg-white text-14-semibold text-black-60"
              }`}
              onClick={() => setActiveTab("조리 완료")}
            >
              조리 완료 {cookedData.length}
            </div>
          </div>
        )}

        {/* 모바일 탭 버튼 (425px 이하에서만 표시) */}
        {isMobile && (
          <div className="flex items-start gap-1 w-full">
            <div
              className={`rounded-full px-3.5 py-1.75 cursor-pointer ${
                mobileActiveTab === "입금 대기"
                  ? "bg-navy-80 text-14-semibold tracking-[0em] text-white"
                  : "border-[#ECECEC] border bg-white text-14-semibold tracking-[0em] text-navy-30"
              }`}
              onClick={() => setMobileActiveTab("입금 대기")}
            >
              입금 대기 {paymentWaitingData.length}
            </div>
            <div
              className={`rounded-full px-3.5 py-1.75 cursor-pointer ${
                mobileActiveTab === "조리 중"
                  ? "bg-navy-80 text-14-semibold tracking-[0em] text-white"
                  : "border-[#ECECEC] border bg-white text-14-semibold tracking-[0em] text-navy-30"
              }`}
              onClick={() => setMobileActiveTab("조리 중")}
            >
              조리 중 {cookingData.length}
            </div>
            <div
              className={`rounded-full px-3.5 py-1.75 cursor-pointer ${
                mobileActiveTab === "조리 완료"
                  ? "bg-navy-80 text-14-semibold tracking-[0em] text-white"
                  : "border-[#ECECEC] border bg-white text-14-semibold tracking-[0em] text-navy-30"
              }`}
              onClick={() => setMobileActiveTab("조리 완료")}
            >
              조리 완료 {cookedData.length}
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="새로고침"
          onClick={handleRefresh}
          disabled={isRefreshing}
          aria-busy={isRefreshing}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10
                 cursor-pointer [@media(max-width:431px)]:hidden"
        >
          <img
            src={refreshIcon}
            alt=""
            className={`${isRefreshing ? "animate-[spin_0.6s_linear_1]" : ""}`}
          />
        </button>
      </div>

      {/* 데스크톱 버전 */}
      {!isMobile && (
        <>
          {activeTab === "전체" ? (
            <div className="flex flex-row gap-2.5 flex-1 min-h-0 overflow-hidden w-full">
              {/* 입금 대기 블럭 */}
              <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                <div className="flex flex-row ml-1.5 gap-1.5 flex-shrink-0 mb-3.5">
                  <div className="text-title-20-bold text-[#363D4A]">
                    입금 대기
                  </div>
                  <div className="text-title-20-bold text-primary">
                    {paymentWaitingData.length}
                  </div>
                </div>

                <div className="flex flex-row border border-black-25 rounded-t-2xl pl-5 py-2.5 gap-2.5 bg-[#E7ECF0] flex-shrink-0">
                  <div className="flex text-14-medium leading-[136%] text-navy-35">
                    테이블
                  </div>
                  <div className="flex text-14-medium leading-[136%] text-navy-35">
                    입금 내역
                  </div>
                </div>
                <div
                  ref={scrollContainerRef}
                  className={`flex flex-col gap-7.5 rounded-b-2xl border border-t-0 border-black-30 flex-1 bg-white px-5.5 py-4 min-h-0 relative ${
                    selectedPayment ? "overflow-hidden" : "overflow-y-auto"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <DropdownLoader />
                    </div>
                  ) : paymentWaitingData.length > 0 ? (
                    paymentWaitingData.map((payment) => (
                      <PaymentCard
                        key={payment.id}
                        orderId={payment.id}
                        tableNumber={payment.tableId}
                        timeText={getFormattedTime(payment.createdAt)}
                        depositorName={payment.depositorName}
                        totalAmount={payment.totalPrice || 0}
                        onClick={() => handlePaymentCardClick(payment)}
                        onSuccess={refetch}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="text-16-medium text-black-60">
                        {error
                          ? "데이터를 불러오지 못했습니다."
                          : "아직 입금 대기 중인 주문이 없어요!"}
                      </div>
                    </div>
                  )}

                  {/* DetailCard 오버레이 */}
                  {selectedPayment && (
                    <DetailCard
                      type="payment"
                      orderId={selectedPayment.id}
                      tableNumber={selectedPayment.tableId}
                      timeText={getFormattedDateTime(selectedPayment.createdAt)}
                      depositorName={selectedPayment.depositorName}
                      totalAmount={selectedPayment.totalPrice || 0}
                      menuDetails={selectedPayment.menuDetails}
                      onClose={handleClosePaymentDetail}
                      onSuccess={refetch}
                    />
                  )}
                </div>
              </div>

              {/* 조리 중 블럭 */}
              <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
                <div className="flex flex-row ml-1.5 gap-1.5 flex-shrink-0 mb-3.5">
                  <div className="text-title-20-bold text-[#363D4A]">
                    조리 중
                  </div>
                  <div className="text-title-20-bold text-primary">
                    {cookingData.length}
                  </div>
                </div>

                <div className="flex flex-row text-14-medium leading-[136%] text-navy-35 border border-black-30 rounded-t-2xl bg-[#E7ECF0] gap-2.5 py-2.5 pl-5">
                  <div className="flex">테이블</div>
                  <div className="flex w-38.5 md:w-32 lg:w-38.5 text-start">
                    메뉴
                  </div>
                  <div className="flex">수량</div>
                </div>
                <div
                  className={`flex flex-col gap-7.5 rounded-b-2xl border border-t-0 border-black-30 flex-1 bg-white px-5.5 py-4 min-h-0 relative ${
                    selectedCooking ? "overflow-hidden" : "overflow-y-auto"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <DropdownLoader />
                    </div>
                  ) : cookingData.length > 0 ? (
                    cookingData.map((cooking) => (
                      <CookCard
                        key={cooking.id}
                        orderId={cooking.id}
                        tableNumber={cooking.tableId}
                        menuDetails={cooking.menuDetails}
                        onSuccess={refetch}
                        onClick={() => handleCookingCardClick(cooking)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="text-16-medium text-black-60">
                        {error
                          ? "데이터를 불러오지 못했습니다."
                          : "조리 중인 주문이 없어요!"}
                      </div>
                    </div>
                  )}

                  {/* DetailCard 오버레이 */}
                  {selectedCooking && (
                    <DetailCard
                      type="cooking"
                      orderId={selectedCooking.id}
                      tableNumber={selectedCooking.tableId}
                      timeText={getFormattedDateTime(selectedCooking.createdAt)}
                      depositorName={selectedCooking.depositorName}
                      totalAmount={selectedCooking.totalPrice || 0}
                      menuDetails={selectedCooking.menuDetails}
                      onClose={handleCloseCookingDetail}
                      onSuccess={refetch}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <CookedPage
              cookedOrders={cookedData}
              isLoading={isLoading}
              error={error}
              onRefresh={refetch}
              scrollContainerRef={desktopCookedScrollContainerRef}
              savedScrollPosition={savedDesktopCookedScrollPosition}
              setSavedScrollPosition={setSavedDesktopCookedScrollPosition}
            />
          )}
        </>
      )}

      {/* 모바일 버전 */}
      {isMobile && (
        <>
          {mobileActiveTab === "입금 대기" && (
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden w-full">
              <div className="flex flex-row px-5 py-2.5 gap-2.5 bg-[#E7ECF0] rounded-t-2xl border-black-25 border flex-shrink-0">
                <div className="flex text-14-medium leading-[136%] text-navy-35">
                  테이블
                </div>
                <div className="flex text-14-medium leading-[136%] text-navy-35">
                  입금 내역
                </div>
              </div>
              <div
                ref={scrollContainerRef}
                className={`flex flex-col px-5.5 py-4.25 gap-7.5 bg-white rounded-b-2xl border-t-0 border-black-25 border flex-1 min-h-0 relative ${
                  selectedPayment ? "overflow-hidden" : "overflow-y-auto"
                }`}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-16-medium text-black-60">
                      로딩 중...
                    </div>
                  </div>
                ) : paymentWaitingData.length > 0 ? (
                  paymentWaitingData.map((payment) => (
                    <PaymentCard
                      key={payment.id}
                      orderId={payment.id}
                      tableNumber={payment.tableId}
                      timeText={getFormattedTime(payment.createdAt)}
                      depositorName={payment.depositorName}
                      totalAmount={payment.totalPrice || 0}
                      onClick={() => handlePaymentCardClick(payment)}
                      onSuccess={refetch}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-16-medium text-black-60">
                      {error
                        ? "데이터를 불러오지 못했습니다."
                        : "아직 입금 대기 중인 주문이 없어요!"}
                    </div>
                  </div>
                )}

                {/* DetailCard 오버레이 */}
                {selectedPayment && (
                  <DetailCard
                    type="payment"
                    orderId={selectedPayment.id}
                    tableNumber={selectedPayment.tableId}
                    timeText={getFormattedDateTime(selectedPayment.createdAt)}
                    depositorName={selectedPayment.depositorName}
                    totalAmount={selectedPayment.totalPrice || 0}
                    menuDetails={selectedPayment.menuDetails}
                    onClose={handleClosePaymentDetail}
                    onSuccess={refetch}
                  />
                )}
              </div>
            </div>
          )}

          {mobileActiveTab === "조리 중" && (
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden w-full">
              <div className="flex flex-row px-5 py-2.5 gap-2.5 bg-[#E7ECF0] rounded-t-2xl border-black-25 border flex-shrink-0 text-14-medium leading-[136%] text-navy-35">
                <div className="flex">테이블</div>
                <div className="flex w-38.5 max-[376px]:w-32 text-start">
                  메뉴
                </div>
                <div className="flex">수량</div>
              </div>
              <div
                className={`flex flex-col px-5.5 py-4 gap-7.5 bg-white rounded-b-2xl border-t-0 border-black-25 border flex-1 min-h-0 relative ${
                  selectedCooking ? "overflow-hidden" : "overflow-y-auto"
                }`}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <DropdownLoader />
                  </div>
                ) : cookingData.length > 0 ? (
                  cookingData.map((cooking) => (
                    <CookCard
                      key={cooking.id}
                      orderId={cooking.id}
                      tableNumber={cooking.tableId}
                      menuDetails={cooking.menuDetails}
                      onSuccess={refetch}
                      onClick={() => handleCookingCardClick(cooking)}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="text-16-medium text-black-60">
                      {error
                        ? "데이터를 불러오지 못했습니다."
                        : "아직 조리 중인 주문이 없어요!"}
                    </div>
                  </div>
                )}

                {/* DetailCard 오버레이 */}
                {selectedCooking && (
                  <DetailCard
                    type="cooking"
                    orderId={selectedCooking.id}
                    tableNumber={selectedCooking.tableId}
                    timeText={getFormattedDateTime(selectedCooking.createdAt)}
                    depositorName={selectedCooking.depositorName}
                    totalAmount={selectedCooking.totalPrice || 0}
                    menuDetails={selectedCooking.menuDetails}
                    onClose={handleCloseCookingDetail}
                    onSuccess={refetch}
                  />
                )}
              </div>
            </div>
          )}

          {mobileActiveTab === "조리 완료" && (
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden w-full">
              <div className="flex flex-row pl-5 py-2.5 gap-2.5 bg-[#E7ECF0] rounded-t-2xl border border-black-25 items-center text-14-medium leading-[136%] text-navy-35 flex-shrink-0">
                <div className="flex">테이블</div>
                <div className="flex max-[376px]:w-20 w-29">금액</div>
                <div className="flex">주문 시간</div>
              </div>
              <div
                className={`flex flex-col bg-white rounded-b-2xl border-t-0 border-black-25 border flex-1 min-h-0 relative ${
                  selectedPayment && mobileActiveTab === "조리 완료"
                    ? "overflow-hidden"
                    : "overflow-y-auto"
                }`}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-5 py-4">
                    <DropdownLoader />
                  </div>
                ) : cookedData.length > 0 ? (
                  cookedData.map((cooked) => (
                    <CookedCard
                      key={cooked.id}
                      orderId={cooked.id}
                      tableNumber={cooked.tableId}
                      depositorName={cooked.depositorName}
                      menuDetails={cooked.menuDetails}
                      totalAmount={cooked.totalPrice || 0}
                      createdAt={getFormattedTime(cooked.createdAt)}
                      onSuccess={refetch}
                      onClick={() => handleCookedCardClick(cooked)}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center px-5 py-4">
                    <div className="text-16-medium text-black-60">
                      {error
                        ? "데이터를 불러오지 못했습니다."
                        : "조리 완료된 주문이 없어요!"}
                    </div>
                  </div>
                )}

                {/* DetailCard 오버레이 */}
                {selectedPayment && mobileActiveTab === "조리 완료" && (
                  <DetailCard
                    type="cooked"
                    orderId={selectedPayment.id}
                    tableNumber={selectedPayment.tableId}
                    timeText={getFormattedDateTime(selectedPayment.createdAt)}
                    depositorName={selectedPayment.depositorName}
                    totalAmount={selectedPayment.totalPrice || 0}
                    menuDetails={selectedPayment.menuDetails}
                    onClose={handleClosePaymentDetail}
                    onSuccess={refetch}
                  />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminOrders;
