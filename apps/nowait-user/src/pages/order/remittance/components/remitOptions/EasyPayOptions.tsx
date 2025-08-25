import TossPay from "../../../../../assets/tossPay.png";
import KakaoPay from "../../../../../assets/kakaoPay.png";
import NaverPay from "../../../../../assets/naverPay.png";
import RadioGroup from "../RadioGroup";
import Radio from "../Radio";

interface PropsType {
  kakao?: string;
  toss?: string;
  naver?: string;
  remitValue: string;
  setRemitValue: React.Dispatch<React.SetStateAction<string>>;
}

const EasyPayOptions = ({
  kakao,
  toss,
  naver,
  remitValue,
  setRemitValue,
}: PropsType) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#F9F9F9] px-5 py-5">
      <RadioGroup label="간편 송금">
        {kakao && (
          <Radio
            logo={
              <img
                src={KakaoPay}
                width="42px"
                height="18px"
                alt="카카오 이미지"
              />
            }
            name="remit"
            value="kakao"
            remitValue={remitValue}
            onChange={(e) => setRemitValue(e.target.value)}
          >
            카카오페이
          </Radio>
        )}
        {toss && (
          <Radio
            logo={
              <img src={TossPay} width="46px" height="16px" alt="토스 이미지" />
            }
            name="remit"
            value="toss"
            remitValue={remitValue}
            onChange={(e) => setRemitValue(e.target.value)}
          >
            토스
          </Radio>
        )}
        {naver && (
          <Radio
            logo={
              <img
                src={NaverPay}
                width="43px"
                height="15px"
                alt="네이버 이미지"
              />
            }
            name="remit"
            value="naver"
            remitValue={remitValue}
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
