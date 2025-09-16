import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Portal from "./Portal";
import Search_black from "../../../assets/icon/search_black_50.svg?react";
import Cancel from "../../../assets/icon/cancel.svg?react";
import UserApi from "../../../utils/UserApi";
import type { SearchStore, SearchResponse } from "../../../types/search";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchStore[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // 최근 검색어 로드
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error("최근 검색어 로드 실패:", error);
        setRecentSearches([]);
      }
    }
  }, []);

  // 최근 검색어 저장
  const saveRecentSearch = (searchTerm: string) => {
    const newSearches = [
      searchTerm,
      ...recentSearches.filter((item) => item !== searchTerm),
    ].slice(0, 10);
    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  };

  // 최근 검색어 삭제
  const removeRecentSearch = (searchTerm: string) => {
    const newSearches = recentSearches.filter((item) => item !== searchTerm);
    setRecentSearches(newSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newSearches));
  };

  // 검색 API 호출 함수
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await UserApi.get<SearchResponse>(
        `/v1/stores/search?keyword=${encodeURIComponent(query)}`
      );
      if (response.data.success) {
        setSearchResults(response.data.response);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("검색 실패:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // 디바운스 검색
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 모달이 닫힐 때 검색 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [isOpen]);

  // 검색 입력 핸들러
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 주점 클릭 핸들러 - 학과명을 최근 검색어에 저장하고 학과 페이지로 이동
  const handleStoreClick = (store: SearchStore) => {
    // 학과명을 최근 검색어에 저장
    saveRecentSearch(store.departmentName);

    // 학과별 주점 목록 페이지로 이동 (storeId를 query parameter로 전달)
    navigate(`/store/${store.publicCode}`);
    onClose();
  };

  // 최근 검색어 클릭 핸들러
  const handleRecentSearchClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  // 검색 결과 아이템 컴포넌트
  const SearchResultItem = ({ store }: { store: SearchStore }) => (
    <div
      className="flex flex-row py-3 gap-3 w-full min-w-0 items-center cursor-pointer"
      onClick={() => handleStoreClick(store)}
    >
      <div className="rounded-full w-11 h-11 bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
        {store.profileImage ? (
          <img
            alt={`${store.name} 주점 이미지`}
            src={store.profileImage?.imageUrl}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="text-16-bold text-black-60 flex items-center justify-center">
            {store.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex flex-row gap-2 items-center min-w-0">
          <div className="text-title-16-semibold text-black-90 text-start truncate flex-shrink min-w-0">
            {store.name}
          </div>
          <div className="flex-shrink-0">
            {store.isActive ? (
              <div className="px-1.5 py-1.25 rounded-md bg-[#FFF0EB]">
                <div className="font-bold text-[10px] leading-[100%] tracking-normal text-[#FF5E07]">
                  대기 {store.waitingCount}팀
                </div>
              </div>
            ) : (
              <div className="px-1.5 py-1.25 rounded-md bg-[#F7F7F7]">
                <div className="font-bold text-[10px] leading-[100%] tracking-normal text-[#AAAAAA]">
                  오픈 전
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex text-13-regular text-black-70 text-start">
          {store.departmentName}
        </div>
      </div>
    </div>
  );

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white px-5"
          >
            <div
              className="max-w-[430px] min-w-[360px] w-full bg-white mx-auto overflow-y-auto"
              style={{ height: "100dvh" }}
            >
              {/* 검색 헤더 */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 pt-4 py-5 mb-10 sticky top-0 bg-white z-10"
              >
                <div className="flex-1 relative">
                  <Search_black className="absolute left-4 top-1/2 transform -translate-y-1/2 icon-s text-black-50" />
                  <input
                    type="text"
                    placeholder="주점명, 메뉴, 학과 검색"
                    value={searchQuery}
                    onChange={handleSearchInput}
                    className="w-full h-12 pl-12 pr-4 bg-black-15 rounded-2xl text-16-regular text-black-90 placeholder:text-16-regular placeholder:text-black-50 focus:outline-none focus:border-primary"
                    autoFocus
                  />
                </div>
                <button
                  onClick={onClose}
                  className="text-16-medium text-black-70"
                >
                  닫기
                </button>
              </motion.div>

              {/* 검색 내용 영역 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="pb-7"
              >
                {searchQuery.trim() ? (
                  // 검색 결과 표시
                  <div className="flex flex-col">
                    <div className="flex text-[16px] font-bold leading-[144%] tracking-[-0.01em] text-black-90 mb-4">
                      검색 결과{" "}
                      {searchResults.length > 0 && `${searchResults.length}`}
                    </div>
                    {isSearching ? (
                      <div className="flex justify-center text-16-regular text-black-60 mt-6">
                        검색 중...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="flex flex-col">
                        {searchResults.map((store) => (
                          <SearchResultItem key={store.storeId} store={store} />
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center text-16-regular text-black-60 mt-6">
                        검색 결과가 없습니다
                      </div>
                    )}
                  </div>
                ) : (
                  // 최근 검색 표시
                  <div className="flex flex-col">
                    <div className="flex text-title-16-bold leading-[144%] tracking-[-0.01em] text-black-90 mb-4">
                      최근 검색
                    </div>
                    {recentSearches.length > 0 ? (
                      <div className="flex flex-col gap-4">
                        {recentSearches.map((searchTerm, index) => (
                          <div
                            key={index}
                            className="flex flex-row justify-between"
                          >
                            <button
                              className="flex text-16-regular text-black-90 cursor-pointer"
                              onClick={() =>
                                handleRecentSearchClick(searchTerm)
                              }
                            >
                              {searchTerm}
                            </button>
                            <div className="flex">
                              <button
                                className="flex"
                                onClick={() => removeRecentSearch(searchTerm)}
                              >
                                <Cancel className="icon-xs text-black-60" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center text-16-regular text-black-60 mt-6">
                        최근 검색어가 없습니다
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default SearchModal;
