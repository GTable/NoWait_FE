import CloseButton from "../../../components/closeButton";
import callIcon from "../../../assets/Call.svg";
import openDoorIcon from "../../../assets/door_open.svg";

interface WaitingCardProps {
  number: number;
  time: string;
  waitMinutes: number;
  peopleCount: number;
  name: string;
  phone: string;
  onCall?: () => void;
  onEnter?: () => void;
  onClose?: () => void;
}

export function WaitingCard({
  number,
  time,
  waitMinutes,
  peopleCount,
  name,
  phone,
  onCall,
  onEnter,
  onClose,
}: WaitingCardProps) {
  return (
    <div className="shadow-[0_10px_20px_rgba(0,0,0,0.25)] relative w-[329px] w-[300px] lg:w-[372px] h-[200px] bg-white rounded-[16px] shadow-soft px-6 py-[18px]">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-4">
        <p className="text-title-18-bold text-black-80">
          #{number < 10 ? `0${number}` : number}번
        </p>
        <div className="flex items-center gap-2 text-text-12-medium text-black-50">
          <span>{time}</span>
          <span>· {waitMinutes}분 대기 중</span>
          {onClose && <CloseButton onClick={onClose} />}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex justify-between text-left rounded-lg overflow-hidden mb-4">
        {/* 입장인원 */}
        <div className="flex flex-col py-2 w-[20%]">
          <div className="text-12-medium text-black-40 mb-1">입장인원</div>
          <div className="text-15-semibold text-black-80">{peopleCount}명</div>
        </div>
        <div className="w-px bg-black-10 mr-[5%]" />
        {/* 이름 */}
        <div className="flex flex-col py-2 w-[20%]">
          <div className="text-12-medium text-black-40 mb-1">이름</div>
          <div className="text-15-semibold text-black-80">{name}</div>
        </div>
        <div className="w-px bg-black-10 mr-[5%]" />
        {/* 전화번호 */}
        <div className="flex flex-col py-2 w-[50%]">
          <div className="text-12-medium text-black-40 mb-1">전화번호</div>
          <div className="text-15-semibold text-black-80">{phone}</div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between">
        <button
          onClick={onCall}
          className="flex w-[60%] bg-[#FFF0EB] text-[#FF6736] p-[4px] rounded-[8px] text-14-medium flex justify-center items-center"
        >
          <span className="text-lg">
            <img src={callIcon} />
          </span>{" "}
          호출
        </button>
        <button
          onClick={onEnter}
          className="flex w-[35%] py-2 rounded-[8px] bg-[#E8F3FF] text-[#2C7CF6] font-semibold text-14-medium flex justify-center items-center gap-1 bg-primary/20"
        >
          <span className="text-lg">
            <img src={openDoorIcon} />
          </span>{" "}
          입장
        </button>
      </div>
    </div>
  );
}
