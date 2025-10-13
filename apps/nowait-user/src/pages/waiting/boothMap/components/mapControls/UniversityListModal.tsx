import { UNIVERSITY } from "../../constants/university";

const UniversityListModal = ({
  map,
  onClose,
}: {
  map: kakao.maps.Map;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <ul
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[calc(100%-35px)] max-w-[430px] bg-white rounded-[20px] px-[12px] py-[12px]"
      >
        {UNIVERSITY.map((university) => (
          <li
            key={university.id}
            onClick={() => {
              map.panTo(new kakao.maps.LatLng(university.lat, university.lng));
              onClose();
            }}
            className="flex gap-2 items-center px-2 py-2"
          >
            <img width="42px" height="42px" src={university.logo} />
            <div>
              <h1 className="text-12-medium leading-tight">
                {university.name}
              </h1>
              <p className="text-12-semibold leading-tight">
                {university.festival}
              </p>
              <p className="text-12-medium leading-tight text-black-80">
                {university.period}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversityListModal;
