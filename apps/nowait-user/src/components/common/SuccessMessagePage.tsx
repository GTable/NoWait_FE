import { SmallActionButton } from "../SmallActionButton";
import { useNavigate, useParams } from "react-router-dom";
import CenteredContentLayout from "../layout/CenteredContentLayout";

interface PropsType {
  ImageSrc: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  imageAlt: string;
  width?: string;
  height?: string;
  title: string;
  message: string;
  onClick: () => void;
  buttonText: string;
}

const SuccessMessagePage = ({
  ImageSrc,
  imageAlt,
  width = "150px",
  height = "150px",
  title,
  message,
  onClick,
  buttonText,
}: PropsType) => {
  const navigate = useNavigate();
  const { storeId } = useParams();

  return (
    <CenteredContentLayout onClick={onClick} buttonText={buttonText}>
      {typeof ImageSrc === "string" ? (
        <img src={ImageSrc} alt={imageAlt} width={width} height={height} />
      ) : (
        <ImageSrc width={width} height={height} aria-label={imageAlt} />
      )}
      <h1 className="text-headline-24-bold mb-2">{title}</h1>
      <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-3.5">
        {message}
      </h2>
      {storeId && (
        <SmallActionButton
          type="button"
          ariaLabel="주문내역 확인"
          onClick={() =>
            navigate(`/${storeId}/orderDetails`, { replace: true })
          }
        >
          주문내역 확인
        </SmallActionButton>
      )}
    </CenteredContentLayout>
  );
};

export default SuccessMessagePage;
