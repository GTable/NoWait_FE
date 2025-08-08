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
  const { data: menus } = useQuery({
    queryKey: ["storeMenus", storeId],
    queryFn: () => getStoreMenus(storeId),
    select: (data) => data.response.menuReadDto,
  });

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
