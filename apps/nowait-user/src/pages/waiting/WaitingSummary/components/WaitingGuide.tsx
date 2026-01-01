import { WAITING_GUIDE } from "../../../../constants/guides";

const WaitingGuide = () => {
  return (
    <div className="bg-black-10 px-5 py-[30px] grow">
      <h1 className="text-title-14-semibold text-black-80 mb-3">
        대기 등록 전 꼭 확인해주세요
      </h1>
      <ul>
        {WAITING_GUIDE.map((guide, i) => (
          <li
            key={i}
            className="text-[14px] text-regular text-black-60 mb-3 whitespace-pre-line break-keep list-disc ml-6"
          >
            {guide.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WaitingGuide;
