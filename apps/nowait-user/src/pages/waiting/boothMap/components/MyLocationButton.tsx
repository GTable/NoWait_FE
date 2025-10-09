import React from "react";
import MyLocation from "../../../../assets/icon/myLocation.svg?react";
import University from "../../../../assets/icon/map.svg?react";

import { useMap } from "react-kakao-maps-sdk";

const MyLocationButton = ({
  center,
}: {
  center: { lat: number; lng: number };
}) => {
  const map = useMap();

  const handleClick = () => {
    // 내 위치 중심으로 이동
    map.panTo(new kakao.maps.LatLng(center.lat, center.lng));
  };
  return (
    <div className="absolute left-[4px] top-[60px] flex gap-1">
      <button
        className="relative bg-white z-50 p-[6px] rounded-[2px]"
        onClick={handleClick}
      >
        <MyLocation width="24px" height="24px" stroke={"#FF4103"} />
      </button>
      <button className="relative bg-white z-50 p-[6px] rounded-[2px]">
        <University />
      </button>
    </div>
  );
};

export default MyLocationButton;
