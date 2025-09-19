import { useState } from "react";
import BoothProfileImage from "./BoothProfileImage";
import NoticeEditor from "./NoticeEditor";
import OperatingTimeSelector from "./OperatingTimeSelector";
import placeholderIcon from "../../../assets/image_placeholder.svg";
import type { BannerImage } from "../types/booth";
import type { ProfileImage } from "../types/booth";
import deleteBttn from "../../../assets/booth/del.svg";
import PreviewModal from "./Modal/PreviewModal";
import { useDeleteBannerImage } from "../../../hooks/booth/menu/useDeleteBannerImage";
import { useRemoveEmoji } from "../../../hooks/useRemoveEmoji";
import ImageCropModal from "./Modal/ImageCropModal";

const BoothSection = ({
  location,
  departName,
  boothName,
  setBoothName,
  isFocused,
  setIsFocused,
  boothIntro,
  setBoothIntro,
  isTextareaFocused,
  setIsTextareaFocused,
  bannerImages,
  setBannerImages,
  profileImage,
  setProfileImage,
  noticeTitle,
  setNoticeTitle,
  boothNotice,
  setBoothNotice,
  startHour,
  setStartHour,
  startMinute,
  setStartMinute,
  endHour,
  setEndHour,
  endMinute,
  setEndMinute,
  isMobile,
}: {
  location: string;
  departName: string;
  boothName: string;
  setBoothName: (val: string) => void;
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  boothIntro: string;
  setBoothIntro: (val: string) => void;
  isTextareaFocused: boolean;
  setIsTextareaFocused: (val: boolean) => void;
  bannerImages: BannerImage[];
  setBannerImages: React.Dispatch<React.SetStateAction<BannerImage[]>>;
  profileImage: ProfileImage;
  setProfileImage: React.Dispatch<React.SetStateAction<ProfileImage>>;
  boothNotice: string;
  setBoothNotice: (val: string) => void;
  noticeTitle: string;
  setNoticeTitle: (val: string) => void;
  startHour: string;
  setStartHour: (val: string) => void;
  startMinute: string;
  setStartMinute: (val: string) => void;
  endHour: string;
  setEndHour: (val: string) => void;
  endMinute: string;
  setEndMinute: (val: string) => void;
  isMobile: boolean;
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const { mutate: deleteBannerImage } = useDeleteBannerImage();
  const { removeEmojiAll } = useRemoveEmoji();
  const [cropSpec, setCropSpec] = useState<{
    file: File;
    aspect: number;
    outW: number;
    outH: number;
    target: "profile" | { bannerIndex: number };
  } | null>(null);

  const handleCropDone = (cropped: File) => {
    if (!cropSpec) return;
    if (cropSpec.target === "profile") {
      setProfileImage(cropped);
    } else {
      const idx = cropSpec.target.bannerIndex;
      setBannerImages((prev) => {
        const next = [...prev];
        next[idx] = cropped;
        return next;
      });
    }
    setCropSpec(null);
  };

  return (
    <>
      <div className="flex flex-col items-center pb-[50px] max-w-[614px]">
        <div className="flex justify-between items-center w-full my-[40px]">
          {/* 좌측 타이틀 */}
          <h2 className="text-headline-22-bold text-black-80">부스 프로필</h2>

          {/* 우측 버튼 */}
          {!isMobile && (
            <button
              onClick={() => setShowPreview(true)}
              className="px-[10px] py-[7.5px] rounded-lg flex justify-center items-center h-[34px] text-14-semibold text-black-70 bg-black-20"
            >
              미리보기
            </button>
          )}
          {showPreview && (
            <PreviewModal
              onClose={() => setShowPreview(false)}
              location={location}
              boothName={boothName}
              departName={departName}
              boothIntro={boothIntro}
              noticeTitle={noticeTitle}
              boothNotice={boothNotice}
              startHour={startHour}
              startMinute={startMinute}
              endHour={endHour}
              endMinute={endMinute}
              profileImage={
                profileImage
                  ? profileImage instanceof File
                    ? {
                        id: 0,
                        imageUrl: URL.createObjectURL(profileImage),
                        imageType: "PROFILE",
                      }
                    : profileImage
                  : null
              }
              bannerImages={bannerImages.map((img, i) => {
                if (img instanceof File) {
                  return {
                    id: i, // 항상 number
                    imageUrl: URL.createObjectURL(img),
                    imageType: "BANNER" as const,
                  };
                } else if (img) {
                  return {
                    id: img.id ?? null,
                    imageUrl: img.imageUrl ?? "",
                    imageType: "BANNER" as const,
                  };
                } else {
                  return {
                    id: null,
                    imageUrl: "",
                    imageType: "BANNER" as const,
                  };
                }
              })}
            />
          )}
        </div>
        <div
          className={` w-full ${
            isMobile ? "flex flex-col items-center" : "flex"
          }`}
        >
          <BoothProfileImage
            profileImage={profileImage}
            isMobile={isMobile}
            onPick={(f) =>
              setCropSpec({
                file: f,
                aspect: 1,
                outW: 100,
                outH: 100,
                target: "profile",
              })
            }
          />
          <div
            className={`flex flex-col w-full ${
              isMobile ? "m-0" : "ml-[50px]"
            } h-[115px]`}
          >
            <span className={`text-title-18-bold text-black-80 flex mb-[6px]`}>
              부스명
            </span>
            {!isMobile && (
              <span className="text-14-regular text-black-70 mb-[14px] flex">
                {departName}
              </span>
            )}
            <div className="flex w-full relative">
              <input
                type="text"
                value={boothName}
                maxLength={14}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  setBoothName(removeEmojiAll(e.target.value));
                }}
                placeholder="부스명을 입력해주세요"
                className="w-full h-[52px] bg-black-5 border border-[#DDDDDD] rounded-xl px-4 py-2 text-14-regular text-black-90 bg-black-5 "
              />
              <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-13-regular text-black-60">
                <span className={isFocused ? "text-black" : "text-black-60"}>
                  {boothName.length}
                </span>{" "}
                / 14
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 부스 소개 */}
      <div className="flex flex-col mb-[50px] relative max-w-[614px]">
        <label
          className={`block text-title-18-bold text-black-80 ${
            isMobile ? "mb-[14px]" : ""
          }`}
        >
          부스 소개
        </label>
        {!isMobile && (
          <p className="mt-[6px] mb-[14px] text-14-regular text-black-70">
            부스를 자유롭게 소개해주세요
          </p>
        )}
        <textarea
          maxLength={250}
          className="w-full h-32 border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white rounded-lg text-14-regular text-black-90 px-[20px] pt-[16px] pr-[147px] pb-[33px]"
          onFocus={() => setIsTextareaFocused(true)}
          onBlur={() => setIsTextareaFocused(false)}
          placeholder={isTextareaFocused ? "" : "부스 소개를 입력해주세요"}
          value={boothIntro}
          onChange={(e) => {
            setBoothIntro(e.target.value);
          }}
        />
        <div className="absolute bottom-[12px] right-[20px] text-right text-13-regular text-black-60">
          {boothIntro.length} / 250
        </div>
      </div>

      {/* 배너 이미지 */}
      <div className="flex flex-col mb-[50px] max-w-[614px]">
        <label
          className={`block text-title-18-bold text-black-80 ${
            isMobile ? "mb-[6px]" : ""
          }`}
        >
          배너 이미지
        </label>
        <p className="text-14-regular text-black-70 mt-[6px] mb-[14px]">
          첫번째 이미지는 우리 부스를 대표하는 이미지로 설정돼요
        </p>

        <div className="flex gap-[10px] pt-[20px] overflow-x-auto scrollbar-hide">
          {Array(3)
            .fill(null)
            .map((_, i) => {
              const inputId = `banner-input-${i}`;
              const img = bannerImages[i] as any;
              const hasImage = Boolean(img);

              return (
                <div key={i} className="relative">
                  {/* 빈칸일 때만 파일 입력 렌더 */}
                  {!hasImage && (
                    <input
                      id={inputId}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setCropSpec({
                          file: f,
                          aspect: 750 / 452,
                          outW: 750,
                          outH: 452,
                          target: { bannerIndex: i },
                        });
                        e.currentTarget.value = "";
                      }}
                    />
                  )}

                  {hasImage ? (
                    /* 이미지 있는 슬롯: label 사용 금지(업로드 연결 제거) */
                    <div
                      className="w-[150px] h-[99px] bg-black-5 border border-[#dddddd] rounded-xl flex items-center justify-center relative cursor-default"
                      onClick={(e) => {
                        // 슬롯 면 클릭은 아무 동작도 하지 않음
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onMouseDownCapture={(e) => {
                        // 드래그/더블클릭 등도 무시
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      aria-disabled
                    >
                      <img
                        src={
                          img instanceof File
                            ? URL.createObjectURL(img)
                            : img.imageUrl
                        }
                        alt={`배너 ${i + 1}`}
                        className="object-cover w-full h-full rounded-xl overflow-hidden pointer-events-none"
                        draggable={false}
                      />

                      {i === 0 && (
                        <span className="absolute bottom-0 left-0 bg-black bg-opacity-80 h-[22px] text-white text-[10px] font-bold px-6 py-1 w-full text-center rounded-b-xl">
                          대표 사진
                        </span>
                      )}

                      {/* 오직 X 버튼으로만 삭제 가능 */}
                      <button
                        type="button"
                        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const target = bannerImages[i] as any;

                          const clearSlot = () =>
                            setBannerImages((prev) => {
                              const next = [...prev];
                              next[i] = null; // 이 슬롯만 비우기 (압축 금지)
                              return next;
                            });

                          if (target && !(target instanceof File)) {
                            deleteBannerImage(target.id, {
                              onSuccess: clearSlot,
                              onError: () =>
                                console.log("이미지 삭제에 실패했습니다."),
                            });
                          } else {
                            clearSlot();
                          }
                        }}
                        aria-label={`배너 ${i + 1} 삭제`}
                      >
                        <img src={deleteBttn} alt="삭제" />
                      </button>
                    </div>
                  ) : (
                    /* 빈칸: label로 파일 입력과 연결 → 업로드 가능 */
                    <label
                      htmlFor={inputId}
                      className="w-[150px] h-[99px] bg-black-5 border border-[#dddddd] rounded-xl flex items-center justify-center cursor-pointer relative"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          const el = document.getElementById(
                            inputId
                          ) as HTMLInputElement | null;
                          el?.click();
                        }
                      }}
                    >
                      <img src={placeholderIcon} alt="업로드" />
                    </label>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <OperatingTimeSelector
        startHour={startHour}
        setStartHour={setStartHour}
        startMinute={startMinute}
        setStartMinute={setStartMinute}
        endHour={endHour}
        setEndHour={setEndHour}
        endMinute={endMinute}
        setEndMinute={setEndMinute}
        isMobile={isMobile}
      />
      <label
        className={`block text-title-18-bold text-black-80 ${
          isMobile ? "mb-[6px]" : ""
        }`}
      >
        공지 사항
      </label>
      <p className="text-14-regular text-black-70 mt-[6px] mb-[14px]">
        방문자에게 보여질 공지사항을 작성해주세요 (선택)
      </p>
      {/* 공지사항 */}
      <NoticeEditor
        noticeTitle={noticeTitle}
        setNoticeTitle={setNoticeTitle}
        notice={boothNotice}
        setNotice={setBoothNotice}
      />

      {cropSpec && (
        <ImageCropModal
          file={cropSpec.file}
          aspect={cropSpec.aspect}
          outWidth={cropSpec.outW}
          outHeight={cropSpec.outH}
          mime={cropSpec.target === "profile" ? "image/png" : "image/jpeg"}
          quality={0.95}
          onDone={handleCropDone}
          onClose={() => setCropSpec(null)}
          title={
            cropSpec.target === "profile"
              ? "프로필 이미지 1:1 자르기"
              : "배너 이미지 375:246 자르기"
          }
        />
      )}
    </>
  );
};

export default BoothSection;
