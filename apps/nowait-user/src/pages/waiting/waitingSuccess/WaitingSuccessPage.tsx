import SuccessMessagePage from "../../../components/common/SuccessMessagePage";
import { useNavigate } from "react-router-dom";
import WaitingSuccess from "../../../assets/waitingSuccess.svg?react";

const WaitingSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <SuccessMessagePage
      ImageSrc={WaitingSuccess}
      imageAlt="대기 등록 완료 이미지"
      width="227px"
      height="150px"
      title="대기 등록 완료"
      message={`원활한 운영을 위해 호출시\n10분 이내로 입장해주세요!`}
      onClick={() => navigate("/", { replace: true })}
      buttonText="확인"
    />
  );
};

export default WaitingSuccessPage;
