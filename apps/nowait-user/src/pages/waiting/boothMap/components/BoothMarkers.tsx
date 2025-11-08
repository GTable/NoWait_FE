import BoothMarker from "../../../../assets/icon/BoothMarker.svg?url";
import DotMarker from "../../../../assets/icon/DotMarker.svg?url";
import React from "react";
import { Marker } from "react-naver-maps";

interface BoothMarkersProps {
  booths: { storeId: number; lat: number; lng: number }[];
  openBooth: (id: number) => void;
  zoomLevel: number;
}

const BoothMarkers = React.memo(
  ({ booths, openBooth, zoomLevel }: BoothMarkersProps) => {

    return (
      <>
        {booths.map((booth) => (
          <Marker
            key={booth.storeId}
            position={{ lat: booth.lat, lng: booth.lng }}
            icon={{
              url: zoomLevel >= 17 ? BoothMarker : DotMarker,
            }}
            onClick={() => openBooth(booth.storeId)}
          />
        ))}
      </>
    );
  }
);

export default BoothMarkers;
