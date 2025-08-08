import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/logo.svg?react";
import Menu from "../../../../assets/icon/menu.svg?react";
import Search from "../../../../assets/icon/search.svg?react";
import Cancel from "../../../../assets/icon/cancel.svg?react";
import Portal from "../../../../components/common/modal/Portal";
import SearchModal from "../../../../components/common/modal/SearchModal";

const MapHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleBookmarkClick = () => {
    closeMenu();
    navigate("/bookmark");
  };

  const handleHomeClick = () => {
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-1 bg-white">
        <div className="flex justify-between items-center py-4 px-5">
          <Logo className="w-14.5 h-6" />
          <div className="flex flex-row gap-3">
            <button onClick={openSearch} className="cursor-pointer">
              <Search className="icon-m" />
            </button>
            <button onClick={toggleMenu} className="cursor-pointer">
              <Menu className="icon-m" />
            </button>
          </div>
        </div>
      </header>

      {/* 전체 화면 메뉴 모달 */}
      <Portal>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-50 bg-[#222] flex items-center justify-center"
            >
              <div className="max-w-[430px] min-w-[360px] w-full h-full bg-white mx-auto">
                {/* 고정된 헤더 */}
                <div className="flex justify-between items-center pt-4 px-5">
                  <Logo className="w-14.5 h-6" />
                  <button onClick={closeMenu} className="cursor-pointer">
                    <Cancel className="icon-m" />
                  </button>
                </div>

                {/* 슬라이드되는 메뉴 내용 */}
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col mt-16.5 px-5"
                >
                  {/* 메뉴 항목들 */}
                  <div className="flex w-full">
                    <nav className="flex flex-col gap-5.5 w-full">
                      <motion.button
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        onClick={handleHomeClick}
                        className="block w-full text-left text-title-20-semibold leading-[136%] tracking-[-0.01em] text-black-100"
                      >
                        홈
                      </motion.button>
                      <motion.button
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        onClick={closeMenu}
                        className="block w-full text-left text-title-20-semibold leading-[136%] tracking-[-0.01em] text-black-100"
                      >
                        축제 맵
                      </motion.button>
                      <motion.button
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.45 }}
                        onClick={handleBookmarkClick}
                        className="block w-full text-left text-title-20-semibold leading-[136%] tracking-[-0.01em] text-black-100"
                      >
                        북마크
                      </motion.button>
                    </nav>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      {/* 전체 화면 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default MapHeader;
