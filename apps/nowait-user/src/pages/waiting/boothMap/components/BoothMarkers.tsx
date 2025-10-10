import { MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import BoothMarker from "../../../../assets/icon/BoothMarker.svg?url";

interface BoothMarkersProps {
  booths: { storeId: number; lat: number; lng: number }[];
  openBooth: (id: number) => void;
}

const BoothMarkers = ({ booths, openBooth }: BoothMarkersProps) => {
  const createClusterSVG = (count: number) => {
    const svg = `
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 16.0851C32 24.9703 23.9296 34.3063 19.2521 38.971C17.4284 40.7898 14.5716 40.7898 12.7479 38.971C8.07044 34.3063 0 24.9703 0 16.0851C6.32325e-08 11.8191 1.68571 7.72776 4.68629 4.71122C7.68687 1.69468 11.7565 0 16 0C20.2435 0 24.3131 1.69468 27.3137 4.71122C30.3143 7.72776 32 11.8191 32 16.0851Z" fill="#FF4103"/>
</svg>
  `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };
  return (
    <>
      <MarkerClusterer
        averageCenter
        minLevel={3}
        styles={[
          {
            width: "32px",
            height: "42px",
            background: `url(${createClusterSVG(
              0
            )}) no-repeat center / contain`,
            color: "#fff",
            textAlign: "center",
            lineHeight: "30px",
            fontSize: "18px",
            fontWeight: "bold",
          },
        ]}
      >
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
    </>
  );
};

export default BoothMarkers;
