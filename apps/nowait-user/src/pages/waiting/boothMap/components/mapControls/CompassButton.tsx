// import { useRef } from "react";
import MyLocation from "../../../../../assets/icon/myLocation.svg?react";
import { isCompassModeStore } from "../../../../../stores/mapStore";
import { useNavermaps } from "react-naver-maps";

const CompassButton = ({
  map,
  center,
}: {
  map: any;
  center: { lat: number; lng: number };
}) => {
  const { isCompassMode, setIsCompassMode } = isCompassModeStore();
  const navermaps = useNavermaps();

  // const markerRef = useRef<kakao.maps.Marker | null>(null);
  const handleClick = async () => {
    if (!isCompassMode) {
      // 내 위치로 이동
      map.panTo(new navermaps.LatLng(center.lat, center.lng));
      setIsCompassMode(true);
    } else {
      // 나침반 모드 활성화
      // if (typeof DeviceOrientationEvent !== "undefined") {
      //   try {
      //     // iOS의 경우 권한 요청 필요
      //     if (
      //       typeof (DeviceOrientationEvent as any).requestPermission ===
      //       "function"
      //     ) {
      //       const permission = await (
      //         DeviceOrientationEvent as any
      //       ).requestPermission();
      //       if (permission !== "granted") return;
      //     }

      //     window.addEventListener("deviceorientation", (event) => {
      //       console.log("alpha:", event.alpha);
      //       if (event.alpha != null && markerRef.current) {
      //         const heading = 360 - event.alpha;
      //         console.log(heading);
      //         const marker = markerRef.current;
      //         const icon = marker.getImage();
      //         if (icon) {
      //           // 회전용 transform 적용
      //           const imgEl = document.querySelector<HTMLImageElement>(
      //             `img[src="${(icon as any).src}"]`
      //           );
      //           if (imgEl) {
      //             imgEl.style.transform = `rotate(${heading}deg)`;
      //             imgEl.style.transition = "transform 0.1s linear";
      //           }
      //         }
      //       }
      //     });
      //   } catch (e) {
      //     console.warn("Device orientation not available:", e);
      //   }
      // }
      setIsCompassMode(false);
    }
  };
  return (
    <button
      className={`relative z-30 p-[6px] rounded-[2px]  transition-colors ${
        isCompassMode ? "bg-[#FF4103]" : "bg-white"
      }`}
      onClick={handleClick}
    >
      <MyLocation width="22px" height="22px" stroke={"#111111"} />
    </button>
  );
};

export default CompassButton;
