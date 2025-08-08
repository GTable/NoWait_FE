import { useState } from "react";
import placeholderIcon from "../../../../assets/image_placeholder.svg";
import closeIcon from "../../../../assets/close.svg";
interface MenuModalProps {
  isEdit: boolean;
  initialData?: {
    id?: number;
    name: string;
    adminDisplayName?: string;
    price: string;
    description: string;
    isRepresentative?: boolean;
    image?: File;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete: () => void;
}

interface PriceInputProps {
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
}

// 가격 표시 세자리 마다 , 붙여서 표시
const formatNumber = (num: number) => {
  if (!num) return "";
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원";
};

const PriceInput: React.FC<PriceInputProps> = ({ price, setPrice }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자만 추출
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setPrice(rawValue);
  };

  return (
    <div className="mb-[30px]">
      <label className="block text-sm font-medium mb-3">가격</label>
      <div className="relative w-full">
        <input
          type="text"
          value={price ? formatNumber(parseInt(price)) : ""}
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

const MenuModal = ({
  isEdit,
  initialData,
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
  const isRepresentative = useState(initialData?.isRepresentative || false);
  const [image, setImage] = useState<File | null>(initialData?.image || null);

  const isFormValid =
    name.trim() !== "" &&
    adminDisplayName.trim() !== "" &&
    String(price).trim() !== "" &&
    description.trim() !== "";

  const handleSubmit = () => {
    onSubmit({
      id: initialData?.id,
      name,
      adminDisplayName,
      price,
      description,
      isRepresentative,
      image,
    });
    onClose();
  };
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] h-[700px] rounded-[20px] p-[30px] relative">
        <div className="flex justify-between w-full">
          <h2 className="text-title-20-bold mb-[30px]">
            {isEdit ? "메뉴 편집하기" : "새 메뉴 추가하기"}
          </h2>
          <img
            src={closeIcon}
            alt="닫기"
            className="w-5 h-5"
            onClick={onClose}
          />
        </div>

        {/* 메뉴명 */}
        <div className="mb-[30px] flex gap-[20px]">
          <div className="flex flex-col w-full ">
            <label className="block text-sm font-medium mb-3">메뉴명</label>
            <div className="relative w-full">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={25}
                className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white px-4 py-2 border rounded-lg text-sm"
                placeholder="메뉴명을 입력해주세요"
              />
              <p
                className={`absolute top-1/2 -translate-y-1/2 right-4 text-13-regular text-gray-400 `}
              >
                <span
                  className={`${
                    name.length > 0 ? "text-black" : "text-gray-400"
                  }`}
                >
                  {name.length}
                </span>{" "}
                / 25
              </p>
              {/* 이미지 업로드 */}
            </div>
          </div>
          <label className="w-[86px] aspect-square flex-shrink-0 bg-black-5 border border-[#DDDDDD] rounded-lg flex items-center justify-center cursor-pointer overflow-hidden">
            <input
              type="file"
              className="hidden"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="업로드된 이미지"
                className="w-full h-full object-contain"
              />
            ) : (
              <img src={placeholderIcon} alt="업로드" />
            )}
          </label>
        </div>

        {/* 관리자용 메뉴명 */}
        <div className="mb-[30px] relative">
          <label className="block text-sm font-medium mb-3">
            관리자용 메뉴명
          </label>
          <div className="relative">
            <input
              type="text"
              value={adminDisplayName}
              onChange={(e) => setAdminDisplayName(e.target.value)}
              maxLength={10}
              className="w-full h-[52px] border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white px-4 py-2 border rounded-lg text-sm"
              placeholder="주문 확인에 용이한 메뉴명으로 설정해주세요."
            />
            <p className="absolute top-1/2 -translate-y-1/2 right-4 text-13-regular text-gray-400">
              <span
                className={` ${
                  adminDisplayName.length > 0 ? "text-black" : "text-gray-400"
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
          <label className="block text-sm font-medium mb-3">메뉴 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
            className="w-full border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white h-[120px] px-4 py-2 border rounded-lg text-sm h-24"
            placeholder="메뉴 소개를 입력해주세요."
          />
          <p className="absolute bottom-[12px] right-4 text-right text-xs text-gray-400">
            <span
              className={`${
                description.length > 0 ? "text-black" : "text-gray-400"
              }`}
            >
              {description.length}
            </span>{" "}
            / 250
          </p>
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
                className={`w-full h-[48px] px-3 py-[10px] rounded-[10px] bg-black-15 text-black-50 text-16-semibold  ${
                  isFormValid
                    ? "bg-[#16191E] text-white cursor-pointer"
                    : "bg-black-15 text-black-50 cursor-not-allowed"
                }`}
              >
                저장하기
              </button>
            </div>
          )}
          {!isEdit && (
            <div className="flex w-full">
              <button
                disabled={!isFormValid}
                onClick={handleSubmit}
                className={`w-full h-[48px] px-3 py-[10px] rounded-[10px] bg-black-15 text-black-50 text-16-semibold  ${
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
  );
};

export default MenuModal;
