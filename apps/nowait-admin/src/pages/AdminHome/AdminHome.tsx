import { useState } from "react";
import RedBadge from "../../components/RedBadge";
import CardBox from "./components/CardBox";
import RoundTabButton from "./components/RoundTabButton";
import refreshIcon from "../../assets/refresh.svg";
import { WaitingCard } from "./components/WaitingCard";

const AdminHome = () => {
  const handleCall = () => alert("🔔 고객 호출");
  const handleEnter = () => alert("🏢 고객 입장 처리");
  const handleClose = () => alert("❌ 카드 닫기");
  const [activeTab, setActiveTab] = useState("전체 보기");

  return (
    <div className="space-y-6">
      <section
        id="대기 현황"
        className="flex [@media(min-width:375px)]:px-[0px] [@media(max-width:431px)]:px-[20px]"
      >
        <div className="flex flex-col w-full">
          <h1 className="title-20-bold mb-5">대기 현황</h1>
          <div className="flex [@media(max-width:431px)]:justify-between">
            <CardBox title="대기 팀 수" count={14} bottomLabel="호출 중 3팀" />
            <CardBox title="입장 완료" count={6} bottomLabel="대기 취소 1팀" />
          </div>
        </div>
      </section>

      <section
        id="대기자 목록"
        className="flex flex-col [@media(min-width:375px)]:px-[0px] [@media(max-width:431px)] px-[20px]"
      >
        <h1 className="title-20-bold mb-5">대기자 목록</h1>
        <div
          className="flex justify-between items-center
      "
        >
          <div className="flex flex-wrap gap-2">
            {["전체 보기", "대기 중", "호출 중", "입장 완료", "대기 취소"].map(
              (label) => (
                <RoundTabButton
                  key={label}
                  label={label}
                  active={activeTab === label}
                  onClick={() => setActiveTab(label)}
                />
              )
            )}
          </div>
          <div className="hover:rotate-90 transition-transform duration-500 cursor-pointer">
            <img
              src={refreshIcon}
              className="[@media(max-width:431px)]:hidden"
            />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 [@media(max-width:431px)]:place-items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <WaitingCard
            key={i}
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
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
