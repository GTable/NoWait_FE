import FullPageLoader from "../../../components/FullPageLoader";
import NotFound from "../../NotFound/NotFound";
import SectionDivider from "../../../components/SectionDivider";
import MenuList from "../../../components/common/MenuList";
import { useStoreMenus } from "../../../hooks/order/useStoreMenus";
import { useStoreDetail } from "./hooks/useStoreDetail";
import StoreHeaderSection from "./components/StoreHeaderSection";
import StoreInfoSection from "./components/StoreInfoSection";
import StoreActionSection from "./components/StoreActionSection";

const StoreDetailPage = () => {
  const { storeId, store, storeQuery, isBookmarked, toggleBookmark } =
    useStoreDetail();

  const { data: menus, isLoading: menusLoading } = useStoreMenus(storeId);

  if (storeQuery.isLoading) return <FullPageLoader />;
  if (storeQuery.isError) return <NotFound />;

  return (
    <div>
      <div className="px-5 min-h-dvh">
        <StoreHeaderSection
          bannerImages={store?.bannerImages}
          departmentName={store?.departmentName}
          name={store?.name}
          waitingCount={store?.waitingCount}
          profileImage={store?.profileImage?.imageUrl}
        />
        <StoreInfoSection
          storeId={storeId!}
          location={store?.location}
          openTime={store?.openTime}
          description={store?.description}
          noticeTitle={store?.noticeTitle}
          noticeContent={store?.noticeContent}
        />
        <SectionDivider />
        <MenuList
          mode="store"
          menus={menus?.menuReadDto}
          isLoading={menusLoading}
        />
      </div>
      <StoreActionSection
        storeId={storeId!}
        storeName={store?.name}
        isActive={store?.isActive}
        isWaiting={store?.isWaiting}
        isBookmarked={isBookmarked}
        onToggleBookmark={toggleBookmark}
      />
    </div>
  );
};

export default StoreDetailPage;
