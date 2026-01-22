import BoothMarker from "./BoothMarker";

const BoothMarkers = ({ booths, zoomLevel, openBooth }:any) => {
  console.log(booths)
  return (
    <>
      {booths.map((booth:any) => (
        <BoothMarker
          key={booth.storeId}
          booth={booth}
          zoomLevel={zoomLevel}
          openBooth={openBooth}
        />
      ))}
    </>
  );
};

export default BoothMarkers;