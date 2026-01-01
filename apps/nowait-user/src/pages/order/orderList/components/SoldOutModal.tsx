import { Button } from "@repo/ui";
import Portal from "../../../../components/common/modal/Portal";
import type { CartType } from "../../../../types/order/cart";

interface Props {
  menus: CartType[];
  onConfirm: () => void;
}

const SoldOutModal = ({ menus, onConfirm }: Props) => {
  return (
    <Portal>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => {
          onConfirm();
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[calc(100%-35px)] max-w-[430px] bg-white rounded-[20px] px-[22px] pt-[30px] pb-[22px]"
        >
          <h1 className="text-title-20-bold text-black-90 text-center mb-5 break-keep">
            현재{" "}
            {menus?.map((menu: CartType, idx: number) => (
              <span key={menu.menuId}>
                {menu.name}
                {idx < menus.length - 1 && ", "}
              </span>
            ))}
            는(은) 품절 상태입니다.
          </h1>
          <Button
            backgroundColor="#F4F4F4"
            textColor="#666666"
            onClick={() => {
              onConfirm();
            }}
          >
            주문 계속하기
          </Button>
        </div>
      </div>
    </Portal>
  );
};

export default SoldOutModal;
