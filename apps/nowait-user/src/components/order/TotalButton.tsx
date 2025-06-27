import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";
import { useParams } from "react-router-dom";

const TotalButton = ({ mode }: { mode: string }) => {
  const params = useParams();
  const { cart } = useCartStore();
  console.log(params, "params");
  return (
    <>
      {mode === "store" && (
        <span className="text-[14px] font-extrabold rounded-[5px] px-1.5 bg-white text-black">{`${sumQuantity(
          cart,
          "quantity"
        )}`}</span>
      )}

      {`${sumTotalPrice(cart)}원 주문하기`}
    </>
  );
};

export default TotalButton;
