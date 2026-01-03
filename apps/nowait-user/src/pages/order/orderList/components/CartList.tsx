import CartItem from "./CartItem";
import { AnimatePresence, motion } from "framer-motion";
import Add from "../../../../assets/icon/Add.svg?react";
import { useNavigate } from "react-router-dom";
import type { CartType } from "../../../../types/order/cart";
import { SmallActionButton } from "../../../../components/SmallActionButton";

interface Props {
  cart: CartType[];
  storeId?: string;
}

const CartList = ({ cart, storeId }: Props) => {
  const navigate = useNavigate();

  return (
    <motion.ul className="flex flex-col mb-[116px]" layout>
      <AnimatePresence mode="sync">
        {cart.map((item) => (
          <CartItem key={item.menuId} {...item} />
        ))}
        <motion.li layout className="flex justify-center">
          <SmallActionButton
            ariaLabel="메뉴 추가하기"
            onClick={() => navigate(`/${storeId}`, { state: { isBack: true } })}
            className="py-5 border-none"
          >
            메뉴 추가하기
            <span className="flex justify-center items-center w-4 h-4">
              <Add />
            </span>
          </SmallActionButton>
        </motion.li>
      </AnimatePresence>
    </motion.ul>
  );
};

export default CartList;
