import { useRef, useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import search from "../../assets/icon/search.svg";
import HomeCard from "./components/HomeCard";
import HomeWaitingCard from "./components/HomeWaitingCard";
import InfiniteStoreList from "./components/InfiniteStoreList";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const cardWidth = scrollRef.current.clientWidth;
        const newIndex = Math.round(scrollLeft / cardWidth);
        setActiveIndex(newIndex);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => scrollElement.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <HomeHeader />
      <div className="px-5">
        {/* 주점명, 메뉴, 학과 검색 기능 */}
        <div className="mt-1 flex flex-row justify-start items-center px-4 py-3.5 bg-black-10 gap-2 rounded-lg">
          <img src={search} alt="search" className="icon-s text-black-60" />
          <div className="text-black-50 text-16-regular">
            주점명, 메뉴, 학과 검색
          </div>
        </div>

        {/* 주점 순서 */}
        <div className="mt-2.5">
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory rounded-2xl"
          >
            <div className="flex">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 snap-start px-0"
                >
                  <HomeWaitingCard
                    storeName={`주점주점주점명${index + 1}`}
                    queueNumber={13 + index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 페이지 인디케이터 */}
          <div className="flex justify-center mt-2.5 gap-1.25">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className={`h-1.5 transition-all duration-300 ${
                  index === activeIndex
                    ? "w-3.5 rounded-md bg-[#000000]"
                    : "w-1.5 rounded-sm bg-[#000000] opacity-20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 바로 입장 가능한 주점 */}
        <div className="mt-10 flex flex-col">
          <div className="text-start text-headline-22-bold text-black-90 mb-3.5">
            지금 바로 입장
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="flex-shrink-0">
                <HomeCard
                  storeName={`주점${index + 1}`}
                  department="컴퓨터공학과"
                  viewerCount={Math.floor(Math.random() * 100) + 1}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 무한 스크롤 주점 목록 */}
        <InfiniteStoreList />
      </div>
    </div>
  );
};

export default HomePage;
