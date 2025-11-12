import Help from "../../../../assets/icon/help.svg?react";

const RemitOptionsSkeleton = () => {
  return (
    <div className="my-[30px]">
      <h1 className="text-title-18-semibold flex items-center gap-1 pb-5">
        송금 수단
        <span>
          <Help />
        </span>
      </h1>
      <div className="flex flex-col rounded-2xl bg-[#F9F9F9] px-5 py-5">
        <h1 className="text-14-medium text-black-60 mb-5">간편 송금</h1>
        <ul className="flex flex-col gap-y-5">
          {Array.from({ length: 3 }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-full h-[21px] bg-black-25 rounded-sm"
              ></div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RemitOptionsSkeleton;
