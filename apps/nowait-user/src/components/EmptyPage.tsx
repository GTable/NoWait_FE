import { useNavigate, useParams } from "react-router-dom";
import { SmallActionButton } from "./SmallActionButton";
import Add from "../assets/icon/Add.svg?react";
import BackOnlyHeader from "./BackOnlyHeader";

interface PropsType {
  mode: "default" | "orderDetails";
  title: string;
  buttonText: string;
}

const EmptyPage = ({ mode, title, buttonText }: PropsType) => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  return (
    <div>
      <BackOnlyHeader />
      <div
        className={`min-h-screen flex flex-col justify-center items-center ${
          mode === "default" ? "bg-white" : "bg-black-15"
        }`}
      >
        <h1 className="whitespace-pre-line text-16-regular text-black-80 mb-5 text-center">
          {title}
        </h1>
        <SmallActionButton
          mode={mode}
          type="button"
          ariaLabel="주문하기"
          onClick={() => navigate(`/${storeId}`)}
        >
          <h1>{buttonText}</h1>
          <span className="block w-4 h-4 mb-0.5">
            <Add className="w-full h-full" fill="currentColor" />
          </span>
        </SmallActionButton>
      </div>
    </div>
  );
};

export default EmptyPage;
