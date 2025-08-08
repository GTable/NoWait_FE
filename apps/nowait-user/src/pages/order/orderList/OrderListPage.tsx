import CartItem from "./components/CartItem";
import PageFooterButton from "../../../components/order/PageFooterButton";
import { Button } from "@repo/ui";
import { useNavigate, useParams } from "react-router-dom";
import TotalButton from "../../../components/order/TotalButton";
import { useCartStore } from "../../../stores/cartStore";
import { AnimatePresence } from "framer-motion";
import EmptyCart from "./components/EmptyCart";
import { SmallActionButton } from "../../../components/SmallActionButton";
import Add from "../../../assets/icon/Add.svg?react";
import BackHeader from "../../../components/BackHeader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStoreMenus } from "../../../api/menu";
import { getSoldOutMenusInCart } from "../../../utils/checkSoldOutMenus";
import useModal from "../../../hooks/useModal";
import Portal from "../../../components/common/modal/Portal";
import type { CartType } from "../../../types/order/cart";
import { motion } from "framer-motion";

const OrderListPage = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { cart, removeFromCart } = useCartStore();
  const modal = useModal();
  const [soldOutMenus, setSoldOutMenus] = useState<CartType[] | undefined>();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // 메뉴가 1개일 때에도 애니메이션 작동
  useEffect(() => {
    if (cart.length === 0 && !isAnimatingOut) {
      setTimeout(() => {
        setIsAnimatingOut(true);
      }, 300);
    }
  }, [cart]);

  const { data: menus } = useQuery({
    queryKey: ["storeMenus", storeId],
    queryFn: () => getStoreMenus(Number(storeId)),
    select: (data) => data.response.menuReadDto,
  });

  // 장바구니와 최신 메뉴 데이터 동기화
  useEffect(() => {
    if (!menus) return;

    const soldOut = getSoldOutMenusInCart(cart, menus);

    if (soldOut.length > 0) {
      setSoldOutMenus(soldOut);
      modal.open();
    }
  }, [menus, cart]);

  if (cart.length === 0 && isAnimatingOut) return <EmptyCart />;

  return (
    <div>
      <BackHeader title="장바구니" />
      <section className="flex flex-col flex-grow min-h-screen-dvh pt-7 px-5 pb-[112px]">
        <h1 className="text-headline-24-bold mb-5">
          주문 총 <span className="text-primary">{cart.length}건</span>
        </h1>
        <motion.ul className="flex justify-center flex-col" layout>
          <AnimatePresence mode="sync">
            {cart.map((item) => {
              return (
                <CartItem
                  key={item.menuId}
                  id={item.menuId}
                  name={item.name}
                  originPrice={item.originPrice}
                  price={item.price}
                  quantity={item.quantity}
                />
              );
            })}
            <motion.li className="flex justify-center" layout>
              <SmallActionButton
                mode="default"
                type="button"
                ariaLabel="메뉴 추가하기"
                onClick={() => navigate(`/${storeId}`)}
                className="py-5 border-none"
              >
                메뉴 추가하기
                <Add className="w-4 h-4 mb-1" fill="currentColor" />
              </SmallActionButton>
            </motion.li>
          </AnimatePresence>
        </motion.ul>
      </section>
      <PageFooterButton>
        <Button
          textColor="white"
          onClick={() => navigate(`/${storeId}/remittance`)}
        >
          <TotalButton variant="orderPage" actionText="주문하기" />
        </Button>
      </PageFooterButton>
      {modal.isOpen && soldOutMenus!.length > 0 && (
        <Portal>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => {
              modal.close();
              soldOutMenus?.forEach((menu: CartType) =>
                removeFromCart(menu.menuId)
              );
            }}
          >
            <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[calc(100%-40px)] max-w-[430px] bg-white rounded-[20px] px-[22px] pt-[30px] pb-[22px]">
              <h1 className="text-title-20-bold text-black-90 text-center mb-[20px] break-keep">
                현재{" "}
                {soldOutMenus?.map((menu: CartType, idx: number) => (
                  <span key={menu.menuId}>
                    {menu.name}
                    {idx < soldOutMenus.length - 1 && ", "}
                  </span>
                ))}
                는(은) 품절 상태입니다.
              </h1>
              <Button
                backgroundColor="#F4F4F4"
                textColor="#666666"
                onClick={() => {
                  modal.close();
                  soldOutMenus?.forEach((menu: CartType) =>
                    removeFromCart(menu.menuId)
                  );
                }}
              >
                주문 계속하기
              </Button>
              {/* <Button
                  onClick={() => {
                    navigate(-1);
                    soldOutMenus?.forEach((menu: CartType) =>
                      removeFromCart(menu.menuId)
                    );
                  }}
                >
                  더 추가하기
                </Button> */}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default OrderListPage;
