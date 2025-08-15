import Radio from "../Radio";
import SlideToggle from "../SlideToggle";
import useThrottle from "../../../../../hooks/useThrottle";
import { useToastStore } from "../../../../../stores/toastStore";

interface PropsType {
  remitValue: string;
  setRemitValue: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: number;
  account: string;
}
const DirectRemitOption = ({
  remitValue,
  setRemitValue,
  totalPrice,
  account,
}: PropsType) => {
  const { showToast } = useToastStore();
  const clipBoardDelay = 2000;
  //은행,예금주,계좌번호 따로 사용을 위해 split
  const splitedAccount = account?.split(" ");
  const [accountNumber, bank, accountHolder] = splitedAccount ?? "";

  const handleCopyClipBoard = useThrottle(async () => {
    try {
      //http 사용 시 또는 핸드폰으로 사용 시 복사가 안될 수도 있음.
      await navigator.clipboard.writeText(
        `${bank} ${accountNumber} ${totalPrice.toLocaleString()}원`
      );
      showToast("계좌번호가 복사되었습니다");
    } catch (error) {
      //이를 방지하기 위해 실패 시 고전 방식의 복사 방법 추가
      const $textarea = document.createElement("textarea");
      document.body.appendChild($textarea);
      $textarea.value = `${bank} ${accountNumber} ${totalPrice.toLocaleString()}원`;
      $textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild($textarea);
      if (success) showToast("계좌번호가 복사되었습니다");
    }
  }, clipBoardDelay);
  return (
    <div className="mt-4 rounded-2xl bg-[#F9F9F9] px-5 py-5">
      <Radio
        name="remit"
        value="direct"
        onChange={(e) => setRemitValue(e.target.value)}
      >
        계좌로 직접 이체하기
      </Radio>
      <SlideToggle toggle={remitValue === "direct"}>
        <p className="text-14-medium text-black-60 pt-2 pb-5">
          아래의 계좌로 직접 이체해주셔야 돼요
        </p>
        <div className="-mx-5 border border-[#F1F1F1]"></div>
        <div className="flex justify-between items-center pt-5">
          <div className="flex items-center gap-2">
            <img
              className="w-[38px] h-[38px] rounded-full"
              src="/beef.png"
            ></img>
            <div>
              <h1 className="text-14-semibold text-black-80">
                {accountHolder}
              </h1>
              <h2 className="text-[12px] font-regular text-black-60">
                {bank} {accountNumber}
              </h2>
            </div>
          </div>
          <button
            className="text-12-semibold bg-white px-3 py-1.5 rounded-[50px]"
            onClick={handleCopyClipBoard}
          >
            복사
          </button>
        </div>
      </SlideToggle>
    </div>
  );
};

export default DirectRemitOption;
