import block from "../../../assets/block.png";

interface HomeWaitingCardProps {
  storeName: string;
  queueNumber: number;
}

const HomeWaitingCard = ({ storeName, queueNumber }: HomeWaitingCardProps) => {
  return (
    <div className="bg-primary flex text-start pl-5.25 pb-2.75 relative overflow-hidden w-full">
      <div className="flex flex-col">
        <div className="mt-7 text-14-medium text-black-100">현재 내 순서</div>
        <div className="mt-1 text-title-20-bold text-black-100">
          {storeName}
        </div>
        <div className="mt-9 text-black-100 font-bold tracking-[-0.02em] text-xl">
          <span className="font-work-sans text-[54px] font-semibold tracking-[-0.03em] pr-0.5">
            {queueNumber}
          </span>
          번째
        </div>
      </div>
      <div className="mt-12 ml-4.5 absolute bottom-0 right-0">
        <img src={block} alt="block" className="icon-l w-44 h-34" />
      </div>
    </div>
  );
};

export default HomeWaitingCard;
