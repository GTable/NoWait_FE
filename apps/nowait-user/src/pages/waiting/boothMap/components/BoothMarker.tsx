import React from "react";
import { Marker } from "react-naver-maps";
import DotMarker from "../../../../assets/icon/DotMarker.svg?url";

interface BoothMarkerProps {
  booth: {
    storeId: number;
    lat: number;
    lng: number;
    profileImage?: {
      imageUrl?: string;
    };
  };
  zoomLevel: number;
  openBooth: (id: number) => void;
}

const BoothMarker = React.memo(
  ({ booth, zoomLevel, openBooth }: BoothMarkerProps) => {
    const isZoomed = zoomLevel >= 19;

    const imageUrl =
      booth.profileImage?.imageUrl &&
      booth.profileImage.imageUrl.trim().length > 0
        ? booth.profileImage.imageUrl
        : DotMarker;

    const icon = !isZoomed
      ? {
          url: DotMarker,
          size: { width: 12, height: 12 },
          scaledSize: { width: 12, height: 12 },
        }
      : {
          content: `
  <div style="
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  ">
    <!-- 원형 마커 -->
    <div style="
      width:44px;
      height:44px;
      border-radius:50%;
      background:#fff;
      display:flex;
      align-items:center;
      justify-content:center;
    ">
      <img
        src="${imageUrl}"
        style="
          width:36px;
          height:36px;
          border-radius:50%;
          object-fit:cover;
        "
      />
    </div>

    <!-- 아래 화살표 -->
    <div style="
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-radius : 2px;
      border-top: 10px solid #fff;
      margin-top: -3px;
    //   filter: drop-shadow(0 2px 2px rgba(0,0,0,0.25));
    "></div>
  </div>
`,
          size: { width: 44, height: 44 },
          anchor: { x: 22, y: 22 },
        };

    return (
      <Marker
        position={{ lat: booth.lat, lng: booth.lng }}
        icon={icon}
        onClick={() => openBooth(booth.storeId)}
      />
    );
  }
);

export default BoothMarker;
