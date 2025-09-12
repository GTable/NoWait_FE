import { useNavigate } from "react-router-dom";
import Back from "../assets/icon/back.svg?react";

interface PropsType {
  title: string;
}

const BackHeader = ({ title }: PropsType) => {
  const navigate = useNavigate()
  return (
    <header className="w-full fixed left-0 top-0 bg-white z-50">
      <div className="flex justify-between items-center">
        <button onClick={()=>navigate(-1)} className="p-2.5">
          <Back />
        </button>
        <h1 className="text-title-16-bold">{title}</h1>
        <div className="w-[48px] h-[48px]"></div>
      </div>
    </header>
  );
};

export default BackHeader;
