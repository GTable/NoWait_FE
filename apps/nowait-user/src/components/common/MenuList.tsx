import type { MenuType } from "../../types/order/menu";
import MenuItem from "./MenuItem";
import MenuListSkeleton from "./MenuListSkeleton";

const MenuList = ({
  mode,
  menus,
  isLoading,
}: {
  mode: "order" | "store";
  menus: MenuType[] | undefined;
  isLoading: boolean;
}) => {
  
  if (isLoading) return <MenuListSkeleton />;

  return (
    <div className="pt-[30px] pb-[14px]">
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
