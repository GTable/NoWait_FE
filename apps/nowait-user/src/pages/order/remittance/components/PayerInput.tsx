import React, { useEffect } from "react";

interface PropsType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string | null;
  payerFocus: React.ForwardedRef<HTMLInputElement>;
}

const PayerInput = ({
  value,
  setValue,
  errorMessage,
  payerFocus,
}: PropsType) => {
  const depositorName = localStorage.getItem("depositorName");
  //재주문 시 입금자명 input에 이전 입금자명 설정
  useEffect(() => {
    if (depositorName !== null) {
      setValue(depositorName);
    }
  }, []);

  return (
    <section>
      <div className="py-7.5">
        <div className="mb-5">
          <h1 className="text-title-18-semibold mb-2">입금자명</h1>
          <h2 className="text-14-regular text-black-70">
            이후 주문은 동일한 입금자명으로 들어가요
          </h2>
        </div>
        <input
          className="w-full text-16-medium bg-black-10 rounded-xl placeholder-black-55 py-3.5 px-4 outline-none text-black-80"
          placeholder="입금자명 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={payerFocus}
        />
        {errorMessage && (
          <p className="pt-2.5 pl-2.5 text-14-regular text-primary">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default PayerInput;
