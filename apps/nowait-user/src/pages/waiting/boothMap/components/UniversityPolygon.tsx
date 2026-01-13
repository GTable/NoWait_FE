import { Polygon } from "react-naver-maps";

const UniversityPolygon = ({
  paths,
}: {
  paths: { lat: number; lng: number }[][];
}) => {
  if (!paths.length) return null;

  return (
    <Polygon
      paths={paths}
      strokeWeight={1}
      strokeColor="#5e5e5e"
      strokeOpacity={0.8}
      fillColor="#5c5c5c"
      fillOpacity={0.6}
    />
  );
};

export default UniversityPolygon;
