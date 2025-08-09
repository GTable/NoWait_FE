import { SmallActionButton } from "../SmallActionButton";
import { useNavigate, useParams } from "react-router-dom";
import CenteredContentLayout from "../layout/CenteredContentLayout";

interface PropsType {
  imageSrc: string;
  imageAlt: string;
  title: string;
  message: string;
  onClick: () => void;
  buttonText: string;
}

const SuccessMessagePage = ({
  imageSrc,
  imageAlt,
  title,
  message,
  onClick,
  buttonText,
}: PropsType) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  return (
    <CenteredContentLayout onClick={onClick} buttonText={buttonText}>
      <img src={imageSrc} alt={imageAlt} width="150px" height="150px" />
      <h1 className="text-headline-24-bold mb-2">{title}</h1>
      <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-3.5">
        {message}
      </h2>
      {storeId && (
        <SmallActionButton
          type="button"
          ariaLabel="주문내역 확인"
          onClick={() => navigate(`/${storeId}/orderDetails`)}
        >
          주문내역 확인
        </SmallActionButton>
      )}
    </CenteredContentLayout>
  );
};

export default SuccessMessagePage;
