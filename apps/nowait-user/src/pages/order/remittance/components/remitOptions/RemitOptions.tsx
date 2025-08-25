import RemitHeader from "./RemitHeader";
import EasyPayOptions from "./EasyPayOptions";
import DirectRemitOption from "./DirectRemitOption";
import RemitOptionsSkeleton from "../RemitOptionsSkeleton";

interface PropsType {
  remitValue: string;
  setRemitValue: React.Dispatch<React.SetStateAction<string>>;
  kakao?: string;
  toss?: string;
  naver?: string;
  totalPrice: number;
  account?: string;
  isLoading: boolean;
}

const RemitOptions = ({
  remitValue,
  setRemitValue,
  totalPrice,
  kakao,
  toss,
  naver,
  account,
  isLoading,
}: PropsType) => {
  if (isLoading) return <RemitOptionsSkeleton />;

  return (
    <section>
      <div className="py-7.5">
        {/* 송금 수단 헤더 */}
        <RemitHeader />
        {!isLoading && (kakao || toss || naver) ? (
          // 간편 송금 섹션
          <EasyPayOptions
            kakao={kakao}
            toss={toss}
            naver={naver}
            remitValue={remitValue}
            setRemitValue={setRemitValue}
          />
        ) : null}
        {account && (
          <DirectRemitOption
            remitValue={remitValue}
            setRemitValue={setRemitValue}
            totalPrice={totalPrice}
            account={account}
          />
        )}
      </div>
    </section>
  );
};

export default RemitOptions;
