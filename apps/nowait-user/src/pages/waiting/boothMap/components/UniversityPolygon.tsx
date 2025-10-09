import { Polygon } from "react-kakao-maps-sdk";

const UniversityPolygon = ({
  paths,
}: {
  paths: { lat: number; lng: number }[][];
}) => {
  if (!paths.length) return null;

  return (
    <Polygon
      path={paths}
      strokeWeight={2}
      strokeColor="#ffffff"
      strokeOpacity={0.8}
      fillColor="#686868"
      fillOpacity={0.6}
    />
  );
};

export default UniversityPolygon;
