import { useLocation } from "react-router-dom";
import BackHeader from "../../../components/BackHeader";

const StoreNoticePage = () => {
  const location = useLocation();
  const { notice } = location.state;
  return (
    <div>
      <BackHeader title="공지사항" />
      <section className="px-5 py-[30px] mt-[38px]">
        <h1 className="text-title-18-bold text-black-90 mb-4">입장 시 신분증 검사 필수</h1>
        <p className="text-16-regular text-black-80 break-keep">{notice}여기가 설명이 들어갈 곳입니다. 여기가 설명이 들어갈 곳입니다.여기가 설명이 들어갈 곳입니다.여기가 설명이 들어갈 곳입니다.여기가 설명이 들어갈 곳입니다.여기가 설명이 들어갈 곳입니다.여기가 설명이 들어갈 곳입니다.</p>
      </section>
    </div>
  );
};

export default StoreNoticePage;
