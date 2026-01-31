import { Container as MapDiv, Marker, NaverMap } from "react-naver-maps";
import UniversityPolygon from "../../boothMap/components/UniversityPolygon";
import MapControlButtons from "../../boothMap/components/mapControls/MapControls";

interface PropsType {
  center: { lat: number; lng: number };
  paths: any;
  markers: { storeId: string; lat: number; lng: number }[];
  setMap: (map: any) => void;
}

const MapCanvas = ({ center, paths, markers,setMap }: PropsType) => {
  return (
    <MapDiv style={{ width: "100%", height: "100vh" }}>
      <NaverMap defaultCenter={center} defaultZoom={16} ref={setMap}>
        <MapControlButtons center={center} />

        <UniversityPolygon paths={paths} />
        {markers.map(({ storeId, lat, lng }) => (
          <Marker key={storeId} position={{ lat, lng }} />
        ))}
      </NaverMap>
    </MapDiv>
  );
};

export default MapCanvas;
