import { useGeoPolygon } from "../boothMap/hooks/useGeoPolygon";
import { useMyLocation } from "../boothMap/hooks/useMyLocation";
import MapControls from "./components/MapControls";
import GeoDataForm from "./components/GeoDataForm";
import MapCanvas from "./components/MapCanvas";
import { useMapClick } from "./hooks/useMapClick";
import { useMarkerManager } from "./hooks/useMarkerManager";
import { useMap } from "react-naver-maps";

const MapManagePage = () => {
  const map = useMap();

  const paths = useGeoPolygon();
  const myLocation = useMyLocation();

  const {
    markers,
    isActive,
    setIsActive,
    addMarker,
    undoMarker,
    resetMarkers,
    copyMarkers,
  } = useMarkerManager();

  useMapClick({
    map,
    enabled: isActive,
    onClick: addMarker,
  });

  return (
    // <div className="relative top-0 left-0 min-h-dvh w-full">
    <div className="fixed top-0 left-0 min-h-dvh w-full my-0!">
      <MapCanvas
        center={myLocation.center}
        paths={paths}
        markers={markers}
      />
      <GeoDataForm />
      <MapControls
        isActive={isActive}
        hasMarkers={!!markers.length}
        onStart={() => setIsActive(true)}
        onStop={() => setIsActive(false)}
        onUndo={undoMarker}
        onReset={resetMarkers}
        onCopy={copyMarkers}
      />
    </div>
  );
};

export default MapManagePage;
