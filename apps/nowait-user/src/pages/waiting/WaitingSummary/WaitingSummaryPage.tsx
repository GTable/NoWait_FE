import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@repo/ui";
import PageFooterButton from "../../../components/order/PageFooterButton";
import useThrottle from "../../../hooks/useThrottle";
import { useState } from "react";
import BackOnlyHeader from "../../../components/BackOnlyHeader";
import FullPageLoader from "../../../components/FullPageLoader";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useModal from "../../../hooks/useModal";
import MaxReservationModal from "./components/MaxReservationModal";
import WaitingGuide from "./components/WaitingGuide";
import WaitingStoreSummary from "./components/WaitingStoreSummary";
import { useWaitingSummary } from "./hooks/useWaitingSummary";

const WaitingSummaryPage = () => {
  const navigate = useNavigate();
  const { id: storeId } = useParams();
  const [searchParams] = useSearchParams();
  const partySize = Number(searchParams.get("partySize"));
  const [reservationIsLoading, setReservationIsLoading] = useState(false);
  const modal = useModal();
  
  const {
    store,
    isStoreLoading,
    myReservations,
    canCreateReservation,
    createWaiting,
    MAX_RESERVATIONS,
  } = useWaitingSummary(storeId);

  const handleSubmit = useThrottle(async () => {
    if (!canCreateReservation) {
      modal.open();
      return;
    }

    try {
      setReservationIsLoading(true);
      await createWaiting(partySize);
      navigate(`/store/${storeId}/waiting/success`, { replace: true });
    } finally {
      setReservationIsLoading(false);
    }
  }, 3000);

  if (isStoreLoading) return <FullPageLoader />;

  return (
    <>
      <div className="flex flex-col min-h-dvh">
        <BackOnlyHeader />
        <div className="flex flex-col flex-1">
          <div className="px-5 mt-[74px]">
            <h1 className="text-headline-24-bold mb-10">
              현재 <span className="text-primary">{store?.waitingCount}</span>
              팀이
              <br />
              대기하고 있어요
            </h1>
            <WaitingStoreSummary
              name={store!.name}
              departmentName={store!.departmentName}
              partySize={partySize}
            />
          </div>
          <WaitingGuide />
        </div>
        <PageFooterButton background="transparent">
          <Button onClick={handleSubmit}>
            {reservationIsLoading ? (
              <LoadingSpinner loadingType="dotsWhite" />
            ) : (
              "등록하기"
            )}
          </Button>
        </PageFooterButton>
      </div>
      {modal.isOpen && myReservations.length >= MAX_RESERVATIONS && (
        <MaxReservationModal
          isOpen={modal.isOpen}
          max={MAX_RESERVATIONS}
          onClose={modal.close}
          onGoHome={() => navigate(`/store/${storeId}`, { replace: true })}
        />
      )}
    </>
  );
};

export default WaitingSummaryPage;
