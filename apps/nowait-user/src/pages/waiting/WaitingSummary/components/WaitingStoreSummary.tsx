interface Props {
  name: string;
  departmentName: string;
  partySize: number;
}

const WaitingStoreSummary = ({ name, departmentName, partySize }: Props) => {
  return (
    <div className="p-5.5 rounded-2xl bg-black-10 mb-[30px]">
      <div className="flex justify-between items-start mb-2.5">
        <p className="text-16-semibold text-black-50">부스</p>
        <div className="max-w-[205px] text-16-medium text-black-90 text-right break-keep">
          <p className="inline">{name} / </p>
          <span
            className={`${departmentName.length > 14 ? "block" : "inline"} truncate`}
          >
            {departmentName}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-16-semibold text-black-50">입장 인원</p>
        <p className="text-16-medium text-black-90">{partySize}명</p>
      </div>
    </div>
  );
};

export default WaitingStoreSummary;
