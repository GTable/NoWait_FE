import University from "../../../../../assets/icon/map.svg?react";
import { useMap } from "react-kakao-maps-sdk";
import Portal from "../../../../../components/common/modal/Portal";
import useModal from "../../../../../hooks/useModal";
import UniversityListModal from "./UniversityListModal";
import CompassButton from "./CompassButton";

const MapControlButtons = ({
  center,
}: {
  center: { lat: number; lng: number };
}) => {
  const map = useMap();
  const modal = useModal();

  return (
    <div className="absolute left-[4px] top-[60px] flex flex-col gap-1">
      <div className="relative left-0 top-0 z-30 w-full flex gap-1">
        <button
          onClick={() => {
            modal.open();
          }}
          className="bg-white p-[6px] rounded-[2px]"
        >
          <University width="22px" height="22px" />
        </button>
        <CompassButton map={map} center={center} />
      </div>
      {modal.isOpen === true && (
        <Portal>
          <UniversityListModal map={map} onClose={modal.close} />
        </Portal>
      )}
    </div>
  );
};

export default MapControlButtons;
