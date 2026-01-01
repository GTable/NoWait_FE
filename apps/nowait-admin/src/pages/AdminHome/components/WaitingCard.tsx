import CloseButton from "../../../components/closeButton";
import callIcon from "../../../assets/Call.svg";
import openDoorIcon from "../../../assets/door_open.svg";
import alarmIcon from "../../../assets/alarm.svg";
import { memo, useEffect, useState } from "react";

const totalDurationSec = 10; // 10초, 10분은 600

type WaitingCardStatus = "WAITING" | "CALLING" | "CONFIRMED" | "CANCELLED";
interface WaitingCardProps {
  number: number;
  time: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phoneNumber: string;
  status: WaitingCardStatus;
  calledAt: string | undefined;
  requestedAt?: string;
  confirmedAt?: string;
  cancelledAt?: string;
  isNoShow: boolean;
  onCall: () => void;
  onEnter: () => void;
  onClose: () => void;
  onNoShow: () => void;
  onDelete: () => void;
}
const truncateName = (name: string, maxLength: number = 3) => {
  return name?.length > maxLength ? name.slice(0, maxLength) + "..." : name;
};

const diffMinutes = (start?: string, end?: string) => {
  if (!start || !end) return 0;
  return Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) / 60000
  );
};

const areEqual = (prev: WaitingCardProps, next: WaitingCardProps) => {
  return (
    prev.number === next.number &&
    prev.time === next.time &&
    prev.waitMinutes === next.waitMinutes &&
    prev.peopleCount === next.peopleCount &&
    prev.name === next.name &&
    prev.phoneNumber === next.phoneNumber &&
    prev.status === next.status &&
    prev.requestedAt === next.requestedAt &&
    prev.calledAt === next.calledAt &&
    prev.confirmedAt === next.confirmedAt &&
    prev.cancelledAt === next.cancelledAt &&
    prev.isNoShow === next.isNoShow
  );
};

export const WaitingCard = memo(function WaitingCard({
  number,
  time,
  waitMinutes,
  peopleCount,
  name,
  phoneNumber,
  status,
  requestedAt,
  calledAt,
  confirmedAt,
  cancelledAt,
  isNoShow,
  onCall,
  onEnter,
  onClose,
  onNoShow,
  onDelete,
}: WaitingCardProps) {
  const [elapsed, setElapsed] = useState("10:00");
  console.log(time, "카드 생성 시간?");

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

        // 시간이 다 되면 노쇼 처리
        if (remainingSec === 0) {
          onNoShow();
        }
      };

      updateElapsed(); // 최초 계산
      const interval = setInterval(updateElapsed, 1000);
      return () => clearInterval(interval);
    }
  }, [status, calledAt]);

  return (
    <div className="w-full relative h-[200px] bg-white rounded-[16px] px-6 py-[18px]  ">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <p className="text-20-bold text-black-80">
          #{number < 10 ? `0${number}` : number}번
        </p>
        <div className="flex items-center text-13-medium text-black-50">
          <span>
            {status === "CONFIRMED" && confirmedAt
              ? `${new Date(
                  new Date(confirmedAt).getTime() + 9 * 60 * 60 * 1000
                ).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}`
              : status === "CANCELLED" && cancelledAt
              ? `${new Date(
                  new Date(cancelledAt).getTime() + 9 * 60 * 60 * 1000
                ).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}`
              : time}
          </span>
          <span className="px-[2px]">·</span>
          <span>
            {status === "CONFIRMED" && confirmedAt
              ? `${diffMinutes(
                  requestedAt,
                  new Date(
                    new Date(confirmedAt).getTime() + 9 * 60 * 60 * 1000
                  ).toString()
                )}분 대기`
              : status === "CANCELLED" && cancelledAt
              ? `${diffMinutes(
                  requestedAt,
                  new Date(
                    new Date(cancelledAt).getTime() + 9 * 60 * 60 * 1000
                  ).toString()
                )}분 대기`
              : `${waitMinutes}분 대기 중`}
          </span>
          {(status === "WAITING" || status === "CALLING") && (
            <CloseButton onClick={onDelete} />
          )}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex justify-between text-left rounded-lg overflow-hidden mb-4">
        {/* 입장인원 */}
        <div className="flex flex-col py-2 w-[15%]">
          <div className="text-14-medium text-black-60 mb-1">인원</div>
          <div className="text-17-bold text-black-85">{peopleCount}명</div>
        </div>
        <div className="w-px bg-black-10 mr-[5%]" />
        {/* 이름 */}
        <div className="flex flex-col py-2 w-[25%]">
          <div className="text-14-medium text-black-60 mb-1">이름</div>
          <div className="text-17-bold text-black-85">{truncateName(name)}</div>
        </div>
        <div className="w-px bg-black-10 mr-[5%]" />
        {/* 전화번호 */}
        <div className="flex flex-col py-2 w-[50%]">
          <div className="text-14-medium text-black-60 mb-1">전화번호</div>
          <div className="text-17-bold text-black-85">
            {phoneNumber === "" ? "010-****-****" : phoneNumber}
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center gap-[8px]">
        {status === "WAITING" && (
          <>
            <button
              onClick={onCall}
              className="w-[60%] bg-[#FFF0EB] py-2 rounded-[8px] flex justify-center items-center gap-1"
            >
              <img src={callIcon} />{" "}
              <span className="text-[#FF6736] text-15-semibold">호출</span>
            </button>
            <button
              onClick={onEnter}
              className="w-[35%] bg-[#E8F3FF] text-15-semibold text-[#2C7CF6] py-2 rounded-[8px] flex justify-center items-center gap-1"
            >
              <img src={openDoorIcon} /> 입장
            </button>
          </>
        )}

        {status === "CALLING" &&
          (isNoShow === true ? (
            <>
              <button
                onClick={onClose}
                className="w-[60%] bg-black-30 text-black-80 text-15-semibold rounded-[8px] flex justify-center items-center py-2"
              >
                미입장
              </button>
              <button
                onClick={onEnter}
                className="w-[35%] bg-[#E8F3FF] text-[#2C7CF6] text-15-semibold py-2 rounded-[8px] flex justify-center items-center gap-1"
              >
                <img src={openDoorIcon} /> 입장
              </button>
            </>
          ) : (
            <>
              <div className="w-[60%] bg-black-15 text-black-60 text-15-semibold py-2 rounded-[8px] flex justify-center items-center gap-1">
                <img src={alarmIcon} /> <span>{elapsed}</span>
              </div>
              <button
                onClick={onEnter}
                className="w-[35%] bg-[#E8F3FF] text-[#2C7CF6] text-15-semibold py-2 rounded-[8px] flex justify-center items-center gap-1"
              >
                입장
              </button>
            </>
          ))}

        {status === "CANCELLED" && (
          <div className="w-full bg-black-5 text-black-40 text-15-semibold rounded-[8px] flex justify-center items-center py-2">
            취소된 입장
          </div>
        )}

        {status === "CONFIRMED" && (
          <div className="w-full bg-black-5 text-black-40 text-15-semibold rounded-[8px] flex justify-center items-center py-2">
            완료된 입장
          </div>
        )}
      </div>
    </div>
  );
}, areEqual);
