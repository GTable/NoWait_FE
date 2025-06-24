import SuccessMessagePage from "../../components/common/SuccessMessagePage";
import { useNavigate } from "react-router-dom";

const ReserveSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <SuccessMessagePage
      imageSrc=""
      imageAlt="대기 등록 완료 이미지"
      title="대기 등록 완료"
      message={`원활한 운영을 위해 호출시\n10분 이내로 입장해주세요!`}
      onClick={() => navigate("/")}
      buttonText="확인"
    />
  );
};

export default ReserveSuccessPage;
