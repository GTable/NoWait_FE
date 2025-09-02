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
              bannerImages={bannerImages.map((img, i) =>
                img instanceof File
                  ? {
                      id: i,
                      imageUrl: URL.createObjectURL(img),
                      imageType: "BANNER",
                    }
                  : { ...img, imageType: "BANNER" }
              )}
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
            setProfileImage={setProfileImage}
            isMobile={isMobile}
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
        <div className="flex gap-[10px]">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <label
                key={i}
                className="w-[150px] h-[99px] bg-black-5 border border-[#dddddd] rounded-xl flex items-center justify-center cursor-pointer relative"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const newImages = [...bannerImages];
                      newImages[i] = file;
                      setBannerImages(newImages);
                      e.target.value = "";
                    }
                  }}
                />

                {/* 이미지 미리보기 */}
                {bannerImages[i] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={
                        bannerImages[i] instanceof File
                          ? URL.createObjectURL(bannerImages[i] as File)
                          : (bannerImages[i] as any).imageUrl
                      }
                      alt={`배너 ${i + 1}`}
                      className="object-cover w-full h-full rounded-xl overflow-hidden"
                    />

                    {/* 대표 사진 라벨 */}
                    {i === 0 && (
                      <span className="absolute bottom-0 left-0 bg-black bg-opacity-80 h-[22px] text-white text-[10px] font-bold px-6 py-1 w-full text-center rounded-b-xl">
                        대표 사진
                      </span>
                    )}

                    {/* 삭제 버튼 */}
                    <button
                      type="button"
                      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const target = bannerImages[i];
                        const newImages = bannerImages.filter(
                          (_, idx) => idx !== i
                        );
                        if (target && !(target instanceof File)) {
                          // 서버 이미지일 경우
                          deleteBannerImage(target.id, {
                            onSuccess: () => {
                              setBannerImages(newImages);
                            },
                            onError: () => {
                              console.log("이미지 삭제에 실패했습니다.");
                            },
                          });
                        } else {
                          // File 타입만 있을 경우는 로컬에서만 제거
                          setBannerImages(newImages);
                        }
                      }}
                    >
                      <img src={deleteBttn} alt="삭제" />
                    </button>
                  </div>
                ) : (
                  <img src={placeholderIcon} alt="업로드" />
                )}
              </label>
            ))}
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

      {/* 버튼 */}
    </>
  );
};

export default BoothSection;
