import { useState } from "react";
import QuantitySelector from "../../../components/common/QuantitySelector";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import BackOnlyHeader from "../../../components/BackOnlyHeader";

const WaitingPartySizeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [partySize, setPartySize] = useState(1);

  return (
    <div>
      <BackOnlyHeader />
      <div className="px-5 mt-[38px]">
        <h1 className="text-headline-24-bold mb-[50px]">
          대기 등록을 위해
          <br />
          인원 수를 입력해주세요
        </h1>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-title-20-semibold">입장 인원</h1>
          <QuantitySelector
            mode="state"
            quantity={partySize}
            setQuantity={setPartySize}
          />
        </div>
      </div>
      <PageFooterButton>
        <Button
          onClick={() =>
            navigate(`/store/${id}/waiting/summary`, { state: partySize })
          }
        >
          다음
        </Button>
      </PageFooterButton>
    </div>
  );
};

export default WaitingPartySizeForm;
