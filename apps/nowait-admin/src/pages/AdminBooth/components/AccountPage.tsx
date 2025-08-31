import { useState, useRef, useEffect, useMemo } from "react";
import jsQR from "jsqr";
import banner from "../../../assets/booth/banner.svg";
import RedBadge from "../../../components/RedBadge";
import naverLogo from "../../../assets/booth/naverLogo.svg";
import kakaoLogo from "../../../assets/booth/kakaoLogo.svg";
import tossLogo from "../../../assets/booth/tossLogo.svg";
import { useGetStorePayment } from "../../../hooks/booth/payment/useGetStorePayment";
import { useCreateStorePayment } from "../../../hooks/booth/payment/useCreateStorePayment";
import { useUpdateStorePayment } from "../../../hooks/booth/payment/useUpdateStorePayment";
import { useNavigate } from "react-router";
import SaveButton from "./Button/saveBttn";
import { REQUIRED_PREFIX, validateUrlPrefix } from "./Rule/payUrlRule";
import { useWindowWidth } from "../../../hooks/useWindowWidth";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { DropdownSelect } from "./DropDown/DropDownSelect";

const bankOptions = ["IBK 기업", "신한은행", "국민은행", "하나은행"];

const AccountPage = () => {
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [errors, setErrors] = useState<Record<PaymentId, string | null>>({
    kakao: null,
    toss: null,
    naver: null,
  });
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { data: storePayment, refetch } = useGetStorePayment();
  const { mutate: createPayment } = useCreateStorePayment();
  const { mutate: updatePayment } = useUpdateStorePayment();

  const width = useWindowWidth();
  const isMobile = width < 768;
  const isSmall = width < 415;

  // 각 결제수단별 입력값 관리
  const [urls, setUrls] = useState<Record<PaymentId, string>>({
    kakao: "",
    toss: "",
    naver: "",
  });
  const [inputs, setInputs] = useState<Record<PaymentId, string>>({
    kakao: "",
    toss: "",
    naver: "",
  });

  // qr 인지 텍스트 입력인지 구별
  const [sources, setSources] = useState<{
    [key in PaymentId]: "text" | "image" | null;
  }>({
    kakao: null,
    toss: null,
    naver: null,
  });

  type PaymentId = "kakao" | "toss" | "naver";

  const paymentOptions: {
    id: PaymentId;
    name: string;
    logo: string;
    placeholder: string;
  }[] = [
    {
      id: "kakao",
      name: "카카오페이",
      logo: kakaoLogo,
      placeholder: "https://qr.kakaopay.com/",
    },
    {
      id: "toss",
      name: "토스",
      logo: tossLogo,
      placeholder: "supertoss://send",
    },
    {
      id: "naver",
      name: "네이버페이",
      logo: naverLogo,
      placeholder: "https://new-m.pay.naver.com/",
    },
  ];

  const fileInputs: Record<
    PaymentId,
    React.RefObject<HTMLInputElement | null>
  > = {
    kakao: useRef<HTMLInputElement | null>(null),
    toss: useRef<HTMLInputElement | null>(null),
    naver: useRef<HTMLInputElement | null>(null),
  };

  const handleButtonClick = (id: PaymentId) => {
    fileInputs[id].current?.click();
  };

  const handleQrUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: PaymentId
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, img.width, img.height);

        if (code) {
          const raw = (code.data || "").trim();
          const res = validateUrlPrefix(id, raw);
          if (res.ok) {
            setUrls((prev) => ({ ...prev, [id]: res.value }));
            setInputs((prev) => ({ ...prev, [id]: res.value }));
            setSources((prev) => ({ ...prev, [id]: "image" }));
            setErrors((prev) => ({ ...prev, [id]: null }));
          } else {
            setInputs((prev) => ({ ...prev, [id]: res.value }));
            setErrors((prev) => ({ ...prev, [id]: res.error }));
            console.log(res.error!);
          }
        } else {
          console.log("QR 코드를 인식할 수 없습니다.");
        }
        event.target.value = "";
      };
      if (e.target?.result) img.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  };

  const paymentFilled = paymentOptions.some(
    (opt) => (inputs[opt.id] ?? "").trim().length > 0
  );

  const serverKakao = storePayment?.response.kakaoPayUrl;
  const serverToss = storePayment?.response.tossUrl;
  const serverNaver = storePayment?.response.naverPayUrl;
  const serverAccount = storePayment?.response.accountNumber;

  // 현재 입력값
  const curKakao = inputs.kakao;
  const curToss = inputs.toss;
  const curNaver = inputs.naver;
  const curAccount = `${accountNumber} ${accountName} ${bank}`;

  // 각각 동일 여부
  const sameUrls =
    curKakao === serverKakao &&
    curToss === serverToss &&
    curNaver === serverNaver;

  const sameAccount = curAccount === serverAccount;

  console.log(curAccount, "즉각 반영", sameAccount);

  const hasError = !(
    errors.kakao === null &&
    errors.toss === null &&
    errors.naver === null
  );

  // 입력된 정보가 없거나 변경된 사항이 없을 경우

  const saveDisabled = useMemo(() => {
    return saving || (sameUrls && sameAccount) || !paymentFilled;
  }, [saving, sameUrls, sameAccount, paymentFilled, hasError]);

  const handleSave = () => {
    // 1) 입력값 검증
    const nextUrls: Record<PaymentId, string> = { ...urls };
    const nextErrors: Record<PaymentId, string | null> = { ...errors };

    (["kakao", "toss", "naver"] as PaymentId[]).forEach((id) => {
      const val = inputs[id]?.trim() || ""; // inputs에서 가져오기
      if (!val) {
        nextUrls[id] = "";
        nextErrors[id] = null;
        return;
      }

      const res = validateUrlPrefix(id, val);
      if (res.ok) {
        nextUrls[id] = res.value;
        nextErrors[id] = null;
      } else {
        nextUrls[id] = "";
        setInputs((prev) => ({ ...prev, [id]: "" }));
        nextErrors[id] = res.error;
      }
    });

    setUrls(nextUrls);
    setErrors(nextErrors);

    // 2) 에러 있으면 저장 중단
    const hasErr = Object.values(nextErrors).some((e) => e !== null);
    if (hasErr) {
      console.log("유효하지 않은 URL이 있어 저장할 수 없습니다.");
      return;
    }

    // 3) 서버 전송용 payload 구성
    const payload = {
      tossUrl: nextUrls.toss,
      kakaoPayUrl: nextUrls.kakao,
      naverPayUrl: nextUrls.naver,
      accountNumber: curAccount,
    };

    setSaving(true);

    console.log(payload.accountNumber, "전송 계좌 정보");

    if (!storePayment || typeof storePayment.response === "string") {
      createPayment(payload, {
        onSuccess: () => {
          console.log("결제 정보가 생성되었습니다.");
          setSaving(false);
        },
        onError: () => console.log("결제 정보 생성 실패"),
      });
    } else {
      updatePayment(payload, {
        onSuccess: () => {
          console.log("결제 정보가 수정되었습니다.", payload);
          refetch();
          setSaving(false);
        },
        onError: () => console.log("결제 정보 수정 실패"),
      });
    }
  };

  useEffect(() => {
    const res = storePayment?.response;

    if (!res || typeof res === "string") {
      setUrls({ kakao: "", toss: "", naver: "" });
      setInputs({ kakao: "", toss: "", naver: "" });
      setBank("");
      setAccountName("");
      setAccountNumber("");
      return;
    }

    const next = {
      kakao: res.kakaoPayUrl ?? "",
      toss: res.tossUrl ?? "",
      naver: res.naverPayUrl ?? "",
    };

    setUrls(next);
    setInputs(next);
    const accountInfo = res.accountNumber.split(" ");
    console.log(storePayment, "서버 데이터");

    let bankInfo = accountInfo[2];
    let nameInfo = accountInfo[1];
    let numberInfo = accountInfo[0];
    if (accountInfo.length === 4) {
      bankInfo = accountInfo[2] + accountInfo[3];
    } else if (accountInfo.length < 3) {
      bankInfo = "";
      nameInfo = "";
      numberInfo = "";
    }

    if (!numberInfo || !nameInfo || !bankInfo) {
      setBank("");
      setAccountName("");
      setAccountNumber("");
    } else {
      setBank(bankInfo);
      setAccountName(nameInfo);
      setAccountNumber(numberInfo);
    }
  }, [storePayment]);

  return (
    <div>
      {/* Guide Banner */}
      <div className={`h-full ${isSmall ? "my-4" : "my-10"}`}>
        <div className="h-full min-h-[60px]">
          <img
            src={banner}
            alt="배너"
            className={`object-fill min-h-[60px]`}
            onClick={() => navigate("guides")}
          />
        </div>
      </div>

      {/* QR Code Section */}
      <section>
        <h2 className="flex items-center text-navy-80 text-18-bold gap-[6px]">
          간편 송금 QR코드 <RedBadge label="필수" small={true} />
        </h2>
        <p className="text-14-regular text-black-60 mt-[14px] mb-[30px]">
          카카오페이, 토스, 네이버페이에서 발급한 QR코드를 등록하면 사용자가
          계좌번호 입력 없이 바로 이체할 수 있어요
        </p>

        <div className="space-y-[20px] w-full">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`flex w-full items-center ${
                isMobile ? "gap-[2px]" : "gap-[10px]"
              }`}
            >
              <div
                className={`flex items-center gap-[8px] ${
                  isMobile ? "w-[80px]" : " w-[130px]"
                }`}
              >
                <img
                  src={option.logo}
                  alt={option.name}
                  className="w-[38px] h-[38px] rounded-full object-cover"
                />
                {!isMobile && (
                  <span className="text-14-semibold">{option.name}</span>
                )}
              </div>
              <div className="flex justify-between h-[52px] w-[474px] min-w-[236px] items-center bg-black-5 rounded-xl border border-[#dddddd] pl-4 pr-[10px] py-4">
                <div className={`flex flex-col w-[79%] w-overflow-scroll`}>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={inputs[option.id]}
                      onFocus={() => {
                        if (errors[option.id]) {
                          setInputs((prev) => ({ ...prev, [option.id]: "" }));
                          setErrors((prev) => ({ ...prev, [option.id]: null }));
                        }
                        setSources((prev) => ({
                          ...prev,
                          [option.id]: "text",
                        }));
                      }}
                      onChange={(e) => {
                        setInputs((prev) => ({
                          ...prev,
                          [option.id]: e.target.value,
                        }));
                        setSources((prev) => ({
                          ...prev,
                          [option.id]: "text",
                        }));
                      }}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pasted = e.clipboardData.getData("text");
                        setInputs((prev) => ({ ...prev, [option.id]: pasted }));
                        setSources((prev) => ({
                          ...prev,
                          [option.id]: "text",
                        }));
                      }}
                      placeholder={
                        errors[option.id] ? "" : REQUIRED_PREFIX[option.id]
                      }
                      className={`flex-1 w-[calc(100%-4px)] bg-transparent outline-none text-14-regular text-black-90`}
                      readOnly={sources[option.id] === "image"}
                    />
                    {errors[option.id] && (
                      <span className="absolute flex items-center top-1/2 -translate-y-1/2 pl-[4px] text-14-regular text-red-600 pointer-events-none whitespace-nowrap overflow-x-auto max-w-[calc(100%-4px)] scrollbar-hide">
                        {errors[option.id]}
                      </span>
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputs[option.id]}
                  className="hidden"
                  onChange={(e) => handleQrUpload(e, option.id)}
                />

                {urls[option.id].length > 0 ? (
                  <button
                    className="bg-black-30 text-black-80 text-12-bold rounded-[6px] p-[10px] hover:scale-[105%]"
                    onClick={() => {
                      setInputs((prev) => ({ ...prev, [option.id]: "" }));
                      setUrls((prev) => ({ ...prev, [option.id]: "" }));
                      setSources((prev) => ({ ...prev, [option.id]: null }));
                      setErrors((prev) => ({ ...prev, [option.id]: null }));
                    }}
                  >
                    {isMobile ? <FaRegTrashAlt /> : "삭제하기"}
                  </button>
                ) : (
                  <button
                    className={`text-black-80 text-12-bold rounded-[6px] p-[10px] 
                        bg-black-30 h-[32px] ${
                          isMobile ? "w-[32px]" : "w-[96px]"
                        }
                    `}
                    onClick={() => {
                      handleButtonClick(option.id);
                    }}
                  >
                    {isMobile ? <FaFileUpload /> : "이미지로 업로드"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account Section */}
      <section className="my-[60px]">
        <h2 className="text-navy-80 text-18-bold mb-[20px]">입금받을 계좌</h2>
        <div className="flex space-x-[10px]">
          <DropdownSelect
            type="bank"
            value={bank}
            onChange={setBank}
            options={bankOptions}
            placeholder="은행 선택"
            className="w-1/4 h-[53.93px]"
          />
          <input
            type="text"
            placeholder="예금주"
            value={accountName}
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            className="w-1/4 border border-[#dddddd] bg-black-5 text-14-regular text-black-90 rounded-xl p-4"
          />
          <input
            type="number"
            placeholder="계좌번호"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-1/2 border border-[#dddddd] bg-black-5 text-14-regular text-black-90 rounded-xl p-4"
          />
        </div>
      </section>

      <SaveButton
        disabled={saveDisabled}
        loading={saving}
        onClick={handleSave}
      />
    </div>
  );
};

export default AccountPage;
