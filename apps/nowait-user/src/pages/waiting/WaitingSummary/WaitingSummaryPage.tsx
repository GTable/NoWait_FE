import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@repo/ui";
import {
  createReservation,
  getMyReservations,
  getStore,
} from "../../../api/reservation";
import PageFooterButton from "../../../components/order/PageFooterButton";
import useThrottle from "../../../hooks/useThrottle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BackOnlyHeader from "../../../components/BackOnlyHeader";
import { WAITING_GUIDE } from "../../../constants/guides";
import FullPageLoader from "../../../components/FullPageLoader";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useModal from "../../../hooks/useModal";
import Portal from "../../../components/common/modal/Portal";

const WaitingSummaryPage = () => {
  const navigate = useNavigate();
  const { id: storeId } = useParams();
  const [searchParams] = useSearchParams();
  const partySize = Number(searchParams.get("partySize"));
  const [reservationIsLoading, setReservationIsLoading] = useState(false);
  const modal = useModal();
  const MAX_RESERVATIONS = 3;

  const { data: store, isLoading } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId!),
    select: (data) => data?.response,
  });

  const { data: myReservations } = useQuery({
    queryKey: ["myReservations"],
    queryFn: getMyReservations,
    select: (data) => data.response,
  });

  const handleSubmitReservation = useThrottle(async () => {
    if (myReservations?.length >= MAX_RESERVATIONS) {
      modal.open();
      return;
    }
    try {
      setReservationIsLoading(true);
      const payload = {
        partySize,
      };
      const res = await createReservation(Number(store?.storeId!), payload);
      console.log(res, "예약 응답");
      navigate(`/store/${storeId}/waiting/success`, { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setReservationIsLoading(false);
    }
  }, 3000);

  if (isLoading) return <FullPageLoader />;

  return (
    <>
      <div className="flex flex-col min-h-dvh">
        <BackOnlyHeader />
        <div className="flex flex-col flex-1">
          <div className="px-5 mt-[74px]">
            <h1 className="text-headline-24-bold mb-[40px]">
              현재 <span className="text-primary">{store?.waitingCount}</span>
              팀이
              <br />
              대기하고 있어요
            </h1>
            <div className="p-5.5 rounded-[16px] bg-black-10 mb-[30px]">
              <div className="flex justify-between items-start mb-2.5 ">
                <p className="text-16-semibold text-black-50">부스</p>
                <div className="max-w-[205px] text-16-medium text-black-90 text-right break-keep">
                  <p className="inline">{store?.name} / </p>
                  <span
                    className={`${
                      store!.departmentName.length > 14 ? "block" : "inline"
                    } w-[100%] truncate`}
                  >
                    {store?.departmentName}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-16-semibold text-black-50">입장 인원</p>
                <p className="text-16-medium text-black-90">{partySize}명</p>
              </div>
            </div>
          </div>
          <div className="bg-black-10 px-5 py-[30px] flex-grow">
            <h1 className="text-title-14-semibold text-black-80 mb-[12px]">
              대기 등록 전 꼭 확인해주세요
            </h1>
            <ul>
              {WAITING_GUIDE.map((guide, i) => {
                return (
                  <li
                    key={i}
                    className="text-[14px] text-regular text-black-60 mb-[12px] whitespace-pre-line break-keep list-disc ml-[24px]"
                  >
                    {guide.description}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <PageFooterButton background="transparent">
          <Button onClick={handleSubmitReservation}>
            {reservationIsLoading ? (
              <LoadingSpinner loadingType="dotsWhite" />
            ) : (
              "등록하기"
            )}
          </Button>
        </PageFooterButton>
      </div>
      {modal.isOpen && myReservations.length >= MAX_RESERVATIONS && (
        <Portal>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => modal.close()}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[calc(100%-40px)] max-w-[430px] bg-white rounded-[20px] px-[22px] pt-[30px] pb-[22px]">
              <h1 className="text-title-20-bold text-black-90 text-center mb-[20px] break-keep">
                주점 웨이팅은 <br />
                {MAX_RESERVATIONS}개까지 가능 합니다
              </h1>
              <Button
                backgroundColor="#F4F4F4"
                textColor="#666666"
                onClick={() => navigate(`/store/${storeId}`, { replace: true })}
              >
                홈으로 가기
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default WaitingSummaryPage;
