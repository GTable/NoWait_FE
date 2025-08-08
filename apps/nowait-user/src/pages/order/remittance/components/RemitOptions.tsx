import { useState } from "react";
import { useToastStore } from "../../../../stores/toastStore";
import useThrottle from "../../../../hooks/useThrottle";
import Help from "../../../../assets/icon/help.svg?react";
import KakaoPay from "../../../../assets/kakaoPay.svg?react";
import TossPay from "../../../../assets/tossPay.svg?react";
import NaverPay from "../../../../assets/naverPay.svg?react";
import RadioGroup from "./RadioGroup";
import Radio from "./Radio";
import SlideToggle from "./SlideToggle";

interface PropsType {
  remitValue: string;
  setRemitValue: React.Dispatch<React.SetStateAction<string>>;
  kakao?: string;
  toss?: string;
  naver?: string;
  totalPrice: number;
  account?: string;
}

const RemitOptions = ({
  remitValue,
  setRemitValue,
  totalPrice,
  kakao,
  toss,
  naver,
  account,
}: PropsType) => {
  const { showToast } = useToastStore();
  const [remitDescriptionToggle, setRemitDescriptionToggle] = useState(false);
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
    <section>
      <div className="py-7.5">
        <div className="pb-5">
          <h1 className="text-title-18-semibold">
            <button
              className="flex items-center gap-1"
              onClick={() => setRemitDescriptionToggle(!remitDescriptionToggle)}
            >
              송금 수단
              <span>
                <Help />
              </span>
            </button>
          </h1>
          <SlideToggle toggle={remitDescriptionToggle}>
            <p className="text-14-regular text-black-70 pt-4">
              축제 부스는 한정된 시간과 인력으로 운영 돼요.
              <br />
              효율적 운영을 위해 결제는 간편 송금과 이체만 가능해요.
            </p>
          </SlideToggle>
        </div>
        {!kakao && !toss && !naver ? (
          <></>
        ) : (
          <div className="flex flex-col gap-3 rounded-2xl bg-[#F9F9F9] px-5 py-5">
            <RadioGroup label="간편 송금">
              {kakao && (
                <Radio
                  logo={<KakaoPay />}
                  name="remit"
                  value="kakao"
                  defaultChecked
                  onChange={(e) => setRemitValue(e.target.value)}
                >
                  카카오페이
                </Radio>
              )}
              {toss && (
                <Radio
                  logo={<TossPay />}
                  name="remit"
                  value="toss"
                  onChange={(e) => setRemitValue(e.target.value)}
                >
                  토스
                </Radio>
              )}
              {naver && (
                <Radio
                  logo={<NaverPay />}
                  name="remit"
                  value="naver"
                  onChange={(e) => setRemitValue(e.target.value)}
                >
                  네이버페이
                </Radio>
              )}
            </RadioGroup>
          </div>
        )}
        {account && (
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
        )}
      </div>
    </section>
  );
};

export default RemitOptions;
