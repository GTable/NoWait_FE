
const RemitOptionsSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl bg-[#F9F9F9] px-5 py-5">
      <h1 className="text-14-medium text-black-60 mb-5">간편 송금</h1>
      <ul className="flex flex-col gap-y-5">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-full h-[21px] bg-black-25 rounded-[4px]"
            ></div>
          );
        })}
      </ul>
    </div>
  );
};

export default RemitOptionsSkeleton;
