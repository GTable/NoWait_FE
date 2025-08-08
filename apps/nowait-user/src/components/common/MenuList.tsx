import { useQuery } from "@tanstack/react-query";
import type { MenuType } from "../../types/order/menu";
import MenuItem from "./MenuItem";
import { getStoreMenus } from "../../api/menu";

const MenuList = ({
  storeId,
  mode,
}: {
  storeId: string | undefined | null;
  mode: string;
}) => {
  const {
    data: menus,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["storeMenus", storeId],
    queryFn: () => getStoreMenus(Number(storeId!)),
    select: (data) => data.response.menuReadDto,
  });

  if(isLoading) return <h1>로딩중...</h1>
if(isError) return <h1>에러...</h1>
  return (
    <div className="py-[30px]">
      <h1 className="text-title-20-semibold mb-3">메뉴</h1>
      <ul>
        {menus?.map((menu: MenuType) => {
          return <MenuItem key={menu.menuId} data={menu} mode={mode} />;
        })}
      </ul>
    </div>
  );
};

export default MenuList;
