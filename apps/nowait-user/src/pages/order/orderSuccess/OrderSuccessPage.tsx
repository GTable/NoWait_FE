import { useNavigate, useParams } from "react-router-dom";
import SuccessMessagePage from "../../../components/common/SuccessMessagePage";
import OrderSuccess from "../../../assets/orderSuccess.webp";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  return (
    <SuccessMessagePage
      imageSrc={OrderSuccess}
      imageAlt="주문 완료 이미지"
      title="주문이 접수되었어요!"
      message={`입금 확인 후 조리를 진행할게요.\n조금만 기다려 주세요.`}
      onClick={() => navigate(`/${storeId}`, { replace: true })}
      buttonText="확인"
    />
  );
};

export default OrderSuccessPage;
