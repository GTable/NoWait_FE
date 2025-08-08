import QuantitySelector from "../../../../components/common/QuantitySelector";
import Close from "../../../../assets/icon/close.svg?react";
import { useCartStore } from "../../../../stores/cartStore";
import { motion } from "framer-motion";

interface PropsType {
  id: number;
  name: string;
  originPrice: number;
  price: number;
  quantity: number;
}

const CartItem = ({ id, name, originPrice, price, quantity }: PropsType) => {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  return (
    <motion.li
      layout
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="-mx-5 border-b border-[#ececec]"
    >
      <div className="w-full p-5">
        <div className="flex justify-between items-start">
          <div className="max-w-[12.5rem]">
            <h1 className="text-title-18-medium text-ellipsis line-clamp-2">
              {name}
            </h1>
            <h2 className="text-title-18-bold">
              {originPrice.toLocaleString()}원
            </h2>
          </div>
          <button
            onClick={() => {
              setTimeout(() => removeFromCart(id), 300);
            }}
          >
            <Close />
          </button>
        </div>
        <QuantitySelector
          mode="store"
          id={id}
          quantity={quantity}
          price={price / quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>
    </motion.li>
  );
};

export default CartItem;
