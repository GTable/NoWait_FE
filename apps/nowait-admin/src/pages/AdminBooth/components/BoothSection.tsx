import { useState } from "react";
import BoothProfileImage from "./BoothProfileImage";
import NoticeEditor from "./NoticeEditor";
import OperatingTimeSelector from "./OperatingTimeSelector";
import placeholderIcon from "../../../assets/image_placeholder.svg";
import type { BannerImage } from "../types/booth";
import type { ProfileImage } from "../types/booth";

const BoothSection = ({
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
}: {
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
}) => {
  return (
    <>
      <div className="flex flex-col items-center pb-[50px] max-w-[614px]">
        <div className="flex justify-between items-center w-full my-[40px]">
          {/* 좌측 타이틀 */}
          <h2 className="text-headline-22-bold text-black-80">부스 프로필</h2>

          {/* 우측 버튼 */}
          <button className="px-4 py-1 rounded-lg w-[68px] text-14-semibold text-black-70 bg-black-20 px-[10px] py-[7.5px]">
            미리보기
          </button>
        </div>
        <div className="flex w-full">
          <BoothProfileImage
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <div className="flex flex-col w-full ml-[50px] h-[115px]">
            <span className="text-title-18-bold text-gray-500 mb-[6px] flex">
              부스명
            </span>
            <span className="text-sm text-gray-500 mb-[14px] flex">
              컴퓨터공학과
            </span>
            <div className="flex w-full h-full relative">
              <input
                type="text"
                value={boothName}
                maxLength={14}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setBoothName(e.target.value)}
                placeholder="부스명을 입력해주세요"
                className="w-full h-full bg-black-5 border border-[#DDDDDD] rounded-xl px-4 py-2 text-sm bg-black-5 "
              />
              <span className="absolute right-[20px] top-1/2 -translate-y-1/2 text-xs text-gray-400">
                <span className={isFocused ? "text-black" : "text-gray-400"}>
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
        <label className="block font-semibold">부스 소개</label>
        <p className="mt-[6px] mb-[14px] text-14-regular text-black-60">
          부스를 자유롭게 소개해주세요
        </p>
        <textarea
          maxLength={250}
          className="w-full h-32 border border-[#DDDDDD] bg-black-5 bg-black-5 focus:bg-white rounded-lg text-sm px-[20px] pt-[16px] pr-[147px] pb-[33px]"
          onFocus={() => setIsTextareaFocused(true)}
          onBlur={() => setIsTextareaFocused(false)}
          placeholder={isTextareaFocused ? "" : "부스 소개를 입력해주세요"}
          value={boothIntro}
          onChange={(e) => setBoothIntro(e.target.value)}
        />
        <div className="absolute bottom-[12px] right-[20px] text-right text-xs text-gray-400">
          {boothIntro.length} / 250
        </div>
      </div>

      {/* 배너 이미지 */}
      <div className="flex flex-col mb-[50px] max-w-[614px]">
        <label className="block font-semibold">배너 이미지</label>
        <p className="text-14-regular text-black-60 mb-[14px]">
          첫번째 이미지는 우리 부스를 대표하는 이미지로 설정돼요
        </p>
        <div className="flex gap-[10px]">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <label
                key={i}
                className="w-[150px] h-25 bg-black-5 border border-[#DDDDDD] rounded-xl flex items-center justify-center cursor-pointer"
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
                    }
                  }}
                />

                {/* 업로드 파일 / 서버 이미지 / placeholder 구분 */}
                {(() => {
                  const img = bannerImages[i];
                  if (img instanceof File) {
                    return (
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`배너 ${i + 1}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    );
                  }
                  if (img && typeof (img as any).imageUrl === "string") {
                    return (
                      <img
                        src={(img as any).imageUrl}
                        alt={`배너 ${i + 1}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    );
                  }
                  return <img src={placeholderIcon} alt="업로드" />;
                })()}
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
      />

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
