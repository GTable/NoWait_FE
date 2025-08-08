import { useEffect, useState } from "react";
import editOrderIcon from "../../../assets/edit_order_icon.svg";
import ToggleSwitch from "../../AdminHome/components/ToggleSwitch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MenuModal from "./Modal/menuModal";
import { useCreateMenu } from "../../../hooks/booth/menu/useCreateMenu";
import { useUploadMenuImage } from "../../../hooks/booth/useUploadMenuImage";
import { useGetAllMenus } from "../../../hooks/booth/menu/useGetAllMenus";
import { useUpdateMenu } from "../../../hooks/booth/useUpdateMenu";
import addIcon from "../../../assets/booth/add.svg";
import MenuRemoveModal from "./Modal/MenuRemoveModal";
import { useDeleteMenu } from "../../../hooks/booth/menu/useDeleteMenu";

// 세잘마다 , 붙여서 가격표시
const formatNumber = (num: number) => {
  if (!num) return "";
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface Menu {
  id: number;
  name: string;
  adminDisplayName: string;
  description: string;
  price: number;
  soldOut: boolean;
  imageUrl?: string;
}

const MenuSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const { data: fetchedMenus = [] } = useGetAllMenus(1);

  // 메뉴 생성 훅
  const { mutate: createMenu } = useCreateMenu();
  const { mutate: uploadMenuImage } = useUploadMenuImage();
  const { mutate: deleteMenu } = useDeleteMenu();
  const [menus, setMenus] = useState<Menu[]>([]);

  // 메뉴 수정 훅
  const { mutate: updateMenu } = useUpdateMenu();

  const openEditModal = (menu: any) => {
    setSelectedMenu(menu);
    setIsEditModalOpen(true);
  };

  const handleAddMenu = (newMenu: {
    name: string;
    adminDisplayName: string;
    description: string;
    price: string;
    image?: File;
  }) => {
    const payload = {
      storeId: 1,
      //   나중에 실제 storeId로 바꾸어야함
      adminDisplayName: newMenu.adminDisplayName,
      name: newMenu.name,
      description: newMenu.description,
      price: parseInt(newMenu.price.replace(/[^0-9]/g, ""), 10),
    };

    createMenu(payload, {
      onSuccess: (data) => {
        const created = data.response;
        console.log(created, "생성된 메뉴");

        // 상태에 넣을 새 객체
        const menuItem: Menu = {
          id: created.menuId,
          adminDisplayName: created.adminDisplayName,
          name: created.name,
          description: created.description,
          price: created.price,
          soldOut: created.isSoldOut,
          // imageUrl은 업로드 후에 업데이트
        };
        // 일단 메뉴 배열에 추가
        setMenus((prev) => [...prev, menuItem]);
        setIsAddModalOpen(false);

        // 이미지가 있으면 업로드하고, 성공 시 imageUrl 필드만 state에 patch
        if (newMenu.image) {
          uploadMenuImage(
            {
              menuId: created.menuId,
              image: newMenu.image,
            },
            {
              onSuccess: (imgData) => {
                const url = imgData.url;
                setMenus((prev) =>
                  prev.map((m) =>
                    m.id === created.menuId ? { ...m, imageUrl: url } : m
                  )
                );
              },
              onError: () => {
                alert("메뉴는 추가되었지만 이미지 업로드에 실패했습니다.");
              },
            }
          );
        } else {
          alert("메뉴가 성공적으로 추가되었습니다.");
        }
      },
      onError: () => {
        alert("메뉴 추가에 실패했습니다.");
      },
    });
  };

  const handleEditMenu = (updated: {
    id: number;
    name: string;
    adminDisplayName: string;
    description: string;
    price: string;
  }) => {
    const payload = {
      menuId: updated.id,
      adminDisplayName: updated.adminDisplayName,
      name: updated.name,
      description: updated.description,
      price: parseInt(String(updated.price).replace(/[^0-9]/g, ""), 10),
    };

    updateMenu(payload, {
      onSuccess: () => {
        setMenus((prev) =>
          prev.map((menu) =>
            menu.id === updated.id ? { ...menu, ...payload } : menu
          )
        );
        alert("메뉴가 성공적으로 수정되었습니다.");
      },
      onError: () => {
        alert("메뉴 수정에 실패했습니다.");
      },
    });
  };

  const handleDeleteMenu = () => {
    if (!selectedMenu) return;

    deleteMenu(selectedMenu.id, {
      onSuccess: () => {
        setMenus((prev) => prev.filter((menu) => menu.id !== selectedMenu.id));
        setIsRemoveModalOpen(false);
        alert("메뉴가 삭제되었습니다.");
      },
      onError: () => {
        alert("메뉴 삭제에 실패했습니다.");
      },
    });
  };

  const toggleSoldOut = (index: number) => {
    const updatedMenus = [...menus];
    updatedMenus[index].soldOut = !updatedMenus[index].soldOut;
    setMenus(updatedMenus);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = Array.from(menus);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setMenus(reordered);
  };

  useEffect(() => {
    const transformed = fetchedMenus.map((menu) => ({
      id: menu.menuId,
      name: menu.name,
      adminDisplayName: menu.adminDisplayName,
      description: menu.description,
      price: menu.price,
      soldOut: menu.isSoldOut,
      imageUrl: menu.images?.[0]?.imageUrl,
    }));
    setMenus(transformed);
  }, [fetchedMenus]);

  console.log(fetchedMenus);

  return (
    <div className="mt-[40px] mb-[20px] max-w-[614px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h2 className="text-headline-22-bold">메뉴</h2>
        <div className="flex gap-[10px]">
          <button
            className={`text-14-semibold px-[10px] py-[7.5px] rounded-[8px] ${
              editMode
                ? "bg-[#FFF0EB] text-primary"
                : "bg-black-5 text-black-70"
            }`}
            onClick={() => setEditMode((prev) => !prev)}
          >
            {editMode ? "편집 완료" : "순서 편집"}
          </button>
          <button
            className="flex text-14-semibold px-[10px] py-[7.5px] bg-black-5 text-black-70 rounded-[8px]"
            onClick={() => setIsAddModalOpen(true)}
          >
            메뉴 추가 <img src={addIcon} />
          </button>
        </div>
      </div>

      <div className="flex justify-between mb-[10px]">
        <p className="text-sm text-black-40 mb-2">{menus.length}개의 메뉴</p>
        {
          <p className="text-sm text-black-40 mb-2">
            {editMode ? "순서 표시" : "품절 표시"}
          </p>
        }
      </div>

      <div className="border-t border-[#EEEEEE]">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="menu-list"
            isDropDisabled={!editMode}
            direction="vertical"
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {menus.map((menu, idx) => (
                  <Draggable
                    key={`menu-${idx}`}
                    draggableId={`menu-${idx}`}
                    index={idx}
                    isDragDisabled={!editMode}
                  >
                    {(provided) => (
                      <div
                        className="flex justify-between items-center py-4"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(editMode ? provided.dragHandleProps : {})}
                      >
                        <div
                          className="flex items-center w-full gap-4"
                          onClick={() => !editMode && openEditModal(menu)}
                        >
                          <div className="w-[48px] h-[48px] bg-black-5 rounded-md flex items-center justify-center overflow-hidden">
                            <img
                              src={menu.imageUrl}
                              className="w-full h-full object-cover"
                              alt="placeholder"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {menu.name}
                            </span>
                            <span className="text-sm text-black-60">
                              {formatNumber(menu.price)}원
                            </span>
                          </div>
                        </div>

                        <div className="text-sm text-black-60">
                          {editMode ? (
                            <img
                              src={editOrderIcon}
                              alt="순서 변경"
                              className="w-5 h-5"
                              {...provided.dragHandleProps}
                            />
                          ) : (
                            <ToggleSwitch
                              isOn={menu.soldOut}
                              toggle={() => toggleSoldOut(idx)}
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isAddModalOpen && (
        <MenuModal
          isEdit={false}
          onClose={() => {
            setIsAddModalOpen(false);
          }}
          onSubmit={handleAddMenu}
          onDelete={() => {
            setIsRemoveModalOpen(true);
          }}
        />
      )}
      {isEditModalOpen && selectedMenu && (
        <MenuModal
          isEdit={true}
          initialData={selectedMenu}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onSubmit={handleEditMenu}
          onDelete={() => {
            setIsRemoveModalOpen(true);
          }}
        />
      )}
      {isRemoveModalOpen && (
        <MenuRemoveModal
          onCancel={() => setIsRemoveModalOpen(false)}
          onConfirm={handleDeleteMenu}
        />
      )}
    </div>
  );
};

export default MenuSection;
