import { Suspense, lazy, useMemo, useRef, useState } from "react";
import placeholderIcon from "../../../../assets/image_placeholder.svg";
import closeIcon from "../../../../assets/close.svg";
import { useRemoveEmoji } from "../../../../hooks/useRemoveEmoji";
import { useObjectUrl } from "../../../../utils/useObjectUrl";

const ImageCropModal = lazy(() => import("./ImageCropModal"));

interface MenuModalProps {
  isEdit: boolean;
  initialData?: {
    id?: number;
    name: string;
    adminDisplayName?: string;
    price: string;
    description: string;
    imageUrl?: string;
  };
  isTablet: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete: () => void;
}

interface PriceInputProps {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
}

const formatNumber = (num: number) => {
  if (!num) return "";
  return `${String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
};

const PriceInput: React.FC<PriceInputProps> = ({ price, setPrice }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setPrice(rawValue);
  };

  const displayValue = isFocused
    ? price
    : price
    ? formatNumber(parseInt(price))
    : "";

  return (
    <div className="mb-[30px]">
      <label className="block text-title-16-bold mb-3">가격</label>
      <div className="relative w-full">
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full h-[52px] rounded-lg px-4 pr-10 py-2 text-sm
            bg-black-5 focus:bg-white
            border border-[#DDDDDD] focus:border-black
          `}
          placeholder={isFocused ? "" : "가격을 입력해주세요"}
        />
      </div>
    </div>
  );
};

const normalizePrice = (v: string) => v.replace(/[^0-9]/g, "");

const MenuModal = ({
  isEdit,
  initialData,
  isTablet,
  onClose,
  onSubmit,
  onDelete,
}: MenuModalProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [adminDisplayName, setAdminDisplayName] = useState(
    initialData?.adminDisplayName || ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState<string | File | null>(
    initialData?.imageUrl || null
  );

  const [focus, setFocus] = useState({
    name: false,
    admin: false,
    desc: false,
  });

  const previewUrl = useObjectUrl(typeof image === "object" ? image : null);
  const [cropTarget, setCropTarget] = useState<File | null>(null);

  const { removeEmojiAll, removeEmojiSome } = useRemoveEmoji();

  const [isComposingName, setIsComposingName] = useState(false);
  const [isComposingAdmin, setIsComposingAdmin] = useState(false);

  const initialRef = useRef({
    name: initialData?.name ?? "",
    adminDisplayName: initialData?.adminDisplayName ?? "",
    description: initialData?.description ?? "",
    price: normalizePrice(initialData?.price ?? ""),
    image: initialData?.imageUrl,
  });

  const isFormValid =
    name.trim() !== "" &&
    adminDisplayName.trim() !== "" &&
    String(price).trim() !== "" &&
    description.trim() !== "";

  const isDirty = useMemo(() => {
    const hasImageChanged = initialRef.current.image !== image;
    return (
      name !== initialRef.current.name ||
      adminDisplayName !== initialRef.current.adminDisplayName ||
      description !== initialRef.current.description ||
      normalizePrice(price) !== initialRef.current.price ||
      hasImageChanged
    );
  }, [name, adminDisplayName, description, price, image]);

  const handleSubmit = () => {
    if (!isFormValid || (isEdit && !isDirty)) return;
    onSubmit({
      id: initialData?.id,
      name,
      adminDisplayName,
      price,
      description,
      image,
    });
    onClose();
  };

  const handleDelete = () => {
    onClose();
    onDelete();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div
          className={`bg-white rounded-[20px] p-[30px] relative ${
            isTablet
              ? "w-[500px] h-[700px] p-[30px]"
              : "w-[343px] h-[643px] px-[22px]"
          }`}
        >
          <div className="flex justify-between w-full">
            <h2 className="text-title-20-bold mb-[30px]">
              {isEdit ? "메뉴 편집하기" : "새 메뉴 추가하기"}
            </h2>
            <img
              src={closeIcon}
              alt="닫기"
              className="w-5 h-5 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div
            className={`${
              !isTablet
                ? "w-[299px] h-[452px] mb-[22px] overflow-y-auto scrollbar-hide"
                : ""
            }`}
          >
            {/* 메뉴명 */}
            <div className={`mb-[30px] flex gap-[20px] `}>
              <div className="flex flex-col w-full ">
                <label className="block text-title-16-bold mb-3">메뉴명</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const v = e.target.value;
                      setName(isComposingName ? v : removeEmojiSome(v));
                    }}
                    onCompositionStart={() => setIsComposingName(true)}
                    onCompositionEnd={(e) => {
                      setIsComposingName(false);
                      setName(removeEmojiSome(e.currentTarget.value));
                    }}
                    onFocus={() => setFocus((f) => ({ ...f, name: true }))}
                    onBlur={() => setFocus((f) => ({ ...f, name: false }))}
                    maxLength={25}
                    className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 focus:bg-white px-4 py-2 rounded-lg text-14-regular"
                    placeholder="메뉴명을 입력해주세요"
                  />
                  <p className={`absolute top-1/2 -translate-y-1/2 right-4 items-center text-gray-400 ${
                      isTablet ? "text-13-regular" : "text-12-regular"
                    }`}>
                    <span
                      className={`${focus.name && name.length > 0 ? "text-black" : "text-gray-400"}`}
                    >
                      {name.length}
                    </span>{" "}
                    / 25
                  </p>
                </div>
              </div>
              <label className="w-[86px] aspect-square flex-shrink-0 bg-black-5 border border-[#DDDDDD] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setCropTarget(file);
                    e.currentTarget.value = "";
                  }}
                />
                {image ? (
                  <img
                    src={typeof image === "string" ? image : previewUrl ?? ""}
                    alt="메뉴 이미지"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={placeholderIcon} alt="업로드" />
                )}
              </label>
            </div>

            {/* 관리자 표시 메뉴명 */}
            <div className="mb-[30px] relative">
              <label className="block text-title-16-bold mb-3">
                관리자 표시 메뉴명
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={adminDisplayName}
                  onCompositionStart={() => setIsComposingAdmin(true)}
                  onCompositionEnd={(e) => {
                    setIsComposingAdmin(false);
                    setAdminDisplayName(removeEmojiAll(e.currentTarget.value));
                  }}
                  onFocus={() => setFocus((f) => ({ ...f, admin: true }))}
                  onBlur={() => setFocus((f) => ({ ...f, admin: false }))}
                  onChange={(e) => {
                    const v = e.target.value;
                    setAdminDisplayName(isComposingAdmin ? v : removeEmojiAll(v));
                  }}
                  maxLength={10}
                  className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 focus:bg-white px-4 py-2 rounded-lg text-14-regular"
                  placeholder={
                    isTablet
                      ? "주문 확인용으로 메뉴명을 설정해주세요"
                      : "주문 확인용 메뉴명을 설정해주세요"
                  }
                />
                <p className={`absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 ${
                    isTablet ? "text-13-regular" : "text-12-regular"
                  }`}>
                  <span
                    className={` ${
                      focus.admin && adminDisplayName.length > 0
                        ? "text-black"
                        : "text-gray-400"
                    }`}
                  >
                    {adminDisplayName.length}
                  </span>{" "}
                  / 10
                </p>
              </div>
            </div>

            <PriceInput price={price} setPrice={setPrice} />

            {/* 메뉴 소개 */}
            <div className="mb-[30px] relative">
              <label className="block text-title-16-bold mb-3">메뉴 소개</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setFocus((f) => ({ ...f, desc: true }))}
                onBlur={() => setFocus((f) => ({ ...f, desc: false }))}
                maxLength={250}
                className="w-full border border-[#DDDDDD] bg-black-5 focus:bg-white h-[120px] px-4 py-2 rounded-lg text-14-regular"
                placeholder="메뉴 소개를 입력해주세요."
              />
              <p className="absolute bottom-[12px] right-4 text-right text-13-regular text-gray-400">
                <span
                  className={`${focus.desc && description.length > 0 ? "text-black" : "text-gray-400"}`}
                >
                  {description.length}
                </span>{" "}
                / 250
              </p>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex">
            {isEdit && (
              <div className="flex w-full gap-2">
                <button
                  onClick={handleDelete}
                  className="w-full h-[48px] px-3 py-[10px] rounded-[10px] bg-[#FFF0EB] text-primary text-16-semibold"
                >
                  삭제하기
                </button>
                <button
                  onClick={handleSubmit}
                  className={`w-full h-[48px] px-3 py-[10px] rounded-[10px] text-16-semibold  ${
                    isDirty
                      ? "bg-[#16191E] text-white cursor-pointer"
                      : "bg-black-15 text-black-50 cursor-not-allowed"
                  }`}
                >
                  수정하기
                </button>
              </div>
            )}
            {!isEdit && (
              <div className="flex w-full">
                <button
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                  className={`w-full h-[48px] px-3 py-[10px] rounded-[10px] text-16-semibold  ${
                    isFormValid
                      ? "bg-[#16191E] text-white cursor-pointer"
                      : "bg-black-15 text-black-50 cursor-not-allowed"
                  }`}
                >
                  메뉴 추가하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {cropTarget && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/30 z-50" />}>
          <ImageCropModal
            file={cropTarget}
            aspect={375 / 246}
            outWidth={375}
            outHeight={246}
            onDone={(cropped) => {
              setImage(cropped);
              setCropTarget(null);
            }}
            onClose={() => setCropTarget(null)}
            title="메뉴 이미지 자르기"
          />
        </Suspense>
      )}
    </>
  );
};

export default MenuModal;
