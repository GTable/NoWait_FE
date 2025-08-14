import { sumQuantity, sumTotalPrice } from "../../utils/sumUtils";
import { useCartStore } from "../../stores/cartStore";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

interface PropsType {
  variant?: "default" | "orderPage";
  addedPrice?: number | undefined;
  actionText: string;
}

const TotalButton = ({
  variant = "default",
  addedPrice,
  actionText,
}: PropsType) => {
  const { cart } = useCartStore();
  const baseTotal = sumTotalPrice(cart);
  const [price, setPrice] = useState(baseTotal);
  const [trend, setTrend] = useState(0);
  console.log(trend);
  console.log(addedPrice);
  useEffect(() => {
    if (addedPrice !== undefined) {
      setTrend(1);
    }
    setPrice(baseTotal + (addedPrice || 0));
  }, [baseTotal, addedPrice]);

  return (
    <div className="flex items-center gap-2 text-button-17-semibold text-white-100 ml-1">
      {variant !== "orderPage" && (
        <p className="w-[22px] rounded-[5px] bg-white">
          <span className="text-[14px] font-extrabold text-cool-black">
            {sumQuantity(cart, "quantity")}
          </span>
        </p>
      )}
      <NumberFlow value={price} trend={trend} suffix={`원 ${actionText}`} />
    </div>
  );
};

export default TotalButton;
