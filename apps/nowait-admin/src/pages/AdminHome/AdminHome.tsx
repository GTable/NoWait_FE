import { WaitingCard } from "./components/WaitingCard";
import CardBox from "./components/CardBox";
import RoundTabButton from "./components/RoundTabButton";
import { useState } from "react";
import RedBadge from "../../components/RedBadge";
import ImageBox from "../../components/ImageBox";

const AdminHome = () => {
  const handleCall = () => alert("🔔 고객 호출");
  const handleEnter = () => alert("🏢 고객 입장 처리");
  const handleClose = () => alert("❌ 카드 닫기");
  const [activeTab, setActiveTab] = useState("전체 보기");
  return (
    <div>
      <RedBadge label="웨이팅 관리" />
      <WaitingCard
        number={1}
        time="오후 7:49"
        waitMinutes={3}
        peopleCount={3}
        name="김노웻"
        phone="010-9986-4830"
        onCall={handleCall}
        onEnter={handleEnter}
        onClose={handleClose}
      />
      <CardBox title="입장 완료" count={6} bottomLabel="대기 취소 1팀" />
      <CardBox title="대기 팀 수" count={14} bottomLabel="호출 중 3팀" />
      <div className="flex gap-2">
        <RoundTabButton
          label="전체 보기"
          active={activeTab === "전체 보기"}
          onClick={() => setActiveTab("전체 보기")}
        />
        <RoundTabButton
          label="대기 중"
          active={activeTab === "대기 중"}
          onClick={() => setActiveTab("대기 중")}
        />
      </div>
    </div>
  );
};

export default AdminHome;
