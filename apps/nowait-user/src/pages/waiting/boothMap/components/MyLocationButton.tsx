import React, { useEffect, useRef, useState } from "react";
import MyLocation from "../../../../assets/icon/myLocation.svg?react";
import University from "../../../../assets/icon/map.svg?react";
import { useMap } from "react-kakao-maps-sdk";
import GachonLogo from "../../../../assets/logo/gachon.png";
import KonkukLogo from "../../../../assets/logo/konkuk.png";
import Portal from "../../../../components/common/modal/Portal";
import useModal from "../../../../hooks/useModal";
const UNIVERSITY = [
  {
    id: 0,
    name: "가천대학교 글로벌캠퍼스",
    logo: GachonLogo,
    period: "9.9-9.11",
    festival: "월하(月下)",
    lat: 37.45258899044431,
    lng: 127.13144579047594,
  },
  {
    id: 1,
    name: "건국대학교 서울캠퍼스",
    logo: KonkukLogo,
    period: "9.30-10.1",
    festival: "녹색지대",
    lat: 37.45958855687918,
    lng: 126.95368082522316,
  },
];

const MyLocationButton = ({
  center,
}: {
  center: { lat: number; lng: number };
}) => {
  const map = useMap();
  const [isCompassMode, setIsCompassMode] = useState(false);
  const markerRef = useRef<kakao.maps.Marker | null>(null);
  const modal = useModal();

  console.log(isCompassMode);

  const handleClick = async () => {
    if (!isCompassMode) {
      // 내 위치로 이동
      map.panTo(new kakao.maps.LatLng(center.lat, center.lng));
      setIsCompassMode(true);
    } else {
      // 나침반 모드 활성화
      if (typeof DeviceOrientationEvent !== "undefined") {
        try {
          // iOS의 경우 권한 요청 필요
          if (
            typeof (DeviceOrientationEvent as any).requestPermission ===
            "function"
          ) {
            const permission = await (
              DeviceOrientationEvent as any
            ).requestPermission();
            if (permission !== "granted") return;
          }

          window.addEventListener("deviceorientation", (event) => {
            console.log("alpha:", event.alpha);
            if (event.alpha != null && markerRef.current) {
              const heading = 360 - event.alpha;
              console.log(heading);
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
    <div className="absolute left-[4px] top-[60px] flex flex-col gap-1">
      <div className="relative left-0 top-0 z-30 w-full">
        <button
          onClick={() => {
            modal.open();
          }}
          className="bg-white p-[6px] rounded-[2px]"
        >
          <University width="22px" height="22px" />
        </button>
        {modal.isOpen === true && (
          <Portal>
            <div
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => {
                modal.close();
              }}
            >
              <ul
                onClick={(e) => e.stopPropagation()}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[calc(100%-35px)] max-w-[430px] bg-white rounded-[20px] px-[12px] py-[12px]"
              >
                {/* <ul className="absolute left-[40px] top-0 bg-white w-[calc(100vw-34px)] rounded-[2px]"> */}
                  {UNIVERSITY.map((university) => {
                    return (
                      <li
                        onClick={() => {
                          map.panTo(
                            new kakao.maps.LatLng(
                              university.lat,
                              university.lng
                            )
                          );
                          modal.close()
                        }}
                        className="flex gap-2 items-center px-2 py-2"
                      >
                        <img width="42px" height="42px" src={university.logo} />
                        <div>
                          <h1 className="text-12-medium !leading-[100%]">
                            {university.name}
                          </h1>
                          <p className="text-12-semibold !leading-[100%]">
                            {university.festival}
                          </p>
                          <p className="text-12-medium !leading-[100%] text-black-80">
                            {university.period}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                {/* </ul> */}
              </ul>
            </div>
          </Portal>
        )}
      </div>
      <button
        className={`relative z-30 p-[6px] rounded-[2px]  transition-colors ${
          isCompassMode ? "bg-[#FF4103]" : "bg-white"
        }`}
        onClick={handleClick}
      >
        <MyLocation width="22px" height="22px" stroke={"#111111"} />
      </button>
    </div>
  );
};

export default MyLocationButton;
