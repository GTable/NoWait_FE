import CloseButton from "../../../components/closeButton";
import callIcon from "../../../assets/Call.svg";
import openDoorIcon from "../../../assets/door_open.svg";
import { useEffect, useState } from "react";

const totalDurationSec = 600;
type WaitingCardStatus = "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED";
interface WaitingCardProps {
  number: number;
  time: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phone: string;
  status: WaitingCardStatus;
  calledAt: string | undefined;
  isNoShow: boolean;
  onCall: () => void;
  onEnter: () => void;
  onClose: () => void;
  onNoShow: () => void;
  onDelete: () => void;
}
const truncateName = (name: string, maxLength: number = 3) => {
  return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
};

export function WaitingCard({
  number,
  time,
  waitMinutes,
  peopleCount,
  name,
  phone,
  status,
  calledAt,
  isNoShow,
  onCall,
  onEnter,
  onClose,
  onNoShow,
  onDelete,
}: WaitingCardProps) {
  const [elapsed, setElapsed] = useState("10:00");

  useEffect(() => {
    if (status === "CALLING") {
      const timer = setTimeout(() => {
        onNoShow();
      }, 10 * 1 * 1000); // 테스트용 10초

      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    if (status === "CALLING" && calledAt) {
      const start = new Date(calledAt).getTime();

      const updateElapsed = () => {
        const now = Date.now();
        const diffSec = Math.floor((now - start) / 1000);
        const remainingSec = Math.max(totalDurationSec - diffSec, 0); // 음수 방지

        const min = String(Math.floor(remainingSec / 60)).padStart(2, "0");
        const sec = String(remainingSec % 60).padStart(2, "0");
        setElapsed(`${min}:${sec}`);
      };

      updateElapsed(); // 최초 계산
      const interval = setInterval(updateElapsed, 1000);
      return () => clearInterval(interval);
    }
  }, [status, calledAt]);
  return (
    <div className="[@media(max-width:431px)]:w-[335px] [@media(min-width:768px)_and_(max-width:821px)]:w-[329px] relative lg:w-[372px] h-[200px] bg-white rounded-[16px] px-6 py-[18px]">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <p className="text-title-20-bold text-black-80">
          #{number < 10 ? `0${number}` : number}번
        </p>
        <div className="flex items-center gap-2 text-13-medium text-black-50">
          <span>{time}</span>
          <span>· {waitMinutes}분 대기 중</span>
          {<CloseButton onClick={onDelete} />}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex justify-between text-left rounded-lg overflow-hidden mb-4">
        {/* 입장인원 */}
        <div className="flex flex-col py-2 w-[20%]">
          <div className="text-14-medium text-black-60 mb-1">입장인원</div>
          <div className="text-title-17-bold text-black-80">
            {peopleCount}명
          </div>
        </div>
        <div className="w-px bg-black-10 mr-[5%]" />
        {/* 이름 */}
        <div className="flex flex-col py-2 w-[20%]">
          <div className="text-14-medium text-black-60 mb-1">이름</div>
          <div className="text-title-17-bold text-black-80">
            {truncateName(name)}
          </div>
        </div>
        <div className="w-px bg-black-10 mr-[5%]" />
        {/* 전화번호 */}
        <div className="flex flex-col py-2 w-[50%]">
          <div className="text-14-medium text-black-60 mb-1">전화번호</div>
          <div className="text-title-17-bold text-black-80">{phone}</div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between">
        {status === "WAITING" && (
          <>
            <button
              onClick={onCall}
              className="w-[60%] bg-[#FFF0EB] text-[#FF6736] py-2 rounded-[8px] flex justify-center items-center gap-1"
            >
              <img src={callIcon} /> 호출
            </button>
            <button
              onClick={onEnter}
              className="w-[35%] bg-[#E8F3FF] text-[#2C7CF6] py-2 rounded-[8px] flex justify-center items-center gap-1"
            >
              <img src={openDoorIcon} /> 입장
            </button>
          </>
        )}

        {status === "CALLING" &&
          (isNoShow === true ? (
            <div
              className="w-full bg-black-5 text-black-40 rounded-[8px] flex justify-center items-center py-2"
              onClick={onClose}
            >
              미입장
            </div>
          ) : (
            <>
              <div className="w-[60%] bg-black-15 text-black-60 py-2 rounded-[8px] flex justify-center items-center gap-1">
                ⏱ {elapsed}
              </div>
              <button
                onClick={onEnter}
                className="w-[35%] bg-[#E8F3FF] text-[#2C7CF6] py-2 rounded-[8px] flex justify-center items-center gap-1"
              >
                입장
              </button>
            </>
          ))}

        {status === "CANCELLED" && (
          <div className="w-full bg-black-5 text-black-40 rounded-[8px] flex justify-center items-center py-2">
            취소된 입장
          </div>
        )}

        {status === "CONFIRMED" && (
          <div className="w-full bg-black-5 text-black-40 rounded-[8px] flex justify-center items-center py-2">
            완료된 입장
          </div>
        )}
      </div>
    </div>
  );
}
