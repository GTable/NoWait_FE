import KakaoPay from "../../../../../assets/kakaoPay.svg?react";
import TossPay from "../../../../../assets/tossPay.svg?react";
import NaverPay from "../../../../../assets/naverPay.svg?react";
import RadioGroup from "../RadioGroup";
import Radio from "../Radio";
import RemitOptionsSkeleton from "../RemitOptionsSkeleton";

interface PropsType {
  kakao?: string;
  toss?: string;
  naver?: string;
  setRemitValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const EasyPayOptions = ({
  kakao,
  toss,
  naver,
  setRemitValue,
  isLoading,
}: PropsType) => {

  if (isLoading) return <RemitOptionsSkeleton />;

  return (
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
  );
};

export default EasyPayOptions;
