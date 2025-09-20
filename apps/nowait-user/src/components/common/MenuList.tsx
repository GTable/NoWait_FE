import type { MenuType } from "../../types/order/menu";
import MenuItem from "./MenuItem";

const MenuList = ({
  mode,
  menus,
  isLoading,
}: {
  mode: "order" | "store";
  menus: MenuType[] | undefined;
  isLoading: boolean;
}) => {

  return (
    <div className="pt-[30px] pb-[14px]">
      <h1 className="text-title-20-semibold mb-3">메뉴</h1>
      <ul>
        {!isLoading ? (
          menus?.map((menu: MenuType) => {
            return <MenuItem key={menu.menuId} data={menu} mode={mode} />;
          })
        ) : (
          <>
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <li key={i} className="mb-5 last:mb-0">
                  <div className="w-full flex justify-between items-center text-left">
                    <div className="min-w-[224px]">
                      <h1 className="mb-1 w-full h-[24px] bg-black-20 rounded-[4px]" />
                      <h2 className="bg-black-20 w-[100px] h-[20px] rounded-[4px]" />
                    </div>
                    <div className="w-[80px] h-[80px] bg-black-20 rounded-[12px]" />
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
