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

  // 이 값은 장바구니가 처음에 비어있으면 true로 시작 -> 바로 EmptyCart 표시
  const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(
    false
  );

  const { data: menus } = useQuery({
    queryKey: ["storeMenuList", storeId],
    queryFn: () => getStoreMenus(storeId!),
    select: (data) => data?.response?.menuReadDto,
  });

  // 맨위로 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ----- 핵심: cart가 비워질 때 exit 애니메이션이 끝난 뒤 EmptyCart를 보여주도록 지연 처리 -----
  useEffect(() => {
    let timerId: number | undefined;

    if (cart.length === 0) {
      // 이미 isAnimatingOut 상태이면(=초기 진입으로 EmptyCart가 보이는 경우) 타이머 불필요
      if (!isAnimatingOut) {
        // CartItem의 exit transition duration이 0.3s이므로 약간 여유를 두어 350ms 사용
        timerId = window.setTimeout(() => {
          setIsAnimatingOut(true);
        }, 350);
      }
    } else {
      // 아이템이 있으면(다시 추가되면) 즉시 isAnimatingOut 해제하고, 타이머 취소
      if (isAnimatingOut) setIsAnimatingOut(false);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [cart, isAnimatingOut]);
  // -------------------------------------------------------------------------------------

  // 애니메이션이 완료되어 빈 상태로 전환된 경우에만 EmptyCart를 바로 렌더링
  if (cart.length === 0 && isAnimatingOut) {
    return <EmptyCart />;
  }

  return (
    <div>
      <BackHeader title="장바구니" />
      <section className="flex flex-col flex-grow min-h-[calc(100dvh-48px)] mt-[48px] pt-7 px-5">
        <h1 className="text-headline-22-bold mb-5">
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
                <span className="block w-4 h-4 mb-0.5">
                  <Add className="w-full h-full" fill="currentColor" />
                </span>
              </SmallActionButton>
            </motion.li>
          </AnimatePresence>
        </motion.ul>
      </section>
      <PageFooterButton background="gradient">
        <Button
          textColor="white"
          onClick={() => {
            if (!menus) return;
            // 장바구니와 최신 메뉴 데이터 동기화
            const soldOut = getSoldOutMenusInCart(cart, menus);
            if (soldOut.length > 0) {
              setSoldOutMenus(soldOut);
              modal.open();
            } else {
              navigate(`/${storeId}/remittance`);
            }
          }}
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
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[calc(100%-35px)] max-w-[430px] bg-white rounded-[20px] px-[22px] pt-[30px] pb-[22px]"
            >
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
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default OrderListPage;
