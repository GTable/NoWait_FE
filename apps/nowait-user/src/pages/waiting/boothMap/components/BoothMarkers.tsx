import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import BoothMarker from "../../../../assets/icon/BoothMarker.svg?url";

interface BoothMarkersProps {
  booths: { storeId: number; lat: number; lng: number }[];
  openBooth: (id: number) => void;
}

const BoothMarkers = ({ booths, openBooth }: BoothMarkersProps) => (
  <MarkerClusterer averageCenter minLevel={3}>
    {booths.map((booth) => (
      <MapMarker
        key={booth.storeId}
        position={{ lat: booth.lat, lng: booth.lng }}
        image={{
          src: BoothMarker,
          size: { width: 32, height: 42 },
        }}
        onClick={() => openBooth(booth.storeId)}
      />
    ))}
  </MarkerClusterer>
);

export default BoothMarkers;