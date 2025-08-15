import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@repo/ui";
import { createReservation, getStore } from "../../../api/reservation";
import PageFooterButton from "../../../components/order/PageFooterButton";
import useThrottle from "../../../hooks/useThrottle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BackOnlyHeader from "../../../components/BackOnlyHeader";

const WaitingSummaryPage = () => {
  const navigate = useNavigate();
  const { id: storeId } = useParams();
  const partySize = useLocation().state as number;
  const [isLoading, setIsLoading] = useState(false);
  const { data: store } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => getStore(storeId ? parseInt(storeId) : undefined),
    select: (data) => data.response,
  });

  const handleSubmitReservation = useThrottle(async () => {
    try {
      setIsLoading(true);
      const payload = {
        partySize,
      };
      const res = await createReservation(parseInt(storeId!), payload);
      console.log(res, "예약 응답");
      navigate(`/store/${storeId}/waiting/success`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(true);
    }
  }, 3000);
  return (
    <div>
      <BackOnlyHeader />
      <div className="px-5 mt-[38px]">
        <h1 className="text-headline-24-bold mb-[40px]">
          현재 <span className="text-primary">{store?.waitingCount}</span>팀이
          <br />
          대기하고 있어요
        </h1>
        <div className="p-5.5 rounded-[16px] bg-black-10">
          <div className="flex justify-between items-center mb-2.5">
            <p className="text-16-semibold text-black-50">부스</p>
            <p className="text-16-medium text-black-90">
              {store?.name} / {store?.waitingCount}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-16-semibold text-black-50">입장 인원</p>
            <p className="text-16-medium text-black-90">{partySize}명</p>
          </div>
        </div>
      </div>
      <PageFooterButton>
        <Button onClick={handleSubmitReservation}>
          {isLoading ? "등록중...." : "등록하기"}
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default WaitingSummaryPage;
