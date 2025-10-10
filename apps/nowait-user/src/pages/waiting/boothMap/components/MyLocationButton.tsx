import React, { useEffect, useRef, useState } from "react";
import MyLocation from "../../../../assets/icon/myLocation.svg?react";
import University from "../../../../assets/icon/map.svg?react";
import { useMap } from "react-kakao-maps-sdk";

const MyLocationButton = ({
  center,
}: {
  center: { lat: number; lng: number };
}) => {
  const map = useMap();
  const [isCompassMode, setIsCompassMode] = useState(false);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  console.log(isCompassMode)
  // useEffect(() => {
  //   // 마커 생성 (내 위치)
  //   const marker = new kakao.maps.Marker({
  //     position: new kakao.maps.LatLng(center.lat, center.lng),
  //     map,
  //   });
  //   markerRef.current = marker;

  //   return () => {
  //     marker.setMap(null);
  //   };
  // }, [center, map]);

  const handleClick = async () => {
    if (!isCompassMode) {
      // 1️⃣ 첫 클릭 → 내 위치로 이동
      map.panTo(new kakao.maps.LatLng(center.lat, center.lng));
      setIsCompassMode(true);
    } else {
      // 2️⃣ 두 번째 클릭 → 나침반 모드 활성화
      if (typeof DeviceOrientationEvent !== "undefined") {
        try {
          // iOS의 경우 권한 요청 필요
          if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
            const permission = await (DeviceOrientationEvent as any).requestPermission();
            if (permission !== "granted") return;
          }

          window.addEventListener("deviceorientation", (event) => {
            console.log("alpha:", event.alpha);
            if (event.alpha != null && markerRef.current) {
              const heading = 360 - event.alpha;
              console.log(heading)
              const marker = markerRef.current;
              const icon = marker.getImage();
              if (icon) {
                // 회전용 transform 적용
                const imgEl = document.querySelector<HTMLImageElement>(
                  `img[src="${(icon as any).src}"]`
                );
                if (imgEl) {
                  imgEl.style.transform = `rotate(${heading}deg)`;
                  imgEl.style.transition = "transform 0.1s linear";
                }
              }
            }
          });
        } catch (e) {
          console.warn("Device orientation not available:", e);
        }
      }
      setIsCompassMode(false);
    }
  };

  return (
    <div className="absolute left-[4px] top-[60px] flex gap-1">
      <button
        className={`relative z-50 p-[6px] rounded-[2px]  transition-colors ${
          isCompassMode ? "bg-[#FF4103]" : "bg-white"
        }`}
        onClick={handleClick}
      >
        <MyLocation width="24px" height="24px" stroke={"#111111"} />
      </button>
      <button className="relative bg-white z-50 p-[6px] rounded-[2px]">
        <University />
      </button>
    </div>
  );
};

export default MyLocationButton;