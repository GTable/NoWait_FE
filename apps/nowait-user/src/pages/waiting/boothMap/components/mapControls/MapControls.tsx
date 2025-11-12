import University from "../../../../../assets/icon/map.svg?react";
import Portal from "../../../../../components/common/modal/Portal";
import useModal from "../../../../../hooks/useModal";
import UniversityListModal from "./UniversityListModal";
import CompassButton from "./CompassButton";

const MapControlButtons = ({
  map,
  center,
}: {
  map: any
  center: { lat: number; lng: number };
}) => {
  const modal = useModal();

  return (
    <div className="absolute left-1 top-[60px] flex flex-col gap-1">
      <div className="relative left-0 top-0 z-30 w-full flex gap-1">
        <button
          onClick={() => {
            modal.open();
          }}
          className="bg-white p-1.5 rounded-xs"
        >
          <University width="22px" height="22px" />
        </button>
        <CompassButton map={map} center={center} />
      </div>
      {modal.isOpen === true && (
        <Portal>
          <UniversityListModal  onClose={modal.close} map={map}/>
        </Portal>
      )}
    </div>
  );
};

export default MapControlButtons;
