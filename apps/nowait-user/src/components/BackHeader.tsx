import { useNavigate } from "react-router-dom";
import Back from "../assets/icon/back.svg?react";

interface PropsType {
  title: string;
}

const BackHeader = ({ title }: PropsType) => {
  const navigate = useNavigate()
  return (
    <header className="sticky left-0 top-0 bg-white">
      <div className="flex justify-between items-center px-5 py-2.5">
        <button onClick={()=>navigate(-1)}>
          <Back />
        </button>
        <h1 className="text-title-16-bold">{title}</h1>
        <div className="w-2.5"></div>
      </div>
    </header>
  );
};

export default BackHeader;
