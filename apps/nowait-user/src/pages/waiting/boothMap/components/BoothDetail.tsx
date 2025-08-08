import { useNavigate } from "react-router-dom";
import { Button } from "@repo/ui";
import Clock from "../../../../assets/icon/clock.svg?react";
import BookmarkIcon from "../../../../components/common/BookmarkIcon";
import { useState } from "react";
import { motion } from "framer-motion";

interface PropsType {
  booth: any | undefined;
}


const BoothDetail = ({ booth }: PropsType) => {

  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { storeId, name, departmentName, waitingCount } = booth;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1,y: 0 }}
      exit={{ opacity: 0,y: 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-[30px] left-1/2 -translate-x-1/2 w-[calc(100%-32px)] bg-white rounded-[20px] z-30"
    >
      <div className="pt-[20px] pb-[16px] px-[20px]">
        <div className="flex items-start justify-between">
          <div className="mb-[16px]">
            <h1 className="text-title-20-semibold text-black-90 mb-1">
              {name}
            </h1>
            <h2 className="text-16-regular">{departmentName}</h2>
          </div>
          <button
            className="mr-[5px]"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <BookmarkIcon isBookmarked={isBookmarked} />
          </button>
        </div>
        <p className="flex items-center text-16-regular text-black-80 mb-[20px]">
          <span className="w-[18px] flex justify-center mr-1.5">
            <Clock />
          </span>
          {waitingCount === 0 ? "대기없음" : `대기 ${waitingCount}명`}
        </p>
        <Button onClick={() => navigate(`/store/${storeId}`)}>상세 보기</Button>
      </div>
    </motion.div>
  );
};

export default BoothDetail;
