import React from "react";
import editIcon from "../../../assets/edit_icon.svg";
import booth_thumbnail from "../../../assets/booth_thumbnail.svg";
import type { ProfileImage } from "../types/booth";

const BoothProfileImage = ({
  profileImage,
  setProfileImage,
  isMobile,
  onPick,
}: {
  profileImage: ProfileImage;
  setProfileImage: React.Dispatch<React.SetStateAction<ProfileImage>>;
  isMobile: boolean;
  onPick: (file: File) => void;
}) => {
  const getImageSrc = (): string => {
    if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    }
    if (
      profileImage &&
      typeof profileImage === "object" &&
      "imageUrl" in profileImage
    ) {
      return profileImage.imageUrl;
    }
    return booth_thumbnail;
  };
  return (
    <div
      className={`relative self-start ${
        isMobile ? "left-1/2 -translate-x-1/2" : ""
      }`}
    >
      <div className="h-25 w-25 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {profileImage ? (
          <img
            src={getImageSrc()}
            alt="프로필 미리보기"
            className="object-cover w-full h-full"
          />
        ) : (
          <img src={booth_thumbnail} alt="썸네일" />
        )}
      </div>
      <label className="absolute flex items-center justify-center bottom-0 right-0 bg-white w-[38px] h-[38px] rounded-full p-1 border border-[#ECECEC] cursor-pointer">
        <img src={editIcon} alt="편집" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
            e.currentTarget.value = "";
          }}
        />
      </label>
    </div>
  );
};

export default BoothProfileImage;
