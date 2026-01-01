import SubStract from "../../../../assets/icon/subtract.svg?react";
import Clock from "../../../../assets/icon/clock.svg?react";
import Arrow from "../../../../assets/icon/arrow-right.svg?react";
import { useNavigate } from "react-router-dom";
import { formatTimeRange } from "../../../../utils/formatTimeRange";

interface PropsType {
  storeId: string;
  location?: string;
  openTime?: string;
  description?: string;
  noticeTitle?: string;
  noticeContent?: string;
}

const StoreInfoSection = ({
  storeId,
  location,
  openTime,
  description,
  noticeTitle,
  noticeContent,
}: PropsType) => {
  const navigate = useNavigate();

  return (
    <section className="pt-5 pb-7">
      <div className="mb-6">
        <p className="flex items-center mb-1.5 text-16-regular">
          <SubStract className="mr-1.5" />
          {location}
        </p>
        <p className="flex items-center text-16-regular">
          <Clock className="mr-1.5" />
          {formatTimeRange(openTime)}
        </p>
      </div>

      <h2 className="mb-10 whitespace-pre-line break-keep">
        {description}
      </h2>

      {noticeTitle && (
        <button
          onClick={() =>
            navigate(`/store/${storeId}/notice`, {
              state: { title: noticeTitle, content: noticeContent },
            })
          }
          className="w-full flex justify-between items-center py-3.5 px-4 bg-black-15 rounded-[10px]"
        >
          <h1 className="truncate">{noticeTitle}</h1>
          <Arrow />
        </button>
      )}
    </section>
  );
};

export default StoreInfoSection;