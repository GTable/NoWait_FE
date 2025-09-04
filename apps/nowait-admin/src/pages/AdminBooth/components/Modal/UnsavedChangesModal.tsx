export const UnsavedChangesModal = ({
  onReset,
  onSave,
}: {
  onReset: () => void;
  onSave: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="flex items-center bg-white rounded-[20px] pt-[33px] pb-[22px] px-[22px] w-[297px] h-[177px]">
        <div className="flex flex-col justify-center items-center w-full">
          <h3 className="text-title-20-bold">
            저장하지 않은 변경사항이 있어요
          </h3>
          <p className="text-14-regular text-black-60 mb-[20px] mt-[10px]">
            페이지를 나가면 변경사항이 저장되지 않아요.
          </p>
          <div className="flex h-[48px] w-[253px] gap-2">
            <button
              className="flex-1 px-[12px] py-[10px] rounded-[10px] w-full bg-black-20 text-black-80 text-16-semibold"
              onClick={onReset}
            >
              재설정
            </button>
            <button
              className="flex-1 px-[12px] py-[10px] rounded-[10px] w-full bg-black text-white whitespace-nowrap text-16-semibold"
              onClick={onSave}
            >
              변경사항 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
